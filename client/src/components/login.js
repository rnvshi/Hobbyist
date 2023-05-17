import React, { useState } from 'react'
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

//form to login
const Login = () => {
  const [formState, setFormState] = useState({ userName: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      userName: '',
      password: '',
    });
  };

  return (

    <div id="signup-form-flex">
      <form 
      id="signup-form"
      onSubmit={handleFormSubmit}
      >
        <div className="signup-fields">
          <label className="signup-form-label">User Name</label>
          <input 
          id="userName"
          name='userName'
          value={formState.userName}
          onChange={handleChange} 
          />
        </div>
        <div className="signup-fields">
          <label className="signup-form-label" id="password-login-form">Password</label>
          <input 
          id="password-login-form"
          name='password'
          type="password"
          value={formState.password}
          onChange={handleChange} 
           />
        </div>
        <button id="signup-button" type="submit">LOG IN</button>
      </form>
    </div>

  )
}

export default Login