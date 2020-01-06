import { Service } from './../entities/service.entity';
import { ServiceOffer } from '../entities/serviceOffer.entity';
import { Offer } from '../entities/offer.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OffersService {
    constructor(
        // TODO мб убрать
        // @InjectRepository(Service)
        // private readonly serviceRepository: Repository<Service>,
        @InjectRepository(Offer)
        private readonly offerRepository: Repository<Offer>,
        @InjectRepository(ServiceOffer)
        private readonly serviceOfferRepository: Repository<ServiceOffer>,
    ) {}

    /**
     *
     * @param link
     */
    async getOffer(query) {
        if (!query) return { msg: 'wrong params' };
        if ('id' in query) {
            const { id } = query;
            const offer = await this.offerRepository.findOne({ where: { id } });
            if (!offer) return { msg: 'offer doesnt exist' };
            const serviceOffers = await this.serviceOfferRepository.find({
                where: {
                    offer: { id },
                },
            });
            return { offer, serviceOffers };
        }
        // Скорее всего не понадобится, если только для летишопс
        if ('link' in query) {
            const { link } = query;
            try {
                new URL(link);
            } catch (e) {
                return { msg: 'link invalid' };
            }
            const offersList = await this.offerRepository.find();
            const offer = offersList.find(({ linkMatch }) =>
                linkMatch.test(link),
            );
            const { id } = offer || {};
            if (!id) return { msg: 'offer doesnt exist' };
            const serviceOffers = await this.serviceOfferRepository.find({
                where: {
                    offer: { id },
                },
            });
            return { offer, serviceOffers };
        }
    }

    async getOffers() {
        const offersList = await this.offerRepository.find();
        return offersList.map(offer => ({
            ...offer,
            linkMatch: offer.linkMatch.toString(),
        }));
    }
}
