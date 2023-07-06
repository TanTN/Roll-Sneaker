import React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router';
import { priceString } from '@/utils/priceUtil';
import { AiFillCloseSquare } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';

import { handleDeleteProduct } from '@/utils/deleteProductUtil';
import { setProduct } from '@/store/reducerStore';

const Products = ({ userCurrent }) => {
    const isLogin = useSelector((state) => state.store.isLogin);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleFixProduct = (product) => {
        dispatch(setProduct(product));
        navigate('/detailProduct');
    };
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell align="left" style={{ fontWeight: 'bolder', fontSize: '16px' }}>
                            Sản phẩm
                        </TableCell>
                        <TableCell align="left" style={{ fontWeight: 'bolder', fontSize: '16px' }}>
                            Giá
                        </TableCell>
                        <TableCell align="left" style={{ fontWeight: 'bolder', fontSize: '16px' }}>
                            Số lượng
                        </TableCell>
                        <TableCell align="left" style={{ fontWeight: 'bolder', fontSize: '16px' }}>
                            Size
                        </TableCell>
                        <TableCell align="left" style={{ fontWeight: 'bolder', fontSize: '16px' }}>
                            Tạm tính
                        </TableCell>
                    </TableRow>
                </TableHead>
                {userCurrent.products?.map((product, index) => {
                    const price = +product.price.replace(/\./g, '') * product.numberProducts;
                    const newPrice = priceString(price);
                    return (
                        <TableBody key={index}>
                            <TableRow>
                                <TableCell>
                                    <AiFillCloseSquare
                                        className="text-[25px] lg:hover:text-primary lg:hover:cursor-pointer"
                                        onClick={() => handleDeleteProduct(product, dispatch, userCurrent, isLogin)}
                                    />
                                </TableCell>

                                <TableCell>
                                    <img src={product.img} alt="product" className="w-[110px] h-[80px]" />
                                </TableCell>
                                <TableCell align="left" className="cursor-pointer hover:text-[#2e746b9f]" onClick={() => handleFixProduct(product)}>{product.name}</TableCell>
                                <TableCell align="left">{product.price} đ</TableCell>
                                <TableCell align="left">{product.numberProducts}</TableCell>
                                <TableCell align="left">{product.size}</TableCell>
                                <TableCell align="left">{newPrice} đ</TableCell>
                            </TableRow>
                        </TableBody>
                    );
                })}
            </Table>
        </TableContainer>
    );
};

export default Products;
