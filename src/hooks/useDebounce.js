import { useEffect, useState } from 'react';

const useDebounce = (value, delay) => {
    const [debounceValue, setDebounceValue] = useState();
    useEffect(() => {
        const handle = setTimeout(() => setDebounceValue(value), delay);
        return () => clearTimeout(handle);
    }, [value]);
    return debounceValue;
};
export default useDebounce;
