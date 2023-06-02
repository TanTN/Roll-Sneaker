import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;
const httpRequest = axios.create({
    baseURL: baseURL,
});

export const fetchApiData = createAsyncThunk(
    'data/fetchApiData',
    async () => {
        const res = await httpRequest.get('dbsneakers');
        return res.data
    }
)

const dataSlice = createSlice({
    name:'data',
    initialState:{
        dataSneakers:[],
        dataNikes:[],
        dataAdidas:[],
        dataMlbs:[],
        dataPending: false,
        dataRejected: false,
        
    },

    extraReducers: (builder) => {
        builder.addCase(fetchApiData.pending, (state) => {
            state.dataPending = true
        })
        builder.addCase(fetchApiData.fulfilled, (state,action) => {
                state.dataPending = false

                state.dataSneakers = action.payload[0].dataSneakers
                state.dataNikes = action.payload[0].dataNikes
                state.dataAdidas = action.payload[0].dataAdidas
                state.dataMlbs = action.payload[0].dataMlbs

        }
        )
        builder.addCase(fetchApiData.rejected, (state,action) => {
            state.dataRejected = true
        })
    }
})

export default dataSlice.reducer