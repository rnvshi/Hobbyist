import React from 'react'
//form to login
const Login = () => {
  return (

    <div id="signup-form-flex">
      <form id="signup-form">
        <div class="signup-fields">
          <label class="signup-form-label">User Name</label>
          <input id="userName" />
        </div>
        <div class="signup-fields">
          <label class="signup-form-label" id="password-login-form">Password</label>
          <input id="password-login-form" />
        </div>
        <button id="signup-button" type="submit">LOG IN</button>
      </form>
    </div>

  )
}

export default Login