import React, { useContext, useState, useRef } from 'react';
import DispatchContext from './../../contexts/dispatchContext';
import ListContext from './../../contexts/listContext';
import useManageItem from './../../hooks/useManageItem';
import Modal from './../modal/Modal';

const SingleList = () => {
    const dispatch = useContext(DispatchContext);
    const allLists = useContext(ListContext);
    const [del, setDel] = useState(false);
    const [currentItem, setCurrentItem] = useState();
    const [] = useManageItem(del); //eslint-disable-line no-empty-pattern
    const [show, setShow] = useState(false);
    const [showImg, setShowImg] = useState({ id: 0, state: 'hidden' });
    const item = useRef(null);
    const reveal = (id) => {
        setCurrentItem(id);
        item.current.focus();
        return setShowImg(!showImg);
    };

    const handleClick = (e, ele, type) => {
        e.persist();
        console.log(ele);

        switch (type) {
            case 'cur':
                dispatch({ type: 'SET_CURRENT_GAME', game: ele.bggid });
                return setShow(!show);
            case 'del':
                const promise = new Promise((resolve) => {
                    dispatch({
                        type: 'DELETE_ITEM',
                        list: ele.listname_id,
                        id: ele.id,
                        game: ele.bggid,
                    });
                    return resolve(setDel(true));
                });
                console.log(promise);
                break;
            default:
                return;
        }
    };

    return (
        <div className="single-list-container">
            {show && <Modal setShow={setShow} show={show} />}
            <ul className="single-list">
                {allLists.sList &&
                    allLists.sList.map((ele) => {
                        return (
                            <li key={ele.id} className="single-item" ref={item}>
                                <div className="game-container">
                                    <h3 onMouseOverCapture={() => reveal(ele.id)}>{ele.name}</h3>
                                    {currentItem === ele.id && showImg && (
                                        <>
                                            <img src={ele.img} alt={ele.name} />

                                            <figcaption
                                                onClick={(e) => handleClick(e, ele, 'cur')}
                                                align="bottom"
                                            >
                                                see more
                                            </figcaption>
                                        </>
                                    )}
                                </div>
                                <span onClick={(e) => handleClick(e, ele, 'del')}>X</span>
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
};
export default SingleList;
