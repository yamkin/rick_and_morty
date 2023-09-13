import chractersApi from "../../../api/characters";
import useApi from "../../../hooks/useApi";
import Search from "../../common/search/search";
import Pagination from "../../common/pagination/pagination";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function CharactersList() {
    const [searchParams] = useSearchParams();
    const page = (Number(searchParams.get('page')) === 0) ? 1 : Number(searchParams.get('page'));
    const valueSearch = searchParams.get('search') || "";
    const {data, error, request} = useApi(chractersApi.getCharacters);

    useEffect(() => {
        request(page, valueSearch)
    }, [page, valueSearch]);

    return (
        <>
            <div className='wrapper'>
                <Search/>
                <div className="main__content">
                    {error ? (
                        <h1>Characters not found</h1>
                    ) : (
                        <>
                            {data && data?.results && data.results.length > 0 && data.results.map((item) => (
                                <div key={item.id} className='card'>
                                    <div className='image-wrapper'>
                                        <img className='card-image' src={item.image} alt="hero_image" />
                                    </div>
                                    <div className='card-body'>
                                        <p>Имя: <span>{item.name}</span></p>
                                        <p>Статус: <span>{item.status}</span></p>
                                        <p>Пол: <span></span>{item.gender}</p>
                                        <p>Кол-во эпизодов: <span>{item.episode.length}</span></p>
                                    </div>
                                </div>
                            ))}
                            
                        </>
                    )}

                </div>
                {error ? null : (<Pagination currentPage={page} totalPages={data?.info?.pages} />)}
            </div>
            
        </>
    );
}