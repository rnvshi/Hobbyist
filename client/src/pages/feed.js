import React from 'react'
import Navigation from '../components/navBar'
import hobbylogo from '../images/hobbylogo.png'
import Footer from '../components/footer'
import PlaceholderImg from '../images/placeholderimg.png'

const feed = () => {
  return (
    <div>
      <div id="feed-container">
        <div id="feedflex">
          <div id="feedblock">
            <div>
              <img class="feedposts" id="profileimggallery" src={PlaceholderImg}></img>
            </div>

            <div>
              <p></p>
              <h3 id="feed-comment-title">Comments:</h3>
              <p></p>
              <p></p>
              <button id="like-button">Like</button>
            </div>
          </div>

          <div>
            <div>
              <h3 id="feed-titles">Username:</h3>

              <h3>Caption:</h3>

              <h3 id="feed-title">Created At:</h3>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default feed