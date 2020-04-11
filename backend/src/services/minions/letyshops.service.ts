import { HttpService } from '@nestjs/common';
import { prepareUrl } from '../../helpers';

export class LetyshopsService {
    offersParams: object;
    constructor(
        private readonly apiUrl: string,
        private readonly httpService: HttpService,
    ) {
        this.offersParams = {
            locale: 'ru_RU',
        }
    }

    async getOffer(): Promise<Boolean> {
        return true;
    }

    async getOffers(): Promise<Object[]> {
        const config = {
            params: this.offersParams,
        }

        return new Promise((resolve, reject) => {
            this.httpService
                .get(`${this.apiUrl}/eapi/shops`, config)
                .subscribe(resp => {
                    const { status, data } = resp;
                    if (status === 200) {
                        const offers = data;
                        
                        // Какие ублюдки называют поля одной буквой? правильно letyshops                        
                        const formatedOffers = offers.map(offer => {
                            const { a: name, c, d: logo, p: { a: cashback, d: rateSymbol, f: ratesInfo } } = offer;
                            const rates = JSON.stringify(ratesInfo?.map(({ description, rate }) => ({ name: description, value: rate })));
                            const url = prepareUrl(c);
                            return {
                                offer: {
                                    name,
                                    url,
                                    logo,
                                    rateSymbol,
                                },
                                serviceOfferInfo: { rates, cashback },
                            };
                        });
                        resolve(formatedOffers);
                    } else reject();

                })
        })
    }
}

/**
["id"
"title" e.a
"image" e.b
"code" e.h
"isTop" e.c
"shopId" e.d
"injDesc" e.g
"shortDesc" e.f
"activateOfferUrl" e.e
*/