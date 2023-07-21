import { createSlice } from '@reduxjs/toolkit';

const storeSlice = createSlice({
    name: 'store',
    initialState: {
        isLogin: false,
        isMobile: true,
        isLoadingUserInAdmin: false,
        userCurrent: { products: [] },
        allUser: [],
        viewProduct: {},
        isAdmin: false,
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
        setIsAdmin: (state, action) => {
            state.isAdmin = action.payload;
        },
        setAllUser: (state, action) => {
            state.allUser = action.payload;
        },
        setIsLoadingUserInAdmin: (state, action) => {
            state.isLoadingUserInAdmin = action.payload;
        },
    },
});

const { reducer, actions } = storeSlice;

export const {
    setMobile,
    setUserCurrent,
    setIsLogin,
    setProduct,
    setReloadClickCart,
    setIsAdmin,
    setAllUser,
    setIsLoadingUserInAdmin,
} = actions;
export default reducer;
