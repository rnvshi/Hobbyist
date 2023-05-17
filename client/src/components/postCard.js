import React from 'react';

//single Post element

const postCard = ({ albumName, postId, postImg, caption, comments }) => {
  return (
    <div className="postCard">
      <h1>Viewing from Album: {albumName}</h1>
      <div className="postContent">
        <img src={postImg} className="postImg"></img>
        <h2 className="postCaption">{caption}</h2>
        <div className="commentContainer">{comments}
        </div>
      </div>
    </div>
  )
}

export default postCard