

import React from 'react'
import { dataSneaker } from '../../../data/dataSneaker'

const ProductHot = () => {
  return (
    <div className='mb-[50px] overflow-hidden'>
        <h1 className='text-center mb-[8px]'>SẢN PHẨM BÁN CHẠY</h1>
        <div className='grid gap-5 grid-cols-2'>
            {dataSneaker.map((data,index) => 
                <div key={index}>
                    <div className='group/item relative'>
                        <div className='group/edit mx-[-13px] md:visible md:group-hover/item:invisible'>
                            <img src={data.img} alt="product1" />
                        </div>
                        <div className='group/edit invisible md:group-hover/item:visible absolute left-0 top-0 right-0'>
                            <img width={'100%'} src={data.imgHover} alt="product" />
                        </div>
                    </div>
                    <p className='text-center font-semibold text-[#505050]'>{data.name}</p>
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