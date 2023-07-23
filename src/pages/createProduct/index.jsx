import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FormControl, Input, InputLabel, MenuItem, Select } from '@mui/material';

import { AiOutlineHome } from 'react-icons/ai';

import { postProduct } from '@/services/productService';
import WrapperBill from '@/components/popper/WrapperBill';
import Button from '@/components/button';


const CreateProduct = () => {

    const [file, setFile] = useState();
    const [urlImage, setUrlImage] = useState();
    const [nameProduct, setNameProduct] = useState('');
    const [priceProduct, setPriceProduct] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        return () => URL.revokeObjectURL(file);
    }, [file]);

    const handleImage = (e) => {
        const file = e.target.files[0];
        const urlImage = URL.createObjectURL(file);
        setUrlImage(file);
        setFile(urlImage);
    };

    const handleNameProduct = (e) => {
        setNameProduct(e.target.value);
    };

    const handlePriceProduct = (e) => {
        setPriceProduct(e.target.value);
    };

    const handleChangeCategory = (e) => {
        setCategory(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file || !nameProduct || !priceProduct || !category) {
            return;
        }
        const CLOUD_NAME = 'duyc4qzad';
        const PRESET_NAME = 'upload-avatar';
        const FOLDER_NAME = 'Assets';

        const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

        const formData = new FormData();
        
        formData.append('upload_preset', PRESET_NAME);
        formData.append('folder', FOLDER_NAME);
        formData.append('file', urlImage);

        axios
            .post(api, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((res) => {
                const newProduct = {
                    name: nameProduct,
                    img: res.data.url,
                    price: priceProduct.replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
                    category: category,
                };
                postProduct(newProduct);
                setFile('');
                setNameProduct('');
                setPriceProduct('');
                setCategory('');
            })
            .catch((err) => console.log(err));
    };
    return (
        <>
            <div className="flex items-center lg:bg-[#eeeeee] pl-4 py-2 mb-[10px]">
                <AiOutlineHome className="hover:text-[#030303]" />
                <Link to="/" className="px-2 text-[#585858] hover:text-[#000000] text-sm md:text-base cursor-pointer">
                    Trang chủ
                </Link>
                <span>/</span>
                <span className="pl-2 text-[#585858]">Tạo sản phẩm</span>
            </div>
            <h3 className="mt-[30px]">Tạo sản phẩm :</h3>
            <WrapperBill className="md:mb-[50px] md:mt-[20px]">
                <form className="flex flex-col gap-10">
                    <div className="flex flex-col">
                        <label htmlFor="nameProduct">Tên sản phẩm :</label>
                        <Input id="nameProduct" value={nameProduct} className="p-0" onChange={handleNameProduct} />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="price">Giá :</label>
                        <Input id="price" value={priceProduct} className="p-0" onChange={handlePriceProduct} />
                    </div>
                    <FormControl variant="filled" className="w-[300px]">
                        <InputLabel id="category" className="text-xl">
                            Category :
                        </InputLabel>
                        <Select labelId="category" label="Adidas" value={category} onChange={handleChangeCategory}>
                            <MenuItem value="Adidas">Adidas</MenuItem>
                            <MenuItem value="Nike">Nike</MenuItem>
                            <MenuItem value="MLB">MLB</MenuItem>
                        </Select>
                    </FormControl>
                    <div>
                        <input type="file" id="image" hidden onChange={(e) => handleImage(e)} />
                        <label
                            htmlFor="image"
                            className="p-1 bg-white text-black border-[1px] border-black rounded-[4px] cursor-pointer hover:bg-black hover:text-white transition "
                        >
                            Thêm ảnh
                        </label>
                    </div>
                    {file && <img src={file} alt="" className="w-[255px] h-[268px]" />}
                    <div>
                        <Button
                            onClick={handleSubmit}
                            type="submit"
                            className="inline-block bg-primary text-white font-medium hover-primary     "
                        >
                            Lưu
                        </Button>
                    </div>
                </form>
            </WrapperBill>
        </>
    );
};

export default CreateProduct;
