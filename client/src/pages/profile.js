import React, { useContext, useEffect } from 'react'
import { Link } from "react-router-dom";
import { QUERY_ME, QUERY_USER } from '../utils/queries';
import { useQuery } from '@apollo/client';
import { Navigate, useParams } from 'react-router-dom';
import UpdateProfile from '../components/UpdateProfile';
import ProfileFriends from '../components/ProfileFriends';

import Auth from '../utils/auth';
import { UserContext } from '../utils/userContext';

const Profile = () => {

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
            bio: Auth.getProfile().data.bio,
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

  console.log(Auth.getProfile().data)

  // //fetch user data code

  const { userId } = useParams();


  const { loading, data } = useQuery(
    userId ? QUERY_USER : QUERY_ME,
    {
      variables: { userId: userId },
    }
  );


  if (loading) {
    return <div>Loading...</div>;
  }


  if (Auth.loggedIn() && Auth.getProfile().data._id === userId) {
    return <Navigate to="/profile/me" />;
  }

  const friend = data?.singleUser?.friends.find((friend) => friend.friendId === Auth.getProfile().data._id);

  return (
    <>
      {!userId ?
        //me profile
        <>
          <div id="flexprofilebio">
            <div >
              <img id="profileimg" alt='avatar' src={userState.avatar}></img>
            </div>

            <div id="profiletext">
              <h3>{userState.userName}</h3>
              <h3 id="biotext">Bio: {userState.bio}</h3>
            </div>
          </div>
          <UpdateProfile />

          <h3 id="albumtext">Albums</h3>
          <div id="profilegalleries">
            {data?.me && data?.me.myAlbums.map((album, index) => (

              <Link key={index} to={`/album/${album._id}`}>
                <img id="profileimggallery"
                  alt='album icon'
                  src={album.posts[0] ?
                    `${album.posts[0]?.postImg}`
                    : "https://practicebusiness.co.uk/wp-content/uploads/2021/04/colorful-doodle-hobby-seamless-pattern-stay-home-concept-isolated-on-vector-id1226226348.jpg"}
                ></img>
              </Link>

            ))}
          </div>
        </>
        :

        // userId profile
        <div>
          <div id="flexprofilebio">
            <div >
              <img id="profileimg" alt='avatar' src={data?.singleUser.avatar}></img>
            </div>

            <div id="profiletext">
              <h3>Username: {data?.singleUser.userName}</h3>
              <h3 id="biotext">Bio: {data?.singleUser.bio}</h3>
            </div>
          </div>
          <ProfileFriends friend={friend} userId={userId} />

          <h3 id="albumtext">Albums</h3>

          {data?.singleUser && data?.singleUser.myAlbums.map((album, index) => (

            <Link key={index} to={`/album/${album._id}`}>
              <img id="profileimggallery"
                alt='album icon'
                src={album.posts[0] ?
                  `${album.posts[0]?.postImg}`
                  : "https://practicebusiness.co.uk/wp-content/uploads/2021/04/colorful-doodle-hobby-seamless-pattern-stay-home-concept-isolated-on-vector-id1226226348.jpg"}
              ></img>
            </Link>

          ))}
        </div>
      }
    </>
  )
}


export default Profile
