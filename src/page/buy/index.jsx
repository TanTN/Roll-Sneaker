import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { memo } from 'react';

import { AiOutlineHome, AiFillCheckCircle } from 'react-icons/ai';

import { getDistrict, getProvince, getWard } from '@/services/provinceService';
import { updateUser } from '@/services/userService';
import ProductBuy from './itemBuy/ProductBuy';
import { setUserCurrent } from '@/store/reducerStore';
import FormAddress from './itemBuy/FormAddress';
import WrapperBill from '@/components/popper/WrapperBill';
import allPriceUtils from '@/utils/allPriceUtils';
import Button from '../../components/button';

const Buy = () => {
    const user = useSelector((state) => state.store.userCurrent);
    const isLogin = useSelector((state) => state.store.isLogin);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isProvince, setIsProvince] = useState([]);
    const [isDistrict, setIsDistrict] = useState([]);
    const [isWard, setIsWard] = useState([]);
    const [isBuySuccess, setIsBuySuccess] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const allNumberProduct = user.products.reduce((init, product) => {
        return init + product.numberProducts;
    }, 0);

    const { allPriceAndShip, allPriceCart } = allPriceUtils(user);

    const initialValues = user.information?.name
        ? {
              name: user.information.name,
              phone: user.information.phone,
              province: user.information.province,
              district: user.information.district,
              ward: user.information.ward,
              adress: user.information.adress,
          }
        : {
              name: '',
              phone: '',
              province: '',
              district: '',
              ward: '',
              adress: '',
          };
    useEffect(() => {
        setTimeout(() => setIsBuySuccess(false), 7000);
    }, [isBuySuccess]);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: initialValues,
    });

    const onSubmit = async (values) => {
        if (user.products.length > 0) {
            const newUser = {
                ...user,
                products: [],
                information: values,
            };
            if (isLogin) {
                await updateUser(newUser);
            }
            await dispatch(setUserCurrent(newUser));
            await setIsBuySuccess(true);
        }
    };

    useEffect(() => {
        const fetchApi = async () => {
            await getProvince().then((req) => {
                const option = req.map((province) => ({
                    value: province.code,
                    label: province.name,
                }));
                setIsProvince(option);
            });
        };
        fetchApi();
    }, []);

    const handleProvinceChange = (e) => {
        const fetchApi = async () => {
            await getDistrict(e.value).then((req) => {
                const option = req.districts.map((district) => ({
                    value: district.code,
                    label: district.name,
                }));
                setIsDistrict(option);
            });
            await reset((e) => ({
                ...e,
                district: '',
                ward: '',
            }));
            await setIsWard([]);
        };
        fetchApi();
    };

    const handleDistrictChange = (e) => {
        const fetchApi = async () => {
            await getWard(e.value).then((req) => {
                const option = req.wards.map((ward) => ({
                    value: ward.code,
                    label: ward.name,
                }));
                setIsWard(option);
            });
            await reset((e) => ({
                ...e,
                ward: '',
            }));
        };
        fetchApi();
    };

    const handleBackHome = () => {
        navigate('/');
        window.scrollTo(0, 0);
    };

    return (
        <div className="mt-[100px] max-w-[800px] mx-auto lg:mt-[10px]">
            {/* Messgae success */}
            {isBuySuccess && (
                <div className="fixed max-w-[380px] px-3 py-5 top-[10%] animate-fadeInSuccess md:animate-fadeInSuccessPc right-[4%] drop-shadow-xl bg-[#fff] border-y-[1px] border-r-[1px] border-l-[10px] border-[#13eb0b] z-[100] rounded-md">
                    <div className="flex items-center">
                        <AiFillCheckCircle className="text-[#13eb0b] text-[40px]" />
                        <div className="pl-2 text-[18px] text-[#4b4b4b]">
                            Bạn đã đặt hàng thành công. Cảm ơn bạn đã ủng hộ cửa hàng.
                        </div>
                    </div>
                </div>
            )}

            <div className="flex items-center lg:bg-[#eeeeee] pl-4 py-2 mb-[10px]">
                <AiOutlineHome className="hover:text-[#030303]" />
                <span
                    className="px-2 text-[#585858] hover:text-[#000000] text-sm md:text-base cursor-pointer"
                    onClick={handleBackHome}
                >
                    Trang chủ
                </span>
                <span>/</span>
                <span className="pl-2 text-[#585858]">Thanh toán</span>
            </div>
            <div className="p-[15px] bg-[#e7e7e7]">
                <div className="bg-white">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className=" p-[15px]">
                            <p className="font-bold text-[20px] text-center py-3">Thánh toán và giao hàng</p>

                            <FormAddress
                                isProvince={isProvince}
                                isDistrict={isDistrict}
                                isWard={isWard}
                                handleProvinceChange={handleProvinceChange}
                                handleDistrictChange={handleDistrictChange}
                                errors={errors}
                                control={control}
                                user={user}
                            />

                            <div className="py-3">
                                <p className="font-bold text-[18px]">Thông tin bổ sung</p>
                                <p className="text-c1 pb-1">Ghi chú đơn hàng (tuỳ chọn)</p>
                                <textarea
                                    placeholder="Ghi chú thêm về đơn hàng."
                                    className="w-[100%] h-[60px] outline-none border-[1px] border-[#6e6d6d] caret-[#ac3d3d]"
                                />
                            </div>
                        </div>
                        <div className="border-[1px] border-primary border-dashed p-[15px]">
                            {/* products oder */}
                            {user.products.length > 0 ? (
                                <ProductBuy />
                            ) : (
                                <p className="text-center py-10 text-lg">
                                    Chưa có sản phẩm nào để đặt. Xin vui lòng quay lại cửa hàng!
                                </p>
                            )}

                            {/* Bảng thanh toán */}
                            <WrapperBill>
                                <div className="mt-3">
                                    <div className="flex justify-between pb-1 text-[17px]">
                                        <p>Tạm tính:</p>
                                        <p>
                                            {user.products.length == 0 ? '0' : allPriceCart}
                                            <span className="underline"> đ</span>
                                        </p>
                                    </div>
                                    <div className="flex justify-between pb-1">
                                        <p>Giao hàng:</p>
                                        {allNumberProduct <= 1 ? (
                                            <p>Miễn phí ship</p>
                                        ) : (
                                            <p className="font-bold">
                                                30.000 <span className="underline">đ</span>
                                            </p>
                                        )}
                                    </div>
                                    <div className="pb-2">
                                        <p className="font-semibold text-lg">Tổng:</p>
                                        <p className="flex justify-end font-bold text-lg">
                                            {allNumberProduct <= 1 ? allPriceCart : allPriceAndShip}
                                            <span className="underline pl-[3px]"> đ</span>
                                        </p>
                                    </div>
                                </div>

                                {/* Button */}
                                <div className="flex md:justify-end mt-3 flex-col md:flex-row">
                                    {user.products.length == 0 ? (
                                        <Button
                                            className="md:mr-2 bg-[#414141] text-white -order-1 md:-order-2 my-2 md:my-0 hover-cyan"
                                            onClick={handleBackHome}
                                        >
                                            QUAY TRỞ LẠI CỬA HÀNG
                                        </Button>
                                    ) : (
                                        ''
                                    )}

                                    <Button
                                        type="submit"
                                        className={`text-white -order-2 md:-order-1 ${
                                            user.products.length == 0
                                                ? 'bg-[#ee8282] cursor-not-allowed'
                                                : 'bg-primary hover-primary'
                                        }`}
                                    >
                                        ĐẶT HÀNG
                                    </Button>
                                </div>
                            </WrapperBill>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default memo(Buy);
