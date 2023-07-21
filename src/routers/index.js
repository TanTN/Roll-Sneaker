import { lazy } from 'react';

import NotFound from '../pages/notfound/NotFound';
import LayoutAdmin from '../layout/layoutAdmin';

const CategoryInAdmin = lazy(() => import('../pages/categoryInAdmin'));
const CreateProductInAdmin = lazy(() => import('../pages/createProduct'));
const UserInAdmin = lazy(() => import('../pages/userInAdmin'));
const Main = lazy(() => import('../pages/main'));
const Admin = lazy(() => import('../pages/admin'));
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
    admin: '/admin',
    register: '/register',
    cart: '/cart',
    user: '/user',
    buy: '/buy',
    main: '/',
    createProductInAdmin: '/admin/createProduct',
    categoryInAdmin: '/admin/category/:nameCategory',
    userInAdmin: '/admin/user/:userId',
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
    { path: routes.createProductInAdmin, component: CreateProductInAdmin, layout: LayoutAdmin },
    { path: routes.userInAdmin, component: UserInAdmin, layout: LayoutAdmin },
    { path: routes.categoryInAdmin, component: CategoryInAdmin, layout: LayoutAdmin },
    { path: routes.notFound, component: NotFound, layout: null },
];

export default pluginRouters;
