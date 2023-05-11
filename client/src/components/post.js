import React from 'react'

//rendered for full page view --> post details + comments

const post = () => {
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
//

}

export default post