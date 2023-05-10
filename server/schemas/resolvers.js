const { AuthenticationError } = require('apollo-server-express');
const { User, Album, Post, Comment } = require('../models');

const resolvers = {
    Query: {
        users: async () => {
            return User.find();
        },

        user: async (parent, { userId }) => {
            return User.findOne({ userId }).populate('myAlbums');
        },

        albums: async (parent, { userId }) => {
            return Album.find({ userId }).populate('posts');
        },

        posts: async (parent, { albumId }) => {
            return Post.find({ albumId }).populate('comments');
        },

        comments: async (parent, { postId }) => {
            return Comment.find({ postId });
        }
    }
};

module.exports = resolvers;