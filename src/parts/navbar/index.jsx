import React, { memo, useEffect, useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import TippyContent from '@tippyjs/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import 'tippy.js/dist/tippy.css';

import { BsCartDash } from 'react-icons/bs';
import { FiMenu } from 'react-icons/fi';
import { IoLogOutOutline, IoLogInOutline } from 'react-icons/io5';

import MenuNavbar from './MenuNavbar/MenuNavbar';
import { setIsLogin, setUserCurrent } from '@/store/reducerStore';
import Cart from './Cart/Cart';

import CSKH from './CSKH/CSKH';
import Search from './search/Search';

const Navbar = ({ setIsOverflow }) => {
    const userCurrent = useSelector((state) => state.store.userCurrent);
    const isMobile = useSelector((state) => state.store.isMobile);
    const isLogin = useSelector((state) => state.store.isLogin);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isScroll, setIsScroll] = useState(false);
    const [isMenu, setIsMenu] = useState(false);
    const [hideTippy, setHideTippy] = useState(false);

    let TippyLogin = isLogin ? TippyContent : Tippy;

    useEffect(() => {
        const handleScroll = () => {
            if (document.documentElement.scrollTop > 86) {
                setIsScroll(true);
            } else {
                setIsScroll(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [document.documentElement.scrollTop]);

    const handleClickMenu = () => {
        setIsMenu(!isMenu);
        setIsOverflow(!isMenu);
    };

    const handleSignout = () => {
        dispatch(setUserCurrent({ products: [] }));
        dispatch(setIsLogin(false));
        navigate('/login');
    };

    const handleSignin = () => {
        navigate('/login');
    };

    const handleClinkHideCart = () => {
        if (isMobile) {
            setHideTippy(!hideTippy);
            setIsOverflow(!hideTippy);
        }
    };

    const handleClickLogo = () => {
        if (isLogin) {
            navigate(`/user/${userCurrent.username}`);
            window.scrollTo(0, 0);
        } else {
            navigate('/');
            window.scrollTo(0, 0);
        }
    };

    const tippy = isMobile ? { offset: [0, 15] } : { offset: [0, 26] };
    const nameUser = isLogin && { content: userCurrent?.username };
    return (
        <>
            <CSKH isScroll={isScroll} />

            <div className="fixed h-[100px] top-0 left-0 right-0 pb-[5px] border-b-2 border-[#e4e4e4] z-30 bg-white xl:h-[76px] lg:static">
                <div className="xl:flex justify-between items-center md:mx-auto md:max-w-[1140px] px-[15px]">
                    <div
                        className="flex justify-center mb-4 md:mb-0 items-center my-1 xl:my-2 ml-[10px] md:ml-[50px] cursor-pointer"
                        onClick={handleClickLogo}
                    >
                        <img
                            className="max-h-[40px] w-auto xl:min-h-[60px]"
                            src="https://shopgiayreplica.com/wp-content/uploads/2017/01/cropped-cropped-cropped-logo-1-2.png"
                            alt="logo"
                        />
                    </div>
                    <div className="flex justify-end items-center">
                        <Search />

                        <Cart hideTippy={hideTippy} clickHideCart={handleClinkHideCart}>
                            <div
                                className="relative text-[26px] cursor-pointer px-[12px] md:px-[12px] select-none text-[#797979]"
                                onClick={handleClinkHideCart}
                            >
                                <BsCartDash lassName="text-slate-400" />
                                <div className="absolute top-[-8px] right-[2px] px-[5px] h-[17px] text-[13px] md:right-[4px] md:leading-[19px] leading-[17px] rounded-[25px] bg-primary text-white font-medium text-center">
                                    {userCurrent.products.length > 0 ? userCurrent.products.length : 0}
                                </div>
                            </div>
                        </Cart>

                        <div className="mx-[5px] md:mx-3">
                            <TippyLogin
                                delay={[200, 300]}
                                placement="bottom"
                                interactive
                                zIndex="20"
                                c
                                {...tippy}
                                {...nameUser}
                            >
                                <div
                                    className={`w-[30px] h-[30px] xl:w-[35px] xl:h-[35px] ${
                                        isLogin ? 'border-[2px] border-[#fa2702]' : 'border-[2px] border-[#0c43db70]'
                                    } rounded-[50%] overflow-hidden cursor-pointer`}
                                >
                                    {isLogin ? (
                                        <img
                                            src="https://th.bing.com/th/id/R.d7e8a5a0e3202611f9993389b2cff2b2?rik=M%2bh8H4W0lTmv2w&riu=http%3a%2f%2fcdn.mblrd.com%2fi%2f512-512%2fc%2faHR0cDovL21vYmlsZXJvYWRpZS5jb20vZmlsZXMvMS91cGxvYWRzLzk1Lzk1N2EyYjQ5Yjc1NjQzN2VlMWZlZmNhZDhlOTdlNjQw&ehk=X%2bcKzCvX7qFnl63z%2bekrVVG6xwr1gNhs2%2bMfgm0TnLg%3d&risl=&pid=ImgRaw&r=0"
                                            alt="avt"
                                        />
                                    ) : (
                                        <img
                                            src="https://secureservercdn.net/160.153.137.14/7nh.661.myftpupload.com/wp-content/uploads/2019/11/Untitled-1-24-1536x1415.png"
                                            alt="avt"
                                        />
                                    )}
                                </div>
                            </TippyLogin>
                        </div>

                        <div>
                            <TippyContent
                                content={isLogin ? 'Logout' : 'Login'}
                                delay={[200, 300]}
                                placement="bottom"
                                interactive
                                zIndex="20"
                                offset={[0, 15]}
                            >
                                {isLogin ? (
                                    <div
                                        className="flex text-[26px] md:text-[35px] items-center cursor-pointer px-[5px] md:p-3 text-[#797979] md:hover:text-[#505050] md:rounded-sm"
                                        onClick={handleSignout}
                                    >
                                        <IoLogOutOutline />
                                    </div>
                                ) : (
                                    <div
                                        className="flex text-[26px] md:text-[35px] items-center cursor-pointer px-[5px] md:p-3 text-[#797979] md:hover:text-[#505050] md:rounded-sm"
                                        onClick={handleSignin}
                                    >
                                        <IoLogInOutline />
                                    </div>
                                )}
                            </TippyContent>
                        </div>

                        <div
                            className="px-[5px] text-[26px] lg:hidden md:pr-[50px] cursor-pointer select-none"
                            onClick={handleClickMenu}
                        >
                            <FiMenu className="text-slate-600" />
                        </div>
                    </div>
                </div>
            </div>

            {!isMobile && <MenuNavbar isMenu={isMenu} isScroll={isScroll} clickMenu={handleClickMenu} />}
            {isMenu && isMobile && <MenuNavbar isMenu={isMenu} isScroll={isScroll} clickMenu={handleClickMenu} />}
        </>
    );
};

export default memo(Navbar);
