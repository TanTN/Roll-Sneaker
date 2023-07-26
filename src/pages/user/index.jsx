import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar } from '@mui/material';

import { RiSmartphoneFill } from 'react-icons/ri';
import { AiFillHome, AiOutlineHome } from 'react-icons/ai';
import { IoIosClose } from 'react-icons/io';

import { setUserCurrent } from '@/store/reducerStore';
import { updateUser } from '@/services/userService';

const User = () => {
    const userCurrent = useSelector((state) => state.store.userCurrent);

    const dispatch = useDispatch();

    const [isRoomAvatar, setIsRoomAvatar] = useState(false);
    const [avatar, setAvatar] = useState({
        file: null,
        link: userCurrent.linkAvt,
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        return () => URL.revokeObjectURL(avatar.link);
    }, [avatar.link]);

    const handleViewAvatar = (e) => {
        const file = e.target.files[0];
        setAvatar(() => ({ file, link: URL.createObjectURL(file) }));
    };

    const handleChangeAvatar = () => {

        const CLOUD_NAME = 'duyc4qzad';
        const PRESET_NAME = 'upload-avatar';
        const FOLDER_NAME = 'Assets';

        const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

        const formData = new FormData();

        formData.append('upload_preset', PRESET_NAME);
        formData.append('folder', FOLDER_NAME);
        formData.append('file', avatar.file);

        axios
            .post(api, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((res) => {
                const newUser = { ...userCurrent, linkAvt: res.data.url };
                dispatch(setUserCurrent(newUser));
                updateUser(newUser);
            })
            .catch((err) => console.log(err));
    };

    return (
        <>
            {/* zoom avatar */}
            {isRoomAvatar && avatar.link && (
                <div className="flex justify-center items-center fixed z-[200] top-0 left-0 bottom-0 right-0 m-auto">
                    <div
                        className="absolute z-[-1] top-0 left-0 bottom-0 right-0 bg-[#141414e0]"
                        onClick={() => {
                            setIsRoomAvatar(false);
                        }}
                    />
                    <div className="relative min-w-[100%] h-[70%] md:min-w-[800px] md:h-[90%]">
                        <img src={avatar.link} className="w-[100%] h-[100%] object-cover" />
                        <div
                            className="absolute flex justify-center items-center top-[2%] right-[2%] bg-black text-[15px] md:text-[25px] lg:hover:bg-primary lg:hover:cursor-pointer"
                            onClick={() => setIsRoomAvatar(false)}
                        >
                            <IoIosClose color="white" />
                        </div>
                    </div>
                </div>
            )}

            <div className="mx-auto max-w-[1140px] mt-[94px] lg:mt-0">

                <div className="flex items-center bg-[#eeeeee] pl-4 py-2 mb-[10px]">
                    <AiOutlineHome className="hover:text-[#030303]" />
                    <Link
                        to="/"
                        className="pl-2 text-[#585858] hover:text-[#000000] cursor-pointer text-sm md:text-base"
                    >
                        Trang chủ
                    </Link>
                    <span>&nbsp; / &nbsp;</span>
                    <span>Trang cá nhân</span>
                </div>

                <section className="grid grid-cols-6 md:mx-[20px] lg:mx-0 my-[30px] lg:my-[70px] max-w-[1140px]">
                    
                    {/* content left */}
                    <div className="hidden md:block col-span-2 border-r-[1px] border-[#ddd]">
                        <h2>TRANG TÀI KHOẢN</h2>
                        <p className="my-2 text-lg">Xin chào, {userCurrent.username}!</p>
                    </div>

                    {/* content right */}
                    <div className="flex flex-col gap-[20px] col-span-6 px-[10px] md:col-span-4 md:pl-[40px]">
                        <h2>TÀI KHOẢN</h2>

                        <Avatar
                            src={avatar.link}
                            className="cursor-pointer relative border-[1px] border-[#a02222]"
                            sx={{ height: 55, width: 55, fontSize: 26, fontWeight: 'lag' }}
                            alt={userCurrent.username}
                            onClick={() => {
                                if (avatar.link) setIsRoomAvatar(true);
                            }}
                        >
                            {userCurrent.username[0].toUpperCase()}
                        </Avatar>

                        <div className="flex">
                            <label
                                htmlFor="inputAvt"
                                className="px-[8px] py-[2px] text-[14px] border-[1px] border-black text-black rounded-[5px] cursor-pointer hover:bg-black hover:text-white transition mr-2"
                            >
                                Thay Avatar
                            </label>

                            <input type="file" id="inputAvt" onChange={handleViewAvatar} hidden />

                            <button
                                className="px-[8px] py-[2px] text-[14px] bg-primary border-[1px] border-primary hover:hover-primary text-white rounded-[5px] transition"
                                onClick={handleChangeAvatar}
                            >
                                Lưu ảnh
                            </button>

                        </div>

                        <p className="text-[18px]">
                            Tên tài khoản: <span className="font-medium">{userCurrent.username}</span>!
                        </p>

                        <div className="flex items-center">
                            <AiFillHome />
                            <p className="px-1 text-[18px]">Địa chỉ: Vietnam</p>
                        </div>

                        <div className="flex items-center">
                            <RiSmartphoneFill />
                            <p className="px-1 text-[18px]">Điện thoại: {userCurrent.phone}</p>
                        </div>

                        <h2>ĐƠN HÀNG CỦA BẠN:</h2>
                        
                    </div>
                </section>
            </div>
        </>
    );
};

export default User;
