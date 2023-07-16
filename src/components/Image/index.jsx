import React, { useState } from 'react';
import noImage from '@/assets/images/noImage.png';

const Image = ({ src, className, onclick, ...props }) => {
    const [urlFallback, setUrlFallback] = useState('');
    const handleError = () => {
        setUrlFallback(noImage);
    };
    return (
        <img src={urlFallback || src} className={`${className}`} onClick={onclick} onError={handleError} {...props} />
    );
};

export default Image;
