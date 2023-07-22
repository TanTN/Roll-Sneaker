import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import ProductInMain from '../../components/productRender/productInMain';
import { Link } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { CiMenuFries } from 'react-icons/ci';
import { fetchApiData } from '../../store/reducerData';

const CreateProductInAdmin = () => {
    const { nameCategory } = useParams();
    const dispatch = useDispatch();
    const [dataProduct, setDataProduct] = useState([]);
    const allData = useSelector((state) => state.data.dataSneaker);
    useEffect(() => {
        const fetchApi = async () => {
            dispatch(fetchApiData());
        };
        fetchApi();
    }, [nameCategory]);
    useEffect(() => {
        const newDataSneaker = allData.filter((product) => product.category === nameCategory);
        setDataProduct(newDataSneaker);
    }, [allData]);
    return (
        <>
            <div className="flex items-center lg:bg-[#eeeeee] pl-4 py-2 mb-[10px]">
                <AiOutlineHome className="hover:text-[#030303]" />
                <Link to="/" className="px-2 text-[#585858] hover:text-[#000000] text-sm md:text-base cursor-pointer">
                    Trang chủ
                </Link>
                <span>/</span>
                <span className="pl-2 text-[#585858]">{`${nameCategory}`}</span>
            </div>
            <div className="flex items-center gap-1 mt-[30px]">
                <CiMenuFries size={15} />
                <h3>{nameCategory === 'HOT' ? 'Sản phẩm bán chạy :' : `Giày ${nameCategory} :`}</h3>
            </div>
            <div className="grid grid-cols-4 gap-10 mt-[10px] mb-[50px]">
                <ProductInMain dataProduct={dataProduct} category />
            </div>
        </>
    );
};

export default CreateProductInAdmin;
