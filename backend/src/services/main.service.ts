import { ServiceOffer } from './../entities/serviceOffer.entity';
import { Service } from './../entities/service.entity';
import { Offer } from './../entities/offer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/common';
import { BackitService } from './minions/backit.service';
import { Repository, createQueryBuilder } from 'typeorm';

export class MainService {
    services: object;
    servicesList: any[];
    offersListIds;
    serviceOffersListIds;
    constructor(
            @InjectRepository(Offer)
            private readonly offerRepository: Repository<Offer>,
            @InjectRepository(Service)
            private readonly serviceRepository: Repository<Service>,
            @InjectRepository(ServiceOffer)
            private readonly serviceOfferRepository: Repository<ServiceOffer>,
            private readonly httpService :HttpService
        ) {
        this.servicesList = [];
        this.offersListIds = new Set();
        this.serviceOffersListIds = new Set();
        this.services = {};
        this.initServices();
    }

    async initServices() {
        // Достаем список сервисов
        this.servicesList = await this.serviceRepository.find();
        const apiUrls = {
            backit: null,
        };
        this.servicesList.forEach(({ name, apiUrl }) => apiUrls[name.toLowerCase()] = apiUrl)
        this.services = {
            backit: new BackitService(apiUrls.backit, this.httpService),
            // [services.kopikot]: new KopikotService(),
            // [services.letyshops]: new LetyshopsService(),
        }
        await this.setOffersListsIds();
        // this.getAllOffers();        
    }

    async setOffersListsIds() {
        // Список офферов
        const offersList = await this.offerRepository.find();
        offersList.forEach (offer => {
            const id = offer.name.toLowerCase();
            if (!this.offersListIds.has(id)) this.offersListIds.add(id);
        });
        // Список сервис офферов
        const serviceOffersList = await createQueryBuilder("ServiceOffer")
            .leftJoinAndSelect("ServiceOffer.offer", "offer")
            .leftJoinAndSelect("ServiceOffer.service", "service")
            .execute();
        const kek = await createQueryBuilder("ServiceOffer")
            .where("ServiceOffer.offerId = :id", { id: 1 })
            .execute();
        console.log(kek);
            
        serviceOffersList.forEach (serviceOffer => {
            const id = `${serviceOffer.offer_id}${serviceOffer.service_id}`;
            if (!this.serviceOffersListIds.has(id)) this.serviceOffersListIds.add(id);
        });
    }

    async getAllOffers() {
        this.servicesList.forEach(async service => {
                // Получаем список офферов от каждого сервиса
                const serviceName = service.name.toLowerCase();
                const offersList = await this.services[serviceName].getOffers();
                // TODO Сделать отдельный метод 
                // Должен вернуться список форматированных данных
                if (Array.isArray(offersList)) {
                    let offerWithId = null;
                    // Следим за уникальностью офферов через имя в нижнем регистре
                    offersList.forEach(async ({ offer, serviceOfferInfo }) => {
                        const offerId = offer.name.toLowerCase();
                        if (!this.offersListIds.has(offerId)) {
                            this.offersListIds.add(offerId);
                            // Добавим инфу о самом оффере таблица Offer
                            offerWithId = await this.offerRepository.save(offer);
                        } else {
                            const [findedOffer] = await this.offerRepository.find({
                                name: offer.name
                            });
                            offerWithId = findedOffer;
                        }
                        const serviceOfferId = `${offerWithId.id}${service.id}`;
                        if (!this.serviceOffersListIds.has(serviceOfferId)) {
                            this.serviceOffersListIds.add(serviceOfferId);
                            this.addServiceOffer(service, offerWithId, serviceOfferInfo)
                        }
                    })
                }
            })
    }

    async addServiceOffer(service: Service, offer: Offer, serviceOfferInfo: { rates, cashback }) {
        const { rates, cashback } = serviceOfferInfo;
        const serviceOffer = new ServiceOffer();
        serviceOffer.offer = offer;
        serviceOffer.service = service;
        serviceOffer.rates = rates;
        serviceOffer.cashback = cashback;

        const res = await this.serviceOfferRepository.save(serviceOffer);
        console.log(res);
        
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


