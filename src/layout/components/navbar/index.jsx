import React, { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import 'tippy.js/dist/tippy.css';
import { Link } from 'react-router-dom';

import { BsCartDash } from 'react-icons/bs';
import { FiMenu } from 'react-icons/fi';

import MenuNavbar from './MenuNavbar/MenuNavbar';
import Cart from './Cart';
import CSKH from './CSKH/CSKH';
import Search from './Search/Search';
import User from './User';

const Navbar = () => {
    const userCurrent = useSelector((state) => state.store.userCurrent);
    const isMobile = useSelector((state) => state.store.isMobile);
    const [isScroll, setIsScroll] = useState(false);
    const [isMenu, setIsMenu] = useState(false);

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
    };

    return (
        <>
            <CSKH isScroll={isScroll} />

            <div className="fixed h-[94px] top-0 left-0 right-0 pb-[5px] border-b-2 border-[#e4e4e4] z-30 bg-white xl:h-[76px] lg:static">
                <div className="xl:flex justify-between items-center md:mx-auto md:max-w-[1140px] px-[15px]">
                    <div className="flex justify-center items-center my-2 xl:my-2 xl:ml-[50px] cursor-pointer">
                        <Link to="/">
                            <img
                                className="max-h-[40px] xl:min-h-[60px]"
                                src="https://shopgiayreplica.com/wp-content/uploads/2017/01/cropped-cropped-cropped-logo-1-2.png"
                                alt="logo"
                            />
                        </Link>
                    </div>
                    <div className="flex justify-end items-center">
                        <Search />

                        <User />

                        <Cart>
                            <div className="relative text-[26px] cursor-pointer px-[5px] mx-[5px] md:px-[12px] md:mx-0 select-none text-[#797979]">
                                <BsCartDash className="text-slate-400" />
                                <div className="absolute top-[-8px] right-[2px] px-[5px] h-[17px] text-[13px] md:right-[4px] md:leading-[19px] leading-[17px] rounded-[25px] bg-primary text-white font-medium text-center">
                                    {userCurrent.products.length > 0 ? userCurrent.products.length : 0}
                                </div>
                            </div>
                        </Cart>

                        <div
                            className="px-[5px] text-[26px] lg:hidden cursor-pointer select-none"
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
