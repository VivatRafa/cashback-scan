/* eslint-disable no-shadow */
import {
    GET_OFFERS,
    GET_OFFERS_SUCCESS,
    GET_OFFERS_FAILURE,
    getOffers,
    GET_OFFERS_DOMAINS,
    GET_OFFERS_DOMAINS_SUCCESS,
    GET_OFFERS_DOMAINS_FAILURE,
    getOffersDomains,
} from './events';
import * as types from './mutations-types';

const state = {
    offers: [],
    offersDomains: [],
};

const actions = {
    [GET_OFFERS]: ({ commit }, actionData) => {
        if (actionData.headers) getOffers.headers = Object.assign({}, actionData.headers);

        return browser.api.kopikot.one(getOffers).then(({ data }) => {
            if (data) {
                commit(types.SET_OFFERS_DATA, data);
                return GET_OFFERS_SUCCESS;
            }
            return GET_OFFERS_FAILURE;
        });
    },

    [GET_OFFERS_DOMAINS]: ({ commit }, actionData) => {
        if (actionData.headers) getOffersDomains.headers = Object.assign({}, actionData.headers);

        return browser.api.kopikot.one(getOffersDomains).then(({ data }) => {
            if (data) {
                commit(types.SET_OFFERS_DOMAINS_DATA, data);
                return GET_OFFERS_DOMAINS_SUCCESS;
            }
            return GET_OFFERS_DOMAINS_FAILURE;
        });
    },
};

const mutations = {
    [types.SET_OFFERS_DATA](state, value) {
        state.offers = value;
    },
    [types.SET_OFFERS_DOMAINS_DATA](state, value) {
        state.offersDomains = value;
    },
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
};
