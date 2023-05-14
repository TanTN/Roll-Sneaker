

import React from 'react'
import Slider from 'react-slick'
import {HiOutlineChevronRight,HiOutlineChevronLeft} from 'react-icons/hi'

import ProductHot from './product/ProductHot'
import Nike from './product/Nike'
import Adidas from './product/Adidas'
import Mlb from './product/Mlb'
import Personal from './product/Personal'
import Tips from './product/Tips'
import imagesPoster from '../../../component/data/dataImagesPoster'
import { useSelector } from 'react-redux'


const Container = () => {
  const isMobile = useSelector(state => state.store.isMobile)

  const options = {
    slidesToShow: 1,
    slidesToScroll: 1,
    infinity: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed:3000,
    arrows: !isMobile && true,
    prevArrow:<button type="button" data-role="none" class="slick-arrow slick-prev" style="display: block;"> 
      <HiOutlineChevronLeft class='icon'/>
    </button>,
      
    nextArrow:<button type="button" data-role="none" class="slick-arrow slick-next" style="display: block;"> 
      <HiOutlineChevronRight class='icon'/>
    </button>
  }
  return (
    <div className='mt-[70px] max-w-[1140px] mx-auto md:mt-[90px] lg:mt-0'>
        <div className='pb-[30px] px-[15px] lg:px-0 md:pb-[40px]'>
          <div className='slide-slick'>
            <Slider
              {...options}
              
            >
              {imagesPoster.map((img,index) =>
                <img className='w-[100%]' key={index} src={img} alt="shop" />
                )}
            </Slider>
          </div>
            
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