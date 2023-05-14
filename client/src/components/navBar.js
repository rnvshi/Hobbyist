import React from 'react'
import LoginPage from '../pages/login'
import { Link } from "react-router-dom";
import hobbylogo from '../images/hobbylogo.png'


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

        <div class="navbuttons">
          <Link to="/profile"><button>PROFILE</button></Link>
        </div>

        <div class="navbuttons">
          <Link to="/feed"><button>FEED</button></Link>
        </div>

        <div class="dropdown navbuttons">
          <button class="dropdown-button">ALBUM</button>
          <div class="dropdown-content">
            <a href="#">Create</a>


          </div>
        </div>

        <div class="navbuttons">
          <Link to="/post"><button>POST</button></Link>
        </div>

        <div class="dropdown navbuttons">
          <button class="dropdown-button">FRIENDS</button>
          <div class="dropdown-content">
            <Link to="/friendprofile">Friend 1</Link>
            <Link to="/friendprofile">Friend 2</Link>
            <Link to="/friendprofile">Friend 3</Link>
          </div>
        </div>

        <div class="navbuttons">
          <Link to="/search"> <button>SEARCH</button></Link>
        </div>

        <div class="navbuttons">
          <button onClick={logout}>LOGOUT</button>
        </div>

      </nav>
    </>
  )
}

export default navBar