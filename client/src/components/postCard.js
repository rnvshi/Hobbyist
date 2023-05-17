import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_COMMENT } from '../utils/mutations';

//single Post element

const PostCard = ({ albumName, postId, postImg, caption, comments }) => {

  const [commentState, setCommentState] = useState({ text: '' });
  const [createComment] = useMutation(CREATE_COMMENT);

  const handleChange = (event) => {
    const { value } = event.target;

    setCommentState({
      ...commentState,
      text: value
    })
  }

  const handlePostComment = async (event) => {
    event.preventDefault();

    if (commentState.text.length !== 0) {

      try {
        const { data } = await createComment({
          variables: { postId: postId, text: commentState.text },
        });

        alert('Comment posted !');

      } catch (e) {
        console.error(e);
      }

    } else {
      alert('Comment field is empty, please try again.')
    }
  }

  return (
    <div className="postCard">
      <h1>Viewing from Album: {albumName}</h1>
      <div className="postContent">
        <img src={postImg} className="postImg"></img>
        <h2 className="postCaption">{caption}</h2>
        <div className="commentContainer">
          {comments.map((comment, index) =>
            <p className='userComment' key={index}>
              <span id='userName'>{comment.username}   </span>
              <span id='userText'>{comment.text}</span></p>
          )}
          <form onSubmit={handlePostComment}>
            <input className="commentText" placeholder='Add a comment...' onChange={handleChange}></input>
            <br />
            <input id="postcomment" className="postComment" type="submit" value="Post Comment" />
            <br />
          </form>
        </div>
      </div>
    </div>
  )
}

export default PostCard;