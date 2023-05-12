
import React from 'react'
import Navigation from '../components/navBar'
import hobbylogo from '../images/hobbylogo.png'
import Footer from '../components/footer'
import PlaceholderImg from '../images/placeholderimg.png'

const Post = () => {
  return (
    <div>

      <div id="logo-img-div">
        <img id="logo-img-profile" src={hobbylogo}></img>
      </div>

      <Navigation />
      <div class="feedflex">
        <div>
          <img class="feedposts" id="profileimggallery" src={PlaceholderImg}></img>
        </div>
        <div>
          <h3>Username:</h3>
          <p></p>
          <h3>Caption:</h3>
          <p></p>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Post