import axios from "axios";
import { setIsLogin, setUserCurrent } from "../redux/reducer";
const baseURL = import.meta.env.VITE_BASE_URL
const httpRequest = axios.create({
    baseURL: baseURL
})

const postUser = async (value) => {
    const res = await axios.post('https://6457a1a11a4c152cf9867627.mockapi.io/api/users',value)
}
const validateRegister = async (value) => {
    const res = await axios.get('https://6457a1a11a4c152cf9867627.mockapi.io/api/users')
    const isEmail = await res.data.every((data) => data.email !== value.email)
    const isUsername = await res.data.every((data) => data.username !== value.username)
    return {isEmail,isUsername}
}
const validateLogin = async (value,dispatch) => {
    const res = await axios.get('https://6457a1a11a4c152cf9867627.mockapi.io/api/users')
    const isLogin = await res.data.find((data) => data.username === value.username && data.password === value.password)
    if (isLogin) {
        dispatch(setUserCurrent(isLogin))
        dispatch(setIsLogin(true))
    }
    return isLogin
}

export {postUser,validateRegister,validateLogin}