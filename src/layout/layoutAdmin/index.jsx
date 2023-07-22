import { useEffect, useState } from 'react';

import { BiCategoryAlt } from 'react-icons/bi';
import { IoIosCreate } from 'react-icons/io';
import { IoCaretUpSharp, IoCaretDownSharp } from 'react-icons/io5';
import { FiUsers } from 'react-icons/fi';

import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { NavLink } from 'react-router-dom';
import { Avatar } from '@mui/material';

import { getAllUser } from '@/services/userService';
import { useDispatch, useSelector } from 'react-redux';

const LayoutAdmin = ({ children }) => {
    const dispatch = useDispatch();
    const allUser = useSelector((state) => state.store.allUser);
    const [isShowCategory, setIsShowCategory] = useState(false);
    const [isShowAllUser, setIsShowAllUser] = useState(false);

    useEffect(() => {
        getAllUser(dispatch);
    }, []);

    return (
        <div>
            <Navbar layoutAdmin />
            <div className="max-w-[1140px] mx-auto">
                <div className="grid grid-cols-4 gap-10">
                    <div className="flex flex-col gap-[20px] col-span-1 p-[20px] min-h-[var(--width-leftBar)] bg-[#f5f5f59d]">
                        <NavLink
                            to="/admin/createProduct"
                            className={({ isActive }) =>
                                `flex gap-[5px] items-center text-[18px] p-3 ${
                                    isActive && 'text-base font-medium bg-white rounded-[8px] drop-shadow-ShadowRoot'
                                }`
                            }
                        >
                            <IoIosCreate />
                            <span>Create product</span>
                        </NavLink>
                        <div>
                            <div
                                className="flex justify-between items-center mx-2  cursor-pointer"
                                onClick={() => setIsShowCategory(!isShowCategory)}
                            >
                                <div className="flex gap-[5px] items-center text-[18px]">
                                    <BiCategoryAlt />
                                    <span>Category</span>
                                </div>
                                {!isShowCategory ? <IoCaretUpSharp /> : <IoCaretDownSharp />}
                            </div>
                            {isShowCategory && (
                                <div className="flex flex-col gap-2 ml-[20px]">
                                    <NavLink
                                        to="/admin/category/HOT"
                                        className={({ isActive }) => {
                                            return `p-2 text-[#929292]${
                                                isActive &&
                                                'text-sm font-medium text-black bg-white rounded-[8px] drop-shadow-ShadowRoot'
                                            }`;
                                        }}
                                    >
                                        Sản phẩm bán chạy
                                    </NavLink>
                                    <NavLink
                                        to="/admin/category/Nike"
                                        className={({ isActive }) => {
                                            return `p-2 text-[#929292]${
                                                isActive &&
                                                'text-sm font-medium text-black bg-white rounded-[8px] drop-shadow-ShadowRoot'
                                            }`;
                                        }}
                                    >
                                        Giày Nike
                                    </NavLink>
                                    <NavLink
                                        to="/admin/category/Adidas"
                                        className={({ isActive }) => {
                                            return `p-2 text-[#929292]${
                                                isActive &&
                                                'text-sm font-medium text-black bg-white rounded-[8px] drop-shadow-ShadowRoot'
                                            }`;
                                        }}
                                    >
                                        Giày Adidas
                                    </NavLink>
                                    <NavLink
                                        to="/admin/category/MLB"
                                        className={({ isActive }) => {
                                            return `p-2 text-[#929292]${
                                                isActive &&
                                                'text-sm font-medium text-black bg-white rounded-[8px] drop-shadow-ShadowRoot'
                                            }`;
                                        }}
                                    >
                                        Giày MLB
                                    </NavLink>
                                </div>
                            )}
                        </div>
                        <div>
                            <div
                                className="flex justify-between items-center mx-2 cursor-pointer"
                                onClick={() => setIsShowAllUser(!isShowAllUser)}
                            >
                                <div className="flex gap-[5px] items-center text-[18px]">
                                    <FiUsers />
                                    <span>All user</span>
                                </div>
                                {!isShowAllUser ? <IoCaretUpSharp /> : <IoCaretDownSharp />}
                            </div>
                            {isShowAllUser && (
                                <div className="flex flex-col gap-2 ml-[20px]">
                                    {allUser?.map((user) => (
                                        <NavLink
                                            to={`/admin/user/${user.id}`}
                                            key={user.id}
                                            className={({ isActive }) => {
                                                return `flex gap-2 items-center p-2 text-[#929292]${
                                                    isActive &&
                                                    'text-sm font-medium text-black bg-white rounded-[8px] drop-shadow-ShadowRoot'
                                                }`;
                                            }}
                                        >
                                            <Avatar
                                                alt={user.username}
                                                src={user.linkAvt}
                                                sx={{
                                                    width: 25,
                                                    height: 25,
                                                    fontSize: 16,
                                                    fontWeight: 'lag',
                                                }}
                                            >
                                                {user.username[0].toUpperCase()}
                                            </Avatar>
                                            <span className=" hover:text-primary">{user.username}</span>
                                        </NavLink>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="col-span-3">{children}</div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default LayoutAdmin;
