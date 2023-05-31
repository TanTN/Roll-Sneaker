import axios from 'axios';
import { createDataAdidas, createDataMlbs, createDataNikes, createDataSneakers } from '@/store/reducerData';

const baseURL = import.meta.env.VITE_BASE_URL;
const httpRequest = axios.create({
    baseURL: baseURL,
});
// Get data sneakers

const getDataSneaker = async (dispatch) => {
    const res = await httpRequest.get('dbsneakers');
    await dispatch(createDataSneakers(res.data[0].dataSneakers));
    await dispatch(createDataNikes(res.data[0].dataNikes));
    await dispatch(createDataAdidas(res.data[0].dataAdidas));
    await dispatch(createDataMlbs(res.data[0].dataMlbs));
};

export default getDataSneaker