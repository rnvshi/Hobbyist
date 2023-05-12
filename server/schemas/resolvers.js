const { AuthenticationError } = require('apollo-server-express');
const { User, Album, Post } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        // GET all users
        // only albumIds populate the myAlbums field
        allUsers: async () => {
            return User.find()
                .populate({
                    path: 'myAlbums',
                    populate: {
                        path: 'posts'
                    }
                });
        },

        // GET a single user given userId
        // only albumIds populate the myAlbums field
        singleUser: async (parent, { userId }) => {
            return User.findOne({ _id: userId });
        },

        // GET all albums associated with a username
        // only postIds populate the posts field
        allAlbums: async (parent, { username }) => {
            return Album.find({ username: username }).populate('posts');
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
        createAlbum: async (parent, { albumName, description}, context) => {
            console.log(context.user)
            const album = await Album.create({ albumName, description, username: context.user.userName });

            const user = await User.findOneAndUpdate(
                { userName: context.user.userName },
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
        },

        // DELETE album given userId and albumId
        // will also delete associated posts inside album
        // will also delete albumIds from associated User document
        deleteAlbum: async (parent, { userId, albumId }) => {

            const album = await Album.findOneAndDelete(
                { _id: albumId }
            );

            await User.findOneAndUpdate(
                { _id: userId },
                { $pull: { myAlbums: album._id } }
            );

            await Post.deleteMany({ albumName: album.albumName });

            return album;
        },

        // DELETE comment given albumId and postId
        // later replace username with context.user
        // will also deleted nested comments subdocument
        // will also remove postId from posts field in Album document
        deletePost: async (parent, { albumId, postId }) => {

            const post = await Post.findOneAndDelete(
                { _id: postId });

            await Album.findOneAndUpdate(
                { _id: albumId },
                { $pull: { posts: post._id } }
            );

            return post;
        },

        // DELETE comment given postId and commentId
        deleteComment: async (parent, { postId, commentId }) => {
            return Post.findOneAndUpdate(
                { _id: postId },
                {
                    $pull: {
                        comments: { _id: commentId },
                    },
                },
                { new: true }
            );
        },

        //login
        login: async (parent, {userName, password}) => {
            const user = await User.findOne({ userName });

            if (!user) {
                throw new AuthenticationError('No user with this username found!');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect password!');
            }

            const token = signToken(user);
            console.log(user)
            return { token, user };
        },

        // //addFriend
        // addFriend: async (parent, {friendId}) => {
            
        // },
        // //acceptFriend
        // AcceptFriend: async (parent, {friendId}) => {
            
        // },
        // //declineFriend
        // declineFriend: async (parent, {friendId}) => {
            
        // },
        // //deleteFriend
        // deleteFriend: async (parent, {friendId}) => {
            
        // },
        // //likePost
        // likePost: async (parent, {postId}) => {
            
        // },
    }
};

module.exports = resolvers;