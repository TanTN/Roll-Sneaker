import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
    name:'data',
    initialState:{
        dataSneakers:[],
        dataNikes:[],
        dataAdidas:[],
        dataMlbs:[]
    },
    reducers: {
        createDataSneakers: (state,action) => {state.dataSneakers = action.payload},
        createDataNikes: (state,action) => {state.dataNikes = action.payload},
        createDataAdidas: (state,action) => {state.dataAdidas = action.payload},
        createDataMlbs: (state,action) => {state.dataMlbs = action.payload},
    }
})

const {reducer,actions} = dataSlice

export const { createDataSneakers,createDataNikes,createDataAdidas,createDataMlbs } = actions

export default reducer