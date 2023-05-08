import React, { useState } from 'react';
import Navbar from './navbar/Navbar';

const LayoutDefault = ({ children }) => {
    const [isOverflow, setIsOverflow] = useState(false);
    return (
        <div
            className={`overflow-x-hidden relative ${
                isOverflow ? 'overflow-hidden h-[100vh]' : ''
            } max-w-[1140px] mx-auto`}
        >
            <Navbar setIsOverflow={setIsOverflow} />
            {children}
        </div>
    );
};

export default LayoutDefault;
