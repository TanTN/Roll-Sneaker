import axios from 'axios';

import { setIsLogin, setUserCurrent } from '@/store/reducerStore';
import { setIsAdmin } from '@/store/reducerStore';

const baseURL = import.meta.env.VITE_BASE_URL;

const httpRequest = axios.create({
    baseURL: baseURL,
});

const validateRegister = async (value) => {
    const res = await httpRequest.get('user');
    const isEmail = await res.data.every((data) => data.email !== value.email);
    const isUsername = await res.data.every((data) => data.username !== value.username);
    return { isEmail, isUsername };
};

const validateLogin = async (value, dispatch) => {
    const res = await httpRequest.get('user');
    const isLogin = await res.data.find((data) => data.username === value.username && data.password === value.password);
    if (isLogin) {
        if (isLogin?.isAdmin) {
            dispatch(setIsAdmin(true));
        } else {
            dispatch(setIsAdmin(false));
        }
        dispatch(setUserCurrent(isLogin));
        dispatch(setIsLogin(true));
    }
    return isLogin;
};

export { validateRegister, validateLogin };
