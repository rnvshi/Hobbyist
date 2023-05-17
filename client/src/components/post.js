import React from 'react'

//rendered for full page view --> post details + comments

const Post = () => {
  return (
    <form>
      <div>
        <label>Please add your post</label>
        <input id="post" />
      </div>
      <button type="submit">POST</button>
    </form>
  )
  //

}

export default Post;