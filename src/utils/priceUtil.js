import { useMemo } from "react";


const priceUtil = (userCurrent) => {

    const numberProduct = userCurrent.products.map(product => product.numberProducts)

    const allPrices = useMemo(() => {
        // all price products
        let allPrices;
        const allPrice = userCurrent.products.reduce((all, product) => {
            all = all + parseInt(product.price.replace(/\./g,'')) * product.numberProducts;

            return all;
        }, 0);

        if (allPrice.toString().length < 7) {
            allPrices = allPrice.toString().split('')
            allPrices.splice(3,0,'.')

        }
        
        if (7 <= allPrice.toString().length) {
            allPrices = allPrice.toString().split('')
            allPrices.splice(-3,0,'.')
            allPrices.splice(-7,0,'.')

        }
        return allPrices.join('')
    },[numberProduct || userCurrent.products.length]);
    return allPrices
}

export default priceUtil