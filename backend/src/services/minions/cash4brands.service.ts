import { prepareUrl } from './../../helpers/index';
import { HttpService, Injectable } from '@nestjs/common';

@Injectable()
export class Cash4brandsService {
    offersParams: object;
    constructor(
        private readonly apiUrl: string,
        private readonly httpService: HttpService,
    ) {
        this.offersParams = {
            start: 0,
            count: 1000,
        };
        // https://cash4brands.ru/api/get_all_shops/
        // const kek = 'https://cash4brands.ru/api/get_shops_list/?start=0&count=1000';
    }

    async getOffersUrls(): Promise<{ id, urls }[]> {
        return new Promise((resolve, reject) => {
            this.httpService
                .get(`${this.apiUrl}/get_all_shops`)
                .subscribe(resp => {
                    const { status, data: offers } = resp;
                    if (status === 200) resolve(offers);
                    else reject();
                })
        });
    }

    getCashbackFromString (string: string): number {    
        let cashback = null;
        const procents = string.match(/\d+?.\d+|\d+/);
        if (!procents) return null;
        [cashback] = procents;
        // если указано через тире, берем второе значение
        if (cashback.includes('-')) [,cashback] = cashback.split('-');
        return cashback;
    }

    async getOffersInfo(): Promise< { id, offer: { url } }[]> {
        const config = {
            params: this.offersParams,
        };

        return new Promise((resolve, reject) => {
            this.httpService
                .get(`${this.apiUrl}/get_shops_list`, config)
                .subscribe(resp => {
                    const { status, data: offers } = resp;
                    if (status === 200) {
                        const formatedOffers = offers.map(offer => {
                            const cashback = this?.getCashbackFromString(offer?.offers__ufp?.ufp);
                            if (!cashback) return;
                            const rates = JSON.stringify(offer?.pctable?.map(({ pc, title }) => 
                                ({ name: title, value: pc })));
                            const [rateSymbol] = offer?.offers__ufp?.ufp.match(/%|р/) || [];
                            const conditions = offer.text;

                            return {
                                id: offer.id,
                                offer: {
                                    name: offer?.title,
                                    logo: offer?.image_small,
                                    rateSymbol,
                                },
                                serviceOfferInfo: { rates, cashback, conditions },
                            };
                        });
                        resolve(formatedOffers);
                    } else reject();
                });
        });
    }
    
    async getOffers() {
        const offersUrl = await this.getOffersUrls();
        const formatedOffers = await this.getOffersInfo();
        try {
            if (!offersUrl || !formatedOffers) return;
            if (offersUrl && formatedOffers) {
                return formatedOffers.reduce((result, offerData) => {
                    const findedOffer = offersUrl.find(offerWithUrl => offerWithUrl?.id === offerData?.id);
                    if (findedOffer) {
                        // Удалим id cash4brands
                        delete offerData.id;
                        const [url] = findedOffer.urls;
                        offerData.offer.url = prepareUrl(url)
                        result.push(offerData);
                    }
                    return result
                }, []);
            }
        } catch (e) {
            throw new Error(e)
        }
    }
}
