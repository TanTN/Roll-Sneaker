import { useDispatch, useSelector } from 'react-redux';

import { AiFillCloseSquare } from 'react-icons/ai';

import { handleDeleteProduct } from '@/utils/deleteProductUtil';

const ProductBuy = () => {
    const userCurrent = useSelector((state) => state.store.userCurrent);
    const isLogin = useSelector((state) => state.store.isLogin);
    const dispatch = useDispatch();

    return (
        <div className="">
            <p className="font-bold text-[20px] text-center py-3">Đơn hàng của bạn</p>
            
            <div>
                {userCurrent.products.map((product, index) => (
                    <div key={index}>
                        <div className="grid grid-cols-4 gap-x-1 py-1 border-b-[1px] border-[#bebebe] pr-3 text-sm md:px-[40px] md:text-lg lg:text-base">
                            <div className="relative md:w-[130px] md:h-[100px]">
                                <img src={product.img} alt="photo" className="w-[100%] h-[100%]" />
                                <div
                                    className="absolute top-[2%] left-[2%] cursor-pointer select-none "
                                    onClick={() => handleDeleteProduct(product, dispatch, userCurrent, isLogin)}
                                >
                                    <AiFillCloseSquare className="text-[20px] lg:hover:text-primary" />
                                </div>
                            </div>
                            <div className="col-span-3 my-auto">
                                <p>{product.name}</p>
                                <div className="flex justify-between pt-2">
                                    <p>
                                        <span>SIZE: </span>
                                        <span>{product.size}</span>
                                    </p>
                                    <p>
                                        <span>{product.numberProducts}</span>
                                        <span className="mx-3">x</span>
                                        <span>
                                            {product.price}
                                            <span className="underline">đ</span>
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductBuy;
