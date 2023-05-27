import React, { useMemo } from 'react';
import Select from 'react-select';
import Input from '@mui/material/Input';
import { Controller } from 'react-hook-form';


const FormAdress = ({
    handleProvinceChange,
    handleDistrictChange,
    isProvince,
    isDistrict,
    isWard,
    errors,
    control,
    user
}) => {
    const isError = useMemo(() => {
        if (user.products.length > 0) {
            return true
        } else {
            return false
        }
    },[user.products.length])
    return (
        <div className="md:grid grid-cols-2 gap-y-2 gap-x-[30px]">
            <div className="pb-2">
                <label htmlFor="name" className={`${errors.name && isError ? 'text-primary' : ''}`}>
                    Họ và tên:
                </label>
                <Controller
                    name="name"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <Input {...field} placeholder="Họ và tên của bạn" id="name" className="block w-[100%]" />
                    )}
                />
            </div>

            <div className="pb-2">
                <label
                    htmlFor="phone"
                    className={`${errors.phone && isError ? 'text-primary' : ''}`}
                >{`Số điện thoại (*):`}</label>
                <Controller
                    name="phone"
                    control={control}
                    rules={{ required: true, pattern: /^0\d{8,9}$/ }}
                    render={({ field }) => (
                        <Input {...field} placeholder="Số điện thoại của bạn" id="phone" className="block w-[100%]" />
                    )}
                />
            </div>

            <div className="pb-2">
                <label htmlFor="province" className={`${errors.province && isError ? 'text-primary' : ''}`}>
                    Tỉnh/Thành phố
                </label>
                <Controller
                    name="province"
                    rules={{ required: true }}
                    control={control}
                    render={({ field }) => {
                        return (
                            <Select
                                {...field}
                                options={isProvince}
                                value={field.value}
                                onChange={(e) => {
                                    field.onChange(e);
                                    handleProvinceChange(e);
                                }}
                                placeholder="Chọn tỉnh/thành phố"
                            />
                        );
                    }}
                />
            </div>

            <div className="pb-2">
                <label htmlFor="district" className={`${errors.district && isError ? 'text-primary' : ''}`}>
                    Quận/Huyện
                </label>
                <Controller
                    name="district"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <Select
                            {...field}
                            options={isDistrict}
                            onChange={(e) => {
                                field.onChange(e);
                                handleDistrictChange(e);
                            }}
                            placeholder="Chọn quận huyện"
                        />
                    )}
                />
            </div>

            <div className="pb-2">
                <label htmlFor="ward" className={`${errors.ward && isError ? 'text-primary' : ''}`}>
                    Xã/Phường
                </label>
                <Controller
                    rules={{ required: true }}
                    name="ward"
                    control={control}
                    render={({ field }) => <Select {...field} options={isWard} placeholder="Chọn xã/phường" />}
                />
            </div>

            <div className="pb-2">
                <label htmlFor="adress" className={`${errors.adress && isError ? 'text-primary' : ''}`}>{`Địa chỉ (*):`}</label>
                <Controller
                    rules={{ required: true }}
                    name="adress"
                    control={control}
                    render={({ field }) => (
                        <Input {...field} placeholder="Địa chỉ của bạn" id="adress" className="block w-[100%]" />
                    )}
                />
            </div>
        </div>
    );
};

export default FormAdress;
