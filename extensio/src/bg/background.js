import store from '../store';
import Main from './main';

global.browser = require('webextension-polyfill');

window.cashbackExt = new Main(store);
