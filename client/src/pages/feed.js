import React from 'react'
import Navigation from '../components/navBar'
import hobbylogo from '../images/hobbylogo.png'
import Footer from '../components/footer'
import PlaceholderImg from '../images/placeholderimg.png'

const feed = () => {
  return (
    <div>

      <div id="logo-img-div">
        <img id="logo-img-profile" src={hobbylogo}></img>
      </div>

      <Navigation />
      <div>
        <img class="feedposts" id="profileimggallery" src={PlaceholderImg}></img>
        <img class="feedposts" id="profileimggallery" src={PlaceholderImg}></img>
        <img class="feedposts" id="profileimggallery" src={PlaceholderImg}></img>
      </div>
      <Footer />
    </div>
  )
}

export default feed