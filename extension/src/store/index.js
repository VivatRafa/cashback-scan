import Vue from 'vue';
import Vuex from 'vuex';
import Api from 'chimu-api/dist/api.js';
import VuexWebExtensions from 'vuex-webextensions';

import { domain } from '~/config';

import backit from './backit';
import letyshops from './letyshops';
import cash4brands from './cash4brands';
import smartSale from './smartSale';
import kopikot from './kopikot';

global.browser = require('webextension-polyfill');

Vue.use(Vuex);

const {
    urls: {
        api: { backit: backitBaseURL, letyshops: letyshopsBaseURL, smartSale: smartSaleBaseURL, kopikot: kopikotBaseURL, cash4brands: cash4brandsBaseURL },
    },
} = domain;

const apiConfig = {
    backit: {
        api: {
            baseURL: backitBaseURL,
        },
    },
    letyshops: {
        api: {
            baseURL: letyshopsBaseURL,
        },
    },
    smartSale: {
        api: {
            baseURL: smartSaleBaseURL,
        },
    },
    kopikot: {
        api: {
            baseURL: kopikotBaseURL,
        },
    },
    cash4brands: {
        api: {
            baseURL: cash4brandsBaseURL,
        },
    },
};

browser.api = {
    backit: new Api(apiConfig.backit.api),
    letyshops: new Api(apiConfig.letyshops.api),
    smartSale: new Api(apiConfig.smartSale.api),
    kopikot: new Api(apiConfig.kopikot.api),
    cash4brands: new Api(apiConfig.cash4brands.api),
};

export default new Vuex.Store({
    modules: {
        backit,
        letyshops,
        cash4brands,
        smartSale,
        kopikot,
    },
    plugins: [VuexWebExtensions()],
});
