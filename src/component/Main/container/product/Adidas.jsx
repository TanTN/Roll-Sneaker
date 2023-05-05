
import React from 'react'
import { dataAdidas } from '../../../data/dataSneaker'

const Adidas = () => {
  return (
    <div className='overflow-hidden mb-[50px]'>
        <h1 className='text-center mb-[8px]'>GIÀY ADIDAS</h1>
        <div className='text-center font-semibold text-base px-6'>
            <span className='border-b-[1px] pb-u border-[#ce1111] text-[#ce1111]'>ULTRABOOST 22</span>
            <span><span className='px-[8px] text-gray-400'>/</span>YEEZY 350 V2</span>
            <span><span className='px-[8px] text-gray-400'>/</span>YEEZY FOAM RUNNER</span>            
            <span><span className='px-[8px] text-gray-400'>/</span>YEEZY SLIDE</span>            
        </div>
        <div className='grid gap-5 grid-cols-2'>
            {dataAdidas.map((data,index) => 
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

export default Adidas