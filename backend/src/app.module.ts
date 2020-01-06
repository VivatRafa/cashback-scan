import { CamelCaseNamingStrategy } from './utils/typeorm/CamelCaseNamingStrategy';
import { ServicesModule } from './services/services.module';
import { AppService } from './app.service';
import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from 'nest-schedule';
import { ScheduleServiceModule } from './scheduleService/scheduleService.module';
import { ServiceModule } from './service/service.module';
import { OffersModule } from './offers/offers.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'admin',
            database: 'cashback',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,
            // TODO namingStrategy: new CamelCaseNamingStrategy(), вот ты хуй найдешь, в каком месте эта хуйня задает имя полям, которую тянутся с базы, надо найти
        }),
        ScheduleModule.register({}),
        // ScheduleServiceModule,
        ServiceModule,
        ServicesModule,
        OffersModule,
        HttpModule,
    ],
    providers: [AppService],
})
export class AppModule {}
