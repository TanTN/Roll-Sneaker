const ProductOfUserInAdmin = ({ products }) => {
    return products?.map((product, index) => (
        <div key={index} className="relative">
            <div className="flex py-1 border-b-[1px] text-sm md:text-lg lg:text-base">
                <div>
                    <img src={product.img} alt="photo" className="md:w-[130px] md:h-[100px] mx-auto" />
                </div>
                <div className="col-span-2 my-auto">
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
    ));
};

export default ProductOfUserInAdmin;
