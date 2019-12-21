import { Offer } from './../../entities/offer.entity';
import { HttpService, Injectable } from '@nestjs/common';
import { domain } from "../../config";

@Injectable()
export class BackitService {
    apiUrl: string;
    offersParams: object;
    constructor(private readonly httpService:HttpService) {
        this.apiUrl = domain.urls.api.backit;
        this.offersParams = {
            lang: 'ru',
            viewRules: 'role_cashback',
            fields: 'id,name,cashbackMaxRate,link_match',
            area: 'all',
            limit: 1000,
        }
        this.getOffers();
    }

    async getOffer() {
        return false;
    }

    async getOffers(): Promise<Object> {
        const config = {
            params: this.offersParams
        }
        return this.httpService.get(`${this.apiUrl}/offers/list`, config)
            .subscribe(resp => {
                console.log(resp);
                
                const { status } = resp;
                if (status === 200) {
                    const offers = resp?.data?.data;
                    // return offers.map(offer => ({
                    //     name: offer.attributs.name,
                    //     url: offer.attributs.url,
                    //     linkMatch: offer.attributs.linkMatch,
                    //     logo: offer.attributes.logo,
                    // }))
                }
            });
    }
}


// let offer = new Offer();
// offer.affiliateLink = 'asd';
// offer.url = '123';
// offer.name = 'name';
// offer.logo = 'logo';
// offer.linkMatch = /asd/;