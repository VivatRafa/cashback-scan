import BackitOffers from '../cashbackSerivces/backit/offers';
import LetyshopsOffers from '../cashbackSerivces/letyshops/offers';
import KopikotOffers from '../cashbackSerivces/kopikot/offers';
import Cash4brandsOffers from '../cashbackSerivces/cash4brands/offers';

import { common } from '~/config';

const { servicesList } = common;

class Offers {
    constructor(store) {
        this.store = store;
        this.offers = {
            backit: new BackitOffers(this.store),
            letyshops: new LetyshopsOffers(this.store),
            kopikot: new KopikotOffers(this.store),
            cash4brands: new Cash4brandsOffers(this.store),
        };
    }

    /**
     * Вызовет методы получения офферов всех
     * сервисов
     */
    getOffers() {
        servicesList.forEach(service => {
            this.offers[service].getOffers();
        });
    }

    /**
     * Достает инфу об оффере из каждого сервиса
     * вернет объект с ключами названия сервисов
     * @param {String} url
     */
    async getOfferByAllService(url) {
        const offer = {};
        servicesList.forEach(async service => {
            offer[service] = await this.offers[service].getOffer(url);
        });

        return offer;
    }

    /**
     * Достанет оффера из конкретного сервиса
     * @param {String} service
     * @param {String} url
     */
    getOfferByService(service, url) {
        if (!url || !servicesList.includes(service)) return null;
        return this.offers[service].getOffer(url);
    }
}

export default Offers;
