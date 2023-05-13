

import React from 'react'
import ProductHot from './product/ProductHot'
import Nike from './product/Nike'
import Adidas from './product/Adidas'
import Mlb from './product/Mlb'
import Personal from './product/Personal'
import Tips from './product/Tips'


const Container = () => {
  return (
    <div className='mt-[70px] max-w-[1140px] mx-auto md:mt-[90px] lg:mt-0'>
        <div className='pb-[30px] px-[15px] lg:px-0 md:pb-[40px]'>
            <img className=' md:w-[100%]' src="https://shopgiayreplica.com/wp-content/uploads/2023/04/khai-truong-shopnew-hcm.jpg" alt="shop" />
        </div>
        <div className='px-[15px] lg:px-0'>
            <ProductHot />
            <Nike />
            <Adidas />
            <Mlb />
            <Personal />
        </div>
            <Tips />
            
    </div>
  )
}

export default Container