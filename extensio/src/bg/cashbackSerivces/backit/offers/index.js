import cloneDeep from 'lodash/cloneDeep';
import { getLanguage } from '~/helpers';
import { GET_OFFERS, GET_OFFERS_SUCCESS } from '~/store/backit/events';

class Offers {
    constructor(store) {
        this.store = store;
        this.refreshTime = 7200000; // 2 h
        this.cacheTime = 1200000; // 20 min
        this.refreshTimer = null;
        this.offerParams = {
            data: {
                lang: getLanguage(),
                viewRules: 'role_cashback',
                fields: 'id,name,cashbackMaxRate,link_match',
                area: 'all',
                limit: 230,
            },
        };
        this.offersCache = {
            expire: 0,
            offers: [],
            offersRegExp: [],
        };
    }

    startBackgroundOffersUpdate() {
        this.refreshTimer = setInterval(() => {
            this.getOffers();
        }, this.refreshTime);
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
            const resp = await this.store.dispatch(`backit/${GET_OFFERS}`, this.offerParams);
            if (resp === GET_OFFERS_SUCCESS) return this[GET_OFFERS_SUCCESS]();
        }

        return false;
    }

    /**
     * Извлекает из всех офферов регулярки в отдельный массив.
     * *Если регулярка была для домена с дефисом и имела конструкию
     * *с обратным слэшем и дефисом '\-', то конструктор RegExp
     * *плевался ошибками, поэтому в случае ошибки, убираем эту
     * *конструкцию и благополучно получаем массив регулярок
     * @param {Array} offers
     * @returns {Array}
     */
    // eslint-disable-next-line class-methods-use-this
    extractRegExpFromOffers(offers) {
        if (!Array.isArray(offers) || !offers.length) return [];
        return offers.map(offer => {
            const regExp = offer?.attributes?.link_match || ''; // eslint-disable-line camelcase
            try {
                return new RegExp(regExp.slice(1, -3), 'iu');
            } catch (e) {
                return new RegExp(regExp.slice(1, -3).replace(/\\-/g, '-'), 'iu');
            }
        });
    }

    /**
     * Прогоняет ссылку по регуляркам офферов если есть
     * совпадение, находит индекс совпавшей регулярки и
     * по этому индексу достает нужный оффер, если такого
     * нет, то возвращает null
     * @param {String} link
     * @returns {Object}
     */
    async getOffer(link) {
        if (!link) return null;
        const offerRegExp = this.offersCache.offersRegExp.find(regexp => regexp.test(link));
        const offerRegExpIndex = this.offersCache.offersRegExp.indexOf(offerRegExp);
        const offer = this.offersCache.offers[offerRegExpIndex];

        let offerModel = null;

        if (offer) {
            offerModel = {
                cashback: offer?.attributes?.cashbackMaxRate,
            };
        }

        return offerModel ? cloneDeep(offerModel) : null;
    }
}

export default Offers;
