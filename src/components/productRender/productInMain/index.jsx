import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import Loading from '../../loading/loadingImage'
import Image from '@/components/Image';

const ProductInMain = ({ dataProduct }) => {
    const isLoading = useSelector((state) => state.data.dataPending);
    const navigate = useNavigate();

    const handleAddProduct = (data) => {
        navigate(`/detailProduct/${data.id}`);
    };
    return isLoading ? (
        <Loading />
    ) : (
        dataProduct?.map((data, index) => (
            <div key={index}>
                <div className="relative cursor-pointer overflow-hidden" onClick={() => handleAddProduct(data)}>
                    <div className="lg:h-[268px] flex items-center">
                        <Image src={data.img} alt="product" className="lg:scale-125 object-cover" />
                    </div>
                    <div className="absolute top-2 left-2 bg-primary text-white font-bold w-[50px] h-[50px] text-center leading-[50px] rounded-[50%]">
                        {data.percent}
                    </div>
                    <p className="text-center font-semibold cursor-pointer text-[#505050] md:text-[18px] hover:text-[#23527c]">
                        {data.name}
                    </p>
                </div>
                <div className="pt-2 text-center">
                    <span className="text-[15px] font-bold text-[#ce1111] md:text-[18px]">
                        {data.price}
                        <span className="underline">đ</span>
                    </span>
                    <span className="text-[14px] pl-2 font-semibold line-through text-[#adadad] md:text-[16px] md:pl-5">
                        {data.priceDropped}
                        <span className="underline">đ</span>
                    </span>
                </div>
            </div>
        ))
    );
};

export default ProductInMain;
