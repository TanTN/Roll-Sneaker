import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Tippy from '@tippyjs/react/headless';

import { AiFillCloseSquare } from 'react-icons/ai';

import { setProduct, setReloadClickCart } from '@/store/reducerStore';
import priceUtil from '@/utils/priceUtil';
import Wrapper from '@/components/popper/Wrapper';
import { handleDeleteProduct } from '@/utils/deleteProductUtil';
import { Link } from 'react-router-dom';

const Cart = ({ children }) => {
    const userCurrent = useSelector((state) => state.store.userCurrent);
    const isMobile = useSelector((state) => state.store.isMobile);
    const isLogin = useSelector((state) => state.store.isLogin);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [tippyPc, setTippyPc] = useState(false);

    const price = priceUtil(userCurrent);

    useEffect(() => {
        setTippyPc(false);
    }, [tippyPc]);

    const handleFixProduct = (product) => {
        dispatch(setProduct(product));
        dispatch(setReloadClickCart(Math.random() * 100));
        setTippyPc(true);
        navigate('/detailProduct');
        window.scrollTo(0, 0);
    };

    const isTippy = isMobile ? { offset: [0, 8] } : { offset: [-184, 22] };
    const isTippyPc = !isMobile && tippyPc ? { visible: false } : { trigger: 'mouseenter' };
    const hiddenCart = () => {
        setTippyPc(true);
        window.scrollTo(0, 0);
    };

    return (
        <div>
            <Tippy
                delay={[200, 300]}
                placement="bottom"
                interactive
                zIndex="20"
                {...isTippyPc}
                {...isTippy}
                render={(attrs) => (
                    <Wrapper className="overflow-hidden ml-[-5px] lg:ml-0" tabIndex="-1" {...attrs}>
                        <div className="relative h-[100vh] w-[100vw] bg-white drop-shadow-ShadowRoot lg:h-auto lg:max-w-[450px]">
                            {userCurrent.products.length > 0 ? (
                                <>
                                    <div className="cart lg:mb-0 lg:max-h-[33vh] overflow-y-auto">
                                        {userCurrent.products.map((product, index) => (
                                            <div key={index} className="relative">
                                                <div
                                                    className="grid grid-cols-3 md:px-[140px] py-1 border-b-[1px] border-[#bebebe] cursor-pointer hover:border-primary pr-3 text-sm lg:pr-3 lg:pl-0 md:text-lg lg:text-base"
                                                    onClick={() => handleFixProduct(product)}
                                                >
                                                    <div>
                                                        <img
                                                            className="md:w-[90px] md:h-[90px] lg:h-auto lg:w-auto"
                                                            src={product.img}
                                                            alt="photo"
                                                        />
                                                    </div>
                                                    <div className="col-span-2 my-auto">
                                                        <p>{product.name}</p>
                                                        <div className="flex justify-between pt-2">
                                                            <p>
                                                                <span>SIZE: </span>
                                                                <span>{product.size}</span>
                                                            </p>
                                                            <p>
                                                                <span>{product.numberProducts}</span>
                                                                <span className="mx-3">x</span>
                                                                <span>
                                                                    {product.price}
                                                                    <span className="underline">đ</span>
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    className="absolute top-0 left-0 md:left-[100px] md:top-[10px] lg:top-0 lg:left-0 cursor-pointer select-none"
                                                    onClick={() =>
                                                        handleDeleteProduct(product, dispatch, userCurrent, isLogin)
                                                    }
                                                >
                                                    <AiFillCloseSquare className="text-[25px] lg:hover:text-primary" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div>
                                        <div className="text-sm md:text-[17px] text-center py-2 border-t-[1px] border-[#c7c7c7] bg-[#e2e2e2]">
                                            <span className="font-bold">Tổng số phụ: </span>
                                            <span>
                                                {price}
                                                <span className="underline">đ</span>
                                            </span>
                                        </div>
                                        <div className="bg-[#383737] grid grid-cols-2 text-sm md:text-base text-[#e4e4e4]">
                                            <Link
                                                to="/cart"
                                                className="text-center border-r-[1px] border-r-[#d3d3d3] hover:text-white h-[100%] lg:hover:bg-[#000000] py-[6px]"
                                                onClick={hiddenCart}
                                            >
                                                XEM GIỎ HÀNG
                                            </Link>
                                            <Link
                                                to="/buy"
                                                className="text-center h-[100%] lg:hover:bg-[#000000] hover:text-white py-[6px]"
                                                onClick={hiddenCart}
                                            >
                                                THANH TOÁN
                                            </Link>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="bg-white flex drop-shadow-ShadowRoot w-[100%] h-[100%]">
                                    <div className="m-auto">
                                        <div className="p-3 md:pr-0">
                                            <img
                                                className="mx-auto"
                                                src="https://theme.hstatic.net/1000285106/1000912959/14/cart_empty_background.png?v=120"
                                                alt="cart"
                                            />
                                        </div>
                                        <div className="text-center text-sm py-3">
                                            Chưa có sản phẩm nào trong giỏ hàng
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Wrapper>
                )}
            >
                {children}
            </Tippy>
        </div>
    );
};

export default Cart;
