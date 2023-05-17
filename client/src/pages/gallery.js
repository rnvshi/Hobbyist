import React from 'react'
import hobbylogo from '../images/hobbylogo.png'
import Footer from '../components/footer'
import PlaceholderImg from '../images/placeholderimg.png'
import Navigation from '../components/navBar';
import { QUERY_GALLERY } from '../utils/queries';
import { FOLLOW_ALBUM } from '../utils/mutations';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

const Gallery = () => {

    const { albumId } = useParams();

    const { loading, data } = useQuery(QUERY_GALLERY,
        {
            variables: { albumId: albumId }
        });

    const posts = data?.singleAlbum?.posts;

    const [followAlbum] = useMutation(FOLLOW_ALBUM);

    const handleFollowAlbum = () => {

    }

    if (loading) {
        return (
            <div>Loading...</div>
        )
    }

    if (posts.length != 0) {

        return (
            <div>

                <h3 id="albumtext">Album:</h3>

                <div id="albumbuttons">
                    <button className="albumbutton" onClick={handleFollowAlbum}>Follow Album</button>
                    <button className="albumbutton">Unfollow Album</button>
                </div>

                <div id="flexalbumview">

                    {posts.map((post, index) =>

                        <div key={index} className="albumviewposts">
                            <div >
                                <img className="albumviewimg" src={post.postImg}></img>
                            </div>

                        </div>
                    )}

                </div>
            </div>


        )
    } else if (posts.length === 0) {
        return (
            <div>
                This album is empty. Please return when the user has uploaded posts.
            </div>
        )
    }

}

export default Gallery;