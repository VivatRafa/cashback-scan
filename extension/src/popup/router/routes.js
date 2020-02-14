import index from './pages/index';
import services from './pages/services/services';
import serviceDetail from './pages/service-detail/service-detail';
import offers from './pages/offers/offers';
import offerDetail from './pages/offer-detail/offer-detail';
import promocodes from './pages/promocodes/promocodes';

export default [
    {
        path: '/',
        name: 'index',
        component: index,
    },
    {
        path: '/services',
        name: 'services',
        component: services,
    },
    {
        path: '/service/:id',
        name: 'service',
        component: serviceDetail,
        props: route => ({ serviceOfferId: Number(route.params.id) }),
    },
    {
        path: '/offers',
        name: 'offers',
        component: offers,
    },
    {
        path: '/offer/:id',
        name: 'offer',
        component: offerDetail,
        props: route => ({ offerId: Number(route.params.id) }),
    },
    {
        path: '/promocodes',
        name: 'promocodes',
        component: promocodes,
    },
];
