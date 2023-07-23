import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import ProductHot from '@/components/productRender/productHot';

const ProductHotInMain = () => {
    const allData = useSelector((state) => state.data.dataSneaker);

    const [dataSneaker, setDataSneaker] = useState([]);

    const title = 'SẢN PHẨM BÁN CHẠY';
    
    useEffect(() => {
        const dataHot = allData.filter((product) => product.category === 'HOT');
        setDataSneaker(dataHot);
    }, [allData]);

    return <ProductHot dataSneaker={dataSneaker} title={title} />;
};

export default ProductHotInMain;
