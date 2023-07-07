import { setIsLogin, setUserCurrent } from '@/store/reducerStore';
import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;
const baseURL1 = import.meta.env.VITE_PROVINCES;

const httpRequest = axios.create({
    baseURL: baseURL,
});
export const requestProvinces = axios.create({
    baseUrl: baseURL1,
});

const validateRegister = async (value) => {
    const res = await httpRequest.get('users');
    const isEmail = await res.data.every((data) => data.email !== value.email);
    const isUsername = await res.data.every((data) => data.username !== value.username);
    return { isEmail, isUsername };
};

const validateLogin = async (value, dispatch) => {
    const res = await httpRequest.get('users');
    const isLogin = await res.data.find((data) => data.username === value.username && data.password === value.password);
    if (isLogin) {
        dispatch(setUserCurrent(isLogin));
        dispatch(setIsLogin(true));
    }
    return isLogin;
};

export { validateRegister, validateLogin };
