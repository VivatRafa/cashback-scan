import Vue from 'vue';
import Vuex from 'vuex';
import VuexWebExtensions from 'vuex-webextensions';
import { get } from '../utils/api';

import offers from './offers';
import services from './services';

global.browser = require('webextension-polyfill');

Vue.use(Vuex);

browser.api = { get };

export default new Vuex.Store({
    modules: {
        offers,
        services,
    },
    plugins: [VuexWebExtensions()],
});
