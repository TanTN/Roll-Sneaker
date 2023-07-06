import { useMemo } from 'react';
import priceUtil from './priceUtil';

const allPriceUtils = (user) => {
    const numberProduct = user.products.map((product) => product.numberProducts)

    // price chua co tien ship
    const allPriceCart = priceUtil(user);

    // price khi cong them tien ship
    const allPriceAndShip = useMemo(() => {
        let allPriceAndShip;
        const allPrice = parseInt(allPriceCart.replace(/\./g, '')) + 30000;
        const strings = allPrice.toString().split('').reverse().join('');
        if (strings.length < 7) {
            allPriceAndShip = (strings.slice(0, 3) + '.' + strings.slice(3)).split('').reverse().join('');
        }
        if (7 <= strings.length) {
            allPriceAndShip = (strings.slice(0, 3) + '.' + strings.slice(3, 6) + '.' + strings.slice(6))
                .split('')
                .reverse()
                .join('');
        }
        if (10 <= strings.length) {
            allPriceAndShip = (
                strings.slice(0, 3) +
                '.' +
                strings.slice(3, 6) +
                '.' +
                strings.slice(6, 9) +
                '.' +
                strings.slice(9)
            )
                .split('')
                .reverse()
                .join('');
        }
        return allPriceAndShip;
    }, [numberProduct || user.products.length]);
    return {
        allPriceCart,
        allPriceAndShip,
    };
};

export default allPriceUtils;
