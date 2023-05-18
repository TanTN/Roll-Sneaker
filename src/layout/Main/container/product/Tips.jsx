import Slider from 'react-slick';
import React from 'react';
import { useSelector } from 'react-redux';

import { HiOutlineChevronRight, HiOutlineChevronLeft } from 'react-icons/hi';
import { FaSearch } from 'react-icons/fa';

import dataTips from '../../../../component/data/dataTips';

const Tips = () => {
    const isMobile = useSelector((state) => state.store.isMobile);

    const SampleNextArrow = ({ onClick }) => (
        <div className="nextTip" onClick={onClick}>
            <HiOutlineChevronRight className="icon" />
        </div>
    );
    const SamplePrevArrow = ({ onClick }) => (
        <div className="prevTip" onClick={onClick}>
            <HiOutlineChevronLeft className="icon" />
        </div>
    );
    const options = {
        infinite: true,
        speed: 700,
        slidesToShow: isMobile ? 1 : 3,
        adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: isMobile ? 3000 : 4000,
        arrows: !isMobile && true,
        prevArrow: <SamplePrevArrow />,
        nextArrow: <SampleNextArrow />,
    };

    return (
        <div className="text-center lg:mx-[-15px] md:mb-[60px]">
            <h1 className="pb-6">KIẾN THỨC & MẸO VẶT</h1>
            <Slider {...options}>
                {dataTips.map((data, index) => (
                    <div key={index} className="relative text-center mb-[180px] px-[15px]">
                        <a href={data.href} className="group/item relative lg:hover:opacity-[.5] ">
                            <img className="no-underline w-[100%] h-[100%]" src={data.img} alt="photo" />
                            <div className="group/edit absolute hidden top-[50%] left-[-7%] translate-y-[-35%] animate-fadeInTips lg:group-hover/item:block">
                                <FaSearch className="text-[45px] text-white" />
                            </div>
                        </a>
                        <div className="tips tips-md absolute left-0 right-0 px-[15px]">
                            <a
                                href={data.href}
                                className="no-underline text-lg text-[#353535] font-medium mb-3 md:text-[24px] md:font-normal"
                            >
                                {data.content}
                            </a>
                            <p className="customTip text-gray-500 font-medium md:pt-2">{data.sub}</p>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Tips;
