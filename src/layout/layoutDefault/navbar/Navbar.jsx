import React, { memo, useEffect, useState } from 'react';
import { BsCartDash,BsFillArrowUpCircleFill } from 'react-icons/bs';
import { FiMenu } from 'react-icons/fi';
import { IoPersonSharp, IoLogOutOutline, IoPersonAddSharp } from 'react-icons/io5';
import Tippy from '@tippyjs/react/headless';
import {BsChevronDoubleUp} from 'react-icons/bs'


import MenuNavbar from './MenuNavbar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setIsLogin } from '../../../redux/reducer';
import CartTippy from './CartTippy';

const Navbar = ({ setIsOverflow }) => {
    const userCurrent = useSelector(state => state.store.userCurrent)
    const isMobile = useSelector(state => state.store.isMobile)
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [isShowPerson, setIsShowPerson] = useState(false);
    const [isScroll,setIsScroll] = useState(false)
    const [isMenu, setIsMenu] = useState(false);
    const [hideTippy, setHideTippy] = useState(false)

    
    const handleClickMenu = () => {
        setIsMenu(!isMenu);
        setIsOverflow(!isMenu);
    };
    
    const handleShowPerson = () => {
        setIsShowPerson(!isShowPerson);
    };

    const tippy = isMobile && ({visible:isShowPerson,offset:[0,20]})
    const handleSignout = () => {
        dispatch(setIsLogin(false))
        navigate('/')
    }
    const handleSignup = () => {
        navigate('/register')
    }
    const handleClinkHideCart = () => {
        if (isMobile) {
            setHideTippy(!hideTippy)
            setIsOverflow(!hideTippy)
        }
    }

    useEffect(() => {
        const handleScroll = () => {
            if (document.documentElement.scrollTop > 86) {
                setIsScroll(true)
            } else {
                setIsScroll(false)
            }
        }
        window.addEventListener('scroll', handleScroll);
        return () => {window.removeEventListener('scroll', handleScroll)}
    },[document.documentElement.scrollTop])

    const handleScroll = () => {
        document.documentElement.scrollTop = 0
    }

    return (
        <>  
            {isScroll && 
            <div className='fixed flex justify-center items-center z-[100] bottom-[138px] right-[25px] w-[40px] h-[40px] bg-[#474747ab] rounded-[50%] cursor-pointer md:hover:bg-[#333333c5]' onClick={handleScroll}>
                <BsChevronDoubleUp className='text-[20px] text-[#ccc]'/>
            </div>
            }
            <div className='fixed z-[100] bottom-[88px] right-[25px] w-[40px] h-[40px] cursor-pointer'>
                <img src="../../../../public/Retrieve password Zalo.png" alt="zalo" />
            </div>
            <div className='fixed z-[100] bottom-4 right-4 w-[56px] h-[56px] cursor-pointer'>
                <img className='absolute top-0 left-0 z-50' src='../../../../public/22057.png' alt="message" />
                <div className='absolute top-0 left-0 z-10 w-[100%] h-[100%] bg-[#666666] rounded-[50%] animate-fadeInMes1'></div>
                <div className='absolute top-0 left-0 z-20 w-[100%] h-[100%] bg-[#666666] rounded-[50%] animate-fadeInMes2'></div>
            </div>
            <div className="fixed h-[70px] top-0 left-0 right-0 pb-[5px] border-b-2 border-[#e4e4e4] z-30 bg-white md:h-[90px] lg:static">
                <div className="flex justify-between items-center md:mx-auto md:max-w-[1140px] px-[15px]">
                    <div className="flex justify-center my-2 ml-[10px] md:ml-[50px] cursor-pointer" onClick={() => {navigate(`/main/${userCurrent.username}`); window.scrollTo(0,0)}}>
                        <img
                            className="max-h-[50px] w-auto md:min-h-[70px]"
                            src="https://shopgiayreplica.com/wp-content/uploads/2017/01/cropped-cropped-cropped-logo-1-2.png"
                            alt="logo"
                        />
                    </div>
                    <div className="flex justify-end">
                        
                            <CartTippy hideTippy={hideTippy} clickHideCart={handleClinkHideCart}>
                                <div className="relative cursor-pointer px-[12px] md:px-[20px] select-none" onClick={handleClinkHideCart}>
                                    <BsCartDash size={'30px'} className="text-slate-400" />
                                    <div className='absolute top-[-8px] right-[2px] px-[5px] h-[17px] text-[13px] md:right-[10px] md:leading-[19px] leading-[17px] rounded-[25px] bg-primary text-white font-medium text-center'>
                                        {userCurrent.products.length > 0 ? userCurrent.products.length : 0}
                                    </div>
                                </div>
                            </CartTippy>
                        <div>
                            <Tippy
                                offset={[0,30]}
                                delay={[200,300]}
                                onClickOutside={handleShowPerson}
                                placement="bottom"
                                interactive
                                zIndex='20'
                                {...tippy}
                                render={(attrs) => (
                                    <div className="box w-[100%]" tabIndex="-1" {...attrs}>
                                        <div className="bg-white py-4 border-[1px] border-[#e4e4e4] text-c1 leading-[30px] px-[14px] rounded-xm drop-shadow-lg md:px-0">
                                            <div className="flex justify-center items-center pb-1 md:px-[14px] md:mb-2 md:mx-2 md:py-1 border-b-[1px] border-[#d3d3d3]">
                                                <IoPersonSharp className='text-[18px] text-[#222fe2]'/>
                                                <p className='pl-2 font-medium md:text-[23px] leading-[25px] select-none'>{userCurrent.username}</p>
                                            </div>
                                            <div className="flex items-center pb-1 cursor-pointer md:px-[14px] md:mb-2 md:mx-2 md:py-1 md:hover:bg-[#ebeaea] md:rounded-sm" onClick={handleSignout}>
                                                <IoLogOutOutline />
                                                <p className='pl-2 font-medium md:text-lg'>Sign Out</p>
                                            </div>
                                            <div className="flex items-center cursor-pointer md:px-[14px] md:mx-2 md:py-1 md:hover:bg-[#ebeaea] md:rounded-sm" onClick={handleSignup} >
                                                <IoPersonAddSharp />
                                                <p className='pl-2 font-medium md:text-lg'>Sign Up</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                
                            >
                                <div className="px-[5px] mx-[10px] md:px-[20px] md:mr-[20px] cursor-pointer select-none" onClick={handleShowPerson}>
                                    <IoPersonSharp size={'30px'} className="text-slate-400" />
                                </div>
                            </Tippy>
                        </div>
                        <div className="pl-[12px] pr-[10px] lg:hidden md:pr-[50px] cursor-pointer select-none" onClick={handleClickMenu}>
                            <FiMenu size={'30px'} className="text-slate-600" />
                        </div>
                    </div>
                </div>
            </div>
            {!isMobile && (
                <MenuNavbar isMenu={isMenu} isScroll={isScroll} clickMenu={handleClickMenu}/>
            )}
            {isMenu && isMobile &&
            (<MenuNavbar isMenu={isMenu} isScroll={isScroll} clickMenu={handleClickMenu}/>)
            }
            
        </>
    );
};

export default memo(Navbar);
