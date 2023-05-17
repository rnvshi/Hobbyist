import React from 'react'
import hobbylogo from '../images/hobbylogo.png'
import Footer from '../components/footer'
import PlaceholderImg from '../images/placeholderimg.png'
import Navigation from '../components/navBar';
import { QUERY_POST } from '../utils/queries';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { Link } from "react-router-dom";
import PostCard from '../components/postCard';

const Post = () => {

    const { postId } = useParams();

    const { loading: loadingPost, data: postData } = useQuery(QUERY_POST,
        {
            variables: { postId: postId }
        });

    if (loadingPost) {
        return (
            <div>Loading...</div>
        )
    }

    if (postData) {
        const data = postData?.singlePost;

        const albumName = data.albumName;
        const postId = data._id;
        const postImg = data.postImg;
        const caption = data?.caption;
        const comments = data?.comments;

        return (
            <>
                <div>
                    <PostCard
                        albumName={albumName}
                        postId={postId}
                        postImg={postImg}
                        caption={caption}
                        comments={comments}
                    />
                </div>
            </>
        )
    }


}

export default Post;