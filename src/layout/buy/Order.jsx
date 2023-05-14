import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {AiFillCloseSquare} from 'react-icons/ai'
import { updateUser } from '../../utils/axios';
import { setUserCurrent } from '../../redux/reducer';

const Order = ({setPriceCart,setAllPrice}) => {
    const dispatch = useDispatch()
    const userCurrent = useSelector((state) => state.store.userCurrent);

    useEffect(() => {
        let allPrices;
        let allPriceAndShip

        const price = userCurrent.products.reduce((all,product) => {
            all = all + (parseInt(product.price.split('.').join('')) * parseInt(product.numberProducts))
            return all
        },0)
        const string = price.toString().split('').reverse().join('')
        if (string.length < 7) {
            allPrices = (string.slice(0,3) + '.' + string.slice(3)).split('').reverse().join('')
        }
        if (7 <= string.length) {
            allPrices = (string.slice(0,3) + '.' + string.slice(3,6) + '.' + string.slice(6)).split('').reverse().join('')
        }
        setPriceCart(allPrices)

        const allPrice = parseInt(allPrices.split('.').join('')) + 30000
        const strings = allPrice.toString().split('').reverse().join('')
        if (strings.length < 7) {
            allPriceAndShip = (strings.slice(0,3) + '.' + strings.slice(3)).split('').reverse().join('')
        }
        if (7 <= strings.length) {
            allPriceAndShip = (strings.slice(0,3) + '.' + strings.slice(3,6) + '.' + strings.slice(6)).split('').reverse().join('')
        }
        setAllPrice(allPriceAndShip)
    })

    const handleDeleteProduct = async (value) => {
        const newProducts = userCurrent.products.filter((product) => product.name !== value.name || product.size !== value.size)

        const newUser = {
            ...userCurrent,
            products:[
                ...newProducts
            ]
        }
        await updateUser(newUser);
        await dispatch(setUserCurrent(newUser));

    }
    return (
        <div className=''>
            <p className='font-bold text-[20px] text-center py-3'>Đơn hàng của bạn</p>
            <div>
                {userCurrent.products.map((product, index) => (
                    <div key={index} className="relative">
                        <div
                            className="grid grid-cols-3 py-1 border-b-[1px] border-[#bebebe] hover:border-primary pr-3 text-sm md:px-[40px] md:text-lg lg:text-base"
                        >
                            <div>
                                <img src={product.img} alt="photo" className='md:w-[130px] md:h-[100px] mx-auto'/>
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
