import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ProductInMain from '@/components/productRender/productInMain';

const Adidas = () => {
    const allData = useSelector((state) => state.data.dataSneaker);

    const [data, setData] = useState([]);

    useEffect(() => {
        const dataAdidas = allData.filter((product) => product.category === 'Adidas');
        setData(dataAdidas);
    }, [allData]);

    return (
        <div className="overflow-hidden mb-[50px] md:mb-[70px]">
            <h1 className="text-center mb-[8px] md:mb-[20px]">GIÀY ADIDAS</h1>
            <div className="text-center font-semibold text-base px-6 md:pb-[15px] md:text-xl">
                <span className="border-b-[1px] pb-u border-[#ce1111] text-[#ce1111]">ULTRABOOST 22</span>
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
        </div>
    );
};

export default Adidas;
