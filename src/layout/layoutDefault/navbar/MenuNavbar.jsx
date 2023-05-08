import React, { useEffect, useState } from 'react';
import { BsCartDash, BsXLg, BsChevronDown } from 'react-icons/bs';

import dataNavbar from '../../../component/data/dataNavbar';

const MenuNavbar = ({ isMenu, clickMenu }) => {
    const [dataNavbars, setDataNavbars] = useState(dataNavbar);
    const handleShowSubs = (data) => {
        const newData = dataNavbars.map((datas) =>
            datas.header === data.header
                ? {
                      ...datas,
                      isActive: !data.isActive,
                  }
                : datas,
        );
        setDataNavbars(newData);
    };
    useEffect(() => {
        setDataNavbars(dataNavbar);
    }, [isMenu]);
    return (
        <div>
            {isMenu && (
                <div className="">
                    <div className="fixed w-[100%] top-0 bottom-0 bg-[#292929d5] z-40" onClick={clickMenu}></div>
                    <div className="fixed top-0 bottom-0 bg-black w-[70%] z-40 text-c2 overflow-y-auto">
                        {dataNavbars.map((data, index) => (
                            <div key={index}>
                                <div
                                    className="h-[50px] flex justify-between items-center border-b-[1px] border-[#3030309f] overflow-hidden"
                                    onClick={() => handleShowSubs(data)}
                                >
                                    <div className="pl-3 leading-[50px] grow text-[18px] font-semibold border-r-[1px] border-[#3030309f]">
                                        {data.header}
                                    </div>
                                    {data.subs && (
                                        <div className="transition-all ease-linear duration-75 text-white">
                                            {!data.isActive ? (
                                                <div className="text-[20px] px-[15px]">
                                                    <BsChevronDown />
                                                </div>
                                            ) : (
                                                <div className="h-[100%] text-[20px] px-[15px] py-[20px] bg-primary">
                                                    <BsXLg />
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                                {data.isActive && (
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
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MenuNavbar;
