import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import URL from '../url';


export const useSignup = () => {
  const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext();

  const signup = async (formData) => {
    // setIsLoading(true)
    setError(null);

    const response = await fetch(`${URL}/api/user/signup`, {
      method: 'POST',
      // headers: {'Content-Type': 'application/json'},
      // headers: {'Content-type': 'multipart/form-data'},
      // body: JSON.stringify({ formData })
      body: formData
    });

    const json = await response.json();

    if (!response.ok) {
    //   setIsLoading(false)
      setError(json.error);
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json));

      // update the auth context
      dispatch({type: 'LOGIN', payload: json});

      // update loading state
    //   setIsLoading(false)
    }
  }

  return { signup }
}