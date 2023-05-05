
import React from 'react'
import {BsCartDash} from 'react-icons/bs'
import {FiMenu} from 'react-icons/fi'

const Navbar = () => {
  return (
    <div className='fixed h-[96px] top-0 left-0 right-0 pb-[5px] border-b-2 border-[#e4e4e4] z-20 bg-white'>
        <div className='flex justify-center py-2'>
            <img className='max-h-[45px] w-auto' src="https://shopgiayreplica.com/wp-content/uploads/2017/01/cropped-cropped-cropped-logo-1-2.png" alt="logo" />
        </div>
        <div className='flex justify-end'>
            <div className='pr-[40px]'>
                <BsCartDash size={'30px'} className='text-slate-400'/>
            </div>
            <div className='pr-[15px]'>
                <FiMenu size={'30px'} className='text-slate-600'/>
            </div>
        </div>
    </div>
  )
}

export default Navbar