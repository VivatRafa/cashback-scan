import { HttpService, Injectable } from '@nestjs/common';

@Injectable()
export class KopikotService {
    constructor(
        private readonly apiUrl: string,
        private readonly httpService: HttpService,
    ) {}

    async getOffer(): Promise<Boolean> {
        return true;
    }

    getOffersUrl(): Promise<{ id, tld, extension }[]>{
        return new Promise((resolve, reject) => {
            this.httpService
                .get(`${this.apiUrl}/bonusway-extension/tld/ru.json`)
                .subscribe(resp => {
                    const { status, data } = resp;
                    if (status === 200) {
                        resolve(data);
                    } else reject();
                });
        });
    }

    getOffersRequestUrlWithOffset(offset) {
        return `https://d289b99uqa0t82.cloudfront.net/sites/5/campaigns_limit_100_offset_${offset}_order_popularity.json`
    }

    getOffersRequest(offset) {
        return new Promise((resolve, reject) => {
            this.httpService
                .get(this.getOffersRequestUrlWithOffset(offset))
                .subscribe(resp => {
                    const { status } = resp;
                    if (status === 200) {
                        const offers = resp?.data?.items;
                        const formatedOffers = offers.map(offer => {

                            const conditions = offer?.description;
                            const cashback = offer?.commission?.max?.amount;

                            return {
                                id: offer?.id,
                                offer: {
                                    name: offer?.title,
                                    linkMatch: /emptyregexp/,
                                    logo: offer?.image?.url,
                                    rateSymbol: offer?.commission?.max?.unit,
                                },
                                serviceOfferInfo: { conditions, cashback },
                            };
                        });
                        resolve(formatedOffers);
                    } else reject();
                });
        });
    }

    async getOffers() {
        const requests = [];
        for (let offset = 0; offset < 1300; offset+= 100) {
            const request = this.getOffersRequest(offset)
            requests.push(request);
        }

        try {
            const offersArrays = await Promise.all(requests);
            const allOffers = offersArrays.reduce((acc, val) => acc.concat(val), []);
            const offersUrl = await this.getOffersUrl();
            // Ебучий копикот присылает урлы магазинов в отдельном запросе, не пидор ли?
            const offersWithUrls = allOffers.reduce((result, offerData) => {
                const findedOffer = offersUrl.find(offerWithUrl => +offerWithUrl.id === +offerData.id);
                const { tld: url } = findedOffer || {};
                if (findedOffer && url) {
                    // Удаляем id копикота
                    delete offerData.id;
                    offerData.offer.url = url;
                    result.push(offerData);
                }
                return result;
            }, []);
            return offersWithUrls;
        } catch (e) {
            throw new Error(e)
        }
        
    }


}
