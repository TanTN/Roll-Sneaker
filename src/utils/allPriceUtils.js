import { useMemo } from 'react';
import priceUtil from './priceUtil';

const allPriceUtils = (user) => {
    const numberProduct = user.products.map((product) => product.numberProducts);

    // price chua co tien ship
    const allPriceCart = priceUtil(user);

    // price khi cong them tien ship
    const allPriceAndShip = useMemo(() => {
        const allPrice = +allPriceCart.replace(/\./g, '') + 30000;

        let allPriceAddDots = allPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

        return allPriceAddDots;
    }, [numberProduct]);
    return {
        allPriceCart,
        allPriceAndShip,
    };
};

export default allPriceUtils;
