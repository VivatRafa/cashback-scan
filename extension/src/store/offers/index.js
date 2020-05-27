/* eslint-disable no-shadow */
import { GET_OFFERS, GET_OFFER, GET_TOP_OFFERS } from './events';
import * as types from './mutations-types';

const state = {
    offers: [],
    topOffers: [],
    serviceOfferAndOffer: null,
    offersIsLoaded: true,
};

const actions = {
    [GET_OFFERS]: async ({ commit }) => {
        const resp = await browser.api.get('/offers');

        if (resp.ok) {
            const data = await resp.json();
            commit(types.SET_OFFERS_DATA, data);
        }

        return resp.ok;
    },

    [GET_TOP_OFFERS]: async ({ commit }) => {
        const resp = await browser.api.get('/top-offers');

        if (resp.ok) {
            const data = await resp.json();
            commit(types.SET_TOP_OFFERS_DATA, data);
        }

        return resp.ok;
    },

    [GET_OFFER]: async ({ commit }, actionData) => {
        const params = actionData.data;
        // TODO баг, задваивается запрос
        if (!params) return;
        const resp = await browser.api.get('/offer', params);

        if (resp.ok) {
            const data = await resp.json();
            commit(types.SET_SERVICE_OFFER_DATA, data);
        }

        return resp.ok;
    },
};

const mutations = {
    [types.SET_OFFERS_DATA](state, value) {
        state.offers = value;
    },
    [types.SET_OFFERS_IS_LOADED](state, value) {
        state.offersIsLoaded = value;
    },
    [types.SET_OFFERS_IS_LOADING](state, value) {
        state.offersIsLoading = value;
    },
    [types.SET_TOP_OFFERS_DATA](state, value) {
        state.topOffers = value;
    },
    [types.SET_SERVICE_OFFER_DATA](state, value) {
        const { offer, serviceOffers } = value;
        const serviceOffersWithParsedRates = serviceOffers.map(serviceOffer => {
            let result = { ...serviceOffer };
            try {
                const rates = typeof serviceOffer.rates === 'string' ? JSON.parse(serviceOffer.rates) : [];
                result = { ...result, rates };
            } catch (e) {
                throw new Error(e);
            }
            return result;
        });
        state.serviceOfferAndOffer = {
            offer,
            serviceOffers: serviceOffersWithParsedRates,
        };
    },
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
};
