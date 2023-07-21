import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;
const httpRequest = axios.create({
    baseURL: baseURL,
});

export const fetchApiData = createAsyncThunk('data/fetchApiData', async () => {
    const res = await httpRequest.get('data');
    return res.data;
});

const dataSlice = createSlice({
    name: 'data',
    initialState: {
        dataSneaker: [],
        dataPending: false,
        dataRejected: false,
    },

    extraReducers: (builder) => {
        builder.addCase(fetchApiData.pending, (state) => {
            state.dataPending = true;
        });
        builder.addCase(fetchApiData.fulfilled, (state, action) => {
            state.dataPending = false;
            state.dataSneaker = action.payload;
            state.dataRejected = false;
        });
        builder.addCase(fetchApiData.rejected, (state) => {
            state.dataRejected = true;
        });
    },
});

export default dataSlice.reducer;
