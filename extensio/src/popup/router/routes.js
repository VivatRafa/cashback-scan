import index from './pages/index';
import cashback from './pages/cashback';
import serviceDetail from './pages/service-detail';
import noCashback from './pages/no-cashback';
import promocodes from './pages/promocodes';

export default [
    {
        path: '/',
        name: 'index',
        component: cashback,
    },
    {
        path: '/cashback',
        name: 'cashback',
        component: cashback,
    },
    {
        path: '/service/:id',
        name: 'service',
        component: serviceDetail,
        props: route => ({ id: Number(route.params.id) }),
    },
    {
        path: '/no-cashback',
        name: 'no-cashback',
        component: noCashback,
    },
    {
        path: '/promocodes',
        name: 'promocodes',
        component: promocodes,
    },
];
