import {useState,} from 'react';



const useFormLogin = (cb) => {

    const [values, setValues] = useState({});

    const handleSubmit = (e) => {
        e && e.preventDefault() ;
        cb();
    }  
        const handleInput = (e) => {
            e.persist();
            setValues({...values, [e.target.name]: e.target.value});
        }

        
     
return [ handleSubmit, handleInput, values ];
}

export default useFormLogin;