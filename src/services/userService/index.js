import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;

const httpRequest = axios.create({
    baseURL: baseURL,
});

const postUser = async (value) => {
    const res = await httpRequest.post('users', value);
};
const updateUser = async (value) => {
    const res = await httpRequest.put(`users/${value.id}`, value);
};
export {postUser,updateUser}