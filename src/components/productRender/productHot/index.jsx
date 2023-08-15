import React from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

import LoadingImage from '@/components/loading/loadingImage';
import Image from '@/components/Image';

const ProductHot = ({ dataSneaker, title, isReload }) => {
    const isLoading = useSelector((state) => state.data.dataPending);
    const navigate = useNavigate();


    const handleNavigateProductDetail = async (data) => {
        await navigate(`/detailProduct/${data.id}`);

        // reload when click product in the product detail page
        if (isReload) await location.reload();
    };

    return (
        <div className="mb-[50px] overflow-hidden md:mb-[70px]">
            <h2 className="text-center mb-[20px] md:mb-[40px]">{title}</h2>

            <div className="grid gap-5 grid-cols-2 md:grid-cols-4 md:gap-10">
                {isLoading ? (
                    <LoadingImage />
                ) : (
                    dataSneaker?.map((data, index) => (
                        <div key={index}>

                            <div className="group/item relative cursor-pointer" onClick={() => handleNavigateProductDetail(data)}>
                                <div className="lg:h-[268px] overflow-hidden">
                                    
                                    <div className="group/edit lg:visible lg:group-hover/item:invisible lg:w-[100%] lg:h-[100%] flex items-center">
                                        <img src={data.img} alt="product1" className="lg:scale-125 object-cover" />
                                    </div>
                                    
                                    <div className="group/edit hidden lg:group-hover/item:block overflow-hidden absolute left-0 top-0 right-0 ">
                                        <Image
                                            className="lg:group-hover/item:animate-fadeInImg object-cover"
                                            src={data.imgHover}
                                            alt="product"
                                        />
                                    </div>
                                    
                                </div>

                                <div className="absolute top-2 left-2 bg-primary text-white font-bold w-[50px] h-[50px] text-center leading-[50px] rounded-[50%]">
                                    {data.percent}
                                </div>

                                {data.isDeal && (
                                    <div className="absolute top-0 right-0 block overflow-hidden w-[var(--width-box-deal)] h-[var(--width-box-deal)] md:w-[var(--width-box-deal-md)] md:h-[var(--width-box-deal-md)]">
                                        <div className="absolute text-sm top-[15px] left-[-2px] w-[var(--width-deal)] shadow-[#b8b8b8] shadow-md text-center rotate-[45deg] bg-primary text-white font-semibold md:w-[var(--width-deal-md)] md:top-[16px] md:left-[1px] md:text-base lg:text-lg">
                                            Deal Sốc
                                        </div>
                                    </div>
                                )}

                                <p className="text-center font-semibold text-[#505050] md:text-[18px] hover:text-[#23527c] cursor-pointer">
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
                )}
                
            </div>
        </div>
    );
};

export default ProductHot;
