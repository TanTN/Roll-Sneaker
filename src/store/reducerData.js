import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;
const httpRequest = axios.create({
    baseURL: baseURL,
});

export const fetchApiData = createAsyncThunk('data/fetchApiData', async () => {
    const res = await httpRequest.get('dbsneakers');
    return res.data;
});

const dataSlice = createSlice({
    name: 'data',
    initialState: {
        allDataSneaker: [],
        dataSneakers: [],
        dataNikes: [],
        dataAdidas: [],
        dataMlbs: [],
        dataPending: false,
        dataRejected: false,
    },

    extraReducers: (builder) => {
        builder.addCase(fetchApiData.pending, (state) => {
            state.dataPending = true;
        });
        builder.addCase(fetchApiData.fulfilled, (state, action) => {
            state.dataPending = false;
            const data = [
                ...action.payload[0].dataSneakers,
                ...action.payload[0].dataNikes,
                ...action.payload[0].dataAdidas,
                ...action.payload[0].dataMlbs,
            ];
            state.allDataSneaker = data;

            state.dataSneakers = action.payload[0].dataSneakers;
            state.dataNikes = action.payload[0].dataNikes;
            state.dataAdidas = action.payload[0].dataAdidas;
            state.dataMlbs = action.payload[0].dataMlbs;

            state.dataRejected = false;
        });
        builder.addCase(fetchApiData.rejected, (state) => {
            state.dataRejected = true;
        });
    },
});

export default dataSlice.reducer;
