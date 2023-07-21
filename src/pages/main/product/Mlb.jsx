import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import ProductInMain from '@/components/productRender/productInMain';

const Mlb = () => {
    const allData = useSelector((state) => state.data.dataSneaker);

    const [data, setData] = useState([]);

    useEffect(() => {
        const dataMlb = allData.filter((product) => product.category === 'MLB');
        setData(dataMlb);
    }, [allData]);
    return (
        <div className="overflow-hidden mb-[50px] md:mb-[70px]">
            <h2 className="text-center mb-[8px] md:mb-[20px]">GIÀY MLB</h2>
            <div className="text-center font-semibold text-base md:pb-[15px] md:text-xl">
                <span className="border-b-[1px] pb-u border-[#ce1111] text-[#ce1111]">GIÀY MLB</span>
            </div>
            <div className="grid gap-5 grid-cols-2 pt-5 md:grid-cols-4 md:gap-10">
                <ProductInMain dataProduct={data} />
            </div>
        </div>
    );
};

export default Mlb;
