import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AiFillCloseSquare } from 'react-icons/ai';

import { updateUser } from '@/services/userService';
import { setUserCurrent } from '@/store/reducer';
import allPriceUtils from '@/utils/allPriceUtils';

const ProductBuy = ({ setPriceCart, setAllPrice }) => {
    const userCurrent = useSelector((state) => state.store.userCurrent);
    const isLogin = useSelector((state) => state.store.isLogin);
    const dispatch = useDispatch();

    const {allPriceAndShip,allPriceCart} = allPriceUtils(userCurrent)

    useEffect(() => {
        setPriceCart(allPriceCart);
        setAllPrice(allPriceAndShip);
    }, [userCurrent.products.length]);

    const handleDeleteProduct = async (value) => {
        const newProducts = userCurrent.products.filter(
            (product) => product.name !== value.name || product.size !== value.size,
        );

        const newUser = {
            ...userCurrent,
            products: [...newProducts],
        };
        if (isLogin) {
            await updateUser(newUser);
        }
        await dispatch(setUserCurrent(newUser));
    };
    return (
        <div className="">
            <p className="font-bold text-[20px] text-center py-3">Đơn hàng của bạn</p>
            <div>
                {userCurrent.products.map((product, index) => (
                    <div key={index} className="relative">
                        <div className="grid grid-cols-3 py-1 border-b-[1px] border-[#bebebe] hover:border-primary pr-3 text-sm md:px-[40px] md:text-lg lg:text-base">
                            <div>
                                <img src={product.img} alt="photo" className="md:w-[130px] md:h-[100px] mx-auto" />
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
                            className="absolute top-0 left-0 cursor-pointer select-none md:left-[60px]"
                            onClick={() => handleDeleteProduct(product)}
                        >
                            <AiFillCloseSquare className="text-[25px] lg:hover:text-primary" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductBuy;
