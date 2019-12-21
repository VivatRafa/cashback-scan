/* eslint-disable no-shadow */
import { GET_OFFERS, getOffers } from './events';
import * as types from './mutations-types';

const state = {
    offers: [],
};

const actions = {
    [GET_OFFERS]: ({ commit }, actionData) => {
        getOffers.params = Object.assign({}, actionData.data);
        if (actionData.headers) getOffers.headers = Object.assign({}, actionData.headers);

        return browser.api.cash4brands.one(getOffers).then(({ data }) => {
            if (data) {
                commit(types.SET_OFFERS_DATA, data);
            }
        });
    },
};

const mutations = {
    [types.SET_OFFERS_DATA](state, value) {
        state.offers = value;
    },
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
};
