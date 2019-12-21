export const GET_OFFERS = 'GET_OFFERS';
export const GET_OFFERS_SUCCESS = 'GET_OFFERS_SUCCESS';
export const GET_OFFERS_FAILURE = 'GET_OFFERS_FAILURE';

export const GET_OFFER = 'GET_OFFER';
export const GET_OFFER_SUCCESS = 'GET_OFFER_SUCCESS';
export const GET_OFFER_FAILURE = 'GET_OFFER_FAILURE';

export const getOffers = {
    type: GET_OFFERS,
    payload: {},
    params: {},
    meta: {
        method: 'get',
        path: '/shops',
    },
};

export const getOffer = {
    type: GET_OFFER,
    payload: {},
    params: {},
    setOfferid(id) {
        this.meta.path = `/cashback-rates/${id}`;
    },
    meta: {
        method: 'get',
        path: '',
    },
};
