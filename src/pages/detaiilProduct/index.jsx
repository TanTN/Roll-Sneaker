import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { memo } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import { AiOutlineHome } from 'react-icons/ai';
import { RiInformationFill } from 'react-icons/ri';

import { updateUser } from '@/services/userService';
import dataSizes from '@/data/dataSizes';
import Product from './itemDetailProduct/Product';
import { setUserCurrent, setProduct } from '@/store/reducerStore';
import { Link } from 'react-router-dom';
import Button from '@/components/button';
import ProductHot from '@/components/productRender/productHot';
import Tips from '../main/product/Tips';

const baseURL = import.meta.env.VITE_BASE_URL;
const httpRequest = axios.create({
    baseURL: baseURL,
});

const DetailProduct = () => {
    const { productId } = useParams();
    const user = useSelector((state) => state.store.userCurrent);
    const productViewInStore = useSelector((state) => state.store.viewProduct);
    const isLogin = useSelector((state) => state.store.isLogin);
    const dataSneaker = useSelector((state) => state.data.dataSneaker);

    const [productView, setProductView] = useState({});
    const [dataProductBestseller, setDataProductBestseller] = useState([]);
    const [sizes, setSizes] = useState(dataSizes);

    const [selectSize, setSelectSize] = useState(undefined);
    const [sizeActive, setSizeActive] = useState(undefined);
    const [isChecked, setIsChecked] = useState(false);
    const [numberProduct, setNumberProduct] = useState(1);
    const [isUpdateProduct, setIsUpdateProduct] = useState(false);
    const [isMessage, setIsMessage] = useState(false);
    const [sizeError, setSizeError] = useState(1);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const productBestSeller = dataSneaker.filter((product) => product.category === 'Bestseller');
        setDataProductBestseller(productBestSeller);
    }, []);
    console.log(productView)

    useEffect(() => {
        const getDataProductView = async () => {
            if (productId) {
                const dataProductView = await httpRequest.get(`data/${productId}`);
                setProductView(dataProductView.data);
            } else {
                setProductView(productViewInStore);
            }
        };
        getDataProductView();

    }, [productId]);

    useEffect(() => {
        if (productView.size) {
            console.log('sasa')
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
    }, [productView]);

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
        const productChange = {
            ...productView,
            size: selectSize,
            numberProducts: numberProduct,
        }
        const indexUpdateSize = user.products.findIndex(
            (prod) => prod.name == productView.name && prod.size == selectSize,
        );
        const indexUpdateProduct = user.products.findIndex(
            (prod) => prod.name == productView.name && prod.size == productView.size,
        );

        if (isChecked) {
            let newUser;
            // update product in cart
            if (indexUpdateProduct !== -1 || 0) {
                const newProduct = [...user.products];

                newProduct[indexUpdateProduct] = productChange;
                newUser = {
                    ...user,
                    products: newProduct,
                };
            }
            // update size product in cart
            if ((indexUpdateSize !== -1 || 0) && !isUpdateProduct) {
                if (!isUpdateProduct) {
                    const newProduct = [...user.products];

                    newProduct[indexUpdateSize] = productChange;
                    newUser = {
                        ...user,
                        products: newProduct,
                    };
                }
            }
            // add product
            if (indexUpdateSize == -1 && !isUpdateProduct) {
                newUser = {
                    ...user,
                    products: [
                        ...user.products,
                        {
                            ...productChange,
                            id:uuidv4(),
                        },
                    ],
                };
            }
            // start updating
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
        if (!isChecked) {
            alert('Chọn các tùy chọn cho sản phẩm trước khi cho sản phẩm vào giỏ hàng của bạn.');
        }

        if (isAdd) {
            if (isChecked) {
                handleBuyOrAddProduct();
                navigate('/cart');
            }
        } else {
            if (isChecked) {
                setIsMessage(!isAdd);

                setSizeError(selectSize);
            }
        }
    };

    return (
        <div className="mt-[100px] max-w-[1140px] mx-auto md:mt-[100px] lg:mt-[10px]">
            <div className="flex items-center bg-[#eeeeee] pl-4 py-2 mb-[10px]">
                <AiOutlineHome className="hover:text-[#030303]" />
                <Link to="/" className="pl-2 text-[#585858] hover:text-[#000000] text-sm md:text-base">
                    Trang chủ{' '}
                </Link>{' '}
                <p>&nbsp; /</p> <p>&nbsp; Chi tiết sản phẩm</p>
            </div>
            {isMessage && (
                <div className="flex flex-col md:flex-row justify-between md:items-center bg-[#f7f5f5] py-2 px-4 border-t-[2px] border-primary my-[25px]">
                    <div className="flex items-center break-all md:grow-[5]">
                        <RiInformationFill size={18} className="text-primary hidden md:inline-block" />
                        <p className="break-words text-[14px] ml-1">
                            &nbsp;Bạn không thể thêm "{productView.name} - {sizeError}" khác vào giỏ hàng của bạn.
                        </p>
                    </div>
                    <div className="mt-2 md:grow-[1] md:ml-[15px] md:mt-0">
                        <Button className="bg-black text-white hover-cyan " onClick={() => navigate('/cart')}>
                            XEM GIỎ HÀNG
                        </Button>
                    </div>
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
                productView={productView}
            />
            <div className="px-[15px] lg:px-0 pt-[50px]">
                <ProductHot dataSneaker={dataProductBestseller} title={'SẢN PHẨM TƯƠNG TỰ'} isReload/>
            </div>
            <Tips />
        </div>
    );
};

export default memo(DetailProduct);
