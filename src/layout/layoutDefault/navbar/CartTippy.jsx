
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {AiFillCloseSquare} from 'react-icons/ai'
import Tippy from '@tippyjs/react/headless'
import { updateUser } from '../../../utils/axios'
import { setProduct, setReloadClickCart, setUserCurrent } from '../../../redux/reducer'
import { useNavigate } from 'react-router'

const CartTippy = ({children,hideTippy,clickHideCart}) => {
    const userCurrent = useSelector(state => state.store.userCurrent)
    const isMobile = useSelector(state => state.store.isMobile)

    const [priceCart,setPriceCart] = useState(undefined)
    const [tippyPc, setTippyPc] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        let allPrices;
        const allPrice = userCurrent.products.reduce((all,product) => {
            all = all + (parseInt(product.price.split('.').join('')) * parseInt(product.numberProducts))
            return all
        },0)
        const string = allPrice.toString().split('').reverse().join('')
        if (string.length < 7) {
            allPrices = (string.slice(0,3) + '.' + string.slice(3)).split('').reverse().join('')
        }
        if (7 <= string.length) {
            allPrices = (string.slice(0,3) + '.' + string.slice(3,6) + '.' + string.slice(6)).split('').reverse().join('')
        }
        setPriceCart(allPrices)
    })

    useEffect(() => {
        setTippyPc(false)
    },[tippyPc])


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
        await dispatch(setProduct(product))
        await clickHideCart()
        await dispatch(setReloadClickCart(Math.random() * 100))
        await setTippyPc(true)
        await navigate('/detailProduct')
        await window.scrollTo(0,0)
        
    }

    const isTippy = isMobile ? {visible: hideTippy,offset:[0,20]} : {offset:[0,30],trigger:'mouseenter' }
    const isTippyPc = !isMobile && tippyPc && {visible:false}
    const handleBuy = async() => {
        await setTippyPc(true)
        await clickHideCart()
        await navigate('/buy')
        await window.scrollTo(0,0)
    }
  return (
    <div>
        <Tippy
            delay={[200,300]}
            placement='bottom'
            interactive
            zIndex= '20'
            {...isTippyPc}
            {...isTippy}
            render={(attrs) => (
                <div className='overflow-hidden ml-[-5px] lg:ml-0' tabIndex='-1' {...attrs}>
                <div className='relative h-[100vh] w-[100vw] border-[1px] border-[#ccc] bg-white drop-shadow-ShadowRoot lg:h-auto lg:max-w-[450px]'>
                {userCurrent.products.length > 0 
                ? 
                    (<>
                        <div className='h-[100vh] mb-[67px] lg:mb-0 lg:max-h-[33vh] lg:h-auto overflow-y-auto'>
                            {userCurrent.products.map((product,index) =>(
                            <div key={index} className='relative' >
                                <div className='grid grid-cols-3 py-1 border-b-[1px] border-[#bebebe] cursor-pointer hover:border-primary pr-3 text-sm md:text-lg lg:text-base' onClick={() => handleFixProduct(product)}>
                                    <div>
                                        <img src={product.img} alt="photo" />
                                    </div>
                                    <div className='col-span-2 my-auto'>
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
                        <div className='absolute left-0 bottom-[67px] right-0 lg:static'>
                            <div>
                                <div className='text-sm md:text-[17px] text-center py-2 border-t-[1px] border-[#c7c7c7] bg-[#e2e2e2]'>
                                    <span className='font-bold'>Tổng số phụ: </span><span>{priceCart}<span className='underline'>đ</span></span>
                                </div>
                                <div className='bg-[#383737] text-center py-[6px] lg:py-2 text-sm md:text-base text-[#e4e4e4] lg:hover:bg-[#252525] cursor-pointer' onClick={handleBuy}>
                                        <button>THANH TOÁN</button>
                                </div>
                            </div>
                        </div>
                    </>)
                :
                <div className='bg-white flex drop-shadow-ShadowRoot w-[100%] h-[100%]'>
                    
                        <div className='my-auto'>
                            <div className='p-3 pr-8'>
                                <img className=' mx-auto' src="https://th.bing.com/th/id/OIP.wMEWMvtcH9ITnHSDg2vqswHaDm?pid=ImgDet&rs=1" alt="cart" />
                            </div>
                            <div className='text-center text-sm py-3'>Chưa có sản phẩm nào trong giỏ hàng</div>
                        </div>
                    
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