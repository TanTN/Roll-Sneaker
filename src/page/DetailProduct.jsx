import React, { useState } from 'react';
import ProductHot from '../component/Main/container/product/ProductHot';
import Tips from '../component/Main/container/product/Tips';
import dataSizes from '../component/data/dataSizes';
import { FcOk } from 'react-icons/fc';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../utils/axios';
import { setUserCurrent } from '../redux/reducer';

const DetailProduct = () => {
    const [sizes, setSizes] = useState(dataSizes);
    const [selectSize, setSelectSize] = useState(undefined);
    const [sizeActive, seSizeActive] = useState(undefined);
    const [isChecked, seIChecked] = useState(false);
    const [isProduct, setIsProduct] = useState(false)

    const product = useSelector((state) => state.store.viewProduct);
    const user = useSelector((state) => state.store.userCurrent);
    const dispatch = useDispatch();

    useState(() => {
        const isHref = window.location.href.slice(-13)
        if(isHref === 'detailProduct') {
            setIsProduct(true)
        } else {
            setIsProduct(false)

        }
    })
    const handelSelectSize = (e, index) => {
        const { value, checked } = e.target;
        setSelectSize(value);
        seSizeActive(index);
        seIChecked(true);
        const newSizes = sizes.map((size) =>
            size.size === value ? { ...size, isChecked: checked } : { ...size, isChecked: !checked },
        );
        setSizes(newSizes);
    };
    const handleClearSize = () => {
        seIChecked(false);
        const newSizes = sizes.map((size) => ({ ...size, isChecked: false }));
        seSizeActive(undefined);
        setSizes(newSizes);
    };
    const handleAddProduct = async () => {
        if (isChecked) {
            const newUser = {
                ...user,
                products: [
                    ...user.products,
                    {
                        ...product,
                        size: selectSize,
                    },
                ],
            };
            console.log(newUser);
            await updateUser(newUser);
            await dispatch(setUserCurrent(newUser));
        }
    };
    return (
        <div className="mt-[66px] max-w-[1140px] mx-auto lg:mt-[30px] ">
            <div className="px-[15px] lg:px-0">
                <div className="lg:flex lg:justify-between">
                    <div>
                        <img src={product.img} alt="img" />
                    </div>
                    <div className="">
                        <div className="text-[27px] font-medium pb-4">{product.name}</div>
                        <div className="flex items-end">
                            <span className="flex items-center text-[28px] font-bold text-primary">
                                {product.price}
                                <span className="underline text-[20px] font-medium leading-[28px] pl-2">đ</span>
                            </span>
                            <span className="line-through pb-[6px] pl-4 text-[17px] text-c2 font-semibold">
                                {product.priceDropped}
                                <span className="underline">đ</span>
                            </span>
                        </div>
                        <div className="flex pt-3">
                            <div>
                                <p className="font-semibold pb-2">SIZE</p>
                                {isChecked && (
                                    <p className="text-c1" onClick={handleClearSize}>
                                        Xóa
                                    </p>
                                )}
                            </div>
                            <div className="flex pl-6 flex-wrap">
                                {sizes.map((data, index) => (
                                    <div key={index} className={`pl-2 pb-2`}>
                                        <div
                                            className={`flex grow cursor-pointer justify-center w-[40px] border-[1px] border-[#ccc] ${
                                                sizeActive === index
                                                    ? 'border-[1px] border-primary drop-shadow-ShadowRoot'
                                                    : ''
                                            }`}
                                        >
                                            <label
                                                htmlFor={data.size}
                                                className="text-[18px] w-[100%] leading-[40px] text-center text-c1 cursor-pointer hover:bg-[#e7e7e7]"
                                            >
                                                {data.size}
                                            </label>
                                            <input
                                                hidden
                                                type="radio"
                                                id={data.size}
                                                value={data.size}
                                                name="size"
                                                onChange={(e) => handelSelectSize(e, index)}
                                                checked={sizes.isChecked}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex py-4">
                            <button
                                className={`${
                                    isChecked ? 'bg-primary' : 'bg-[#ad83a5]'
                                } cursor-pointer text-white py-2 px-4 text-[17px] font-medium`}
                                onClick={handleAddProduct}
                            >
                                THÊM VÀO GIỎ HÀNG
                            </button>
                            <div className="pl-1">
                                <button className="bg-[#414141] cursor-pointer text-white py-2 px-4 text-[17px] font-medium">
                                    MUA NGAY
                                </button>
                            </div>
                        </div>
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
                <div className="text-[17px] pt-[50px]">
                    <p className="text-[25px] text-center font-bold pb-[25px]">Cách chọn size giày</p>
                    <p className="pb-[10px]">
                        Để chọn size giày phù hợp với chân của mình, bạn có thể làm theo cách sau:
                    </p>
                    <p>
                        <span className="font-bold">Bước 1</span>: Đo chiều dài bàn chân theo huớng dẫn ở hình dưới:
                    </p>
                    <img
                        className="mx-auto"
                        src="https://shopgiayreplica.com/wp-content/uploads/2018/07/cach-chon-size-giay-nike-adidas-1.jpg"
                        alt="img"
                    />
                    <p>
                        <span className="font-bold pb-[10px]">Bước 2</span>: Sau khi đo được chiều dài bàn chân, bạn có
                        thể đối chiếu với bảng size giày dưới để chọn được size giày phù hợp cho mình. Ví dụ chiều dài
                        bàn chân là 26.5cm thì size giày nam Adidas phù hợp là 42.
                    </p>
                    <img
                        className="pb-[15px] mx-auto"
                        src="https://shopgiayreplica.com/wp-content/uploads/2018/07/cach-chon-size-giay-nike-adidas-2.jpg"
                        alt="img"
                    />
                    <img
                        className="pb-[15px] mx-auto"
                        src="https://shopgiayreplica.com/wp-content/uploads/2018/07/cach-chon-size-giay-nike-adidas-3.jpg"
                        alt="img"
                    />
                    <p>{`Chúc các bạn lựa chọn được đôi giày ưng ý :)`}</p>
                </div>
            </div>
            <div className="px-[15px] lg:px-0 pt-[50px]">
                <ProductHot isProductSame={isProduct}/>
            </div>
            <Tips />
        </div>
    );
};

export default DetailProduct;
