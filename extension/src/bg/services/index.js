import { GET_SERVICES } from '~/store/services/events';
import cloneDeep from 'lodash/cloneDeep';

class Services {
    constructor(store) {
        this.store = store;
        this.cache = {};
    }

    async getServices() {
        const result = await this.store.dispatch(`services/${GET_SERVICES}`);
        if (result) {
            return cloneDeep(this.store?.state?.service?.services);
        }
        return null;
    }
}

export default Services;
