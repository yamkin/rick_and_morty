import { useEffect, useRef, useState } from "react";
import chractersApi from "../../../api/characters";
import useSearch from "../../../hooks/useSearch";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Search() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [inputValue, setInputValue] = useState(searchParams.get('search') || "");
    const [isOpen, setIsOpen] = useState(false);
    const listRef = useRef(null);
    const {data, requestSearch} = useSearch(chractersApi.getCharacters);

    useOnClickOutside(listRef, () => setIsOpen(false));

    useEffect(() => {
        requestSearch(undefined, inputValue);
    }, [inputValue]);

    const itemClickHandler = (value) => {
        searchParams.set('search', value);
        searchParams.set('page', 1);
        navigate(location.pathname + '?' + searchParams.toString());        
        setInputValue(value);
        setIsOpen(false);
    };

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        itemClickHandler(inputValue);
    };

    return (
        <div className='header'>
            <h1 className='title'>Rick and Morty cartoon characters</h1>
            <form className='search__form' onSubmit={handleSubmit}>
                <input
                    className='search__input'
                    type="text"
                    placeholder='Search in the caracters'
                    value={inputValue}
                    onChange={handleChange}
                    onClick={() => setIsOpen(true)}
                />
                <ul className="autocompleate" ref={listRef}>
                    {inputValue && isOpen
                        ? data && data?.results && data.results.length > 0 && data.results.map((item) => (
                            <li
                                key={item.id}
                                className="autocompleate__item"
                                onClick={() => itemClickHandler(item?.name || "")}
                            >
                                {item.name}
                            </li>
                        ))
                        : null}
                </ul>
            </form>
        </div>
    );
}