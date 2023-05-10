import React from 'react'
//form to login
const Login = () => {
  return (
    <form>
      <div>
        <label>User Name</label>
      <input id="userName"/>
      </div>
      <div>
        <label>Password</label>
      <input id="password"/>
      </div>
      <button type="submit">LOG IN</button>
    </form>
    

  )
}

export default Login