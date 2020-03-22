import { KopikotService } from './minions/kopikot.service';
import { LetyshopsService } from './minions/letyshops.service';
import { Cash4brandsService } from './minions/cash4brands.service';
import { ServiceOffer } from './../entities/serviceOffer.entity';
import { Service } from './../entities/service.entity';
import { Offer } from './../entities/offer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/common';
import { BackitService } from './minions/backit.service';
import { Repository, createQueryBuilder, getRepository } from 'typeorm';

export class MainService {
    services: object;
    servicesList: any[];
    offersListIds: Set<unknown>;
    serviceOffersListIds: Set<unknown>;
    constructor(
        @InjectRepository(Offer)
        private readonly offerRepository: Repository<Offer>,
        @InjectRepository(ServiceOffer)
        private readonly serviceOfferRepository: Repository<ServiceOffer>,
        private readonly httpService: HttpService,
    ) {
        this.servicesList = [];
        this.offersListIds = new Set();
        this.serviceOffersListIds = new Set();
        this.services = {};
        this.initServices();
    }

    async initServices() {
        // Тянем список сервисов и устанавливаем апи урл в объект сервисов
        await this.initServicesListAndApiUrl();
        // Установим объект с id(именами) офферов и сервис офферов
        await this.initOffersListsIds();
        // Тянем список офферов
        this.getAllOffers();
    }

    async initServicesListAndApiUrl() {
        // Достаем список сервисов
        this.servicesList = await createQueryBuilder('Service')
            .addSelect('Service.apiUrl')
            .getMany();
        // TODO сделать модель для этой херни
        const apiUrls = {
            backit: null,
            letyshops: null,
            kopikot: null,
            cash4brands: null,
        };
        this.servicesList.forEach(
            ({ name, apiUrl }) => (apiUrls[name.toLowerCase()] = apiUrl),
        );
        this.services = {
            // backit: new BackitService(apiUrls.backit, this.httpService),
            // kopikot: new KopikotService(apiUrls.kopikot, this.httpService),
            // letyshops: new LetyshopsService(apiUrls.letyshops, this.httpService),
            cash4brands: new Cash4brandsService(apiUrls.cash4brands, this.httpService),
        };
        
    }

    async initOffersListsIds() {
        // Список офферов
        const offersList = await this.offerRepository.find();
        offersList.forEach(offer => {
            const id = offer.name.toLowerCase();
            if (!this.offersListIds.has(id)) this.offersListIds.add(id);
        });

        // Список сервис офферов
        const serviceOffersList = await createQueryBuilder('ServiceOffer')
            .leftJoinAndSelect('ServiceOffer.offer', 'offer')
            .leftJoinAndSelect('ServiceOffer.service', 'service')
            .execute();
        serviceOffersList.forEach((serviceOffer: { offer_id: any; service_id: any; }) => {
            const id = `${serviceOffer.offer_id}${serviceOffer.service_id}`;
            if (!this.serviceOffersListIds.has(id))
                this.serviceOffersListIds.add(id);
        });
    }

    async getAllOffers() {
        this.servicesList.forEach(async service => {
            console.log(`Сервис: ${service.name}`);
            // Получаем список офферов от каждого сервиса
            const serviceName = service.name.toLowerCase();
            const offersList = await this.services?.[serviceName]?.getOffers();
            console.log(`Получили ответ от апи сервиса ${service.name}`);
            // Должен вернуться список форматированных данных
            if (Array.isArray(offersList)) {
                console.log(`Ответ ${service.name} успешный и отформатирован`);
                this.serviceOfferAction(service, offersList);
            }
        });
    }

    /**
     * 
     * @param service Кэщбэк сервис
     * @param offersList Форматированный массив офферов сервиса
     */
    serviceOfferAction(service: Service, offersList: any[]) {
        let offerWithId = null;
        // Следим за уникальностью офферов через id(имя в нижнем регистре)
        offersList.forEach(async ({ offer, serviceOfferInfo }) => {
            const offerId = offer.name.toLowerCase();
            if (this.offersListIds.has(offerId)) {
                try {
                    // Находим существующий оффер
                    const [findedOffer] = await this.offerRepository.find({
                        name: offer.name,
                    });
                    // Обновляем его
                   await this.offerRepository.update(findedOffer.id, offer);
                    // Достаем существующий оффер с обновленными данными
                    [offerWithId] = await this.offerRepository.find({
                        id: findedOffer.id,
                    });
                } catch (e) {
                    console.error(`Ошибка при обновлении ${offer.name || 'оффера'}`);
                    throw new Error(e)
                }
            } else {
                try {
                    this.offersListIds.add(offerId);
                    // Добавим инфу о самом оффере таблица Offer
                    offerWithId = await this.offerRepository.save(offer);
                } catch (e) {
                    console.error(`Ошибка при добавлении ${offer.name || 'оффера'}`);
                    throw new Error(e)
                }
            }
            const serviceOfferId = `${offerWithId.id}${service.id}`;
            const serviceOffer = this.buildServiceOfferModel(service, offerWithId, serviceOfferInfo);
            if (this.serviceOffersListIds.has(serviceOfferId)) {
                try {
                    await this.serviceOfferRepository.update(
                        {
                            offerId: offerWithId.id,
                            serviceId: service.id,
                        },
                        serviceOffer
                    );
                } catch (e) {
                    console.error(`Ошибка при обновлении сервис оффера. оффер:${offer.name} сервис:${service.name}`);
                    throw new Error(e)
                }
            } else {
                try {
                    this.serviceOffersListIds.add(serviceOfferId);
                    await this.serviceOfferRepository.save(serviceOffer);
                } catch (e) {
                    console.error(`Ошибка при добавлении сервис оффера. оффер:${offer.name} сервис:${service.name}`);
                    throw new Error(e)
                }
            }
        });
    }

    // TODO добавить модельку для serviceOfferInfo
    buildServiceOfferModel(
        service: Service,
        offer: Offer,
        serviceOfferInfo: { rates: any; cashback: any, conditions: any },
    ): ServiceOffer {
        const { rates, conditions, cashback } = serviceOfferInfo;
        let serviceOffer = new ServiceOffer();
        return { ...serviceOffer, offer, service, rates, cashback, conditions };
    }
}
