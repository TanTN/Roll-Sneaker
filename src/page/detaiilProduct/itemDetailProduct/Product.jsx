import React from 'react';
import { FcOk } from 'react-icons/fc';
import { AiOutlineHome } from 'react-icons/ai';
import { useSelector } from 'react-redux';

import HowToSelect from './HowToSelect';

const Product = ({
    handleBackHome,
    handleClearSize,
    handleMinusNumber,
    handleIncreaseNumber,
    handleAddProduct,
    handleBuy,
    handelSelectSize,
    isChecked,
    sizes,
    sizeActive,
    numberProduct,
    isAddSuccess,
    isUpdateProduct,
}) => {
    const productView = useSelector((state) => state.store.viewProduct);

    return (
        <>
            <div
                className="flex items-center bg-[#eeeeee] pl-4 py-2 mb-[10px] cursor-pointer "
                onClick={handleBackHome}
            >
                <AiOutlineHome className="hover:text-[#030303]" />
                <p className="pl-2 text-[#585858] hover:text-[#000000]">Trang chủ</p>
            </div>
            <div className="px-[15px] lg:px-0">
                <div className="lg:grid lg:grid-cols-11">
                    <div className="col-span-5">
                        <img src={productView.img} alt="img" />
                    </div>
                    <div className=" col-span-6">
                        <div className="text-[27px] font-medium pb-4">{productView.name}</div>
                        <div className="flex items-end">
                            <span className="flex items-center text-[28px] font-bold text-primary">
                                {productView.price}
                                <span className="underline text-[20px] font-medium leading-[28px] pl-2">đ</span>
                            </span>
                            <span className="line-through pb-[6px] pl-4 text-[17px] text-c2 font-semibold">
                                {productView.priceDropped}
                                <span className="underline">đ</span>
                            </span>
                        </div>
                        <div className="flex py-3 md:items-center">
                            <div className="relative md:leading-0 leading-[33px]">
                                <p className="font-semibold pb-2">SIZE:</p>
                                {isChecked && (
                                    <p
                                        className="text-c1 cursor-pointer absolute left-0 top-[35px] md:top-[26px]"
                                        onClick={handleClearSize}
                                    >
                                        Xóa
                                    </p>
                                )}
                            </div>
                            <div className="flex pl-6 flex-wrap">
                                {sizes.map((data, index) => (
                                    <div key={index} className="pl-2 pb-2">
                                        <div
                                            className={`flex cursor-pointer w-[40px] border-[1px] border-[#ccc] ${
                                                sizeActive === index ? 'border-[1px] border-primary' : ''
                                            }`}
                                        >
                                            <label
                                                htmlFor={data.size}
                                                className="text-[18px] m-y-auto select-none w-[100%] leading-[30px] text-center text-c1 cursor-pointer md:hover:bg-[#e7e7e7d8]"
                                            >
                                                {data.size}
                                            </label>
                                            <input
                                                hidden
                                                type="checkbox"
                                                id={data.size}
                                                value={data.size}
                                                name={data.size}
                                                onChange={(e) => handelSelectSize(e, index)}
                                                checked={data.isChecked}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="text-[18px] mt-2">
                            <p className="">
                                <span>Số lượng:</span>
                                <span
                                    className="select-none ml-3 px-3 border-[1px] border-[#ccc] cursor-pointer lg:hover:bg-[#e7e7e7]"
                                    onClick={handleMinusNumber}
                                >
                                    -
                                </span>
                                <span className="mx-3">{numberProduct}</span>
                                <span
                                    className="select-none px-3 border-[1px] border-[#ccc] cursor-pointer lg:hover:bg-[#e7e7e7]"
                                    onClick={handleIncreaseNumber}
                                >
                                    +
                                </span>
                            </p>
                        </div>
                        <div className="flex pt-4 pb-2">
                            <button
                                className={`text-white py-[6px] px-3 text-[14px] font-medium ${
                                    isChecked
                                        ? 'bg-primary hover:bg-[#e24e4e] hover:transition hover:duration-[0.7s]'
                                        : 'bg-[#ad83a5] cursor-not-allowed'
                                }`}
                                onClick={handleAddProduct}
                            >
                                {!isUpdateProduct && (isAddSuccess ? 'ĐÃ THÊM VÀO GIỎ HÀNG' : 'THÊM VÀO GIỎ HÀNG')}
                                {isUpdateProduct && (isAddSuccess ? 'ĐÃ SỬA LAI SẢN PHẨM' : 'SỬA LAI SẢN PHẨM')}
                            </button>

                            <button
                                className="bg-[#414141] ml-1 text-white py-[6px] px-3 text-[14px] hover:transition hover:duration-[0.7s] font-medium lg:hover:bg-[#00d1b7]"
                                onClick={handleBuy}
                            >
                                {isAddSuccess ? 'THANH TOÁN' : 'MUA NGAY'}
                            </button>
                        </div>
                        {isAddSuccess && (
                            <div>
                                <button
                                    className="bg-[#52b4cc] text-white py-[6px] px-3 text-[14px] hover:transition hover:duration-[0.7s] font-medium lg:hover:bg-[#00d1b7]"
                                    onClick={handleBackHome}
                                >
                                    QUAY TRỞ LẠI CỬA HÀNG
                                </button>
                            </div>
                        )}

                        <div className="border-[1px] border-dashed border-primary p-[15px] mt-3">
                            <p className="text-[18px] font-bold">
                                Sôi Động Khuyến Mãi Dịp Tết 2023 <span className="text-primary">Siêu Sale 35%</span>
                            </p>
                            <ul>
                                <li className="py-[5px] leading-6">
                                    <FcOk className="inline-block text-[20px]" />
                                    <span className="pl-2 text-[18px]">
                                        Cam kết chất lượng như hình ảnh, video đăng tải trên Web
                                    </span>
                                </li>
                                <li className="py-[5px] leading-6">
                                    <FcOk className="inline-block text-[20px]" />
                                    <span className="pl-2 text-[18px]">Double Box kèm chống sốc khi giao hàng</span>
                                </li>
                                <li className="py-[5px] leading-6">
                                    <FcOk className="inline-block text-[20px]" />
                                    <span className="pl-2 text-[18px]">
                                        Giao hàng nhanh 60 phút trong nội thành Hà Nội và tp Hcm
                                    </span>
                                </li>
                                <li className="py-[5px] leading-6">
                                    <FcOk className="inline-block text-[20px]" />
                                    <span className="pl-2 text-[18px]">
                                        Nhận hàng và kiểm tra trước khi thanh toán.
                                    </span>
                                </li>
                                <li className="py-[5px] leading-6">
                                    <FcOk className="inline-block text-[20px]" />
                                    <span className="pl-2 text-[18px]">Hỗ Trợ đổi trả size linh hoạt</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <HowToSelect />
            </div>
        </>
    );
};

export default Product;
