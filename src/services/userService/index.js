import axios from 'axios';
import { setAllUser, setIsLoadingUserInAdmin } from '../../store/reducerStore';

const baseURL = import.meta.env.VITE_BASE_URL;

const httpRequest = axios.create({
    baseURL: baseURL,
});

const postUser = async (value) => {
    await httpRequest.post('user', value);
};

const updateUser = async (value) => {
    await httpRequest.put(`user/${value.id}`, value);
};

const getAllUser = async (dispatch) => {
    const res = await httpRequest.get('user');
    const users = await res.data;
    dispatch(setAllUser(users));
};

const getUser = async (idUser, dispatch) => {
    dispatch(setIsLoadingUserInAdmin(true));
    const res = await httpRequest.get(`user/${idUser}`);
    const user = await res.data;
    dispatch(setIsLoadingUserInAdmin(false));
    return user;
};

const deleteUser = async (userId) => {
    await httpRequest.delete(`user/${userId}`);
};

export { postUser, updateUser, getAllUser, getUser, deleteUser };
