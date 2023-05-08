import axios from "axios";
import { setIsLogin, setUserCurrent } from "../redux/reducer";
const baseURL = import.meta.env.VITE_BASE_URL
const httpRequest = axios.create({
    baseURL: baseURL
})

const postUser = async (value) => {
    const res = await httpRequest.post('users',value)
}
const validateRegister = async (value) => {
    const res = await httpRequest.get('users')
    const isEmail = await res.data.every((data) => data.email !== value.email)
    const isUsername = await res.data.every((data) => data.username !== value.username)
    return {isEmail,isUsername}
}
const validateLogin = async (value,dispatch) => {
    const res = await httpRequest.get('users')
    const isLogin = await res.data.find((data) => data.username === value.username && data.password === value.password)
    if (isLogin) {
        dispatch(setUserCurrent(isLogin))
        dispatch(setIsLogin(true))
    }
    return isLogin
}

export {postUser,validateRegister,validateLogin}