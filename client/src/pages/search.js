import React from 'react'
import Navigation from '../components/navBar'
import hobbylogo from '../images/hobbylogo.png'
import Footer from '../components/footer'

const search = () => {
  return (
    <div>

      <div id="logo-img-div">
        <img id="logo-img-profile" src={hobbylogo}></img>
      </div>

      <Navigation />

      <div class="search-container">
        <input type="text" placeholder="Search..." class="search-input" />
        <button type="submit" class="search-button">Search</button>
      </div>

      <Footer id="searchfooter" />



    </div>
  )
}

export default search