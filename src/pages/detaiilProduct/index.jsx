import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate} from 'react-router';
import { memo } from 'react';
import { Link } from 'react-router-dom';


import { AiOutlineHome } from 'react-icons/ai';
import { RiInformationFill } from 'react-icons/ri';

import Product from './itemDetailProduct/Product';
import Button from '@/components/button';
import ProductHot from '@/components/productRender/productHot';
import Tips from '../main/product/Tips';


const DetailProduct = () => {
    const dataSneaker = useSelector((state) => state.data.dataSneaker);

    const [isMessage, setIsMessage] = useState(false);
    const [dataProductBestseller, setDataProductBestseller] = useState([]);
    const [sizeError, setSizeError] = useState(1);
    const [productView, setProductView] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // get data product bestseller
    useEffect(() => {
        const productBestSeller = dataSneaker.filter((product) => product.category === 'Bestseller');
        setDataProductBestseller(productBestSeller);
    }, []);

    return (
        <div className="mt-[94px] max-w-[1140px] mx-auto lg:mt-[10px]">

            <div className="flex items-center bg-[#eeeeee] pl-4 py-2 mb-[10px]">
                <AiOutlineHome className="hover:text-[#030303]" />
                <Link to="/" className="pl-2 text-[#585858] hover:text-[#000000] text-sm md:text-base">
                    Trang chủ{' '}
                </Link>{' '}
                <p>&nbsp; /</p> <p>&nbsp; Chi tiết sản phẩm</p>
            </div>

            {isMessage && (
                <div className="flex flex-col md:flex-row justify-between md:items-center bg-[#f7f5f5] py-2 px-4 border-t-[2px] border-primary my-[25px]">
                    <div className="flex items-center break-all md:grow-[5]">
                        <RiInformationFill size={18} className="text-primary hidden md:inline-block" />
                        <p className="break-words text-[14px] ml-1">
                            &nbsp;Bạn không thể thêm "{productView.name} - {sizeError}" khác vào giỏ hàng của bạn.
                        </p>
                    </div>
                    <div className="mt-2 md:grow-[1] md:ml-[15px] md:mt-0">
                        <Button className="bg-black text-white hover-cyan " onClick={() => navigate('/cart')}>
                            XEM GIỎ HÀNG
                        </Button>
                    </div>
                </div>
            )}

            <Product
                handleProductView={{ productView, setProductView }}
                setIsMessage={setIsMessage}
                setSizeError={setSizeError}
            />

            <div className="px-[15px] lg:px-0 pt-[50px]">
                <ProductHot dataSneaker={dataProductBestseller} title={'SẢN PHẨM TƯƠNG TỰ'} isReload />
            </div>

            <Tips />
        </div>
    );
};

export default memo(DetailProduct);
