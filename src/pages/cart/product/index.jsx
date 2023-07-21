import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { handleDeleteProduct } from '@/utils/deleteProductUtil';
import { setProduct } from '@/store/reducerStore';
import ProductTable from '../../../components/productRender/productTable';

const ProductCartPage = ({ userCurrent }) => {
    const isLogin = useSelector((state) => state.store.isLogin);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleFixProduct = (product) => {
        dispatch(setProduct(product));
        navigate(`/detailProduct/productInCart/${product.id}`);
    };
    const deleteProduct = (product) => {
        handleDeleteProduct(product, dispatch, userCurrent, isLogin);
    };
    return (
        <ProductTable
            products={userCurrent.products}
            handleFixProduct={handleFixProduct}
            deleteProduct={deleteProduct}
        />
    );
};

export default ProductCartPage;
