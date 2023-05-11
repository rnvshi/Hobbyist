const db = require('../config/connection');
const { User, Post, Album } = require('../models');

const userSeeds = require('./userSeeds.json');
const postSeeds = require('./postSeeds.json');
const albumSeeds = require('./albumSeeds.json');


db.once('open', async () => {
  try {
    //get ids, map to album by
    //create albums
    //get album ids, update user with album ids

    await Post.deleteMany({});
    const postData= await Post.create(postSeeds);

    albumSeeds.forEach((album) => {
      postData.forEach((post) => {
        if(post.albumName === album.albumName){
          album.posts.push(post._id)         
        }
      })
    })
    
    await Album.deleteMany({});
    const albumData = await Album.create(albumSeeds);

    userSeeds.forEach((user) => {
      albumData.forEach((album) => {
        if(user.userName === album.username){
          user.myAlbums.push(album._id)         
        }
      })
    })

    await User.deleteMany({});
    await User.create(userSeeds);

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});