import { GET_OFFER, GET_OFFERS } from '~/store/offers/events';
import cloneDeep from 'lodash/cloneDeep';

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
        if (result) {
            this.cache.offers = this.convertRegexpsInOffers(this.store?.state?.offers?.offers);            
        }
        return result;
    }

    /**
     * 
     * @param {Array} offers 
     */
    convertRegexpsInOffers(offers) {
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
            }
        });
    }

    getOffer(link, property = null) {
        if (!link) return null;
        const offer = this.cache.offers.find(({ linkMatch }) => linkMatch.test(link));
        if (!offer) return null;
        return property ? offer[property] : cloneDeep(offer)
    }

    checkUrlForOffer() {
        return !!this.getOffer(link);
    }

    async getServiceOffer(link) {
        const id = this.getOffer(link, 'id');
        if (!id) return null;

        const params = {
            data: { id }
        };

        if (this.cache.serviceOffers[id]) return this.cache.serviceOffers[id];

        const result = await this.store.dispatch(`offers/${GET_OFFER}`, params);
        if (result) {
            const { offer, serviceOffers } = this.store?.state?.offers?.serviceOffer;
            
            if (!offer || !serviceOffers) return null;

            const serviceOffersWithParsedRates = serviceOffers.map(serviceOffer => {
                try {
                    const rates = JSON.parse(serviceOffer.rates);
                    return {
                        ...serviceOffer,
                        rates,
                    }
                } catch (e) {
                    throw new Error(e);
                }
            });
            
            this.cache.serviceOffers[id] = {
                offer,
                serviceOffers: serviceOffersWithParsedRates,
            }
            return cloneDeep(this.cache.serviceOffers[id]);
        }
        return null;
    }
}

export default Offers;
