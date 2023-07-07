import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Tippy from '@tippyjs/react/headless';

import priceUtil from '@/utils/priceUtil';
import Wrapper from '@/components/popper/Wrapper';
import { Link } from 'react-router-dom';
import Product from './Product';

const Cart = ({ children }) => {
    const userCurrent = useSelector((state) => state.store.userCurrent);
    const isMobile = useSelector((state) => state.store.isMobile);

    const navigate = useNavigate();

    const [tippyPc, setTippyPc] = useState(false);

    const price = priceUtil(userCurrent);

    useEffect(() => {
        setTippyPc(false);
    }, [tippyPc]);

    const isTippy = tippyPc || isMobile ? { visible: false } : { trigger: 'mouseenter' };

    const hiddenCart = () => {
        setTippyPc(true);
        window.scrollTo(0, 0);
    };

    const handleCart = () => {
        if (isMobile) {
            navigate('/cart');
        }
    };

    return (
        <div onClick={handleCart}>
            <Tippy
                delay={[200, 300]}
                placement="bottom"
                interactive
                zIndex="20"
                offset={[-148, 22]}
                {...isTippy}
                render={(attrs) => (
                    <Wrapper className="overflow-hidden ml-[-5px] lg:ml-0" tabIndex="-1" {...attrs}>
                        <div className="relative bg-white drop-shadow-ShadowRoot lg:h-auto lg:max-w-[450px]">
                            {userCurrent.products.length > 0 ? (
                                <>
                                    <div className="cart lg:mb-0 lg:max-h-[33vh] overflow-y-auto">
                                        <Product userCurrent={userCurrent} setTippyPc={setTippyPc} />
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
