/* eslint-disable no-shadow */
import { GET_SERVICES } from './events';
import * as types from './mutations-types';

const state = {
    services: [],
};

const actions = {
    [GET_SERVICES]: async ({ commit }) => { 
        const resp = await browser.api.get('/services');
        
        if (resp.ok) {
            const data = await resp.json();
            commit(types.SET_SERVICES_DATA, data);
        }

        return resp.ok;
    },
};

const getters = {
    getServicesByIds: state => ids => state.services.filter(({ id }) => ids.includes(id)),
}

const mutations = {
    [types.SET_SERVICES_DATA](state, value) {
        state.services = value;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
