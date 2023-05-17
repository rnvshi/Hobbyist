import React from 'react'
import LoginPage from '../pages/login'
import { Link } from "react-router-dom";
import hobbylogo from '../images/hobbylogo.png'

import Auth from '../utils/auth';

const navBar = () => {

  const logout = () => {
    localStorage.removeItem("id_token")
    window.location.assign("/login")
  }

  return (
    <>

      <div id="logo-img-div">
        <img id="logo-img-profile" src={hobbylogo}></img>
      </div>

      <nav id="navflex">

        <div className="navbuttons">
          <Link to="/profile/me"><button onClick={window.location.reload()} >PROFILE</button></Link>
        </div>

        <div className="navbuttons">
          <Link to="/"><button onClick={window.location.reload()} >FEED</button></Link>
        </div>

        <div className="dropdown navbuttons">
          <Link to="/albumcreate"><button onClick={window.location.reload()} className="dropdown-button">CREATE ALBUM</button></Link>

        </div>

        <div className="navbuttons">
          <Link to="/createPost"><button onClick={window.location.reload()} >POST</button></Link>
        </div>

        {/* <div className="navbuttons">
         <Link to="/friendprofile"><button>FRIENDS</button></Link>
         </div> */}

        <div className="navbuttons">
          <Link to="/search"> <button onClick={window.location.reload()} >SEARCH</button></Link>
        </div>

        <div className="navbuttons">
          <button onClick={logout}>LOGOUT</button>
        </div>

      </nav>
    </>
  )
}

export default navBar
