import React from 'react'
import hobbylogo from '../images/hobbylogo.png'
import Footer from '../components/footer'
import PlaceholderImg from '../images/placeholderimg.png'

const Profile = () => {
  return (
    <div>

      <div id="logo-img-div">
        <img id="logo-img-profile" src={hobbylogo}></img>
      </div>

      <div id="flexprofilebio">
        <div >
          <img id="profileimg" src={PlaceholderImg}></img>
        </div>

        <div id="profiletext">
          <h3>Username:</h3>
          <h3 id="biotext">Bio:</h3>
        </div>
      </div>

      <h3 id="albumtext">Albums</h3>

      <div id="profilegalleries">
        <img id="profileimggallery" src={PlaceholderImg}></img>
        <img id="profileimggallery" src={PlaceholderImg}></img>
        <img id="profileimggallery" src={PlaceholderImg}></img>
      </div>

      <Footer />
    </div>
  )
}

export default Profile