import Offers from '~/bg/offers';
import Services from '~/bg/services';

class Main {
    constructor(store) {
        this.store = store;
        this.offers = new Offers(store);
        this.services = new Services(store);
        this.refreshTimer = null;
        this.refreshTime = 7200000; // 2h

        this.tabsInfo = {};
        this.init();
    }

    async init() {
        await this.getOffersAndServices();
        this.updateAllTabs();
        browser.webNavigation.onBeforeNavigate.addListener(this.beforeNavigateHandler.bind(this));
        browser.webNavigation.onDOMContentLoaded.addListener(this.contentLoadHandler.bind(this));
        this.startBackgroundOffersUpdate();
    }

    async getOffersAndServices() {
        await this.offers.getOffers();
        this.offers.getTopOffers();
        this.services.getServices();
    }

    startBackgroundOffersUpdate() {
        this.refreshTimer = setInterval(() => {
            this.getOffersAndServices();
        }, this.refreshTime);
    }

    finishBackgroundOffersUpdate() {
        if (this.refreshTimer) clearInterval(this.refreshTimer);
    }

    beforeNavigateHandler({ url }) {
        // Летишопс тянет кэшбэк отдельно для каждого оффера
    }

    /**
     * @param {Object} tabDetail
     * @returns {Boolean}
     */
    contentLoadHandler({ tabId, url, frameId }) {
        if (frameId !== 0) return false;
        this.tabInfoUpdater(tabId, url);
        this.setTabsInfoInStorage();
        return true;
    }

    setTabsInfoInStorage() {
        return browser.storage.local.set({ tabsInfo: this.tabsInfo });
    }

    /**
     * @return {Boolean}
     */
    async updateAllTabs() {
        const tabs = await browser.tabs.query({});
        if (!tabs) return false;
        tabs.forEach(tab => this.tabInfoUpdater(tab.id, tab.url));
        this.setTabsInfoInStorage();
        return true;
    }

    /**
     * Проверяет открыт ли там с оффером
     * если да, то поставит badge 'yes'
     * и запишет инфу для роутинга
     * если нет, то поставит крестик
     * @param {Number} tabId
     * @param {String} tabUrl
     */
    tabInfoUpdater(tabId, tabUrl) {
        const isAllow = this.offers.checkUrlForOffer(tabUrl);

        const badgeColors = {
            active: '#00C90D',
            inactive: '#e42014',
        };

        const color = isAllow ? badgeColors.active : badgeColors.inactive;
        const text = isAllow ? '✓' : '⛔'; // ✅
        browser.browserAction.setBadgeBackgroundColor({ color, tabId });
        browser.browserAction.setBadgeText({ text, tabId });
        // Запишем инфу о табах, если страница оффера - services, если нет, то offers
        this.tabsInfo[tabId] = isAllow ? 'services' : 'offers';
    }
}

export default Main;
