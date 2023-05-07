

import React from 'react'
import { dataSneaker } from '../../../data/dataSneaker'

const ProductHot = () => {
  return (
    <div className='mb-[50px] overflow-hidden'>
        <h1 className='text-center mb-[20px]'>SẢN PHẨM BÁN CHẠY</h1>
        <div className='grid gap-5 grid-cols-2 md:grid-cols-4'>
            {dataSneaker.map((data,index) => 
                <div key={index}>
                    <div className='group/item relative overflow-hidden transition ease-in-out'>
                        <div className=' md:py-4'>
                            <div className='group/edit mx-[-13px] md:mx-[-25px] md:visible md:group-hover/item:invisible'>
                                <img src={data.img} alt="product1" />
                            </div>
                            <div className='group/edit invisible md:group-hover/item:visible absolute left-0 top-0 right-0'>
                                <img width={'100%'} className='transition-all ease-in-out duration-400' src={data.imgHover} alt="product" />
                            </div>
                            <div className='absolute top-0 left-2 bg-primary text-white font-bold w-[50px] h-[50px] text-center leading-[50px] rounded-[50%]'>
                                {data.percent}
                            </div>
                            {data.isDeal && (
                                <div className='absolute top-[18px] left-[67px] shadow-[#b8b8b8] shadow-md text-center rotate-[45deg] bg-primary text-white font-semibold w-[150px]'>
                                    Deal Sốc
                                </div>
                            )}
                        </div>
                        <p className='text-center font-semibold text-[#505050]'>{data.name}</p>
                    </div>
                    <div className='pt-2 text-center'>
                        <span className='text-[15px] font-bold text-[#ce1111]'>{data.price}<span className='underline'>đ</span></span>
                        <span className='text-[14px] pl-2 font-semibold line-through text-[#adadad]'>{data.priceDropped}<span className='underline'>đ</span></span>
                    </div>
                </div>
            )}
        </div>
    </div>
  )
}

export default ProductHot