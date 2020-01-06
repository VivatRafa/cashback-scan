import Offers from '~/bg/offers';
import Services from '~/bg/services';

class Main {
    constructor(store) {
        this.store = store;
        this.offers = new Offers(store);
        this.services = new Services(store);
        this.init();
    }

    async init() {
        this.services.getServices();
        this.offers.getOffers();
        // this.updateAllTabs();
        browser.webNavigation.onBeforeNavigate.addListener(this.beforeNavigateHandler.bind(this));
    }

    beforeNavigateHandler({ url }) {
        // Летишопс тянет кэшбэк отдельно для каждого оффера
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
            active: '#64c270',
            inactive: '#e42014',
        };

        const color = isAllow ? badgeColors.active : badgeColors.inactive;
        const text = isAllow ? 'yes' : ' X ';
        browser.browserAction.setBadgeBackgroundColor({ color, tabId });
        browser.browserAction.setBadgeText({ text, tabId });
        // Запишем инфу о табах (оффер или не оффер)
        this.routesByTab[tabId] = isAllow ? 'link' : 'no-offer';
    }
}

export default Main;
