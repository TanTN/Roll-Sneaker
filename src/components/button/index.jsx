import React from 'react';

const Button = ({ className, children, onClick }) => {
    return (
        <button
            className={`py-[6px] hover:transition hover:duration-[0.7s] px-3 text-[14px] font-medium rounded-[4px] ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
