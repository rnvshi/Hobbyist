import React from 'react'

//form to create a new post
const createPost = () => {
  return (
    <div>
      <form>
      <div>
        <label>Post About Your Hobby</label>
      <input id="createPost"/>
      </div>
    
      <button type="submit">POST</button>
    </form>
    </div>
  )
}

export default createPost