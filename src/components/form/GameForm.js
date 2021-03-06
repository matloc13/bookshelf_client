import React, { useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import UserContext from './../../contexts/userContext';
import ListContext from './../../contexts/listContext';
import useListGenerator from './../../hooks/useListGenerator';
import Input from './inputs/Input';
import Select from 'react-select';

const initForm = {
    name: '',
    img: '',
    bggid: null,
};

const GameForm = ({ formType, game, i, set, gameForm, page }) => {
    // console.log(game);
    const user = useContext(UserContext);
    const allLists = useContext(ListContext);
    const [formAcc, setFormAcc] = useState({});
    const [formInfo, setFormInfo] = useState(initForm);
    const [selectedOption, setSelectedOption] = useState(null);
    const [loading] = useListGenerator(formAcc);

    useEffect(() => {
        if (user) {
            setFormAcc({ type: 'GET_LIST', payload: 'getting' });
        }
        return () => {};
    }, []);

    useEffect(() => {
        if (selectedOption && page === 'hotlist') {
            console.log('added to list');

            setFormInfo({
                name: game.name.value,
                img: game.thumbnail.value,
                bggid: game.id,
                listname_id: selectedOption.value,
            });
        }
        if (selectedOption && page === 'search') {
            setFormInfo({
                name: game.name.value,
                img: game.thumbnail,
                bggid: game.id,
                listname_id: selectedOption.value,
            });
        }

        return () => {
            setFormInfo({});
        };
    }, [game, selectedOption]);

    const notify = (item) => {
        toast(`${item}`);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // set(!gameForm);
        if (formInfo.name === ' ') {
            notify(`no game selected`);
            throw new Error('no game selected');
        } else if (formInfo.bggid === ' ') {
            notify(`game id not found`);
            throw new Error('game id not found');
        }
        if (formInfo.name !== ' ' && formInfo.bggid !== ' ') {
            notify(`${formInfo.name} added to ${selectedOption.label}`);
            return setFormAcc({ type: 'ADD_GAME', payload: formInfo });
        } else {
            throw new Error('did not submit');
        }
    };
    const optionlist = allLists.list[0].filter((ele) => ele.user_id === user.id);

    const options = optionlist.map((ele) => {
        return { value: ele.id, label: ele.title };
    });

    const handleSelect = (selectedOption) => {
        setSelectedOption(selectedOption);
    };

    return (
        <>
            {loading ? (
                <h1>...Loading...</h1>
            ) : (
                <form onSubmit={handleSubmit} className={'form-style add-game-form'}>
                    <fieldset className={'fieldset-style'}>
                        <Select
                            className={`select-${formType}`}
                            options={options}
                            onChange={handleSelect}
                            value={selectedOption}
                        />

                        <Input type={'submit'} name="Add Game" i={i} id={formType} />
                    </fieldset>
                </form>
            )}
        </>
    );
};

export default GameForm;
