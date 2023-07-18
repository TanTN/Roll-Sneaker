import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import ProductInMain from '@/components/productRender/productInMain';

const Nike = () => {
    const allData = useSelector((state) => state.data.dataSneaker);

    const [data, setData] = useState([]);

    useEffect(() => {
        const dataNike = allData.filter((product) => product.category === 'Nike');
        setData(dataNike);
    }, []);

    return (
        <div className="overflow-hidden mb-[50px] md:mb-[70px]">
            <h1 className="text-center mb-[8px] md:mb-[20px]">GIÀY NIKE</h1>
            <div className="text-center font-semibold text-base px-6 md:pb-[15px] md:text-xl">
                <span className="border-b-[1px] pb-u border-[#ce1111] text-[#ce1111]">AIR FORCE 1</span>
                <span>
                    <span className="px-[8px] text-gray-400">/</span>JORDAN4
                </span>
                <span>
                    <span className="px-[8px] text-gray-400">/</span>AIR JORDAN
                </span>
            </div>
            <div className="grid gap-5 grid-cols-2 pt-5 md:grid-cols-4 md:gap-10">
                <ProductInMain dataProduct={data} />
            </div>
        </div>
    );
};

export default Nike;
