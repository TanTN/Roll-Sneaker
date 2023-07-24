import React, { memo } from 'react';

import { AiFillFacebook, AiFillYoutube } from 'react-icons/ai';
import { IoMdShareAlt } from 'react-icons/io';
import { CgPin, CgMail } from 'react-icons/cg';
import { FiPhoneCall } from 'react-icons/fi';
import { ImFacebook } from 'react-icons/im';
import { BsInstagram, BsTwitter, BsPinterest } from 'react-icons/bs';

import { contact, otherSneaker, sneaker } from '@/data/dataFooter';
import imgAvatar from '@/assets/images/cropped-logo-roll-sneaker.png';
import imgPoster from '@/assets/images/blog.jpg';

const Footer = () => {
    return (
        <div className="bg-black">
            <div className="max-w-[1140px] mx-auto">
                <div className="grid grid-cols-2 gap-5 px-[20px] py-8 md:grid-cols-9 md:gap-3 md:pt-[80px] md:pb-[50px]">
                    {sneaker.map((data, index) => (
                        <div key={index} className="col-span-1 md:col-span-2">
                            <p className="text-lg font-semibold pb-3 text-[#c2c2c2]">{data.header}</p>
                            <ul>
                                {data.content.map((data, index) => (
                                    <li key={index} className="text-[#969595] pb-1 md:leading-[19px] md:pb-[12px]">
                                        {data}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {otherSneaker.map((data, index) => (
                        <div key={index} className="col-span-1 md:col-span-2">
                            <p className="text-lg font-semibold pb-3 text-[#c2c2c2]">{data.header}</p>
                            <ul>
                                {data.content.map((data, index) => (
                                    <li key={index} className="text-[#969595] pb-1 md:leading-[19px] md:pb-[12px]">
                                        {data}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {contact.map((data, index) => (
                        <div key={index} className="col-span-2">
                            <p className="text-lg font-semibold pb-3 text-[#c2c2c2]">{data.header}</p>
                            <ul>
                                {data.content.map((data, index) => (
                                    <li key={index} className="text-[#969595] pb-1 md:leading-[19px] md:pb-[12px]">
                                        {data}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    <div className="relative text-white px-[15px] col-span-2 md:col-span-3">
                        <img width={'100%'} className="h-[180px] object-cover" src={imgPoster} alt="img" />
                        <a
                            className="flex items-center absolute top-[10px] left-[25px]"
                            href="https://www.facebook.com/102066926119211"
                        >
                            <div className="bg-white w-[54px] h-[50px] px-[2px] py-[15px]">
                                <img src={imgAvatar} alt="img" className="w-[100%] h-[100%]" />
                            </div>
                            <div className="pl-2">
                                <p className="font-semibold text-lg text-[#e2ff7a]">Shop giày Rep Hà Nội</p>
                                <p className="font-medium text-sm text-slate-100">189 người theo dõi</p>
                            </div>
                        </a>
                        <div className="flex justify-between px-[15px]">
                            <a
                                className="absolute bottom-3 left-6 md:bottom-[40%]"
                                href="https://www.facebook.com/102066926119211"
                            >
                                <div className="flex gap-1 bg-white text-gray-800 items-center px-[4px] py-[2px] rounded-[2px]">
                                    <AiFillFacebook />
                                    <p className="text-sm">Theo dõi Trang</p>
                                </div>
                            </a>
                            <a
                                className="absolute bottom-3 right-6 md:bottom-[40%]"
                                href="https://www.facebook.com/sharer/sharer.php?app_id=776730922422337&u=https%3A%2F%2Fwww.facebook.com%2F102066926119211&display=popup&ref=plugin&src=page"
                            >
                                <div className="flex gap-1 bg-white text-gray-800 items-center px-[4px] py-[2px] rounded-[2px]">
                                    <IoMdShareAlt />
                                    <p className="text-sm">Chia sẻ</p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-2 text-slate-200 px-[15px]">
                    <p className="text-lg font-semibold pb-3 text-[#c2c2c2]">THÔNG TIN SHOP</p>
                    <div className="flex items-center">
                        <div className="flex justify-center w-[20px]">
                            <CgPin className="text-lg text-[#969595]" />
                        </div>
                        <p className="pl-1 md:text-[15px] text-[13px] text-[#969595] pb-1">
                            Tầng 4 - 161 Chùa Láng - Đống Đa - Hà Nội (Giờ Làm Việc từ 8am - 10pm)
                        </p>
                    </div>
                    <div className="flex items-center">
                        <div className="flex justify-center w-[20px]">
                            <FiPhoneCall className="text-[#969595]" />
                        </div>
                        <p className="pl-1 md:text-[15px] text-[13px] text-[#969595] pb-1">0964.033.455</p>
                    </div>
                    <div className="flex items-center">
                        <div className="flex justify-center w-[20px]">
                            <FiPhoneCall className="text-[#969595]" />
                        </div>
                        <p className="pl-1 md:text-[15px] text-[13px] text-[#969595] pb-1">08.22222.555</p>
                    </div>
                    <div className="flex items-center">
                        <div className="flex justify-center w-[20px]">
                            <CgPin className="text-lg text-[#969595]" />
                        </div>
                        <p className="pl-1 md:text-[15px] text-[13px] text-[#969595] pb-1">
                            150/37 Đặng Văn Ngữ - Phường 14 - Phú Nhuận - HCM (Giờ Làm Việc từ 8am - 10pm)
                        </p>
                    </div>
                    <div className="flex items-center">
                        <div className="flex justify-center w-[20px]">
                            <FiPhoneCall className="text-[#969595]" />
                        </div>
                        <a href="tel:0961055755" className="pl-1 md:text-[15px] text-[13px] text-[#969595] pb-1">
                            0961.055.755
                        </a>
                    </div>
                    <div className="flex items-center">
                        <div className="flex justify-center w-[20px]">
                            <CgMail className="text-xl text-[#969595]" />
                        </div>
                        <a
                            href="mailTo:shopgiayreplicahn@gmail.com"
                            className="pl-1 md:text-[15px] text-[13px] text-[#969595] pb-1"
                        >
                            shopgiayreplicahn@gmail.com
                        </a>
                    </div>
                </div>

                <div className="flex py-5 border-b-[1px] border-[#969595] justify-center text-gray-400">
                    <div className="px-2 hover:text-[#ccc] cursor-pointer">
                        <ImFacebook />
                    </div>
                    <div className="px-2 hover:text-[#ccc] cursor-pointer">
                        <BsInstagram />
                    </div>
                    <div className="px-2 hover:text-[#ccc] cursor-pointer">
                        <BsTwitter />
                    </div>
                    <div className="px-2 hover:text-[#ccc] cursor-pointer">
                        <AiFillYoutube />
                    </div>
                    <div className="px-2 hover:text-[#ccc] cursor-pointer">
                        <BsPinterest />
                    </div>
                </div>
                <div className="text-gray-500 text-center text-sm py-3">
                    Copyright © 2018 by Shopgiayreplica.com™ . All Rights Reserved.
                </div>
            </div>
        </div>
    );
};

export default memo(Footer);
