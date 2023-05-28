import DetailProduct from '../page/detaiilProduct/DetailProduct';
import Login from '../page/Login';
import Main from '../page/main/Main';
import Register from '../page/Register';
import Buy from '../page/buy/Buy';
import NotFound from '../page/NotFound';

const routes = {
    detailProduct: '/detailProduct',
    login: '/login',
    register: '/register',
    user: 'user/:user',
    buy: '/buy',
    main: '/',
    notFound:'*'
};

const pluginRouters = [
    { path: routes.detailProduct, component: DetailProduct },
    { path: routes.login, component: Login, layout: null },
    { path: routes.register, component: Register, layout: null },
    { path: routes.user, component: Main },
    { path: routes.main, component: Main },
    { path: routes.buy, component: Buy },
    { path: routes.notFound, component: NotFound, layout: null },
];

export default pluginRouters;
