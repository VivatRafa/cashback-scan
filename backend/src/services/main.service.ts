import { Offer } from './../entities/offer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/common';
import { common } from '../config';
import { BackitService } from './minions/backit.service';
import { Repository } from 'typeorm';

export class MainService {
    services: object;
    servicesList: string[];
    offersListIds;
    constructor(
            @InjectRepository(Offer)
            private readonly offerRepository: Repository<Offer>,
            httpService :HttpService
        ) {
        const { services, servicesList } = common;
        this.servicesList = servicesList;
        this.services = {
            [services.backit]: new BackitService(httpService),
            // [services.kopikot]: new KopikotService(),
            // [services.letyshops]: new LetyshopsService(),
        }

        // В качестве идентификатора выступает имя
        this.offersListIds = new Set();
        // let offer = new Offer();
        // offer.affiliateLink = 'asd';
        // offer.url = '123';
        // offer.name = 'name';
        // offer.logo = 'logo';
        // offer.linkMatch = /asd/;
        
        // const kek = this.offerRepository.save(offer)
        // kek.then(resp => console.log(resp)) 
        // this.getAllOffers();
    }

    async getAllOffers() {
        console.log('kek');
        
        Object.keys(this.services)
            .forEach(async service => {
                const serviceOffers = await this.services[service].getOffers();
                if (Array.isArray(serviceOffers)) {
                    serviceOffers.forEach(({ name }) => {
                        const lowerCaseName = name.toLoweCase();
                        if (!this.offersListIds.has(lowerCaseName)) {
                            this.offersListIds.add(lowerCaseName);
                            // Добавить в таблицу бд оффера целиком
                        } else {
    
                        }
                        
                        // Добавить в бд данные о категориях оффера
                    })
                }
            })
    }
}

/**
 * => Сервис бэкита получает список офферов, адаптирует их 
 *    под общую модель отдает главному сервису
 * => Главный сервис сохраняет массив во временную переменную, 
 *    вытаскивает все имена в нижнем регистре, дальше записывает
 *    уникальный имена в свойство класса, со всеми именами
 * => В случае, 
 *    - если имени нет, то добавляеи оффер в общую таблицу офферов,
 *    записываем общий кэшбэк и записываем кэшбэк по категориям
 *    - если имя есть, берем общий кэшбэк оффера и кэшбэк по категориям
 */


