import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import { memo } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { RiInformationFill } from 'react-icons/ri';

import { updateUser } from '@/services/userService';
import ProductHot from '@/page/main/product/ProductHot';
import Tips from '@/page/main/product/Tips';
import dataSizes from '@/data/dataSizes';
import Product from './itemDetailProduct/Product';
import { setUserCurrent, setProduct } from '@/store/reducerStore';
import { Link } from 'react-router-dom';

const DetailProduct = () => {
    const { pathname } = useLocation();

    const user = useSelector((state) => state.store.userCurrent);
    const productView = useSelector((state) => state.store.viewProduct);
    const isLogin = useSelector((state) => state.store.isLogin);
    const isReloadClickCart = useSelector((state) => state.store.isReloadClickCart);

    const [sizes, setSizes] = useState(dataSizes);
    const [selectSize, setSelectSize] = useState(undefined);
    const [sizeActive, setSizeActive] = useState(undefined);
    const [isChecked, setIsChecked] = useState(false);
    const [isProduct, setIsProduct] = useState(false);
    const [numberProduct, setNumberProduct] = useState(1);
    const [isUpdateProduct, setIsUpdateProduct] = useState(false);
    const [isMessage, setIsMessage] = useState(false);
    const [sizeError, setSizeError] = useState(1);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useLayoutEffect(() => {
        if (productView.size) {
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
            setNumberProduct(productView.numberProducts);
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
    };

    const handleClearSize = () => {
        setIsChecked(false);
        setSizeActive(undefined);
        setSizes(dataSizes);
    };

    const handelSelectSize = (e, index) => {
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
            if (newUser) {
                if (isLogin) {
                    await updateUser(newUser);
                }
                await dispatch(
                    setProduct({
                        ...productView,
                        size: selectSize,
                        numberProducts: numberProduct,
                    }),
                );
                await dispatch(setUserCurrent(newUser));
            }
        }
    };
    const handleBuy = () => {
        if (!isChecked) {
            alert('Chọn các tùy chọn cho sản phẩm trước khi bạn thanh toán.');
        } else {
            handleBuyOrAddProduct();
            return navigate(`/buy`);
        }
    };

    const handleAddProduct = () => {
        const isAdd = user.products.every(
            (product) =>
                productView.name != product.name ||
                product.size != selectSize ||
                product.numberProducts != numberProduct,
        );

        setIsMessage(!isAdd);
        if (isAdd) {
            if (!isChecked) {
                alert('Chọn các tùy chọn cho sản phẩm trước khi cho sản phẩm vào giỏ hàng của bạn.');
            } else {
                handleBuyOrAddProduct();
                navigate('/cart');
            }
        } else {
            setSizeError(selectSize);
        }
    };

    return (
        <div className="mt-[100px] max-w-[1140px] mx-auto md:mt-[100px] lg:mt-[10px]">
            <div className="flex items-center bg-[#eeeeee] pl-4 py-2 mb-[10px]">
                <AiOutlineHome className="hover:text-[#030303]" />
                <Link to="/" className="pl-2 text-[#585858] hover:text-[#000000]">
                    Trang chủ{' '}
                </Link>{' '}
                <p>&nbsp; /</p> <p>&nbsp; Chi tiết sản phẩm</p>
            </div>
            {isMessage && (
                <div className="flex justify-between items-center bg-[#f7f5f5] py-2 px-4 border-t-[2px] border-primary my-[25px]">
                    <div className="flex items-center break-all">
                        <RiInformationFill size={18} className="text-primary" />
                        <p>
                            &nbsp;Bạn không thể thêm "{productView.name} - {sizeError}" khác vào giỏ hàng của bạn.
                        </p>
                    </div>
                    <button className="bg-black text-white" onClick={() => navigate('/cart')}>
                        XEM GIỎ HÀNG
                    </button>
                </div>
            )}
            <Product
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
