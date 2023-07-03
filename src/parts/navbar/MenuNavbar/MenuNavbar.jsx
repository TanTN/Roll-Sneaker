import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { BsXLg, BsChevronDown } from 'react-icons/bs';
import { FaAngleDown } from 'react-icons/fa';

import dataMenuNavbars from '../../../data/dataMenuNavbar';

const MenuNavbar = ({ isMenu, clickMenu, isScroll }) => {
    const isMobile = useSelector((state) => state.store.isMobile);

    const [dataMenuNavbar, setDataMenuNavbar] = useState(dataMenuNavbars);

    const handleShowSubs = (value) => {
        const newDataMenuNavbar = dataMenuNavbar.map((data) =>
            data.header === value.header
                ? {
                      ...data,
                      isActive: !value.isActive,
                  }
                : data,
        );
        setDataMenuNavbar(newDataMenuNavbar);
    };

    useEffect(() => {
        setDataMenuNavbar(dataMenuNavbars);
    }, [isMenu]);

    return (
        <div>
            <div
                className={`relative lg:static lg:z-[100] lg:bg-white ${
                    isScroll
                        ? 'lg:fixed lg:top-0 lg:left-0 lg:right-0 lg:bottom-auto lg:border-b-[1px] lg:border-[#ccc]'
                        : ''
                }`}
            >
                <div className="fixed w-[100%] top-0 bottom-0 bg-[#292929d5] z-40 lg:hidden" onClick={clickMenu}></div>
                <div className="fixed top-0 bottom-0 bg-black w-[70%] z-40 text-c2 overflow-y-auto lg:w-[1140px] lg:mx-auto lg:overflow-visible lg:bg-[#ffffff] lg:flex lg:items-center lg:justify-between lg:text-[#202020] lg:border-transparent lg:static lg:h-[50px]">
                    {dataMenuNavbar.map((data, index) => (
                        <div key={index} className="lg:relative group/item ">
                            <div
                                className="h-[50px] flex justify-between items-center border-b-[1px] border-[#3030309f] overflow-hidden lg:border-transparent lg:bg-white"
                                onClick={() => handleShowSubs(data)}
                            >
                                <div
                                    className={`pl-3 ${
                                        index === 0 && 'lg:pl-0'
                                    } leading-[50px] grow text-[18px] font-semibold cursor-pointer border-r-[1px] border-[#3030309f] lg:font-bold lg:border-transparent lg:text-[15px]`}
                                >
                                    {data.header}
                                </div>

                                {data.subs && (
                                    <div className="transition-all ease-linear duration-75 text-white lg:text-black">
                                        {!data.isActive && isMobile ? (
                                            <div className="text-[20px] px-[15px]">
                                                <BsChevronDown />
                                            </div>
                                        ) : data.isActive && isMobile ? (
                                            <div className="h-[100%] text-[20px] px-[15px] py-[20px] bg-primary">
                                                <BsXLg />
                                            </div>
                                        ) : (
                                            <div className="group/edit lg:group-hover/item:rotate-180">
                                                <FaAngleDown />
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {isMobile && data.isActive && (
                                <ul>
                                    {data.subs?.map((sub, index) => (
                                        <li
                                            key={index}
                                            className="pl-3 leading-[50px] grow text-[16px] font-semibold border-b-[1px] border-[#4d4c4c9f] bg-[#2e2e2e9f]"
                                        >
                                            {sub}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {!isMobile && data.subs && (
                                <ul className="group/edit lg:group-hover/item:flex lg:z-[100] lg:hidden lg:absolute lg:top-[100%] lg:py-[10px] lg:left-0  lg:flex-col lg:min-w-[236px] lg:bg-white lg:border-[1px] lg:border-[#e4e4e4] lg:drop-shadow-ShadowRoot">
                                    {data.subs?.map((sub, index) => (
                                        <li
                                            key={index}
                                            className={`pl-3 leading-[50px] grow text-[16px] font-semibold border-b-[1px] cursor-pointer border-[#4d4c4c9f] bg-[#2e2e2e9f] 
                                            ${
                                                index === 0 ? 'lg:border-t-[1px]' : ''
                                            } lg:px-3 lg:border-[#d6d6d6] lg:leading-[40px] lg:w-[100%] lg:text-[14px] lg:bg-white`}
                                        >
                                            {sub}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MenuNavbar;
