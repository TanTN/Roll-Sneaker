import DetailProduct from "../page/DetailProduct"
import Login from "../page/Login"
import Main from "../page/Main"
import Register from "../page/Register"
import Cart from "../page/Cart"

const routes = {
    detailProduct:'/detailProduct',
    login:'/login',
    register:'/register',
    main:'/',
    cart:'/cart'
}

const pluginRouters = [
    {path: routes.detailProduct , component: DetailProduct },
    {path: routes.login , component: Login ,layout: null},
    {path: routes.register , component: Register, layout: null},
    {path: routes.main , component: Main },
    {path: routes.cart , component: Cart },
]

export default pluginRouters