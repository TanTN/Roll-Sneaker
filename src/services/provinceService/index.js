import axios from 'axios';

// Get data province

const getProvince = async () => {
    const res = await axios.get('https://provinces.open-api.vn/api/p?depth=2');
    return res.data;
};

const getDistrict = async (code) => {
    const res = await axios.get(`https://provinces.open-api.vn/api/p/${code}?depth=2`);
    return res.data;
};

const getWard = async (code) => {
    const res = await axios.get(`https://provinces.open-api.vn/api/d/${code}?depth=2`);
    return res.data;
};

export { getProvince, getDistrict, getWard }

