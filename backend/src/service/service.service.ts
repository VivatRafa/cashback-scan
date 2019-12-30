import { Offer } from './../entities/offer.entity';
import { ServiceOffer } from './../entities/serviceOffer.entity';
import { Service } from '../entities/service.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, createQueryBuilder } from 'typeorm';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
    // private readonly offerRepository: Repository<Offer>,
    // private readonly serviceOfferRepository: Repository<ServiceOffer>
  ) {}

  async getServices(link) {
    const offersList = await createQueryBuilder("ServiceOffer");

  }
}
