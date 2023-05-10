const db = require('../config/connection');
const { User, Post, Album } = require('../models');

const userSeeds = require('./userSeeds.json');
const postSeeds = require('./postSeeds.json');
const albumSeeds = require('./albumSeeds.json');


db.once('open', async () => {
  try {
    await User.deleteMany({});
    await User.create(userSeeds);

    await Album.deleteMany({});
    await Album.create(albumSeeds);

    await Post.deleteMany({});
    await Post.create(postSeeds);

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});