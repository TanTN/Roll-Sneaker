import { createSlice } from '@reduxjs/toolkit';

const storeSlice = createSlice({
    name: 'store',
    initialState: {
        isLogin: false,
        isMobile: true,
        userCurrent: {},
        viewProduct: {},
        isReloadClickCart: 1,
        province:[],
        district:[],
        ward:[]
    },
    reducers: {
        setMobile: (state, option) => ({ ...state, isMobile: option.payload }),
        setUserCurrent: (state, option) => {
            state.userCurrent = option.payload;
        },
        setIsLogin: (state, option) => {
            state.isLogin = option.payload;
        },
        setProduct: (state, option) => {
            state.viewProduct = option.payload;
        },
        setReloadClickCart: (state, option) => {
            state.isReloadClickCart = option.payload;
        },
        setProvince: (state,option) => {state.province = option.payload},
        setDistrict: (state,option) => {state.district = option.payload},
        setWard: (state,option) => {state.ward = option.payload},
    },
});

const { reducer, actions } = storeSlice;

export const { setMobile, setUserCurrent, setIsLogin, setProduct, setReloadClickCart,setProvince,setDistrict,setWard } = actions;
export default reducer;
