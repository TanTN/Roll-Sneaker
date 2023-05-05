
import React from 'react'
import { dataMlb } from '../../../data/dataSneaker'

const Mlb = () => {
  return (
    <div className='overflow-hidden mb-[50px]'>
        <h1 className='text-center mb-[8px]'>GIÀY MLB</h1>
        <div className='text-center font-semibold text-base'>
            <span className='border-b-[1px] pb-u border-[#ce1111] text-[#ce1111]'>GIÀY MLB</span>
            
        </div>
        <div className='grid gap-5 grid-cols-2'>
            {dataMlb.map((data,index) => 
                <div key={index}>
                    <div className='mx-[-13px]'>
                        <img className='' src={data.img} alt="product" />
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

export default Mlb