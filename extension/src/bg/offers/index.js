import cloneDeep from 'lodash/cloneDeep';
import { GET_OFFER, GET_OFFERS } from '~/store/offers/events';
const domainExceptions = ['google', 'ru', 'com'];
/**
 * @class Offers
 * Полезная информация
 * Сущность offer - инфа о самом оффере
 */
class Offers {
    constructor(store) {
        this.store = store;
        this.cache = {
            offers: [],
            expire: 0,
            serviceOffers: {},
        };
    }

    async getOffers() {
        const result = await this.store.dispatch(`offers/${GET_OFFERS}`);
        if (result) this.cache.offers = this.store?.state?.offers?.offers;
        return result;
    }

    getTopOffers() {
        if (this.cache.offers.length) return this.cache.offers.slice(0, 10);
    }

    /**
     *
     * @param {Array} offers
     */
    convertRegexpsInOffers(offers) {
        if (!Array.isArray(offers)) return [];
        return offers.map(offer => {
            let linkMatch = '';
            try {
                const match = offer.linkMatch.match(/^\/(.*)\/(.*)$/);
                if (match) {
                    const [, pattern, flags] = match;
                    linkMatch = new RegExp(pattern, flags);
                } else {
                    throw new Error(`"${offer.linkMatch}" is not a regular expression`);
                }
            } catch (e) {
                linkMatch = new RegExp(offer.linkMatch.slice(1, -3).replace(/\\-/g, '-'), 'iu');
            }
            return {
                ...offer,
                linkMatch,
            };
        });
    }

    getDomain(link = '') {
        if (!link) return '';
        try {
            let domainName = null;
            const urlParts = new URL(link).host.split('.');
            if (urlParts.length > 2) [, domainName] = urlParts;
            else [domainName] = urlParts;
            if (domainExceptions.includes(domainName)) return null;
            return domainName;
        } catch (e) {
            throw new Error(e);
        }
    }

    getOffer(link, property = null) {
        if (!link) return null;
        try {
            // типо aliexpress
            const domain = this.getDomain(link);
            if (!domain) return null;
            const offer = this.cache.offers.find(({ url }) => {
                const offerDomain = this.getDomain(url);
                return offerDomain ? offerDomain === domain : false;
            });
            if (!offer) return null;
            return property ? offer[property] : cloneDeep(offer);
        } catch (error) {
            return null;
        }
    }

    checkUrlForOffer(url) {
        return !!this.getOffer(url);
    }

    /**
     *
     * @param {*} param0
     */
    async getServiceOffersAndOfferBy({ id, url }) {
        if (!id && !url) return null;

        if (!id) {
            id = this.getOffer(url, 'id');
            if (!id) return null;
        }

        const params = {
            data: { id },
        };

        if (this.cache.serviceOffers[id]) return this.cache.serviceOffers[id];

        const result = await this.store.dispatch(`offers/${GET_OFFER}`, params);
        if (result) {
            const { offer, serviceOffers } = this.store?.state?.offers?.serviceOfferAndOffer;

            if (!offer || !serviceOffers) return null;
            this.cache.serviceOffers[id] = cloneDeep({ offer, serviceOffers });
            return this.cache.serviceOffers[id];
        }
        return null;
    }

    /**
     *
     * @param {*} id
     */
    getServiceOffer(id) {
        if (!id) return null;
        const cache = this.cache.serviceOffers;
        let serviceOfferAndOffer = null;
        Object.keys(cache).forEach(key => {
            if (Array.isArray(cache[key].serviceOffers)) {
                const serviceOffer = cache[key].serviceOffers.find(({ id: serviceOfferId }) => serviceOfferId === id);

                if (serviceOffer) {
                    serviceOfferAndOffer = {
                        serviceOffer,
                        offer: cache[key].offer,
                    };
                }
            }
        });
        return serviceOfferAndOffer;
    }
}

export default Offers;
