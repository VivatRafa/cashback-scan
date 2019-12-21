import { GET_OFFERS, GET_OFFERS_SUCCESS, GET_OFFERS_DOMAINS, GET_OFFERS_DOMAINS_SUCCESS } from '~/store/kopikot/events';
import { getDomain } from '~/helpers';

class Offers {
    constructor(store) {
        this.store = store;
        this.cacheTime = 1200000; // 20 min
        this.refreshTimer = null;
        this.offersCache = {
            expire: 0,
            offers: [],
            offersDomains: [],
        };
    }

    [GET_OFFERS_SUCCESS]() {
        this.offersCache.expire = Date.now() + this.cacheTime;
        this.offersCache.offers = this.store.state.kopikot.offers;
        this.offersCache.offersDomains = this.store.state.kopikot.offersDomains;
    }

    /**
     * @returns {Promise|Boolean}
     */
    async getOffers() {
        if (this.offersCache.expire <= Date.now()) {
            const offersResp = await this.store.dispatch(`kopikot/${GET_OFFERS}`, {});
            const offersDomainsResp = await this.store.dispatch(`kopikot/${GET_OFFERS_DOMAINS}`, {});
            if (offersResp === GET_OFFERS_SUCCESS && offersDomainsResp === GET_OFFERS_DOMAINS_SUCCESS) return this[GET_OFFERS_SUCCESS]();
        }

        return false;
    }

    // eslint-disable-next-line class-methods-use-this
    getOffer(link) {
        // Включаю ебаные читы (надо было достать домен без субдомена)
        const url = new URL(link);
        const domains = url.hostname.split('.');
        const domain = `${domains[domains.length - 2]}.${domains[domains.length - 1]}`;

        const { id: foundedOfferId } = this.offersCache.offersDomains.find(({ tld }) => tld === domain) || {};
        if (!foundedOfferId) return null;

        const offerModel = {};
        const offer = this.offersCache.offers.find(({ id }) => id === foundedOfferId) || {};
        let cashback = 0;
        offer.commissions.forEach(({ CPS_proc_out: currentRate }) => {
            const preparedRate = parseFloat(currentRate.replace(',', '.'));
            if (preparedRate > cashback) cashback = preparedRate;
        });

        if (cashback) offerModel.cashback = cashback;

        return offerModel;
    }
}

export default Offers;
