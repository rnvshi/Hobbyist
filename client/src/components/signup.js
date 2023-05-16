import React, { useState } from 'react'
import Profile from "../pages/profile"
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../utils/mutations';

import Auth from '../utils/auth';

//form to signup
const Signup = () => {

  const [formState, setFormState] = useState({ firstName: '', lastName: '', userName: '', email: '', password: '' });
  const [signup, { error, data }] = useMutation(CREATE_USER);


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    // Validate form inputs
      if (
        !formState.firstName ||
        !formState.lastName ||
        !formState.userName ||
        !formState.email ||
        !formState.password
      ) {
        alert('Please fill in all fields.');
        return;
      }

      if (formState.password.length < 8) {
        alert('Password must be at least 8 characters long.');
        return;
      }
  
      if (formState.password.includes(' ')) {
        alert('Password cannot contain spaces.');
        return;
      }
    
      try {
      const { data } = await signup({
        variables: { ...formState },
      });
      console.log(data)
      Auth.login(data.createUser.token);
    } catch (e) {
      console.error(e);
      alert('An error occurred during signup. Please try again.');
    }

    // clear form values
    setFormState({
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
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
          <label className="signup-form-label">First Name</label>
          <input 
          id="FirstName" 
          name='firstName'
          value={formState.firstName}
          onChange={handleChange} 
          />
        </div>

        <div className="signup-fields">
          <label className="signup-form-label">Last Name</label>
          <input 
          id="lastName"
          name='lastName'
          value={formState.lastName}
          onChange={handleChange} 
          />
        </div>

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
          <label id="email-label" className="signup-form-label">E-mail</label>
          <input 
          id="email"
          name='email'
          value={formState.email}
          onChange={handleChange} 
          ></input>
        </div>
        <div className="signup-fields">
          <label id="password-label" className="signup-form-label">Password</label>
          <input 
          id="password"
          name='password'
          type="password"
          value={formState.password}
          onChange={handleChange}  
          />
        </div>

        <button id="signup-button" type="submit">SIGN UP</button>
      </form>
    </div>

  )
}

export default Signup