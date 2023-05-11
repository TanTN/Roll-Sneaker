import React from 'react';
import { contact, otherSneaker, sneaker } from '../../../component/data/dataFooter';
import { AiFillFacebook, AiFillYoutube } from 'react-icons/ai';
import { IoMdShareAlt } from 'react-icons/io';
import { CgPin } from 'react-icons/cg';
import { FiPhoneCall } from 'react-icons/fi';
import { CgMail } from 'react-icons/cg';
import { ImFacebook } from 'react-icons/im';
import { BsInstagram, BsTwitter, BsPinterest } from 'react-icons/bs';

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
                        <div className="">
                            <img
                                width={'100%'}
                                className="h-[180px] object-cover"
                                src="https://scontent.fhan3-3.fna.fbcdn.net/v/t39.30808-6/346613690_126159613763470_5830895161867589867_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=e3f864&_nc_ohc=7etM83QJZCsAX9ixRcx&_nc_ht=scontent.fhan3-3.fna&oh=00_AfCpxdSqEG1OCZd30I_CLDXfm-XC4twWJss85Zfr3tzuZw&oe=6462C3DB"
                                alt="img"
                            />
                        </div>
                        <a
                            className="flex items-center absolute top-[10px] left-[25px]"
                            href="https://www.facebook.com/102066926119211"
                        >
                            <img
                                width={'54px'}
                                src="https://scontent.fhan4-2.fna.fbcdn.net/v/t39.30808-6/346480777_933392947870969_26884514567005255_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=0M2pcGeRjaQAX-q0ZKf&_nc_ht=scontent.fhan4-2.fna&oh=00_AfAPokgIFhdx8Tx3dT42lIwUoudSwrxbp3u012iEMk-LIw&oe=6462DDCA"
                                alt="img"
                            />
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
                                <div className="flex bg-white text-gray-800 items-center p-[2px] rounded-[2px]">
                                    <AiFillFacebook />
                                    <p className="pl-1">Theo dõi Trang</p>
                                </div>
                            </a>
                            <a
                                className="absolute bottom-3 right-6 md:bottom-[40%]"
                                href="https://www.facebook.com/sharer/sharer.php?app_id=776730922422337&u=https%3A%2F%2Fwww.facebook.com%2F102066926119211&display=popup&ref=plugin&src=page"
                            >
                                <div className="flex bg-white text-gray-800 items-center p-[2px] rounded-[2px]">
                                    <IoMdShareAlt />
                                    <p className="pl-1">Chia sẻ</p>
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
                        <p className="pl-1 md:text-[15px] text-[13px] text-[#969595] pb-1">0961.055.755</p>
                    </div>
                    <div className="flex items-center">
                        <div className="flex justify-center w-[20px]">
                            <CgMail className="text-xl text-[#969595]" />
                        </div>
                        <p className="pl-1 md:text-[15px] text-[13px] text-[#969595] pb-1">
                            shopgiayreplicahn@gmail.com
                        </p>
                    </div>
                </div>
                <div className="flex py-5 border-b-[1px] border-[#969595] justify-center text-gray-400">
                    <div className="px-2">
                        <ImFacebook />
                    </div>
                    <div className="px-2">
                        <BsInstagram />
                    </div>
                    <div className="px-2">
                        <BsTwitter />
                    </div>
                    <div className="px-2">
                        <AiFillYoutube />
                    </div>
                    <div className="px-2">
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

export default Footer;
