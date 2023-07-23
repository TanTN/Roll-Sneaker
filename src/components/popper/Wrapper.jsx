
// wrapper section for the navbar show
const Wrapper = ({ className, children }) => {
    return (
        <div className={`drop-shadow-[0px_4px_12px_#c2c1c19e] rounded-xl border-[1px] border-[#ecececb2] ${className}`}>
            {children}
        </div>
    );
};

export default Wrapper;
