import { ServicesModule } from './../services/services.module';
import { Service } from './../entities/service.entity';
import { Module } from '@nestjs/common';
import { ScheduleService } from './scheduleService.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Service]),
    ServicesModule,
  ],
  providers: [ScheduleService],
})
export class ScheduleServiceModule {}