import { createSlice } from '@reduxjs/toolkit';

const storeSlice = createSlice({
    name: 'store',
    initialState: {
        isLogin: false,
        isMobile: true,
        userCurrent: { products: [] },
        viewProduct: {},
        isReloadClickCart: 1,
        isAddProductSuccess:false
    },
    reducers: {
        setMobile: (state, action) => ({ ...state, isMobile: action.payload }),
        setUserCurrent: (state, action) => {
            state.userCurrent = action.payload;
        },
        setIsLogin: (state, action) => {
            state.isLogin = action.payload;
        },
        setProduct: (state, action) => {
            state.viewProduct = action.payload;
        },
        setReloadClickCart: (state, action) => {
            state.isReloadClickCart = action.payload;
        },
        setIsAddProductSuccess: (state, action) => {
            state.isAddProductSuccess = action.payload;
        }
    },
});

const { reducer, actions } = storeSlice;

export const { setMobile, setUserCurrent, setIsLogin, setProduct, setReloadClickCart,setIsAddProductSuccess } = actions;
export default reducer;
