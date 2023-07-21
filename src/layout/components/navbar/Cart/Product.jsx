import React from 'react';

import ProductInCartNav from '@/components/productRender/productIncartNav';

const Product = ({ userCurrent, setTippyPc }) => {

    return <ProductInCartNav userCurrent={userCurrent} setTippyPc={setTippyPc} />
};

export default Product;
