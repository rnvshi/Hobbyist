import React, { useState } from 'react'
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

//form to login
const Login = () => {
  const [formState, setFormState] = useState({ userName: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);
  const [showPassword, setShowPassword] = useState(false);


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value.trim(), // Trim leading and trailing spaces from the password
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    
     // Validate form inputs
     if (!formState.userName || !formState.password) {
      alert('Please enter both user name and password.');
      return;
    }
    
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
      alert('Incorrect username or password.');
    }

    // clear form values
    setFormState({
      userName: '',
      password: '',
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (

    <div id="signup-form-flex">
      <form id="signup-form" onSubmit={handleFormSubmit}>
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
        <div className="password-input-container">
        <label className="signup-form-label" id="password-label">
            Password
          </label>
          <input 
          id="password-login-form"
          name='password'
          type={showPassword ? 'text' : 'password'}
          value={formState.password}
          onChange={handleChange} 
           />
           <button
              type="button"
              className="password-toggle-button"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
        </div>
        </div>
        <button id="signup-button" type="submit">LOG IN</button>
      </form>
    </div>

  );
};

export default Login