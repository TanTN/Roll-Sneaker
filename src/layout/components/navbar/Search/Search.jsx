import Tippy from '@tippyjs/react/headless';

import { useEffect, useState } from 'react';
import { TbSearch } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import { setProduct } from '@/store/reducerStore';
import { useNavigate } from 'react-router';
import Wrapper from '../../../../components/popper/Wrapper';

const Search = () => {
    const dataAllSneaker = useSelector((state) => state.data.allDataSneaker);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [valueInput, setValueInput] = useState('');
    const [dataSearch, setDataSearch] = useState([]);
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        if (valueInput.length > 0) {
            const newData = dataAllSneaker.filter((data) => data.name.toLowerCase().includes(valueInput.toLowerCase()));
            setDataSearch(newData);
        }
    }, [valueInput]);

    const handleAddProduct = (data) => {
        dispatch(setProduct(data));
        setShowResult(false);
        navigate('/detailProduct');
    };

    return (
        <div className="group/item relative mx-[12px] ">
            <label htmlFor="search" className="group-hover/edit group-hover/item:invisible text-[#797979] text-[26px]">
                <TbSearch />
            </label>

            <div className="group-hover/edit h-[28px] animate-fadeInSearchMobile md:animate-fadeInSearch border-[1px] border-[#838383] hidden group-hover/item:block absolute right-[0px] top-0 w-[200px] md:w-[300px] xl:h-[30px] rounded-[50px]">
                <input
                    value={valueInput}
                    onChange={(e) => setValueInput(e.target.value)}
                    type="text"
                    id="search"
                    className="w-[86%] h-[100%] mx-[12px] outline-none border-none bg-transparent"
                    onFocus={() => setShowResult(true)}
                    onBlur={() => setShowResult(false)}
                />
            </div>
            {showResult && valueInput.length > 0 && dataSearch.length > 0 && (
                <Wrapper className="absolute bg-white top-[140%] xl:top-[180%] w-[380px] left-[-190px] md:left-[-336px] md:w-[420px] z-50 px-[10px] py-[14px] xl:after:content-[''] after:absolute after:top-[-20px] xl:after:w-[300px] after:left-[60px] after:h-[20px] after:bg-transparent">
                    {dataSearch.map((data, index) => {
                        if (index < 6) {
                            return (
                                <div
                                    key={index}
                                    className="flex border-[1px] items-center cursor-pointer hover:border-y-[1px] hover:border-y-[#eb4949]"
                                    onMouseDown={(e) => e.preventDefault()}
                                    onClick={() => handleAddProduct(data)}
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
    );
};

export default Search;
