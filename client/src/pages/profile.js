import React, { useState } from 'react'
import PlaceholderImg from '../images/placeholderimg.png'
import { Link } from "react-router-dom";
import { QUERY_ME, QUERY_USER } from '../utils/queries';
import { useQuery, useMutation } from '@apollo/client';
import { Navigate, useParams, Prompt } from 'react-router-dom';
import {
  UPDATE_USER,
  ADD_FRIEND,
  ACCEPT_FRIEND,
  DECLINE_FRIEND,
  DELETE_FRIEND
} from '../utils/mutations.js'
import Auth from '../utils/auth';

const Profile = () => {

  //fetch user data code

  const { userId } = useParams();


  const { loading, data } = useQuery(
    userId ? QUERY_USER : QUERY_ME,
    {
      variables: { userId: userId },
    }
  );


  //update profile code

  const [State, setState] = useState({ bio: '' });
  const [updateUser, { error, biodata }] = useMutation(UPDATE_USER);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    console.log(State.bio)
    try {
      const { data } = await updateUser({
        variables: { ...State },
      });

    } catch (e) {
      console.error(e);
    }
    handleClose();

    // clear values
    setState({
      bio: '',
    });
  };

  //add friend code

  const [addFriend, { err, addFriendData }] = useMutation(ADD_FRIEND);

  const handleAddFriend = async () => {
    try {
      const { data } = await addFriend({
        variables: { friendId: userId },
      });

    } catch (e) {
      console.error(e);
    }
    window.location.reload()
  };

  const [acceptFriend, { errorr, acceptFriendData }] = useMutation(ACCEPT_FRIEND);

  const handleAcceptFriend = async () => {
    try {
      const { data } = await acceptFriend({
        variables: { friendId: userId },
      });

    } catch (e) {
      console.error(e);
    }
    window.location.reload()
  };

  const [declineFriend, { erro, declineFriendData }] = useMutation(DECLINE_FRIEND);

  const handleDeclineFriend = async () => {
    try {
      const { data } = await declineFriend({
        variables: { friendId: userId },
      });

    } catch (e) {
      console.error(e);
    }
    window.location.reload()
  };

  const [deleteFriend, { er, deleteFriendData }] = useMutation(DELETE_FRIEND);

  const handleDeleteFriend = async () => {
    try {
      const { data } = await deleteFriend({
        variables: { friendId: userId },
      });

    } catch (e) {
      console.error(e);
    }
    window.location.reload()
  };

  if (loading) {
    return <div>Loading...</div>;
  }



  const user = data?.me || data?.SingleUser || {};

  if (Auth.loggedIn() && Auth.getProfile().data._id === userId) {
    return <Navigate to="/profile/me" />;
  }

  const friend = data?.singleUser?.friends.find((friend) => friend.friendId == Auth.getProfile().data._id);





  return (
    <>
      {!userId ?

        //me profile
        <>
          <div id="flexprofilebio">
            <div >
              <img id="profileimg" src={data?.me.avatar}></img>
            </div>

            <div id="profiletext">
              <h3>{data?.me.userName}</h3>
              <h3 id="biotext">Bio: {data?.me.bio}</h3>
            </div>

          </div>
          {!show &&
            <button
              className='button'
              onClick={handleShow}
            >
              Update Profile
            </button>
          }

          {show &&
            <div>
              <button
                onClick={handleClose}
              >
                Exit
              </button>
              <label>Enter new Bio: </label>
              <input
                id='Bio'
                name='bio'
                value={State.bio}
                onChange={handleChange}
              />
              <button
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          }

          <h3 id="albumtext">Albums</h3>
          <div id="profilegalleries">
            {data?.me && data?.me.myAlbums.map((album, index) => (

              <Link key={index} to={`/album/${album._id}`}>
                <img id="profileimggallery"
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
              <img id="profileimg" src={data?.singleUser.avatar}></img>
            </div>

            <div id="profiletext">
              <h3>Username: {data?.singleUser.userName}</h3>
              <h3 id="biotext">Bio: {data?.singleUser.bio}</h3>
            </div>
          </div>
          {!friend &&
            <button
              className='button'
              onClick={handleAddFriend}
            >
              Add Friend
            </button>
          }

          {friend && friend.sender === false &&
            <h3>
              Request pending!
            </h3>
          }

          {friend && friend.sender === null &&
            <>
              <h3>
                This is your friend
              </h3>
              <button
                onClick={handleDeleteFriend}
              >
                un-friend
              </button>
            </>
          }

          {friend && friend.sender === true &&
            <>
              <h3>
                Accept request?
              </h3>
              <button
                onClick={handleAcceptFriend}
              >
                Accept
              </button>

              <button
                onClick={handleDeclineFriend}
              >
                Decline
              </button>
            </>
          }


          <h3 id="albumtext">Albums</h3>

          {data?.singleUser && data?.singleUser.myAlbums.map((album, index) => (

            <Link key={index} to={`/album/${album._id}`}>
              <img id="profileimggallery"
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