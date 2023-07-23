
const WrapperBill = ({ className, children }) => {
    return (
        <div
            className={`md:mx-[40px] md:my-[30px] my-[15px] p-[15px] bg-[#ffffffe1] rounded-sm border-[2px] border-[#e9e9e9] drop-shadow-[0px_4px_8px_rgba(0,0,0,0.3)] ${className}`}
        >
            {children}
        </div>
    );
};

export default WrapperBill;
