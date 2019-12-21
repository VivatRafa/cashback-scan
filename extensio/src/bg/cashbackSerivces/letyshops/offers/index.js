import { GET_OFFERS, GET_OFFERS_SUCCESS, GET_OFFER, GET_OFFER_SUCCESS } from '~/store/letyshops/events';
import { getDomain } from '~/helpers';

class Offers {
    constructor(store) {
        this.store = store;
        this.cacheTime = 1200000; // 20 min
        this.refreshTimer = null;
        this.offerParams = {
            data: {
                locale: 'ru_RU',
            },
        };
        this.offersCache = {
            expire: 0,
            offers: [],
            offer: {},
        };
    }

    [GET_OFFERS_SUCCESS]() {
        this.offersCache.expire = Date.now() + this.cacheTime;
        this.offersCache.offers = this.store.state.letyshops.offers;
    }

    /**
     * @returns {Promise|Boolean}
     */
    async getOffers() {
        if (this.offersCache.expire <= Date.now()) {
            const resp = await this.store.dispatch(`letyshops/${GET_OFFERS}`, this.offerParams);
            if (resp === GET_OFFERS_SUCCESS) return this[GET_OFFERS_SUCCESS]();
        }

        return false;
    }

    async getOffer(link) {
        const domain = getDomain(link);
        // de - domains enabled (допустимые домены)
        const { id } = this.offersCache.offers.find(({ de }) => de.includes(domain)) || {};
        if (!id) return null;
        const offerModel = {};
        // Если нет в кэше, то тянем из апи
        if (!this.offersCache.offer[id]) {
            const getOfferParams = {
                id,
                ...this.offerParams,
            };
            const resp = await this.store.dispatch(`letyshops/${GET_OFFER}`, getOfferParams);
            if (resp === GET_OFFER_SUCCESS) {
                this.offersCache.offer[id] = this.store.state.letyshops.offer;
            }
        }
        // b - поле кэшбэка, Если все ок, оффер в любом случае должен быть в кэше this.offersCache.offer[id]
        if (this.offersCache.offer[id]) offerModel.cashback = this.offersCache.offer[id].b;

        return offerModel;
    }
}

export default Offers;

/**
 * rate: e.a,
 * rate_formated: e.b,
 * is_floating: e.c,
 * suffix: e.d,
 * type: e.e,
 * conditionsFormated: e.f,
 * cashback: e.b,
 * rateUserCashback: e.ac ? e.ac : e.a,
 * userCashback: e.bc ? e.bc : e.b,
 */
