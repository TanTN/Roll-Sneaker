import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;

const httpRequest = axios.create({
    baseURL: baseURL,
});

const postHistoryOrder = async (product) => {
    const res = await httpRequest.post('historyOrder', product);
};

const postProduct = async (product) => {
    const res = await httpRequest.post('data', product);
};

const deleteProduct = async (product) => {
    const res = await httpRequest.delete(`data/${product.id}`);
};

const getHistoryOrder = async () => {
    const res = await httpRequest.get('historyOrder');
    return res.data;
};

const deleteHistoryOrder = async (id) => {
    const res = await httpRequest.delete(`historyOrder/${id}`);
};
export {postHistoryOrder, postProduct, deleteProduct, getHistoryOrder, deleteHistoryOrder}
