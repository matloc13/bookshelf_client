import React from 'react';
import useFormLogin from './../../hooks/useFormLogin';
import useStateValue from './../../contexts/state';
import Label from './label/Label';
import Input from './inputs/Input';

const Form = ({formType}) => {
 
    const submit= () => {
        dispatch({
            type: 'ADD_USERNAME',
            username: values.username
            
        })
        alert(`username: ${values.username}`);
        
    }
    const [handleSubmit, handleInput, values] = useFormLogin(submit);

    const [{state}, dispatch] = useStateValue();

    return (
        <form onSubmit={handleSubmit} className={'form-style'}>

            <fieldset className={'fieldset-style'}>
                <Label
                    name={'username'}/>
                <Input 
                    type={'text'}
                    name={'username'}
                    value={values.username}
                    handleInput={handleInput}/>
             </fieldset>

             <fieldset className={'fieldset-style'}>
                <Label
                    name={'password'}/>                  
                <Input 
                    type={'password'}
                    name={'password'}
                    value={values.password}
                    handleInput={handleInput}/>
             </fieldset>
                <Input 
                    type={'submit'}
                    name={formType}/>
        </form>
    )
}

export default Form;