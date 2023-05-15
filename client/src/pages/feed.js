import React, { useState } from 'react'
import { GET_FEED } from '../utils/queries'
import { useQuery } from '@apollo/client'
import Navigation from '../components/navBar'
import hobbylogo from '../images/hobbylogo.png'
import Footer from '../components/footer'
import PlaceholderImg from '../images/placeholderimg.png'

const Feed = () => {
  const [activeitem, setactiveitem] = useState(false)
  const { data, loading } = useQuery(GET_FEED)
  const feed = data?.getFeed
  console.log(data)
  console.log(feed)

  return (

    <div>
      <div id="feed-container">
        <div id="feedflex">
          {feed && feed.followedAlbums.map(album =>
            album.posts.map(post => (<>
              <div class="feedblock">
                <div>
                  <img class="feedposts" id="profileimggallery" src={post.postImg}></img>
                </div>

                <div>

                  <h3 id="feed-comment-title">Comments:</h3>
                  {post.comments.map(comment => <div>
                    <p>{comment.text}</p>
                    <p>Comment created by:{comment.username}</p>

                  </div>)}
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
            </>)
            ))
          }
          {feed && feed.followedAlbums.length === 0 && <h3>You don't have any followed albums.</h3>}




        </div>
        <div id="modal">
          <title></title>
          <img></img>
          <p>Created At:</p>
          <div><p></p></div>


        </div>
      </div>
    </div>
  )
}

export default Feed