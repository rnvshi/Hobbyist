import React from 'react'

//form to signup
const Signup = () => {
  return (
    <div id="signup-form-flex">
      <form id="signup-form">

        <div class="signup-fields">
          <label class="signup-form-label">User Name</label>
          <input id="userName" />
        </div>

        <div class="signup-fields">
          <label id="email-label" class="signup-form-label">E-mail</label>
          <input id="email"></input>
        </div>
        <div class="signup-fields">
          <label id="password-label" class="signup-form-label">Password</label>
          <input id="password" />
        </div>
        <button id="signup-button" type="login">SIGN IN</button>
      </form>
    </div>

  )
}

export default Signup