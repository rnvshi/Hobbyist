import React from 'react'
import Profile from "../pages/profile"

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
        <a id="signinButtonLink" href={Profile}><button id="signup-button" type="login">SIGN UP</button></a>
      </form>
    </div>

  )
}

export default Signup