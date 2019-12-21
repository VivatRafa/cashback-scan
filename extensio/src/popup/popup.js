import Vue from 'vue';

// Ant design
import { Input, Tabs, Button, Card, Divider, Icon } from 'ant-design-vue';

import AsyncComputed from 'vue-async-computed';

import App from './App';
import store from '../store';
import router from './router';

Vue.use(AsyncComputed);

Vue.use(Input);
Vue.use(Tabs);
Vue.use(Button);
Vue.use(Card);
Vue.use(Divider);
Vue.use(Icon);

global.browser = require('webextension-polyfill');

Vue.prototype.$browser = global.browser;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App),
});
