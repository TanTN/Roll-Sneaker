import React, { useState } from 'react';
import Navbar from './navbar/Navbar';
import Footer from './footer/Footer';

const LayoutDefault = ({ children }) => {
    const [isOverflow, setIsOverflow] = useState(false);
    return (
        <div
            className={`overflow-x-hidden relative ${
                isOverflow ? 'overflow-hidden h-[100vh] lg:overflow-y-auto lg:h-auto' : ''
            }`}
        >
            <Navbar setIsOverflow={setIsOverflow} />
            {children}
            <Footer />
        </div>
    );
};

export default LayoutDefault;
