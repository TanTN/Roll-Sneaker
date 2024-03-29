import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Wrapper from '@/components/popper/Wrapper';
import Tippy from '@tippyjs/react/headless';
import { setIsLogin, setUserCurrent, setIsAdmin } from '@/store/reducerStore';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';

const User = () => {
    const isLogin = useSelector((state) => state.store.isLogin);
    const isAdmin = useSelector((state) => state.store.isAdmin);
    const userCurrent = useSelector((state) => state.store.userCurrent);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignOut = () => {
        dispatch(setUserCurrent({ products: [] }));
        dispatch(setIsLogin(false));
        dispatch(setIsAdmin(false))
        navigate('/login');
    };

    return (
        <div className="mx-[5px] md:mx-3">
            <Tippy
                delay={[200, 300]}
                placement="bottom"
                interactive
                zIndex="20"
                offset={[0, 18]}
                render={(attrs) => (
                    <div tabIndex="-1" {...attrs}>
                        <Wrapper className="px-3 py-2 z-40 font-medium text-[16px] lg:text-[14px] text-[#d4d4d4] bg-black before:content-[''] before:z-[-1] before:absolute before:left-[var(--offset-box-person)] before:top-[-5px] before:w-[20px] before:h-[20px] before:rotate-[45deg] before:bg-black">
                            {isLogin ? (
                                <div>
                                    {isAdmin && (
                                        <div>
                                            <Link
                                                to="/admin/createProduct"
                                                className="hover:text-[#ffffff] cursor-pointer hidden lg:block"
                                            >
                                                Admin
                                            </Link>
                                        </div>
                                    )}
                                    <div>
                                        <Link to="/user" className="hover:text-[#ffffff] cursor-pointer">
                                            Tài khoản
                                        </Link>
                                    </div>
                                    <div className="hover:text-[#ffffff] cursor-pointer" onClick={handleSignOut}>
                                        Đăng xuất
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div>
                                        <Link to="/login" className="hover:text-[#ffffff] cursor-pointer">
                                            Đăng nhập
                                        </Link>
                                    </div>
                                    <Link to="/register" className="hover:text-[#ffffff] cursor-pointer">
                                        Đăng kí
                                    </Link>
                                </div>
                            )}
                        </Wrapper>
                    </div>
                )}
            >
                <div className="cursor-pointer">
                    {isLogin ? (
                        <Avatar
                            src={userCurrent.linkAvt}
                            alt={userCurrent.username}
                            className="border-[1px] border-[#a02222]"
                            sx={{ height: 30, width: 30 }}
                        >
                            {' '}
                            {userCurrent.username[0].toUpperCase()}
                        </Avatar>
                    ) : (
                        <Avatar alt="avt" sx={{ height: 30, width: 30 }} className="border-[1px] border-[#a02222]" />
                    )}
                </div>
            </Tippy>
        </div>
    );
};

export default User;
