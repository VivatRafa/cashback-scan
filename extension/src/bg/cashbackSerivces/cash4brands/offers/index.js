import { GET_OFFERS, GET_OFFERS_SUCCESS } from '~/store/letyshops/events';

class Offers {
    constructor(store) {
        this.store = store;
        this.cacheTime = 1200000; // 20 min
        this.refreshTimer = null;
        this.offerParams = {
            data: {
                start: 0,
                count: 1000,
            }
        };
        this.offersCache = {
            expire: 0,
            offers: [],
            offersRegExp: [],
        };
    }

    [GET_OFFERS_SUCCESS]() {
        this.offersCache.expire = Date.now() + this.cacheTime;
        this.offersCache.offers = this.store.state.backit.offers;

        this.offersCache.offersRegExp = this.extractRegExpFromOffers(this.offersCache.offers);
    }

    /**
     * @returns {Promise|Boolean}
     */
    async getOffers() {
        if (this.offersCache.expire <= Date.now()) {
            const resp = await this.store.dispatch(`cash4brands/${GET_OFFERS}`, this.offerParams);
            if (resp === GET_OFFERS_SUCCESS) return this[GET_OFFERS_SUCCESS]();
        }

        return false;
    }

    getOffer() {

    }
}

export default Offers;
