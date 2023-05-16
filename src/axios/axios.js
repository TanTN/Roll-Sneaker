import axios from 'axios';
import { setIsLogin, setUserCurrent } from '../redux/reducer';
import { createDataAdidas, createDataMlbs, createDataNikes, createDataSneakers } from '../redux/reducerData';
const baseURL = import.meta.env.VITE_BASE_URL;
const baseURL1 = import.meta.env.VITE_PROVINCES;

const httpRequest = axios.create({
    baseURL: baseURL,
});
export const requestProvinces = axios.create({
    baseUrl: baseURL1,
});

// Get data sneakers

const getDataSneaker = async (dispatch) => {
    const res = await httpRequest.get('dbsneakers');
    await dispatch(createDataSneakers(res.data[0].dataSneakers));
    await dispatch(createDataNikes(res.data[0].dataNikes));
    await dispatch(createDataAdidas(res.data[0].dataAdidas));
    await dispatch(createDataMlbs(res.data[0].dataMlbs));
};

// Handle up date users

const postUser = async (value) => {
    const res = await httpRequest.post('users', value);
};
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
const updateUser = async (value) => {
    const res = await httpRequest.put(`users/${value.id}`, value);
};

// Get data province

const getProvince = async () => {
    const res = await axios.get('https://provinces.open-api.vn/api/p?depth=2');
    return res.data;
};
const getDistrict = async (code) => {
    const res = await axios.get(`https://provinces.open-api.vn/api/p/${code}?depth=2`);
    return res.data;
};
const getWard = async (code) => {
    const res = await axios.get(`https://provinces.open-api.vn/api/d/${code}?depth=2`);
    return res.data;
};

export { getDataSneaker, postUser, validateRegister, validateLogin, updateUser, getProvince, getDistrict, getWard };
