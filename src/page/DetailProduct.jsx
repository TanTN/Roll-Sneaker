import React, { useEffect, useState } from 'react';
import ProductHot from '../component/Main/container/product/ProductHot';
import Tips from '../component/Main/container/product/Tips';
import dataSizes from '../component/data/dataSizes';
import { FcOk } from 'react-icons/fc';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../utils/axios';
import { setUserCurrent } from '../redux/reducer';
import { useNavigate } from 'react-router';

const DetailProduct = () => {
    const user = useSelector((state) => state.store.userCurrent);
    const product = useSelector((state) => state.store.viewProduct);

    const [sizes, setSizes] = useState(dataSizes);
    const [selectSize, setSelectSize] = useState(undefined);
    const [sizeActive, setSizeActive] = useState(undefined);
    const [isChecked, setChecked] = useState(product.size ? true : false);
    const [isProduct, setIsProduct] = useState(false);
    const [numberProduct, setNumberProduct] = useState(product.numberProducts || 1);

    const dispatch = useDispatch();
    const navigator = useNavigate()

    useEffect(() => {

        if (product.size) {
            const sizeProduct = sizes.map(sizeProd => sizeProd.size === product.size ? {...sizeProd,isChecked: true} : {...sizeProd,isChecked: false})
            const index = sizes.findIndex(sizeProd => sizeProd.size == product.size)
            setSelectSize(product.size)
            setSizeActive(index)
            setSizes(sizeProduct)
        }
    },[])

    useEffect(() => {
        const isHref = window.location.href.slice(-13);
        if (isHref === 'detailProduct') {
            setIsProduct(true);
        } else {
            setIsProduct(false);
        }
        
    }, []);

    const isReload = () => {
        setChecked(false);
        setSizeActive(undefined);
        setSizes(dataSizes)
    }

    const handelSelectSize = (e, index) => {
        const { value } = e.target;
        setSelectSize(value);
        setSizeActive(index);
        setChecked(true);
        const newSizes = sizes.map((size) =>
                size.size == value ? { ...size, isChecked: true } : { ...size, isChecked: false },
        );
        setSizes(newSizes);
    };

    const handleClearSize = () => {
        setChecked(false);
        const newSizes = sizes.map((size) => ({ ...size, isChecked: false }));
        setSizeActive(undefined);
        setSizes(newSizes);
    };

    const handleMinusNumber = () => {
        if (numberProduct > 1) {
            setNumberProduct((number) => number - 1);
        }
    };

    const handleAddNumber = () => {
        setNumberProduct((number) => number + 1);
    };

    const handleAddProduct = async () => {

        const isAdd = user.products.every((prod) => {
            return prod.name !== product.name || prod.size !== selectSize;
        });
        const isUpdateSize = user.products.findIndex(
            (prod) => prod.name === product.name && prod.size === selectSize && prod.numberProducts !== numberProduct,
        );
        if (isChecked) {
            if (isUpdateSize !== -1 || 0) {
                const newProduct = [...user.products]
                
                newProduct[isUpdateSize] = {
                    ...product,
                    size: selectSize,
                    numberProducts: numberProduct,
                }
                const newUser = {
                    ...user,
                    products:newProduct
                }
           
                await updateUser(newUser);
                await dispatch(setUserCurrent(newUser));
                await navigator(`/main/${user.name}`)
            }
            if (isAdd) {
                const newUser = {
                    ...user,
                    products: [
                        ...user.products,
                        {
                            ...product,
                            size: selectSize,
                            numberProducts: numberProduct,
                        },
                    ],
                };
                await updateUser(newUser);
                await dispatch(setUserCurrent(newUser));
                await navigator(`/main/${user.name}`)
            }
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
                                <p className="font-semibold pb-2">SIZE:</p>
                                {isChecked && (
                                    <p className="text-c1 cursor-pointer" onClick={handleClearSize}>
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
                                                className="text-[18px] select-none w-[100%] leading-[40px] text-center text-c1 cursor-pointer lg:hover:bg-[#e7e7e7]"
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
                                    onClick={handleAddNumber}
                                >
                                    +
                                </span>
                            </p>
                        </div>
                        <div className="flex pt-4 pb-2">
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
                        <div className="pb-4">
                            <button className="bg-[#d16060] hover:bg-primary cursor-pointer text-white py-2 px-4 text-[17px] font-medium">
                                XEM GIỎ HÀNG
                            </button>
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
                <ProductHot isProductSame={isProduct} isReloads={isReload}/>
            </div>
            <Tips />
        </div>
    );
};

export default DetailProduct;
