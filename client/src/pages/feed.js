import React, { useState, useEffect } from 'react'
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
        console.log("here");
      }
    })
  })

  posts.sort(({createdAt:a}, {createdAt:b}) => b-a);


  let post1 = posts[0];

  post1 = {...post1, username: 'test'}

  Object.preventExtensions(post1);

  // console.log(post1)

  // const [sortType, setSortType] = useState('createdAt');

  // useEffect(() => {
  //   const sortArray = () => {
  //     const sortProperty = 'createdAt';
  //     const sorted = [...posts].sort((a, b) => b[sortProperty] - a[sortProperty]);
  //     setData(sorted);
  //   };

  //   sortArray(sortType);
  // }, []);




  return (

    <div>
      <div id="feed-container">
          {feed && feed.followedAlbums.map(album =>
            album.posts.map((post, index) => (
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
                  <button id="like-button">{post.likes.length} Likes</button>
                </div>
              </div>
              <div>
                <div>
                  <h3 id="feed-titles">Created by {album.username} on {post.createdAt}</h3>

                  <h3>{post.caption}</h3>
                </div>

              </div>
            </div>)
            ))
          }
          {feed && feed.followedAlbums.length === 0 && <h3>You don't have any followed albums.</h3>}
      </div>
    </div>
  )
}

export default Feed