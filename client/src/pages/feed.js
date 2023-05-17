import React, { useState, useEffect } from 'react'
import { GET_FEED } from '../utils/queries'
import { LIKE_POST } from '../utils/mutations'
import { useQuery, useMutation, useLazyQuery, RefetchQueriesFunction } from '@apollo/client'
import Navigation from '../components/navBar'
import hobbylogo from '../images/hobbylogo.png'
import Footer from '../components/footer'
import PlaceholderImg from '../images/placeholderimg.png'
import auth from '../utils/auth'

const Feed = () => {
  const [activeitem, setactiveitem] = useState(false)
  
  const [refreshFeed, { loading1, data1, error1 }] = useLazyQuery(GET_FEED);

  const { data, loading } = useQuery(GET_FEED)
  const feed = data1?.getFeed || data?.getFeed
  // console.log(data)
  
  let posts = [];
  feed?.followedAlbums.forEach((album) => {
    posts = [...album.posts, ...posts]
  })
  
  
  const newposts = [];
  posts.forEach((post) => {
    feed?.followedAlbums.forEach((album) => {
      if(album.albumName === post.albumName){
        let newpost = {...post, username: album.username}
        newposts.push(newpost);
      }
    })
  })

  newposts.sort(({createdAt:a}, {createdAt:b}) => b-a);

  const sortedPosts = [];

  newposts.forEach((post) => {
    feed?.followedAlbums.forEach((album) => {
      if(album.albumName === post.albumName){
        let newpost = {...post, username: album.username}
        let postDate = new Date(newpost.createdAt * 1).toString().split(' ');
        postDate = postDate[0] + " " + postDate[1] + " " + postDate[2] + ", " + postDate[3]
        newpost.createdAt = postDate;
        sortedPosts.push(newpost);
      }
    })
  })


  const [updateLikes, { error, likeData }] = useMutation(LIKE_POST);
 

  const [postId, setId] = useState("")


  useEffect(() => {
    if(postId){
      console.log(postId)
      const data = updateLikes({variables: {postId: postId}});
      window.location.reload();
    }
  },[postId])

  return (

    <div>
      <div id="feed-container">
          {feed && 
            sortedPosts.map((post, index) => (
            <div 
            key={index} 
            className='feedflex'
            >
              <div  className="feedblock">
                <div>
                  <img className="feedposts" id="profileimggallery" src={post.postImg}></img>
                </div>
                <div>

                  {/* <h3 id="feed-comment-title">Comments:</h3> */}
                  {/* {post.comments.map(comment => <div>
                    <p>{comment.text}</p>
                    <p>Comment created by:{comment.username}</p>

                  </div>)} */}
                  <button 
                  id="like-button"
                  onClick={() => {
                    setId(`${post._id}`)
                  }}
                  >
                  {post.likes.length} Likes
                  </button>
                </div>
              </div>
              <div>
                <div>
                  <h3 id="feed-titles">Created by {post.username} on {post.createdAt}</h3>

                  <h3>{post.caption}</h3>
                </div>

              </div>
            </div>)
            )
          }
          {feed && feed.followedAlbums.length === 0 && <h3>You don't have any followed albums.</h3>}
      </div>
    </div>
  )
}

export default Feed