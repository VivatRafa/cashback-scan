import { prepareUrl } from './../../helpers/index';
import { HttpService, Injectable } from '@nestjs/common';

@Injectable()
export class SecretDiscounterService {
    headers: object;
    constructor(
        private readonly apiUrl: string,
        private readonly httpService: HttpService,
    ) {
        this.headers = {
            'accept-encoding': 'gzip, deflate, br'
        }
    }

    async getOffer(): Promise<Boolean> {
        return true;
    }

    getRateSymbol(cashbackString: string = '', currency: string = ''): string {
        let [rateSymbol] = cashbackString.match(/%/g) || [];
        if (!rateSymbol) rateSymbol = currency.toLowerCase() === 'rub' ? 'р' : '%';
        return rateSymbol;
    }

    async getOffers(): Promise<Object[]> {
        return new Promise((resolve, reject) => {
            this.httpService
                .get(`${this.apiUrl}/stores/data`, { headers: this.headers })
                .subscribe(resp => {
                    const { status, data: { stores: offers = [] }  } = resp;
                    if (status === 200) {
                        const formatedOffers = offers.map(offer => {
                            const { name, logo, url: notPreparedUrl, conditions, currency, displayed_cashback } = offer;
                            const [cashback] = displayed_cashback?.match(/\d+/g) || [];
                            const url = prepareUrl(notPreparedUrl);
                            // его может не быть или быть '0'
                            if (cashback && +cashback && url) {
                                const rateSymbol = this.getRateSymbol(displayed_cashback, currency);
                                return {
                                    offer: {
                                        name,
                                        url,
                                        logo: `https://secretdiscounter.com/images/logos/${logo}`,
                                        rateSymbol,
                                    },
                                    serviceOfferInfo: { cashback, conditions },
                                };
                            };
                        }).filter(a => a); // убирем undefined'ы из массива
                        resolve(formatedOffers);
                    } else reject();
                });
        });
    }
}
