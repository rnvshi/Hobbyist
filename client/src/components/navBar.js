import React from 'react'


const navBar = () => {
  return (




    <nav id="navflex">

      <div class="navbuttons">
        <button>PROFILE</button>
      </div>

      <div class="navbuttons">
        <button>FEED</button>
      </div>

      <div class="navbuttons">
        <button>CREATE ALBUM</button>
      </div>

      <div class="navbuttons">
        <button>POST</button>
      </div>

      <div class="dropdown navbuttons">
        <button class="dropdown-button">FRIENDS</button>
        <div class="dropdown-content">
          <a href="#">Friend 1</a>
          <a href="#">Friend 2</a>
          <a href="#">Friend 3</a>
        </div>
      </div>

      <div class="navbuttons">
        <button type="submit">SEARCH</button>
      </div>

      <div class="navbuttons">
        <button type="submit">LOGOUT</button>
      </div>

    </nav>
  )
}

export default navBar