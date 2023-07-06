import { useMemo } from 'react';

export const priceString = (allPrice) => {
    let allPrices;
    if (allPrice.toString().length < 7) {
        if (allPrice.toString().length > 1) {
            allPrices = allPrice.toString().split('');
            allPrices.splice(3, 0, '.');
        } else {
            allPrices = '0';
            return allPrices;
        }
    }

    if (7 <= allPrice.toString().length) {
        allPrices = allPrice.toString().split('');
        allPrices.splice(-3, 0, '.');
        allPrices.splice(-7, 0, '.');
    }
    if (10 <= allPrice.toString().length) {
        allPrices = allPrice.toString().split('');
        allPrices.splice(-3, 0, '.');
        allPrices.splice(-7, 0, '.');
        allPrices.splice(-11, 0, '.');
    }
    return allPrices.join('');
};
const priceUtil = (userCurrent) => {
    const numberProduct = userCurrent.products.map((product) => product.numberProducts);

    const allPrices = useMemo(() => {
        // all price products

        const allPrice = userCurrent.products.reduce((all, product) => {
            return all + parseInt(product.price.replace(/\./g, '')) * +product.numberProducts;
        }, 0);

        let allPrices = priceString(allPrice);

        return allPrices;
    }, [numberProduct || userCurrent.products.length]);
    return allPrices;
};

export default priceUtil;
