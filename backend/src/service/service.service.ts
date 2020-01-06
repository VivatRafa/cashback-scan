import { ServiceOffer } from './../entities/serviceOffer.entity';
import { Offer } from './../entities/offer.entity';
import { Service } from '../entities/service.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ServiceService {
    constructor(
        @InjectRepository(Service)
        private readonly serviceRepository: Repository<Service>,
    ) {}

    async getServices() {
        const services = await this.serviceRepository.find();
        return services;
    }
}
