import { Controller, Get, Query } from '@nestjs/common';
import { OffersService } from './offers.service';

@Controller()
export class OffersController {
    constructor(private readonly offersService: OffersService) {}

    @Get('offer')
    async getOffer(@Query() query) {
        return this.offersService.getOffer(query);
    }

    @Get('offers')
    async getOffers() {
        return this.offersService.getOffers();
    }

    @Get('top-offers')
    async getTopOffers() {
        return this.offersService.getTopOffers();
    }
}
