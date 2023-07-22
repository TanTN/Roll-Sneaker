import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import LoadingImage from '../../loading/loadingImage';
import Image from '@/components/Image';
import { IoIosClose } from 'react-icons/io';
import { deleteProduct } from '../../../services/productService';
import { fetchApiData } from '../../../store/reducerData';

const ProductInMain = ({ dataProduct, category }) => {
    const isLoading = useSelector((state) => state.data.dataPending);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleDeleteProduct = async (e, data) => {
        e.stopPropagation();
        await deleteProduct(data);
        await dispatch(fetchApiData());
    };

    const handleAddProduct = (data) => {
        navigate(`/detailProduct/${data.id}`);
    };
    return isLoading ? (
        <LoadingImage />
    ) : (
        dataProduct?.map((data, index) => (
            <div key={index}>
                <div className="relative cursor-pointer overflow-hidden" onClick={() => handleAddProduct(data)}>
                    <div
                        className={`md:h-[154px] flex items-center overflow-hidden ${
                            category ? 'lg:h-[180px] relative' : 'lg:h-[268px]'
                        }`}
                    >
                        <Image src={data.img} alt="product" className="lg:scale-125 object-cover" />
                        {category && (
                            <div
                                className="absolute flex justify-center items-center top-2 right-2 bg-black hover:bg-primary text-[18px]"
                                onClick={(e) => handleDeleteProduct(e, data)}
                            >
                                <IoIosClose color="white" />
                            </div>
                        )}
                    </div>
                    {data.percent && (
                        <div className="absolute top-2 left-2 bg-primary text-white font-bold w-[50px] h-[50px] text-center leading-[50px] rounded-[50%]">
                            {data.percent}
                        </div>
                    )}
                    <p className="text-center font-semibold cursor-pointer text-[#505050] md:text-[18px] hover:text-[#23527c]">
                        {data.name}
                    </p>
                </div>
                <div className="flex flex-wrap gap-2 md:flex md:flex-col md:gap-0 lg:flex lg:flex-row justify-center items-center mt-2 lg:gap-2 text-center">
                    <div className="text-[15px] font-bold text-[#ce1111] md:text-[18px]">
                        {data.price}
                        <span className="underline">đ</span>
                    </div>
                    {data.priceDropped && (
                        <div className="text-[14px] font-semibold line-through text-[#adadad] md:text-[16px]">
                            {data.priceDropped}
                            <span className="underline">đ</span>
                        </div>
                    )}
                </div>
            </div>
        ))
    );
};

export default ProductInMain;
