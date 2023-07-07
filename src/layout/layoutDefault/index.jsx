import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const LayoutDefault = ({ children }) => {
    return (
        <div className="overflow-x-hidden relative  lg:overflow-y-auto lg:h-auto">
            <Navbar />
            {children}
            <Footer />
        </div>
    );
};

export default LayoutDefault;
