import { lazy } from 'react';

import NotFound from '../pages/notfound/NotFound';

const Main = lazy(() => import('../pages/main'));
const DetailProduct = lazy(() => import('../pages/detaiilProduct'));
const Buy = lazy(() => import('../pages/buy'));
const Login = lazy(() => import('../pages/login/Login'));
const Register = lazy(() => import('../pages/register/Register'));
const Cart = lazy(() => import('../pages/cart'));
const User = lazy(() => import('../pages/user'));

const routes = {
    detailProduct: '/detailProduct/:productId',
    detailProductUser: '/detailProduct/:productInCart/:id',
    login: '/login',
    register: '/register',
    cart: '/cart',
    user: '/user',
    buy: '/buy',
    main: '/',
    notFound: '*',
};

const pluginRouters = [
    { path: routes.detailProduct, component: DetailProduct },
    { path: routes.detailProductUser, component: DetailProduct },
    { path: routes.login, component: Login, layout: null },
    { path: routes.register, component: Register, layout: null },
    { path: routes.user, component: User },
    { path: routes.cart, component: Cart },
    { path: routes.main, component: Main },
    { path: routes.buy, component: Buy },
    { path: routes.notFound, component: NotFound, layout: null },
];

export default pluginRouters;
