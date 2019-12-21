/* eslint-disable no-shadow */
import { GET_OFFERS, GET_OFFERS_SUCCESS, GET_OFFERS_FAILURE, getOffers } from './events';
import * as types from './mutations-types';

const state = {
    offers: [],
    offersIsLoaded: true,
    offersIsLoading: false,
};

const actions = {
    [GET_OFFERS]: ({ commit }, actionData) => {
        getOffers.params = Object.assign({}, actionData.data);
        if (actionData.headers) getOffers.headers = Object.assign({}, actionData.headers);

        return browser.api.backit.one(getOffers).then(resp => {
            if (resp.status === GET_OFFERS_SUCCESS) {
                commit(types.SET_OFFERS_DATA, resp.data);
                commit(types.SET_OFFERS_IS_LOADED, true);
            }
            if (resp.status === GET_OFFERS_FAILURE) {
                commit(types.SET_OFFERS_IS_LOADED, false);
            }

            commit(types.SET_OFFERS_IS_LOADING, false);

            return resp.status;
        });
    },

    setOfferIsLoading({ commit }) {
        commit(types.SET_OFFERS_IS_LOADING, true);
    },
};

const mutations = {
    [types.SET_OFFERS_DATA](state, value) {
        state.offers = value.data;
    },
    [types.SET_OFFERS_IS_LOADED](state, value) {
        state.offersIsLoaded = value;
    },
    [types.SET_OFFERS_IS_LOADING](state, value) {
        state.offersIsLoading = value;
    },
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
};
