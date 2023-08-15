import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { AiFillCaretDown } from "react-icons/ai";

import ProductInMain from '@/components/productRender/productInMain';
import Button from '@/components/button';


const Adidas = () => {

    const allData = useSelector((state) => state.data.dataSneaker);

    const [data, setData] = useState([]);

    let numberShowProduct = 8;

    useEffect(() => {
        const dataAdidas = allData.filter((product) => product.category === 'Adidas');
        setData(dataAdidas.slice(0, numberShowProduct));
    }, [allData]);

    const handleLoadMoreProduct = () => {
        if (numberShowProduct < data.length) {
            numberShowProduct += 4
        }
    }

    return (
        <div className="overflow-hidden mb-[50px] md:mb-[70px]">
            
            <h2 className="text-center mb-[8px] md:mb-[20px]">GIÀY ADIDAS</h2>
            <div className="text-center font-semibold text-base px-6 md:pb-[15px]">
                <span className="border-b-[1px] border-[#ce1111] text-[#ce1111]">ULTRABOOST 22</span>
                <span>
                    <span className="px-[8px] text-gray-400">/</span>YEEZY 350 V2
                </span>
                <span>
                    <span className="px-[8px] text-gray-400">/</span>YEEZY FOAM RUNNER
                </span>
                <span>
                    <span className="px-[8px] text-gray-400">/</span>YEEZY SLIDE
                </span>
            </div>

            <div className="grid gap-5 grid-cols-2 pt-5 md:grid-cols-4 md:gap-10">
                <ProductInMain dataProduct={data} />
            </div>
            <div className='flex justify-center mt-[30px]'>
                <Button className="flex gap-1 items-center border-[1px] border-black hover:bg-black hover:text-white transition" onClick={handleLoadMoreProduct}>
                    Xem thêm
                    <AiFillCaretDown className='text-cyan'/>
                </Button>
            </div>
        </div>
    );
};

export default Adidas;
