import React from 'react'

//form to signup
const Signup = () => {
  return (
    <form>
      <div>
        <label>User Name</label>
        <input id="userName" />
      </div>
      <div>
        <label>Pseudonym</label>
        <input id="Pseudonym" />
      </div>
      <div>
        <label>e-mail</label>
        <input id="email"></input>
      </div>
      <div>
        <label>Password</label>
        <input id="password" />
      </div>
      <button type="login">LOG IN</button>
    </form>
  )
}

export default Signup