import { useMemo } from 'react';

const priceUtil = (userCurrent) => {
    const numberProduct = userCurrent.products.map((product) => product.numberProducts);

    const allPrices = useMemo(() => {
        // all price products

        const allPrice = userCurrent.products.reduce((all, product) => {
            return all + parseInt(product.price.replace(/\./g, '')) * +product.numberProducts;
        }, 0);

        let allPriceAddDots = allPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')

        return allPriceAddDots;
    }, [numberProduct]);
    return allPrices;
};

export default priceUtil;
