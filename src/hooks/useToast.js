import {useState, useEffect} from 'react';
// import {toast} from 'react-toastify';
const useToast = (type, item) => {
  const [message, setMessage] = useState('');
  useEffect(() => {
    setMessage(item);
    return () => {
      setMessage('');
    };
  }, [type, item])
  // const notify = () => {
  //   toast(`${message}`)
  // }
  return [message]
}
export default useToast;