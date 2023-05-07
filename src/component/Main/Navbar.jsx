
import React, { useState } from 'react'
import {BsCartDash,BsXLg, BsChevronDown} from 'react-icons/bs'
import {FiMenu} from 'react-icons/fi'
import dataNavbar from '../data/dataNavbar'


const Navbar = ({setIsOverflow}) => {
    const [isMenu, setIsMenu] = useState(false)
    const [dataNavbars, setDataNavbars] = useState(dataNavbar)


    const handleClickMenu = () => {
        setIsMenu(!isMenu)
        setIsOverflow(!isMenu)
        setDataNavbars(dataNavbar)
    }
    const handleShowSubs = (data) => {
        const newData = dataNavbars.map(datas => datas.header === data.header
            ? {
                ...datas,
                isActive: !data.isActive} 
            : datas
            )
        setDataNavbars(newData)
    }
    return (
        <>
            <div className='fixed h-[96px] top-0 left-0 right-0 pb-[5px] border-b-2 border-[#e4e4e4] z-10 bg-white'>
                <div className='mx-auto max-w-[1140px]'>
                    <div className='flex justify-center py-2'>
                        <img className='max-h-[45px] w-auto' src="https://shopgiayreplica.com/wp-content/uploads/2017/01/cropped-cropped-cropped-logo-1-2.png" alt="logo" />
                    </div>
                    <div className='flex justify-end'>
                        <div className='pr-[40px]'>
                            <BsCartDash size={'30px'} className='text-slate-400'/>
                        </div>
                        <div className='pr-[15px]' onClick={handleClickMenu}>
                            <FiMenu size={'30px'} className='text-slate-600'/>
                        </div>
                    </div>
                </div>
            </div>

            {isMenu && (
                <div className=''>
                    <div className='fixed w-[100%] top-0 bottom-0 bg-[#292929d5] z-40' onClick={handleClickMenu}>
                    </div>
                    <div className='fixed top-0 bottom-0 bg-black w-[70%] z-40 text-c2 overflow-y-auto'>

                        {dataNavbars.map((data,index) => (
                            <div key={index}>
                                <div className='h-[50px] flex justify-between items-center border-b-[1px] border-[#3030309f] overflow-hidden' onClick={() => handleShowSubs(data)}>
                                    <div className='pl-3 leading-[50px] grow text-[18px] font-semibold border-r-[1px] border-[#3030309f]'>
                                        {data.header}
                                    </div>
                                    {data.subs && 
                                    (
                                        <div className='transition-all ease-linear duration-75 text-white'>
                                            {!data.isActive ? 
                                            (
                                                <div className='text-[20px] px-[15px]'>
                                                    <BsChevronDown />

                                                </div>
                                            )
                                            :
                                                <div className='h-[100%] text-[20px] px-[15px] py-[20px] bg-primary'>
                                                    <BsXLg />
                                                </div>
                                            }
                                        </div>
                                    )}
                                </div>
                                {data.isActive && (
                                    <ul>
                                        {data.subs?.map((sub,index) => (
                                            <li className='pl-3 leading-[50px] grow text-[16px] font-semibold border-b-[1px] border-[#4d4c4c9f] bg-[#2e2e2e9f]'>
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
        </>
    )
}

export default Navbar