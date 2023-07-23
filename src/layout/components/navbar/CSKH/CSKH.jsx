import React, { useState } from 'react';
import { animateScroll as scroll } from 'react-scroll';

import { BsChevronDoubleUp, BsXLg, BsTelephoneFill } from 'react-icons/bs';
import { IoIosPin } from 'react-icons/io';

import messenger from '@/assets/images/messenger.png';
import zalo from '@/assets/images/Zalo.png';
import zaloshow from '@/assets/images/zaloshow.jpg';

const CSKH = ({ isScroll }) => {
    const [zaloShow, setZaloShow] = useState(false);
    const [messengerShow, setMessengerShow] = useState(false);

    const handleShowZalo = () => {
        setZaloShow(true);
    };
    const handleHiddenZalo = () => {
        setZaloShow(false);
    };

    const handleShowMessenger = () => {
        setMessengerShow(true);
    };
    const handleHiddenMessenger = () => {
        setMessengerShow(false);
    };
    return (
        <>
            {isScroll && (
                <div
                    className="fixed flex justify-center items-center z-[100] bottom-[138px] right-[25px] w-[40px] h-[40px] bg-[#474747ab] rounded-[50%] cursor-pointer md:hover:bg-[#333333c5]"
                    onClick={() => scroll.scrollToTop(0)}
                >
                    <BsChevronDoubleUp className="text-[20px] text-[#ccc]" />
                </div>
            )}

            {zaloShow && (
                <div className="fixed h-screen w-screen text-[#444444] z-[100] transition-all">
                    <div className="fixed bg-[#292929cc] h-[100vh] w-[100vw]" onClick={handleHiddenZalo}></div>

                    <div className="fixed origin-bottom-right bottom-[138px] right-[25px] w-[150px] px-[15px] py-[12px] rounded-[6px] bg-slate-50">
                        <div className="flex items-center mb-3 cursor-pointer">
                            <img src={zaloshow} alt="zaloshow" width={25} className="mr-2" />
                            <p className="text-[13px]">Zalo Hà Nội</p>
                        </div>
                        <div className="flex items-center cursor-pointer">
                            <img src={zaloshow} alt="zaloshow" width={25} className="mr-2" />
                            <p className="text-[13px]">Zalo HCM</p>
                        </div>
                        <BsXLg size={18} className="absolute top-1 right-1 cursor-pointer" onClick={handleHiddenZalo} />
                    </div>
                </div>
            )}
            {messengerShow && (
                <div className="fixed h-screen w-screen  z-[200]">
                    <div className="fixed bg-[#292929cc] h-[100vh] w-[100vw]" onClick={handleHiddenMessenger}></div>

                    <div className="fixed text-[#444] bottom-[88px] right-[25px] w-[350px] px-[15px] py-[12px] rounded-[6px] bg-slate-50">
                        <div className="flex items-center mb-3 cursor-pointer">
                            <div className="flex rounded-[50%] text-white bg-[#bd0d0d] justify-center items-center w-[30px] h-[30px]">
                                <BsTelephoneFill />
                            </div>
                            <p className="text-[13px] ml-2">Hà Nội: 0964.033.455</p>
                        </div>
                        <div className="flex items-center mb-3 cursor-pointer">
                            <div className="flex rounded-[50%] text-white bg-[#bd0d0d] justify-center items-center w-[30px] h-[30px]">
                                <BsTelephoneFill />
                            </div>
                            <p className="text-[13px] ml-2">HCM: 0961.055.755</p>
                        </div>
                        <div className="flex items-center mb-3 cursor-pointer">
                            <div className="flex rounded-[50%] text-white bg-[#bd0d0d] justify-center items-center w-[30px] h-[30px]">
                                <BsTelephoneFill />
                            </div>
                            <p className="text-[13px] ml-2">CSKH - Phản ánh Sản Phẩm/Dịch Vụ: 08.22222.555</p>
                        </div>

                        <div className="flex items-center mb-3 cursor-pointer">
                            <div>
                                <div className="flex rounded-[50%] text-white bg-[#fdbb04] justify-center items-center w-[30px] h-[30px]">
                                    <IoIosPin size={20} />
                                </div>
                            </div>
                            <p className="text-[13px] ml-2 ">Địa chỉ HN: 119 Ngõ 4 Đặng Văn Ngữ - Đống Đa - Hà Nội</p>
                        </div>
                        <div className="flex items-center mb-3 cursor-pointer">
                            <div>
                                <div className="flex rounded-[50%] text-white bg-[#fdbb04] justify-center items-center w-[30px] h-[30px]">
                                    <IoIosPin size={20} />
                                </div>
                            </div>
                            <p className="text-[13px] ml-2 grow-1">
                                Địa chỉ HCM: 150/37 Đặng Văn Ngữ - Phường 14 - Phú Nhuận - HCM
                            </p>
                        </div>

                        <div className="flex items-center mb-3 cursor-pointer">
                            <img src={messenger} alt="zaloshow" width={30} />
                            <p className="text-[13px] ml-2">Fanpage Hồ Chí Minh</p>
                        </div>
                        <div className="flex items-center mb-3 cursor-pointer">
                            <img src={messenger} alt="zaloshow" width={30} />
                            <p className="text-[13px] ml-2">Fanppage Hà Nội</p>
                        </div>

                        <BsXLg
                            size={18}
                            className="absolute top-1 right-1 cursor-pointer"
                            onClick={handleHiddenMessenger}
                        />
                    </div>
                </div>
            )}

            <div
                className="fixed z-[100] bottom-[88px] right-[25px] w-[40px] h-[40px] cursor-pointer"
                onClick={handleShowZalo}
            >
                <img src={zalo} alt="zalo" />
            </div>

            <div
                className="fixed z-[100] bottom-4 right-4 w-[56px] h-[56px] cursor-pointer"
                onClick={handleShowMessenger}
            >
                {messengerShow ? (
                    <div className="flex justify-center items-center text-white bg-[#0478fd] absolute top-0 left-0 z-50 border-[1px] w-[100%] h-[100%] rounded-[50%] z-60">
                        <BsXLg className="" size={27} />
                    </div>
                ) : (
                    <img
                        src={messenger}
                        alt="messenger"
                        className="absolute top-0 left-0 z-50 border-[1px] border-[#fff] rounded-[50%]"
                    />
                )}
                <div className="absolute top-0 left-0 z-10 w-[100%] h-[100%] bg-[#666666] rounded-[50%] animate-fadeInMes1"></div>
                <div className="absolute top-0 left-0 z-20 w-[100%] h-[100%] bg-[#666666] rounded-[50%] animate-fadeInMes2"></div>
            </div>
        </>
    );
};

export default CSKH;
