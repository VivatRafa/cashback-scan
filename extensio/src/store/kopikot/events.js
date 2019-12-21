export const GET_OFFERS = 'GET_OFFERS';
export const GET_OFFERS_SUCCESS = 'GET_OFFERS_SUCCESS';
export const GET_OFFERS_FAILURE = 'GET_OFFERS_FAILURE';

export const GET_OFFERS_DOMAINS = 'GET_OFFERS_DOMAINS';
export const GET_OFFERS_DOMAINS_SUCCESS = 'GET_OFFERS_DOMAINS_SUCCESS';
export const GET_OFFERS_DOMAINS_FAILURE = 'GET_OFFERS_DOMAINS_FAILURE';

export const getOffers = {
    type: GET_OFFERS,
    payload: {},
    params: {},
    meta: {
        method: 'get',
        path: '/campaign/all',
    },
};

export const getOffersDomains = {
    type: GET_OFFERS,
    payload: {},
    params: {},
    meta: {
        method: 'get',
        path: '/campaign/get_tld',
    },
};
