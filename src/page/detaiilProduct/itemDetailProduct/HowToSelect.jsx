import React from 'react';

const HowToSelect = () => {
    return (
        <div className="text-[17px] pt-[50px]">
            <p className="text-[25px] text-center font-bold pb-[25px]">Cách chọn size giày</p>
            <p className="pb-[10px]">Để chọn size giày phù hợp với chân của mình, bạn có thể làm theo cách sau:</p>
            <p>
                <span className="font-bold">Bước 1</span>: Đo chiều dài bàn chân theo huớng dẫn ở hình dưới:
            </p>
            <img
                className="mx-auto"
                src="https://shopgiayreplica.com/wp-content/uploads/2018/07/cach-chon-size-giay-nike-adidas-1.jpg"
                alt="img"
            />
            <p>
                <span className="font-bold pb-[10px]">Bước 2</span>: Sau khi đo được chiều dài bàn chân, bạn có thể đối
                chiếu với bảng size giày dưới để chọn được size giày phù hợp cho mình. Ví dụ chiều dài bàn chân là
                26.5cm thì size giày nam Adidas phù hợp là 42.
            </p>
            <img
                className="pb-[15px] mx-auto"
                src="https://shopgiayreplica.com/wp-content/uploads/2018/07/cach-chon-size-giay-nike-adidas-2.jpg"
                alt="img"
            />
            <img
                className="pb-[15px] mx-auto"
                src="https://shopgiayreplica.com/wp-content/uploads/2018/07/cach-chon-size-giay-nike-adidas-3.jpg"
                alt="img"
            />
            <p>{`Chúc các bạn lựa chọn được đôi giày ưng ý :)`}</p>
        </div>
    );
};

export default HowToSelect;
