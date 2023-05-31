import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import { memo } from 'react';

import { updateUser } from '@/services/userService';
import { setUserCurrent } from '@/store/reducer';
import ProductHot from '@/page/main/product/ProductHot';
import Tips from '@/page/main/product/Tips';
import dataSizes from '@/data/dataSizes';
import Product from './itemDetailProduct/Product';
import { setIsAddProductSuccess } from '../../store/reducer';

const DetailProduct = () => {
    const { pathname } = useLocation();

    const user = useSelector((state) => state.store.userCurrent);
    const productView = useSelector((state) => state.store.viewProduct);
    const isLogin = useSelector((state) => state.store.isLogin);
    const isReloadClickCart = useSelector((state) => state.store.isReloadClickCart);
    const isAddSuccess = useSelector((state) => state.store.isAddProductSuccess);

    const [sizes, setSizes] = useState(dataSizes);
    const [selectSize, setSelectSize] = useState(undefined);
    const [sizeActive, setSizeActive] = useState(undefined);
    const [isChecked, setIsChecked] = useState(false);
    const [isProduct, setIsProduct] = useState(false);
    const [numberProduct, setNumberProduct] = useState(1);
    const [isUpdateProduct, setIsUpdateProduct] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useLayoutEffect(() => {
        if (productView.size && !isAddSuccess) {
            const sizeProduct = sizes.map((sizeProd) => {
                return sizeProd.size == productView.size
                    ? { ...sizeProd, isChecked: true }
                    : { ...sizeProd, isChecked: false };
            });
            const index = sizes.findIndex((sizeProd) => sizeProd.size == productView.size);
            setSelectSize(productView.size);
            setSizeActive(index);
            setSizes(sizeProduct);
            setIsChecked(true);
            setIsUpdateProduct(true);
            setNumberProduct(productView.numberProducts)
        }
        
    }, [isReloadClickCart]);
    
    useEffect(() => {
        if (pathname === '/detailProduct') {
            setIsProduct(true);
        } else {
            setIsProduct(false);
        }
    }, [pathname]);

    const isReload = () => {
        setIsChecked(false);
        setSizeActive(undefined);
        setSizes(dataSizes);
        setNumberProduct(1);
        setIsUpdateProduct(false);
        dispatch(setIsAddProductSuccess(false));
    };

    const handleClearSize = () => {
        setIsChecked(false);
        setSizeActive(undefined);
        setSizes(dataSizes);
    };

    const handelSelectSize = (e, index) => {
        if (!isAddSuccess) {
            const { value, checked } = e.target;
            setSelectSize(value);
            setSizeActive(index);
            setIsChecked(true);
            const newSizes = sizes.map((size) =>
                size.size == value ? { ...size, isChecked: checked } : { ...size, isChecked: false },
            );
            setSizes(newSizes);
            if (!checked) {
                handleClearSize();
            }
        }
    };

    const handleMinusNumber = () => {
        if (numberProduct > 1) {
            setNumberProduct((number) => number - 1);
        }
    };

    const handleIncreaseNumber = () => {
        setNumberProduct((number) => number + 1);
    };

    const handleBuyOrAddProduct = async () => {
        const indexUpdateSize = user.products.findIndex(
            (prod) => prod.name == productView.name && prod.size == selectSize,
        );
        const indexUpdateProduct = user.products.findIndex(
            (prod) => prod.name == productView.name && prod.size == productView.size,
        );
        
        if (isChecked) {
            let newUser;
            if (indexUpdateProduct !== -1 || 0) {
                const newProduct = [...user.products];

                newProduct[indexUpdateProduct] = {
                    ...productView,
                    size: selectSize,
                    numberProducts: numberProduct,
                };
                newUser = {
                    ...user,
                    products: newProduct,
                };
            }

            if ((indexUpdateSize !== -1 || 0) && !isUpdateProduct) {
                if (!isUpdateProduct) {
                    const newProduct = [...user.products];

                    newProduct[indexUpdateSize] = {
                        ...productView,
                        size: selectSize,
                        numberProducts: numberProduct,
                    };
                    newUser = {
                        ...user,
                        products: newProduct,
                    };
                }
            } else if (indexUpdateSize == -1 && !isUpdateProduct) {
                newUser = {
                    ...user,
                    products: [
                        ...user.products,
                        {
                            ...productView,
                            size: selectSize,
                            numberProducts: numberProduct,
                        },
                    ],
                };
            }
            if (isLogin) {
                await updateUser(newUser);
            }
            await dispatch(setUserCurrent(newUser));
            await window.scrollTo(0, 0);
        }
    };
    const handleBuy = () => {
        if (!isChecked) {
            alert('Chọn các tùy chọn cho sản phẩm trước khi bạn thanh toán.');
        } else {
            handleBuyOrAddProduct();
            navigate(`/buy`);
            dispatch(setIsAddProductSuccess(false));
        }
    };
    const handleAddProduct = () => {
        if (!isChecked) {
            alert('Chọn các tùy chọn cho sản phẩm trước khi cho sản phẩm vào giỏ hàng của bạn.');
        } else {

            handleBuyOrAddProduct();
            dispatch(setIsAddProductSuccess(true));

            setIsChecked(false);
            setSizeActive(undefined);
            setSizes(dataSizes);
            setNumberProduct(1);
        }
    };

    const handleBackHome = () => {
        if (isLogin) {
            navigate(`/user/${user.username}`);
            window.scrollTo(0, 0);
        } else {
            navigate('/');
            window.scrollTo(0, 0);
        }
        dispatch(setIsAddProductSuccess(false));
    };

    return (
        <div className="mt-[66px] max-w-[1140px] mx-auto md:mt-[86px] lg:mt-[10px]">
            <Product
                handleBackHome={handleBackHome}
                handleClearSize={handleClearSize}
                handleMinusNumber={handleMinusNumber}
                handleIncreaseNumber={handleIncreaseNumber}
                handleAddProduct={handleAddProduct}
                handleBuy={handleBuy}
                handelSelectSize={handelSelectSize}
                isChecked={isChecked}
                sizes={sizes}
                sizeActive={sizeActive}
                numberProduct={numberProduct}
                isAddSuccess={isAddSuccess}
                isUpdateProduct={isUpdateProduct}
            />
            <div className="px-[15px] lg:px-0 pt-[50px]">
                <ProductHot isProductSame={isProduct} isReload={isReload} />
            </div>
            <Tips />
        </div>
    );
};

export default memo(DetailProduct);
