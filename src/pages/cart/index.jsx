import React, { useEffect } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import ProductCartPage from './product';
import WrapperBill from '@/components/popper/WrapperBill';
import Bill from './bill';
import { Link } from 'react-router-dom';
import ProductInCartNav from '@/components/productRender/productIncartNav';

const Cart = () => {
    const userCurrent = useSelector((state) => state.store.userCurrent);
    const isMobile = useSelector((state) => state.store.isMobile);
    const allNumberProduct = userCurrent.products.reduce((init, product) => {
        return init + product.numberProducts;
    }, 0);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="mx-auto max-w-[1140px] mt-[94px] xl:mt-0">

            <div className="flex items-center bg-[#eeeeee] pl-4 py-2 mb-[10px]">
                <AiOutlineHome className="hover:text-[#030303]" />
                <Link to="/" className="pl-2 text-[#585858] hover:text-[#000000] cursor-pointer text-sm md:text-base">
                    Trang chủ
                </Link>
                <span>&nbsp; / &nbsp;</span>
                <span> Giỏ hàng</span>
            </div>

            {allNumberProduct == 0 ? (
                
                // no product in cart
                <div className="flex flex-col items-center gap-2 md:gap-3 my-[40px] mx-[10px] md:my-[80px]">
                    <img
                        src="https://theme.hstatic.net/1000285106/1000912959/14/cart_empty_background.png?v=120"
                        alt="noProduct"
                        className="md:w-[350px] md:h-[350px]"
                    />
                    <p className="text-[26px] text-[#575757]">“Hổng” có gì trong giỏ hết</p>
                    <p className="text-center text-[17px]">Về trang cửa hàng để chọn mua sản phẩm bạn nhé!!</p>
                    <Link to="/">
                        <button
                            variant="outlined"
                            className="px-[15px] py-[5px] text-[14px] md:px-[20px] md:py-[10px] md:text-[17px] hover: transition hover:bg-gray-800 hover:text-white border-[1px] border-[#303030]  rounded-[6px]"
                        >
                            Mua sắm ngay
                        </button>
                    </Link>
                </div>
            ) : (
                <>
                    {isMobile ? (
                        // table product on mobile
                        <ProductInCartNav userCurrent={userCurrent} />
                    ) : (
                        // tab;e product on PC
                        <ProductCartPage userCurrent={userCurrent} />
                    )}

                    <div className="flex justify-end">
                        <WrapperBill className={'w-[500px] lg:mx-0'}>
                            <Bill userCurrent={userCurrent} />
                        </WrapperBill>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
