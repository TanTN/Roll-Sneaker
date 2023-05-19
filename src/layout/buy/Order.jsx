import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AiFillCloseSquare } from 'react-icons/ai';

import { updateUser } from '../../axios/axios';
import { setUserCurrent } from '../../redux/reducer';

const Order = ({ setPriceCart, setAllPrice }) => {
    const userCurrent = useSelector((state) => state.store.userCurrent);
    const isLogin = useSelector((state) => state.store.isLogin)
    const dispatch = useDispatch();

    // price chua co tien ship
    const allPriceCart = useMemo(() => {
        let allPrices;

        const price = userCurrent.products.reduce((all, product) => {
            all = all + parseInt(product.price.split('.').join('')) * parseInt(product.numberProducts);
            return all;
        }, 0);
        const string = price.toString().split('').reverse().join('');
        if (string.length < 7) {
            allPrices = (string.slice(0, 3) + '.' + string.slice(3)).split('').reverse().join('');
        }
        if (7 <= string.length) {
            allPrices = (string.slice(0, 3) + '.' + string.slice(3, 6) + '.' + string.slice(6))
                .split('')
                .reverse()
                .join('');
        }
        return allPrices;
    }, [userCurrent.products.length]);

    // price khi cong them tien ship
    const allPriceAndShip = useMemo(() => {
        let allPriceAndShip;

        const allPrice = parseInt(allPriceCart.split('.').join('')) + 30000;
        const strings = allPrice.toString().split('').reverse().join('');
        if (strings.length < 7) {
            allPriceAndShip = (strings.slice(0, 3) + '.' + strings.slice(3)).split('').reverse().join('');
        }
        if (7 <= strings.length) {
            allPriceAndShip = (strings.slice(0, 3) + '.' + strings.slice(3, 6) + '.' + strings.slice(6))
                .split('')
                .reverse()
                .join('');
        }
        return allPriceAndShip;
    }, [userCurrent.products.length]);

    useEffect(() => {
        setPriceCart(allPriceCart)
        setAllPrice(allPriceAndShip)
    },[userCurrent.products.length])

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

export default Order;
