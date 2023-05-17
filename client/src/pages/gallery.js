import React, { useState } from 'react'
import hobbylogo from '../images/hobbylogo.png'
import Footer from '../components/footer'
import PlaceholderImg from '../images/placeholderimg.png'
import Navigation from '../components/navBar';
import { QUERY_GALLERY, QUERY_ME } from '../utils/queries';
import { FOLLOW_ALBUM, UNFOLLOW_ALBUM } from '../utils/mutations';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import { Link } from "react-router-dom";
import Auth from '../utils/auth';

const Gallery = () => {

    const { albumId } = useParams();

    const { loading, data } = useQuery(QUERY_GALLERY,
        {
            variables: { albumId: albumId }
        });

    const posts = data?.singleAlbum?.posts;

    const { loading: loadMe, data: dataMe } = useQuery(QUERY_ME);

    let isFollowing = null;
    if (dataMe) {
        const userFollowedAlbums = dataMe?.me?.followedAlbums;

        if (userFollowedAlbums.some(e => e._id === albumId)) {
            isFollowing = true;

        } else {
            isFollowing = false;
        }
    }

    const [followAlbum] = useMutation(FOLLOW_ALBUM);
    const [unfollowAlbum] = useMutation(UNFOLLOW_ALBUM);

    const handleFollowAlbum = async (event) => {
        console.log('follow this album');

        try {
            const { data } = await followAlbum({
                variables: { albumId: albumId }
            });
        } catch (e) {
            console.error(e);
        }
    }

    const handleUnfollowAlbum = async (event) => {
        try {
            const { data } = await unfollowAlbum({
                variables: { albumId: albumId }
            });
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
                    {isFollowing === true ?
                        <button className="albumbutton" onClick={handleUnfollowAlbum}>Unfollow Album</button>
                        :
                        <button className="albumbutton" onClick={handleFollowAlbum}>Follow Album</button>
                    }

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