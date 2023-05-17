import React from 'react'
import hobbylogo from '../images/hobbylogo.png'
import Footer from '../components/footer'
import PlaceholderImg from '../images/placeholderimg.png'
import Navigation from '../components/navBar';
import { QUERY_GALLERY } from '../utils/queries';
import { FOLLOW_ALBUM, UNFOLLOW_ALBUM } from '../utils/mutations';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { Link } from "react-router-dom";

const Gallery = () => {

    const { albumId } = useParams();

    const { loading, data } = useQuery(QUERY_GALLERY,
        {
            variables: { albumId: albumId }
        });

    const posts = data?.singleAlbum?.posts;

    const [followAlbum] = useMutation(FOLLOW_ALBUM);
    const [unfollowAlbum] = useMutation(UNFOLLOW_ALBUM);

    const handleFollowAlbum = async (event) => {
        console.log('follow this album');

        try {
            const { data } = await followAlbum({
                variables: { albumId: albumId }
            });

            console.log(data);
        } catch (e) {
            console.error(e);
        }
    }

    const handleUnfollowAlbum = async (event) => {
        console.log('unfollow this album');

        try {
            const { data } = await unfollowAlbum({
                variables: { albumId: albumId }
            });

            console.log(data);
        } catch (e) {
            console.error(e);
        }
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
                    <button className="albumbutton" onClick={handleUnfollowAlbum}>Unfollow Album</button>
                </div>

                <div id="flexalbumview">

                    {posts.map((post, index) =>
                        <Link to={`/post/${post?._id}`} key={index}>
                            <div className="albumviewposts">
                                <div >
                                    <img className="albumviewimg" src={post?.postImg}></img>
                                </div>

                            </div>
                        </Link>
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