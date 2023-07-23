import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { TbSearch } from 'react-icons/tb';
import { AiFillCloseCircle, AiOutlineLoading } from 'react-icons/ai';

import Wrapper from '@/components/popper/Wrapper';
import { setProduct } from '@/store/reducerStore';
import useDebounce from '@/hooks/useDebounce';

const Search = () => {
    const dataAllSneaker = useSelector((state) => state.data.dataSneaker);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [valueInput, setValueInput] = useState('');
    const [dataSearch, setDataSearch] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isShowInput, setIsShowInput] = useState(false);

    const debounceValue = useDebounce(valueInput, 0);

    useEffect(() => {
        setIsLoading(false);
        setShowResult(true)
        
        if (!valueInput.trim()) return setDataSearch([]);

        setIsLoading(true);
        const fetchApi = setTimeout(() => {
            const newData = dataAllSneaker.filter((data) =>
                data.name.toLowerCase().includes(debounceValue.toLowerCase()),
            );
            
            setDataSearch(newData);
            setIsLoading(false);
        }, 500);
        return () => clearTimeout(fetchApi);
    }, [debounceValue]);

    const handleNavigateProductDetail = (data) => {
        dispatch(setProduct(data));
        setShowResult(false);
        setValueInput('');
        navigate(`/detailProduct/${data.id}`);
    };

    const handleClose = () => {
        setIsShowInput(false);
        setValueInput('');
    };

    const handleChange = (e) => {
        if (e.target.value.startsWith(' ')) return setValueInput('');
        setValueInput(e.target.value);
    };

    return (
        <div className="relative mx-[12px]">
            {isShowInput && (
                <label htmlFor="search" className="text-[#797979] text-[26px] invisible">
                    <TbSearch />
                </label>
            )}
            {!isShowInput ? (
                <label htmlFor="search" className="text-[#797979] text-[26px] cursor-pointer">
                    <TbSearch onClick={() => setIsShowInput(true)} />
                </label>
            ) : (
                <div className="h-[28px] animate-fadeInSearchMobile md:animate-fadeInSearch border-[1px] border-[#838383] absolute right-0 top-0 bottom-0 w-[220px] md:w-[300px] xl:h-[30px] rounded-[50px]">
                    
                        <input
                        value={valueInput}
                        onChange={handleChange}
                        type="text"
                        id="search"
                        className="w-[80%] ml-[12px] md:w-[84%] h-[100%] md:ml-[12px] md:mr-[14px] outline-none bg-transparent placeholder:text-[12px] md:placeholder:text-[14px]"
                        onFocus={() => setShowResult(true)}
                        onBlur={() => setShowResult(false)}
                        placeholder="Nhập khóa tìm kiếm của bạn..."
                        />
                        
                    <div className="absolute top-[50%] translate-y-[-50%] right-[10px] ">
                        {isLoading ? (
                            <AiOutlineLoading className="animate-fadeInLoadingIconRotate" />
                        ) : (
                            <AiFillCloseCircle className="cursor-pointer hover:text-primary" onClick={handleClose} />
                        )}
                    </div>
                        
                    {showResult && valueInput.length > 0 && dataSearch.length > 0 && (
                        <Wrapper className="fixed md:absolute bg-white top-[93px] w-[90%] left-[5%] md:top-[140%] md:left-[-60px] md:w-[420px] z-50 px-[10px] py-[14px] xl:top-[180%] xl:after:content-[''] after:absolute after:top-[-25px] xl:after:w-[300px] after:left-[60px] after:h-[25px] after:bg-transparent">
                            {dataSearch.map((data, index) => {
                                if (index < 6) {
                                    return (
                                        <div
                                            key={index}
                                            className="flex border-[1px] items-center cursor-pointer hover:border-y-[1px] hover:border-y-[#eb4949]"
                                            onMouseDown={(e) => e.preventDefault()}
                                            onClick={() => handleNavigateProductDetail(data)}
                                        >
                                            <img src={data.img} alt="sneaker" className="w-[60px] h-[60px]" />
                                            <p>{data.name}</p>
                                        </div>
                                    );
                                }
                            })}
                        </Wrapper>
                    )}
                </div>
            )}
        </div>
    );
};

export default Search;
