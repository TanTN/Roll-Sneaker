import Slider from 'react-slick'

import React from 'react'
import dataTips from '../../../data/dataTips'

const Tips = () => {
    const options = {
        infinite: true,
        speed: 700,
        slidesToShow: 1,
        adaptiveHeight: true,
        autoplay:true,
        autoplaySpeed:3000,
        
    }

  return (
    <div className='text-center'>
        <h1 className='pb-6'>KIẾN THỨC & MẸO VẶT</h1>
        <Slider {...options}>
            {dataTips.map((data,index) => 
                <div key={index} className='relative text-center mb-[180px] px-[15px] '>
                    <a href={data.href}>
                        <img className='no-underline w-[100%] h-[100%]' src={data.img} alt="photo" />
                    </a>
                    <div className='tips absolute left-0 right-0 px-[15px]'>
                        <a href={data.href} className='no-underline pb-4 text-lg font-medium'>{data.content}</a>
                        <p className='custom po text-gray-500 font-medium'>{data.sub}</p>
                    </div>
                </div>
            )}
        </Slider>
    </div>
  )
}

export default Tips