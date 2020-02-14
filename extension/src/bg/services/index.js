import { GET_SERVICES } from '~/store/services/events';
import cloneDeep from 'lodash/cloneDeep';

class Services {
    constructor(store) {
        this.store = store;
        this.cache = {
            services: [],
            expire: 0,
        };
    }

    async getServices() {
        if (this.cache?.services.length) return this.cache?.services;

        const result = await this.store.dispatch(`services/${GET_SERVICES}`);

        if (result) {
            this.cache.services = cloneDeep(this.store?.state?.services?.services);
            return this.cache.services;
        }
        return null;
    }

    getService(id) {
        return this.cache.services.find(service => service.id === id);
    }

    getServicesByIds(ids = []) {
        return this.cache.services.filter(({ id }) => ids.includes(id));
    }
}

export default Services;
