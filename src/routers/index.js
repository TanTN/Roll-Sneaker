import DetailProduct from '../page/detaiilProduct';
import Login from '../page/login/Login';
import Main from '../page/main';
import Register from '../page/register/Register';
import Buy from '../page/buy';
import NotFound from '../page/notfound/NotFound';
import Cart from '../page/cart';
import User from '../page/user';

const routes = {
    detailProduct: '/detailProduct',
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
    { path: routes.login, component: Login, layout: null },
    { path: routes.register, component: Register, layout: null },
    { path: routes.user, component: User },
    { path: routes.cart, component: Cart },
    { path: routes.main, component: Main },
    { path: routes.buy, component: Buy },
    { path: routes.notFound, component: NotFound, layout: null },
];

export default pluginRouters;
