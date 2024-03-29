import React, { useEffect } from 'react';
import Slider from 'react-slick';
import { useDispatch, useSelector } from 'react-redux';
import { memo } from 'react';

import { HiOutlineChevronRight, HiOutlineChevronLeft } from 'react-icons/hi';

import Nike from './product/Nike';
import Adidas from './product/Adidas';
import Mlb from './product/Mlb';
import Personal from './product/Personal';
import Tips from './product/Tips';
import imagesPoster from '@/data/dataImagesPoster';
import ProductHotInMain from './product/ProductHotInMain';
import { fetchApiData } from '@/store/reducerData';


const Main = () => {
    const isMobile = useSelector((state) => state.store.isMobile);

    const dispatch = useDispatch();
    
    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(fetchApiData());

    }, [])

    // config style button slider previous
    const SamplePrevArrow = ({ onClick }) => {
        return (
            <div
                className="blog hidden absolute justify-center items-center rounded-sm w-[40px] h-[40px] bottom-[5%] right-[10%] z-20 text-white bg-[#0808088c] cursor-pointer"
                onClick={onClick}
            >
                <HiOutlineChevronLeft className="text-white text-2xl" />
            </div>
        );
    };

    // config style button slider next
    const SampleNextArrow = ({ onClick }) => {
        return (
            <div
                className="blog hidden absolute justify-center items-center rounded-sm w-[40px] h-[40px] bottom-[5%] right-[5%] z-20 text-white bg-[#0808088c] cursor-pointer"
                onClick={onClick}
            >
                <HiOutlineChevronRight className="text-white text-2xl" />
            </div>
        );
    };

    // config slider
    const options = {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinity: true,
        speed: 600,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: !isMobile && true,
        prevArrow: <SamplePrevArrow />,
        nextArrow: <SampleNextArrow />,
    };
    
    return (
        <div className="mt-[94px] max-w-[1140px] mx-auto md:mt-[90px] lg:mt-0">
            {/* slider picture */}
            <div className="pb-[30px] px-[15px] lg:px-0 md:pb-[40px]">
                <div className="slide-slick">
                    <Slider {...options}>
                        {imagesPoster.map((img, index) => (
                            <img key={index} src={img} alt="shop" />
                        ))}
                    </Slider>
                </div>
            </div>

            <div className="px-[15px] lg:px-0">
                <ProductHotInMain />
                <Nike />
                <Adidas />
                <Mlb />
                <Personal />
            </div>
            <Tips />
        </div>
    );
};

export default memo(Main);
