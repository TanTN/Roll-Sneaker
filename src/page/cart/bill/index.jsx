import React, { useMemo, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import allPriceUtils from '@/utils/allPriceUtils';
import { useNavigate } from 'react-router';
import Button from '../../../components/button';

const Bill = ({ userCurrent }) => {
    const navigate = useNavigate();

    const allNumberProduct = userCurrent.products.reduce((init, product) => {
        return init + product.numberProducts;
    }, 0);

    const { allPriceAndShip, allPriceCart } = allPriceUtils(userCurrent);

    let price;

    if (allNumberProduct <= 1) {
        price = allPriceAndShip;
    } else {
        price = allPriceCart;
    }
    return (
        <>
            <TableContainer>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell component="th" scope="row" align="left" sx={{ width: '130px' }}>
                                <p className="font-semibold text-[16px]">Tạm tính :</p>
                            </TableCell>
                            <TableCell>
                                {allPriceCart} <span className="underline">đ</span>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="left">
                                <p className="font-semibold text-[16px]">Giao hàng :</p>
                            </TableCell>
                            <TableCell align="left">
                                {allNumberProduct <= 1 ? (
                                    <p>
                                        Giao hàng:{' '}
                                        <span className="font-semibold">
                                            30.000 <span className="underline">đ</span>
                                        </span>
                                    </p>
                                ) : (
                                    <p>Giao hàng miễn phí</p>
                                )}
                                <p>Tùy chọn giao hàng sẽ được cập nhật trong quá trình thanh toán.</p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="left">
                                <p className="font-semibold text-[16px]">Tổng</p>
                            </TableCell>
                            <TableCell align="left">
                                <p className="font-semibold text-[16px]">
                                    {price} <span className="underline">đ</span>
                                </p>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Button
                className="w-[100%] bg-primary text-white p-2 text-[18px] hover:hover-primary"
                onClick={() => navigate('/buy')}
            >
                TIẾN HÀNH THANH TOÁN
            </Button>
        </>
    );
};

export default Bill;
