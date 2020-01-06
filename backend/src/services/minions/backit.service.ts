import { HttpService, Injectable } from '@nestjs/common';

@Injectable()
export class BackitService {
    offersParams: object;
    constructor(
        private readonly apiUrl: string,
        private readonly httpService: HttpService,
    ) {
        this.offersParams = {
            lang: 'ru',
            viewRules: 'role_cashback',
            typeId: 1,
            fields:
                'id,name,cashbackMaxRate,cashbackRateSymbol,rates,link_match,link_default,image',
            area: 'all',
            limit: 1000,
        };
    }

    async getOffers(): Promise<Object[]> {
        const config = {
            params: this.offersParams,
        };

        return new Promise((resolve, reject) => {
            this.httpService
                .get(`${this.apiUrl}/offers/list`, config)
                .subscribe(resp => {
                    const { status } = resp;
                    if (status === 200) {
                        const offers = resp?.data?.data;

                        const formatedOffers = offers.map(offer => {
                            let rates = null;
                            const cashback = offer?.attributes?.cashbackMaxRate;
                            // Этот блок сделан, потому что я рот ебал тех, кто придумал запихивать массив в строку
                            try {
                                const tempRates = JSON.parse(
                                    offer?.attributes?.rates,
                                );
                                const ratesArray = tempRates.map(
                                    ({ newRate, description }) => ({
                                        name: description,
                                        value: newRate,
                                    }),
                                );
                                rates = JSON.stringify(ratesArray);
                            } catch (e) {
                                const name = offer?.attributes?.name || 'offer';
                                throw new Error(
                                    `Unexpected token in ${name} rates`,
                                );
                            }
                            return {
                                offer: {
                                    name: offer?.attributes?.name,
                                    url: offer?.attributes?.link_default,
                                    linkMatch: offer?.attributes?.link_match,
                                    logo: offer?.attributes?.image,
                                    rateSymbol:
                                        offer?.attributes?.cashbackRateSymbol,
                                },
                                serviceOfferInfo: { rates, cashback },
                            };
                        });
                        resolve(formatedOffers);
                    } else reject();
                });
        });
    }
}
