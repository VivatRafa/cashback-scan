export const GET_OFFERS = 'GET_OFFERS';
export const GET_OFFERS_SUCCESS = 'GET_OFFERS_SUCCESS';
export const GET_OFFERS_FAILURE = 'GET_OFFERS_FAILURE';

export const getOffers = {
    type: GET_OFFERS,
    payload: {},
    params: {},
    meta: {
        method: 'get',
        path: '/get_shops_list',
    },
};
