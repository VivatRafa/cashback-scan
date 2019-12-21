import { common } from '~/config';

const { services } = common;

class ServiceData {
    constructor(offers) {
        this.offers = offers;
        this.services = {
            [services.backit]: {
                id: 1,
                logo: {
                    src: 'https://backit.me/cashback-assets/img/f37356a.svg',
                },
                title: 'Backit',
                confirmTime: '45 дней',
                link: '/cashback',
            },
            [services.letyshops]: {
                id: 2,
                logo: {
                    src: 'https://letyshops.com/build/core/images/logo.svg',
                },
                title: 'LetyShops',
                confirmTime: '45 дней',
                link: '/cashback',
            },
            [services.kopikot]: {
                id: 3,
                logo: {
                    src: 'https://s3-eu-west-1.amazonaws.com/s3bonusbay/assets/img/kopikot_nega.png',
                    bgColor: '#212a2f',
                },
                title: 'Kopikot',
                confirmTime: '45 дней',
                link: '/cashback',
            },
            [services.cash4brands]: {
                id: 4,
                logo: {
                    src: 'https://cash4brands.ru/static/img/logo_new.png',
                },
                title: 'cash4brands',
                confirmTime: '45 дней',
                link: '/cashback',
            },
        };
    }

    // eslint-disable-next-line class-methods-use-this
    async getData(url) {
        const tempServices = Object.assign({}, this.services);
        // Собрали инфу об оффере со всех сервисов
        const offerInfo = await this.offers.getOfferByAllService(url);
        // Собираем названия сервисов
        const offersName = Object.keys(offerInfo);
        // По названию сервисов добавляем инфу об оффере
        // eslint-disable-next-line no-return-assign
        offersName.forEach(offerName => (tempServices[offerName].offer = offerInfo[offerName]));
        // Собираем сервисы, у которых есть инфа об оффере
        const servicesWithData = Object.values(tempServices).filter(({ offer }) => offer);
        return servicesWithData;
    }

    getService(id) {
        return this.services.find(service => service.id === id);
    }
}

export default ServiceData;
