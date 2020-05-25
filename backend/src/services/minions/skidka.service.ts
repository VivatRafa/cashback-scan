import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from './../../entities/offer.entity';
import { prepareUrl } from '../../helpers/index';
import { parse } from 'node-html-parser';
import { HttpService, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class SkidkaService {
    constructor(
        private readonly httpService: HttpService,
        private readonly apiUrl: string,
        @InjectRepository(Offer)
        private readonly offerRepository: Repository<Offer>,
    ) {}

    async getOfferInfo(url) : Promise<{ [key: string]: any }> {
        return new Promise((resolve, reject) => {
            this.httpService.get(url)
                .subscribe(resp => {
                    const { data: page, status } = resp;
                    if (status === 200) {
                        const parsedPage = parse(page);

                        // @ts-ignore
                        const ratesHtml = Array.from(parsedPage.querySelectorAll('.shop-detail__comission'));
                        const ratesArray = ratesHtml.map(rateHtml => {
                            // @ts-ignore
                            const value = rateHtml.querySelector('.c-price__value .notranslate').innerHTML;
                            // @ts-ignore
                            const name = rateHtml.querySelector('.shop-detail__comission-name').innerHTML.replace(/(\n|\t)/g,"");

                            return { name, value };
                        });

                        const rates = JSON.stringify(ratesArray);

                        // @ts-ignore
                        const title = parsedPage.querySelector('.shop-detail__title').innerHTML;
                        const [,name] = title.split('Кэшбэк ');

                        resolve({ name, rates });
                    } else reject();
                    
                })
        })
    }

    async getPageWithOffers(page): Promise<Object[]> {
        return new Promise((resolve, reject) => {
            this.httpService
                .get(`https://skidka.ru/shops/?country=1&sort=0&ajax=1&page=${page}`)
                .subscribe(async resp => {
                    const { status, data } = resp;
                    if (status === 200) {
                        const parsedPage = parse(data.body);
                        
                        // @ts-ignore
                        const offersHtml = Array.from(parsedPage.querySelectorAll('.c-card-list__wrap'));
                        const offers = await Promise.all(offersHtml.map(async offerHtml => {
                            // @ts-ignore
                            const offerPageLinkHtml = offerHtml.querySelector('.c-card-list__url').rawAttrs;
                            const [,offerPagePath] = offerPageLinkHtml.match(/href=\"([^"]*)\"/);
                            const url = `${this.apiUrl}${encodeURI(offerPagePath)}`;

                            const { name, rates } = await this.getOfferInfo(url);

                            // @ts-ignore
                            const cashback = offerHtml.querySelector('.c-price__value .notranslate')?.innerHTML;

                            // @ts-ignore
                            const currency = offerHtml.querySelector('.c-price__currency')?.innerHTML;
                            const rateSymbol = currency.includes('руб') ? 'р' : '%';

                            // @ts-ignore
                            const logoHtmlAttrs = offerHtml.querySelector('.c-card-list__logo img').rawAttrs;
                            const [,logoPath] = logoHtmlAttrs.match(/src=\"([^"]*)\"/);
                            const logo = `${this.apiUrl}${logoPath}`;
    
                            return {
                                offer: {
                                    name,
                                    logo,
                                    rateSymbol
                                },
                                serviceOfferInfo: {
                                    rates,
                                    cashback,
                                }
                            }
                        }));
                        
                        resolve(offers)
                    } else reject();
                });
        });
    }

    async getOffers(): Promise<Object[]> {
        const pageOffers = [];

        for (let page = 1; page < 12; page++) {
            pageOffers.push(this.getPageWithOffers(page));
        }

        const offersPages = await Promise.all(pageOffers);
        const flatOffers = offersPages.reduce((acc, cur) => [...acc, ...cur]);

        const offersList = await this.offerRepository.find();
        const offersNameUrl = offersList.map(({ name, url }) => ({ name, url }));
        const offers = flatOffers.reduce((acc, { offer, serviceOfferInfo }) => {
            const { url } = offersNameUrl.find(({ name }) =>
                name.toLocaleLowerCase() === offer.name.toLowerCase()) || {};
            if (url) {
                acc.push({
                    offer: { 
                        ...offer, 
                        url 
                    }, 
                    serviceOfferInfo 
                });
            };
            return acc;
        }, []);
        return offers;
    }
}
