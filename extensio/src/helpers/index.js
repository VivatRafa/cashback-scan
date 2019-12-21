global.browser = require('webextension-polyfill');

/**
 * @returns {String}
 */
export const detectBrowser = () => {
    let value = 'chrome';
    if (window.navigator.userAgent.match(/OPR\/\d+\.\d+/)) {
        value = 'opera';
    } else if (window.navigator.userAgent.match(/YaBrowser\/\d+\.\d+/)) {
        value = 'yandex';
    } else if (window.navigator.userAgent.match(/Gecko\/\d+/)) {
        value = 'ff';
    }
    return value;
};

/**
 * Объект фоновой страницы
 */
export const bgPage = browser.extension.getBackgroundPage().cashbackExt;

export const config = require(`../config`); // eslint-disable-line

export const manifest = browser.runtime.getManifest();

/**
 * @param {String} configName
 * @returns {Object|String}
 */
export const getConfigModule = configModuleName => {
    try {
        return config[configModuleName];
    } catch {
        return null;
    }
};

/**
 * @returns {String}
 */
export const getProjectUrl = () => manifest.homepage_url;

/**
 * @returns {String}
 */
export const getLanguage = () => {
    const lang = browser.i18n.getUILanguage();
    const commonConfig = getConfigModule('common');
    const { allowLang } = commonConfig;
    const langCode = lang.split('-')[0];

    // return allowLang.indexOf(langCode) !== -1 ? langCode : manifest.default_locale;
    return 'ru';
};

/**
 * @returns {String}
 */
export const getUnicId = () =>
    Math.random()
        .toString(36)
        .substr(2, 10);

/**
 * @param {Object} options
 */
export const pushNotify = options => {
    const id = getUnicId();
    return browser.notifications.create(id, options);
};

/**
 * Открывает таб для авторизации
 */
export const openOauthTab = () => {
    bgPage.auth.openOauthTab();
    window.close();
};

/**
 * Получение данных, напрямую, из хранилища браузера
 * @param  {String} [data=null]
 * @returns {Promise}
 */
export const localGet = async (data = null) => {
    const storage = await browser.storage.local.get(data);
    return storage[data];
};

/**
 * @returns {Promise}
 */
export const userIsLogin = () => {
    return localGet('userIsLogin');
};

export const getUserAccessToken = () => localGet('access_token');

/**
 * @param  {String} url=''
 * @returns {String}
 */
export const changeDoubleSlashToSingle = (url = '') => {
    if (!url) return '';
    return url.replace(/([^:]\/)\/+/g, '$1');
};

/**
 * @param {Object} options
 * @returns {Mixed}
 */
export const createTab = (options = null) => {
    if (!options) return false;
    options.url = changeDoubleSlashToSingle(options.url); // eslint-disable-line no-param-reassign
    return browser.tabs.create(options);
};

/**
 * @param {string} [url='/'] url
 * @returns {Mixed}
 */
export const openWebVersion = (url = '/') => {
    return createTab({
        url: changeDoubleSlashToSingle(url),
        active: true,
    });
};

/**
 * @description Получение информации об активном табе браузера
 * @returns {Promise}
 */
export const getTabInfo = async property => {
    if (!property) return '';
    const params = {
        active: true,
        currentWindow: true,
    };
    const tabs = await browser.tabs.query(params);
    return tabs[0][property] || '';
};

/**
 * @returns {Object}
 */
export const getDefaultOg = () => ({
    title: browser.i18n.getMessage('helpers_bargainPurchases'),
    description: '',
    image: `https://epn.bz/assets/images/opengraph/cashback-${getLanguage()}.jpg`,
});

export const reloadApp = () => window.location.reload();

/**
 * Добавляет знак к строке
 * если его там нет, может добавить
 * в конце или в начале, по дефолту
 * добавит его в конце
 * @param {String} string
 * @param {String} sign
 * @param {String} position [after,before]
 */
export const addSignToString = (string = '', sign = '', position = 'after') => {
    if (!string || !sign) return string;
    const tempString = string.toString();
    if (tempString.indexOf(sign) !== -1) return string;
    return position === 'after' ? `${tempString}${sign}` : `${sign}${tempString}`;
};

/**
 * Установим язык пользователя в атрибут html
 */
export const setLangInHtml = () => {
    const { default_locale: defaultLocale } = manifest;
    const userLang = navigator.language || navigator.userLanguage || defaultLocale;
    const [html] = document.getElementsByTagName('html');
    html.lang = userLang;
};

export const getDomain = (link = '') => {
    if (!link) return '';
    return new URL(link).host.replace('www.', '');
};
