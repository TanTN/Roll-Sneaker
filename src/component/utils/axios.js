import axios from "axios";
import { setUserCurrent } from "../../redux/reducer";
const baseURL = import.meta.env.VITE_BASE_URL
const httpRequest = axios.create({
    baseURL: baseURL
})

const postUser = async (value) => {
    const res = await httpRequest.post('register',value)
}
const validateRegister = async (value) => {
    const res = await httpRequest.get('register')
    const isRegister = await res.data.every((data) => data.email !== value.email)
    return isRegister
}
const validateLogin = async (value,dispatch) => {
    const res = await httpRequest.get('register')
    const isLogin = await res.data.find((data) => data.username === value.username && data.password === value.password)
    if (isLogin) {
        dispatch(setUserCurrent(isLogin))
    }
    return isLogin
}

export {postUser,validateRegister,validateLogin}