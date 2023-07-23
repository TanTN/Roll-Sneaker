import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { deleteUser, getAllUser, getUser } from '../../services/userService';
import { Avatar } from '@mui/material';
import { RiSmartphoneFill } from 'react-icons/ri';
import { AiFillHome, AiOutlineHome } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { IoCaretUpSharp, IoCaretDownSharp } from 'react-icons/io5';

import { deleteHistoryOrder, getHistoryOrder } from '../../services/productService';
import Button from '../../components/button';
import { useDispatch, useSelector } from 'react-redux';
import LoadingPage from '../../components/loading/loadingPage';
import ProductTable from '../../components/productRender/productTable';

const UserInAdmin = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.store.isLoadingUserInAdmin);

    const [userCurrent, setUserCurrent] = useState();
    const [productOrder, setProductOrder] = useState([]);
    const [showProductInCart, setShowProductInCart] = useState(false);
    const [showProductOrder, setShowProductOrder] = useState(false);

    const productInCartLength = userCurrent?.products.length;
    const productOrderLength = productOrder?.length;

    useEffect(() => {
        const fetchApi = async () => {
            const user = await getUser(userId, dispatch);
            const historyOrder = await getHistoryOrder();
            const productOrder = historyOrder.filter((product) => product.userId == userId);
            setUserCurrent(user);
            setProductOrder(productOrder);
        };
        setShowProductInCart(false);
        setShowProductOrder(false);
        fetchApi();
    }, [userId]);

    const handleDeleteUser = async () => {
        await deleteUser(userId);
        await getAllUser(dispatch);
        navigate('/admin/user/1');
        productOrder?.forEach(async (product) => {
            await deleteHistoryOrder(product.id);
        });
    };
    return (
        <div className="relative">
            <div className="flex items-center lg:bg-[#eeeeee] pl-4 py-2 mb-[10px]">
                <AiOutlineHome className="hover:text-[#030303]" />
                <Link to="/" className="px-2 text-[#585858] hover:text-[#000000] text-sm md:text-base cursor-pointer">
                    Trang chủ
                </Link>
                <span>/</span>
                <span className="pl-2 text-[#585858]">User</span>
            </div>

            <div className="flex items-center gap-1 mt-[30px]">
                <h3>Thông tin tài khoản người dùng :</h3>
            </div>

            <div className="flex flex-col gap-2 mt-[20px] mb-[50px]">
                <Avatar
                    src={userCurrent?.linkAvt}
                    className="relative border-[1px] border-[#a02222]"
                    sx={{ height: 55, width: 55, fontSize: 35, fontWeight: 'normal' }}
                    alt={userCurrent?.username}
                >
                    {userCurrent?.username[0].toUpperCase()}
                </Avatar>

                <p className="text-[18px]">
                    Tên tài khoản: <span className="font-medium">{userCurrent?.username}</span>!
                </p>

                <div className="flex items-center">
                    <AiFillHome />
                    <p className="px-1 text-[18px]">Địa chỉ: Vietnam</p>
                </div>

                <div className="flex items-center">
                    <RiSmartphoneFill />
                    <p className="px-1 text-[18px]">Điện thoại: {userCurrent?.phone}</p>
                </div>

                {!userCurrent?.isAdmin && (
                    <div>
                        <Button className="bg-primary leading-[18px] text-white hover-primary" onClick={handleDeleteUser}>
                            Xóa người dùng
                        </Button>
                    </div>
                )}

                <div>
                    <div className={`flex items-center gap-1 ${productInCartLength < 1 ? 'text-[#969696]' : ''}`}>
                        <p
                            className="text-[18px] cursor-pointer"
                            onClick={(e) => {
                                e.stopPropagation();
                                if (productInCartLength > 0) setShowProductInCart(!showProductInCart);
                            }}
                        >
                            Sản phẩm trong giỏ hàng
                        </p>
                        {showProductInCart ? <IoCaretDownSharp className="text-primary" /> : <IoCaretUpSharp />}
                    </div>
                </div>
                {showProductInCart && (
                    <div>
                        <ProductTable isPageAdmin products={userCurrent.products} />
                    </div>
                )}

                <div>
                    <div className={`flex items-center gap-1 ${productOrderLength < 1 ? 'text-[#969696]' : ''}`}>
                        <p
                            className="text-[18px] cursor-pointer "
                            onClick={(e) => {
                                e.stopPropagation();
                                if (productOrderLength > 0) setShowProductOrder(!showProductOrder);
                            }}
                        >
                            Đơn hàng đã đặt
                        </p>
                        {showProductOrder ? <IoCaretDownSharp className="text-primary" /> : <IoCaretUpSharp />}
                    </div>
                </div>
                {showProductOrder && (
                    <div>
                        <ProductTable isPageAdmin products={productOrder} />
                    </div>
                )}
            </div>
            {isLoading && (
                <div className="absolute top-0 bottom-0 right-0 left-0 m-auto">
                    <LoadingPage loadingUser />
                </div>
            )}
        </div>
    );
};

export default UserInAdmin;
