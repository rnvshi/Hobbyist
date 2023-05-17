import React from 'react'
import PlaceholderImg from '../images/placeholderimg.png'
import { Link } from "react-router-dom";
import { QUERY_ME, QUERY_USER } from '../utils/queries';
import { useQuery } from '@apollo/client';
import { Navigate, useParams } from 'react-router-dom';

import Auth from '../utils/auth';

const Profile = () => {

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

  return (
    <>
      {!userId ?
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
          <button className='button'>Update Profile</button>

          <h3 id="albumtext">Albums</h3>
          <div id="profilegalleries">
            {data?.me && data?.me.myAlbums.map((album, index) => (

              <Link key={index} to="/albumview">
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
        <div>

          <div id="flexprofilebio">
            <div >
              <img id="profileimg" src={data?.user.userName}></img>
            </div>

            <div id="profiletext">
              <h3>Username:</h3>
              <h3 id="biotext">Bio: {data?.user.bio}</h3>
            </div>
          </div>

          <h3 id="albumtext">Albums</h3>

          {data?.me && data?.user.myAlbums.map((album, index) => (

            <Link key={index} to="/albumview">
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