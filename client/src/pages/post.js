import React from 'react'
import hobbylogo from '../images/hobbylogo.png'
import Footer from '../components/footer'
import PlaceholderImg from '../images/placeholderimg.png'
import Navigation from '../components/navBar';
import { QUERY_POST } from '../utils/queries';
import { FOLLOW_ALBUM } from '../utils/mutations';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { Link } from "react-router-dom";

const Post = () => {

    const { postId } = useParams();

    const { loading, data } = useQuery(QUERY_POST,
        {
            variables: { postId: postId }
        });

    console.log(postId);
    console.log(data);

    if (loading) {
        return (
            <div>Loading...</div>
        )
    }

    if (data) {
        <div>This is where the post page will go.</div>
    }


}

export default Post;