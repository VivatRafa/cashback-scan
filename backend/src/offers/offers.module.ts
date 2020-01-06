import { Offer } from '../entities/offer.entity';
import { ServiceOffer } from '../entities/serviceOffer.entity';
import { Module } from '@nestjs/common';
import { OffersController } from './offers.controller';
import { OffersService } from './offers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from '../entities/service.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Service, Offer, ServiceOffer])],
    controllers: [OffersController],
    providers: [OffersService],
})
export class OffersModule {}
