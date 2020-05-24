import { Service } from './../entities/service.entity';
import { ServiceOffer } from '../entities/serviceOffer.entity';
import { Offer } from '../entities/offer.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';

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
            const offer = { id: 1 };
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

    async getTopOffers() {        
        const offersList = await this.offerRepository.find({
            order: { priority: 'ASC' },
            take: 10 
        });
        return offersList;
    }

    async getOffers() {
        const offersList = await this.offerRepository.find();
        return offersList;
    }
}
