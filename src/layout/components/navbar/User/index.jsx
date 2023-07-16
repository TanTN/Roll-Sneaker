import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Wrapper from '@/components/popper/Wrapper';
import Tippy from '@tippyjs/react/headless';
import { setIsLogin, setUserCurrent } from '@/store/reducerStore';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { deepOrange } from '@mui/material/colors';

const User = () => {
    const isLogin = useSelector((state) => state.store.isLogin);
    const userCurrent = useSelector((state) => state.store.userCurrent);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignOut = () => {
        dispatch(setUserCurrent({ products: [] }));
        dispatch(setIsLogin(false));
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
                                    <Link to="/user" className="hover:text-[#ffffff] cursor-pointer">
                                        Tài khoản
                                    </Link>
                                    <div
                                        className="hover:text-[#ffffff] cursor-pointer mt-[10px] lg:mt-[6px]"
                                        onClick={handleSignOut}
                                    >
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
                                    <Link
                                        to="/register"
                                        className="hover:text-[#ffffff] cursor-pointer mt-[10px] lg:mt-[6px]"
                                    >
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
                            sx={{ height: 30, width: 30, bgcolor: deepOrange[500] }}
                        > {userCurrent.username[0].toUpperCase()}</Avatar>
                    ) : (
                        <Avatar
                            src="https://secureservercdn.net/160.153.137.14/7nh.661.myftpupload.com/wp-content/uploads/2019/11/Untitled-1-24-1536x1415.png"
                            alt="avt"
                            sx={{ height: 30, width: 30 }}
                            className="border-[1px] border-[#a02222]"
                        />
                    )}
                </div>
            </Tippy>
        </div>
    );
};

export default User;
