import { useState, useEffect, useContext, useCallback } from 'react';
import BASE_URL from './../constants';
import { toast } from 'react-toastify';
import DispatchContext from './../contexts/dispatchContext';

const useSearch = (query, paginate, clear) => {
    const dispatch = useContext(DispatchContext);
    const [outputResult, setOutputResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [curQuery, setCurQuery] = useState('');
    const [pageLength, setPageLength] = useState(25);

    useEffect(() => {
        const ac = new AbortController();

        if (clear === 'clearing') {
            clearSearch();
        } else {
            if (query !== '' && query !== curQuery) {
                getSearch(query, pageLength);
                setCurQuery(query);
            } else if (query === curQuery && query !== '') {
                getSearch(curQuery, pageLength);
            }
        }

        return () => {
            ac.abort();
        };
    }, [query, paginate, clear]); //eslint-disable-line

    // current position of pagination

    const currentPosition = (page) => {
        const c = pageLength * page;
        // console.log( c);
        return c;
    };

    const getSearch = async (query, pl) => {
        // const pageLength = 25;
        try {
            setLoading(true);
            const res = await fetch(`${BASE_URL}/searchlists/${query}`);
            const json = await res.json();
            console.log(json);

            if (json.items.item) {
                const newArr = json.items.item.filter(
                    (ele) => ele.type === 'boardgame' || ele.type === 'boardgameexpansion'
                );
                await new Promise((resolve) => {
                    dispatch({
                        type: 'CURRENT_SEARCH',
                        search: newArr,
                        length: newArr.length,
                    });
                    if (newArr.length > pl) {
                        const newArray = [];
                        let cp = currentPosition(paginate);

                        if (paginate === 1) {
                            newArr.forEach((ele, i) => {
                                if (i <= cp - 1) {
                                    newArray.push(ele);
                                } else if (i >= cp) {
                                    // console.log(newArray);

                                    return;
                                }
                            });
                            setOutputResult([...outputResult, newArray]);
                        } else {
                            newArr.forEach((ele, i) => {
                                if (i < cp && i >= cp - pl) {
                                    newArray.push(ele);
                                } else if (i >= cp) {
                                    return;
                                }
                            });
                            setOutputResult([...outputResult, newArray]);
                        }
                    } else {
                        setOutputResult([...outputResult, newArr]);
                    }
                    return resolve(outputResult);
                });
            }
        } catch (error) {
            console.error(error);
        } finally {
            // console.log(newArr);
            // console.log(allLists.search);
            setLoading(false);
        }
    };

    const clearSearch = async () => {
        try {
            await new Promise((resolve) => {
                console.log('clearing search');

                return resolve(dispatch({ type: 'CLEAR_SEARCH', payload: 'clearing' }));
            });

            await new Promise((resolve) => {
                setOutputResult([[], ...outputResult]);
                return resolve(outputResult);
            });
        } catch (error) {
            console.error(error);
        }
    };

    return [loading, outputResult, setOutputResult, setPageLength, pageLength];
};
export default useSearch;
