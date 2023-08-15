import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { AiFillCaretDown } from "react-icons/ai";

import Button from '@/components/button';
import ProductHot from '@/components/productRender/productHot';

const ProductHotInMain = () => {
    const allData = useSelector((state) => state.data.dataSneaker);

    const [dataSneaker, setDataSneaker] = useState([]);
    const [numberShowProduct, setNumberShowProduct] = useState(4);
    const [dataNikeLength, setDataNikeLength] = useState();

    const title = 'SẢN PHẨM BÁN CHẠY';

    useEffect(() => {
        const dataHot = allData.filter((product) => product.category === 'HOT');
        setDataNikeLength(dataHot.length);
        setDataSneaker(dataHot.slice(0, numberShowProduct));
    }, [numberShowProduct,allData]);

    const handleLoadMoreProduct = () => {
        if (numberShowProduct < dataNikeLength) {
            setNumberShowProduct(numberShowProduct + 4)
        }
    }

    return (
        <>
            <ProductHot dataSneaker={dataSneaker} title={title} />
            <div className="flex justify-center mt-[-40px] mb-[70px]">
                <Button
                    className={`flex gap-1 items-center border-[1px] border-black hover:bg-black hover:text-white transition ${numberShowProduct >= dataNikeLength ? 'bg-black text-white' : 'bg-white text-black'}`}
                    onClick={handleLoadMoreProduct}
                >
                    Xem thêm
                    <AiFillCaretDown className="text-cyan" />
                </Button>
            </div>
        </>
    );
};

export default ProductHotInMain;
