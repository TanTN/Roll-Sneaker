import Slider from 'react-slick'
import React from 'react'
import { useSelector } from 'react-redux'

import dataTips from '../../../../component/data/dataTips'


const Tips = () => {
    const isMobile = useSelector(state => state.store.isMobile)
    const optionsPc = !isMobile && {
        autoplaySpeed:4000,
        slidesToShow: 3,
    }
    
    const options = {
        infinite: true,
        speed: 700,
        slidesToShow: 1,
        adaptiveHeight: true,
        autoplay:true,
        autoplaySpeed:3000,
        arrows:true,
        ...optionsPc
    }

  return (
    <div className='text-center lg:mx-[-15px] md:mb-[60px]'>
        <h1 className='pb-6'>KIẾN THỨC & MẸO VẶT</h1>
        <Slider {...options}>
            {dataTips.map((data,index) => 
                <div key={index} className='relative text-center mb-[180px] px-[15px]'>
                    <a href={data.href}>
                        <img className='no-underline w-[100%] h-[100%]' src={data.img} alt="photo" />
                    </a>
                    <div className='tips tips-md absolute left-0 right-0 px-[15px]'>
                        <a href={data.href} className='no-underline text-lg text-[#353535] font-medium mb-3 md:text-[24px] md:font-normal'>{data.content}</a>
                        <p className='custom text-gray-500 font-medium md:pt-2'>{data.sub}</p>
                    </div>
                </div>
            )}
        </Slider>
    </div>
  )
}

export default Tips