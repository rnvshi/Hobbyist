import React, { useState, useEffect, useContext } from 'react'
import { GET_FEED } from '../utils/queries'
import { LIKE_POST } from '../utils/mutations'
import { useQuery, useMutation } from '@apollo/client'
import { Link } from "react-router-dom";

import Auth from '../utils/auth'

import { UserContext } from '../utils/userContext';

const Feed = () => {
  const [userState,setUserState] = useContext(UserContext);

  const loadData = () => {
    if(!Auth.loggedIn()){
      console.log('not logged in')
    }else {
      setUserState(
        {
          ...userState,
            _id: Auth.getProfile().data._id,
            userName: Auth.getProfile().data.userName,
            pseudonym: Auth.getProfile().data.pseudonym,
            bio: userState.bio || Auth.getProfile().data.bio,
            avatar: Auth.getProfile().data.avatar,
            myAlbums: [...Auth.getProfile().data.myAlbums],
            followedAlbums: [...Auth.getProfile().data.followedAlbums],
            friends: [...Auth.getProfile().data.friends]
        }
      )
    }
  }
  
  useEffect(() =>{
    if(!userState._id){
      loadData()
      console.log("loaded data")
    }
  }, []);


  const { data, loading } = useQuery(GET_FEED)
  const feed = data?.getFeed

    
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


  const [updateLikes, { likeData }] = useMutation(LIKE_POST);
 

  const [postId, setId] = useState("")


  useEffect(() => {
    if(postId){
      console.log(postId)
      updateLikes({variables: {postId: postId}});
      window.location.reload();
    }
  },[postId])

  if (loading) {
    return <div>Loading...</div>;
  }

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
                  <Link to={`/post/${post._id}`} >
                  <img className="feedposts" alt='post icon' id="profileimggallery" src={post.postImg}></img>
                  </Link>
                </div>
              <div>

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