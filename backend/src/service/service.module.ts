import { Offer } from './../entities/offer.entity';
import { ServiceOffer } from './../entities/serviceOffer.entity';
import { Module } from '@nestjs/common';
import { ServiceController } from './service.controller';
import { ServiceService } from './service.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from '../entities/service.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Service, Offer, ServiceOffer])],
    controllers: [ServiceController],
    providers: [ServiceService],
})
export class ServiceModule {}
