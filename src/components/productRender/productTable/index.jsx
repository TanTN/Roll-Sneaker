import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { priceString } from '@/utils/priceUtil';
import { AiFillCloseSquare } from 'react-icons/ai';

const ProductTable = ({ products, handleFixProduct, deleteProduct, isPageAdmin }) => {
    return (
        <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow cx={{ padding: '10px' }}>
                        {!isPageAdmin && <TableCell></TableCell>}
                        <TableCell></TableCell>
                        <TableCell align="left" style={{ fontWeight: 'bolder', fontSize: '16px', padding: '10px' }}>
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
                        {!isPageAdmin && (
                            <TableCell align="left" style={{ fontWeight: 'bolder', fontSize: '16px' }}>
                                Tạm tính
                            </TableCell>
                        )}
                    </TableRow>
                </TableHead>
                {products?.map((product, index) => {
                    const price = +product.price.replace(/\./g, '') * product.numberProducts;
                    const newPrice = priceString(price);
                    return (
                        <TableBody key={index}>
                            <TableRow>
                                {!isPageAdmin && (
                                    <TableCell>
                                        <AiFillCloseSquare
                                            className="text-[20px] lg:hover:text-primary lg:hover:cursor-pointer"
                                            onClick={() => deleteProduct(product)}
                                        />
                                    </TableCell>
                                )}

                                <TableCell>
                                    <img src={product.img} alt="product" className="w-[110px] h-[80px]" />
                                </TableCell>
                                <TableCell
                                    align="left"
                                    className="cursor-pointer hover:text-[#2e746b9f]"
                                    style={{ padding: '10px' }}
                                    onClick={() => {
                                        if (!isPageAdmin) handleFixProduct(product);
                                    }}
                                >
                                    {product.name}
                                </TableCell>
                                <TableCell align="left">{product.price} đ</TableCell>
                                <TableCell align="left">{product.numberProducts}</TableCell>
                                <TableCell align="left">{product.size}</TableCell>
                                {!isPageAdmin && <TableCell align="left">{newPrice} đ</TableCell>}
                            </TableRow>
                        </TableBody>
                    );
                })}
            </Table>
        </TableContainer>
    );
};

export default ProductTable;
