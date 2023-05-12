
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {AiFillCloseSquare} from 'react-icons/ai'
import Tippy from '@tippyjs/react/headless'
import { updateUser } from '../../../utils/axios'
import { setProduct, setUserCurrent } from '../../../redux/reducer'
import { useNavigate } from 'react-router'

const CartTippy = ({children,hideTippy}) => {
    const userCurrent = useSelector(state => state.store.userCurrent)
    const isMobile = useSelector(state => state.store.isMobile)

    const [priceCart,setPriceCart] = useState(undefined)

    const dispatch = useDispatch()
    const navigator = useNavigate()

    useEffect(() => {
        let allPrices;
        const allPrice = userCurrent.products?.reduce((all,product) => {
            all = all + (parseInt(product.price.split('.').join('')) * parseInt(product.numberProducts))
            return all
        },0)
        const string = allPrice?.toString().split('').reverse().join('')
        if (string.length < 7) {
            allPrices = (string.slice(0,3) + '.' + string.slice(3)).split('').reverse().join('')
        }
        if (7 <= string.length) {
            allPrices = (string.slice(0,3) + '.' + string.slice(3,6) + '.' + string.slice(6)).split('').reverse().join('')
        }
        setPriceCart(allPrices)
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
    const handleFixProduct = async(product) => {
        await setHideTippy(true)
        await dispatch(setProduct(product))
        await setHideTippy(true)
        await navigator('/detailProduct')
        await window.scrollTo(0,0)
        
    }

    const isTippy = isMobile && {visible: hideTippy} 
  return (
    <div>
        <Tippy
            delay={[200,300]}
            placement='bottom'
            interactive
            zIndex= '20'
            {...isTippy}
            render={(attrs) => (
                <div className='overflow-hidden ml-[-5px] md:ml-0' tabIndex='-1' {...attrs}>
                <div className='relative h-[100vh] w-[100vw] border-[1px] border-[#ccc] bg-white drop-shadow-ShadowRoot md:h-auto md:max-w-[450px]'>
                {userCurrent.products.length > 0 
                ? 
                    (<>
                        <div className='h-[100vh] mb-[67px] md:mb-0 md:max-h-[34vh] lg:max-h-[33vh] overflow-y-auto'>
                            {userCurrent.products.map((product,index) =>(
                            <div key={index} className='relative' >
                                <div className='grid grid-cols-3 py-1 border-b-[1px] border-[#bebebe] cursor-pointer hover:border-primary pr-3 text-sm md:text-base' onClick={() => handleFixProduct(product)}>
                                    <div>
                                        <img src={product.img} alt="photo" />
                                    </div>
                                    <div className='col-span-2'>
                                        <p>{product.name}</p>
                                        <div className='flex justify-between pt-2'>
                                            <p><span>SIZE: </span><span>{product.size}</span></p>
                                            <p><span>{product.numberProducts}</span><span className='mx-3'>x</span><span>{product.price}<span className='underline'>đ</span></span></p>
                                        </div>
                                    </div>
                                </div>
                                <div className='absolute top-0 left-0 cursor-pointer select-none' onClick={() => handleDeleteProduct(product)}>
                                    <AiFillCloseSquare className='text-[25px] lg:hover:text-primary'/>
                                </div>
                            </div>
                            ))}
                        </div>
                        <div className='absolute left-0 bottom-0 right-0 md:static'>
                            <div className='text-sm md:text-[17px] text-center py-2 border-t-[1px] border-[#c7c7c7] bg-[#e2e2e2]'>
                                <span className='font-bold'>Tổng số phụ: </span><span>{priceCart}<span className='underline'>đ</span></span>
                            </div>
                            <div className='grid grid-cols-2 bg-[#383737] text-center py-1 text-sm md:text-base text-[#e4e4e4]'>
                                    <button className='cursor-pointer'>XEM GIỎ HÀNG</button>
                                    <button className='border-l-[1px] border-[#ccc] cursor-pointer'>THANH TOÁN</button>
                            </div>
                        </div>
                    </>)
                :
                <div className='bg-white drop-shadow-ShadowRoot w-[100%] h-[100%]'>
                    <div className='p-3 pr-8'>
                        <img className=' mx-auto' src="https://th.bing.com/th/id/OIP.wMEWMvtcH9ITnHSDg2vqswHaDm?pid=ImgDet&rs=1" alt="cart" />
                    </div>
                    <div className='text-center text-sm py-3'>Chưa có sản phẩm nào trong giỏ hàng</div>
                </div>
                }
                </div>
                </div>
            )}
        >
            {children}
        </Tippy>
    </div>
  )
}

export default CartTippy