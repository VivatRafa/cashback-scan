import { Service } from './../entities/service.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Cron, NestSchedule } from 'nest-schedule';
import { MainService } from '../services/main.service';
import { Repository } from 'typeorm';

@Injectable()
export class ScheduleService extends NestSchedule {
    constructor(private readonly mainService: MainService) {
        super();
    }

    @Cron('0 * * * *', { startTime: new Date(), key: 'schedule-cron' })
    async cronJob() {
        this.mainService.getAllOffers();
    }
}
