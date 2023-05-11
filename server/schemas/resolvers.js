const { AuthenticationError } = require('apollo-server-express');
const { User, Album, Post } = require('../models');

const resolvers = {
    Query: {
        // GET all users
        // only albumIds populate the myAlbums field
        allUsers: async () => {
            return User.find();
        },

        // GET a single user given userId
        // only albumIds populate the myAlbums field
        singleUser: async (parent, { userId }) => {
            return User.findOne({ _id: userId });
        },

        // GET all albums associated with a username
        // only postIds populate the posts field
        allAlbums: async (parent, { username }) => {
            return Album.find({ username: username });
        },

        // GET all posts associated with an album name
        // entire comment subdocument populates comment field
        allPosts: async (parent, { albumName }) => {
            return Post.find({ albumName });
        },

        // GET a single post (and associated comments) given postId
        // entire comment subdocument populates comment field
        singlePost: async (parent, { postId }) => {
            return Post.findOne({ _id: postId });
        }
    },

    Mutation: {
        createUser: async (parent, { firstName, lastName, userName, email, password }) => {
            const user = await User.create({ firstName, lastName, userName, email, password });

            // remember to include code for sign token

            return user;
        },

        // remember to add context code to this after back-end is up and running
        // also later on can use context.user to populate username field here (or use userID)
        // this will populate the myAlbum field in the User collection with albumIds only
        createAlbum: async (parent, { albumName, description, username }) => {
            const album = await Album.create({ albumName, description, username });

            const user = await User.findOneAndUpdate(
                { userName: username },
                { $addToSet: { myAlbums: album._id } }
            );

            return album;
        },

        // add authentication at some level to validate img dimensions (must be square)
        createPost: async (parent, { postImg, caption, albumName, username }) => {
            const post = await Post.create({ postImg, caption, albumName, username });

            const album = await Album.findOneAndUpdate(
                { albumName: albumName },
                { $addToSet: { posts: post._id } }
            );

            return post;
        },

        // this will populate the comment field as a subdocument
        createComment: async (parent, { username, postId, text }) => {
            return Post.findOneAndUpdate(
                { _id: postId },
                {
                    $addToSet: {
                        comments: { username, text },
                    },
                },
                {
                    new: true,
                    runValidators: true,
                }
            );
        }
    }
};

module.exports = resolvers;