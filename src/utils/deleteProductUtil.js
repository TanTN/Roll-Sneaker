import { updateUser } from '@/services/userService';
import { setUserCurrent } from '../store/reducerStore';

export const handleDeleteProduct = (product, dispatch, userCurrent, isLogin) => {
    
    const newProducts = userCurrent.products.filter(
        (value) => product.name !== value.name || product.size !== value.size,
    );
    console.log(newProducts);

    const newUser = {
        ...userCurrent,
        products: [...newProducts],
    };
    if (isLogin) {
        updateUser(newUser);
    }
    dispatch(setUserCurrent(newUser));
};
