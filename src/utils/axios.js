import axios from "axios";
import { setDistrict, setIsLogin, setProvince, setUserCurrent, setWard } from "../redux/reducer";
const baseURL = import.meta.env.VITE_BASE_URL
const baseUrlProvinces = import.meta.env.VITE_PROVINCES

const httpRequest = axios.create({
    baseURL: baseURL
})

const requestProvinces = axios.create({
    baseUrl: baseUrlProvinces
}
)

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
const updateUser = async (value) => {
    const res = await httpRequest.put(`users/${value.id}`,value)
}

const getProvince = async () => {
    const res = await axios.get('https://provinces.open-api.vn/api/p?depth=2')
    return res.data
}
const getDistrict = async(code) => {
    const res = await axios.get(`https://provinces.open-api.vn/api/p/${code}?depth=2`)
    return res.data
}
const getWard = async (code) => {
    const res = await axios.get(`https://provinces.open-api.vn/api/d/${code}?depth=2`)
    return res.data

}

export {postUser,validateRegister,validateLogin,updateUser,getProvince,getDistrict,getWard}