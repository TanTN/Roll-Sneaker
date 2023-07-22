import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;

const httpRequest = axios.create({
    baseURL: baseURL,
});
export const postHistoryOrder = async (product) => {
    const res = await httpRequest.post('historyOrder', product);
};
export const postProduct = async (product) => {
    const res = await httpRequest.post('data', product);
};
export const deleteProduct = async (product) => {
    const res = await httpRequest.delete(`data/${product.id}`);
};
export const getHistoryOrder = async () => {
    const res = await httpRequest.get('historyOrder');
    return res.data;
};
export const deleteHistoryOrder = async (id) => {
    const res = await httpRequest.delete(`historyOrder/${id}`);
};
