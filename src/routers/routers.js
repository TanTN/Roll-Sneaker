import DetailProduct from "../page/DetailProduct"
import Login from "../page/Login"
import Main from "../page/Main"
import Register from "../page/Register"
import Buy from "../page/Buy"

const routes = {
    detailProduct:'/detailProduct',
    login:'/',
    register:'/register',
    user:'main/:user',
    buy:'buy',
}

const pluginRouters = [
    {path: routes.detailProduct , component: DetailProduct },
    {path: routes.login , component: Login ,layout: null},
    {path: routes.register , component: Register, layout: null},
    {path: routes.user , component: Main },
    {path: routes.buy , component: Buy },
]

export default pluginRouters