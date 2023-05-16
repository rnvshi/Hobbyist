
import React from 'react'
import Navigation from '../components/navBar'
import hobbylogo from '../images/hobbylogo.png'
import Footer from '../components/footer'
import PlaceholderImg from '../images/placeholderimg.png'

const Post = () => {
  return (
    <>




      <form id="postform" action="#" method="POST" enctype="multipart/form-data">

        <div id="form-placement">

          <input className="postinput" type="file" id="image-upload" name="image-upload" />
          <br />

          <label className="posttext">Add a caption:
            <input className="postinput" type="text" name="text" /></label>

          <br />
          <input id="uploadimg" className="postinput" type="submit" value="Upload Image" />
          <br />

        </div>

      </form>



    </>
  )
}

export default Post