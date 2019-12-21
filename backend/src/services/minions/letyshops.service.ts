import { Offer } from '../../entities/offer.entity';
import { Service } from "../interfaces/service.interface";

export class LetyshopsService {
    offersList: Offer[];
    offer: Offer;
    constructor() {
    }

    async getOffer(): Promise<Boolean>{
        return true
    }

   async getOffers(): Promise<Boolean> {
        return true
    }
}
