import { ServicesModule } from './services/services.module';
import { AppService } from './app.service';
import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from 'nest-schedule';
import { ScheduleServiceModule } from './scheduleService/scheduleService.module';
import { ServiceModule } from './service/service.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'admin',
      database: 'cashback',
      entities: [
        __dirname + '/**/*.entity{.ts,.js}',
      ],
      synchronize: true,
    }),
    ScheduleModule.register({}),
    // ScheduleServiceModule,
    ServiceModule,
    ServicesModule,
    HttpModule,
  ],
  providers: [
    AppService,
  ]
})
export class AppModule {}
