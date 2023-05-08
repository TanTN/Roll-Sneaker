import React, { memo, useState } from 'react';
import { BsCartDash } from 'react-icons/bs';
import { FiMenu } from 'react-icons/fi';
import { IoPersonSharp, IoLogOutOutline, IoPersonAddSharp } from 'react-icons/io5';
import Tippy from '@tippyjs/react/headless';


import MenuNavbar from './MenuNavbar';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setIsLogin } from '../../../redux/reducer';

const Navbar = ({ setIsOverflow }) => {
    const [isShowPerson, setIsShowPerson] = useState(false);
    const [isMenu, setIsMenu] = useState(false);
    const isMobile = useSelector(state => state.store.isMobile)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const handleClickMenu = () => {
        setIsMenu(!isMenu);
        setIsOverflow(!isMenu);
    };
    
    const handleShowPerson = () => {
        setIsShowPerson(!isShowPerson);
    };

    const tippy = isMobile && ({visible:isShowPerson})
    const handleSignout = () => {
        dispatch(setIsLogin(false))
        navigate('/login')
    }
    const handleSignup = () => {
        navigate('/register')
    }

    
    return (
        <>
            <div className="fixed h-[96px] top-0 left-0 right-0 pb-[5px] border-b-2 border-[#e4e4e4] z-30 bg-white">
                <div className="md:mx-auto md:max-w-[1140px] px-[15px]">
                    <div className="flex justify-center py-2">
                        <img
                            className="max-h-[45px] w-auto"
                            src="https://shopgiayreplica.com/wp-content/uploads/2017/01/cropped-cropped-cropped-logo-1-2.png"
                            alt="logo"
                        />
                    </div>
                    <div className="flex justify-end">
                        <div className="">
                            <BsCartDash size={'30px'} className="text-slate-400" />
                        </div>
                        <div>
                            <Tippy
                                {...tippy}
                                offset={[0, 3]}
                                delay={[200,300]}
                                onClickOutside={handleShowPerson}
                                placement="bottom"
                                render={(attrs) => (
                                    <div className="box w-[100%]" tabIndex="-1" {...attrs}>
                                        <div className="bg-white py-4 border-[1px] border-[#e4e4e4] text-c1 leading-[30px] px-[14px] rounded-xm drop-shadow-lg md:px-0">
                                            <div className="flex items-center pb-1 cursor-pointer md:px-[14px] md:mb-2 md:mx-2 md:py-1 md:hover:bg-[#ebeaea] md:rounded-sm" onClick={handleSignout}>
                                                <IoLogOutOutline />
                                                <p className='pl-2 font-medium md:text-lg'>Sign Out</p>
                                            </div>
                                            <div className="flex items-center cursor-pointer md:px-[14px] md:mx-2 md:py-1 md:hover:bg-[#ebeaea] md:rounded-sm" onClick={handleSignup} >
                                                <IoPersonAddSharp />
                                                <p className='pl-2 font-medium md:text-lg'>Sign Up</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                interactive
                            >
                                <div className="px-[15px]" onClick={handleShowPerson}>
                                    <IoPersonSharp size={'30px'} className="text-slate-400" />
                                </div>
                            </Tippy>
                        </div>
                        <div className="" onClick={handleClickMenu}>
                            <FiMenu size={'30px'} className="text-slate-600" />
                        </div>
                    </div>
                </div>
            </div>
            <MenuNavbar isMenu={isMenu} clickMenu={handleClickMenu}/>
            
        </>
    );
};

export default memo(Navbar);
