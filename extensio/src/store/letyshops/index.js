/* eslint-disable no-shadow */
import { GET_OFFERS, GET_OFFERS_SUCCESS, GET_OFFERS_FAILURE, getOffers, GET_OFFER, GET_OFFER_SUCCESS, GET_OFFER_FAILURE, getOffer } from './events';
import * as types from './mutations-types';

const state = {
    offers: [],
    offer: [],
};

const actions = {
    [GET_OFFERS]: ({ commit }, actionData) => {
        getOffers.params = Object.assign({}, actionData.data);
        if (actionData.headers) getOffers.headers = Object.assign({}, actionData.headers);

        return browser.api.letyshops.one(getOffers).then(({ data }) => {
            if (data) {
                commit(types.SET_OFFERS_DATA, data);
                return GET_OFFERS_SUCCESS;
            }
            return GET_OFFERS_FAILURE;
        });
    },

    [GET_OFFER]: ({ commit }, actionData) => {
        getOffer.params = Object.assign({}, actionData.data);
        if (actionData.headers) getOffer.headers = Object.assign({}, actionData.headers);
        getOffer.setOfferid(actionData.id);

        return browser.api.letyshops.one(getOffer).then(({ data }) => {
            if (data) {
                commit(types.SET_OFFER_DATA, data);
                return GET_OFFER_SUCCESS;
            }
            return GET_OFFER_FAILURE;
        });
    },
};

const mutations = {
    [types.SET_OFFERS_DATA](state, value) {
        state.offers = value;
    },
    [types.SET_OFFER_DATA](state, value) {
        state.offer = value;
    },
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
};
