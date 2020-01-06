import { ServiceOffer } from './../entities/serviceOffer.entity';
import { Offer } from './../entities/offer.entity';
import { Service } from './../entities/service.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, HttpModule } from '@nestjs/common';
import { MainService } from './main.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Offer, Service, ServiceOffer]),
        HttpModule,
    ],
    controllers: [],
    providers: [MainService],
    exports: [MainService],
})
export class ServicesModule {}
