import React from 'react';

const Wrapper = ({ className, children }) => {
    return (
        <div className={`drop-shadow-[0px_4px_12px_#c2c1c19e] rounded-xl border-[1px] border-[#c9c7c7b2] ${className}`}>
            {children}
        </div>
    );
};

export default Wrapper;
