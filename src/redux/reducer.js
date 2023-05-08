
import { createSlice } from "@reduxjs/toolkit";

const storeSlice = createSlice({
    name:'store',
    initialState:{
        isLogin:false,
        isMobile: true,
        userCurrent:{},
    },
    reducers: {
        setMobile: (state, option) => ({...state,isMobile:option.payload}),
        setUserCurrent:(state, option) => {state.userCurrent = option.payload},
        setIsLogin: (state, option) => {state.isLogin = option.payload}
    }
})

const {reducer,actions} = storeSlice

export const {setMobile,setUserCurrent,setIsLogin} = actions
export default reducer