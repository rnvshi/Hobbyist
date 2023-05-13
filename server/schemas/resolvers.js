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

            const token = signToken(user);

            return { token, user};
        },

        // remember to add context code to this after back-end is up and running
        // also later on can use context.user to populate username field here (or use userID)
        // this will populate the myAlbum field in the User collection with albumIds only
        createAlbum: async (parent, { albumName, description}, context) => {
            const album = await Album.create({ albumName, description, username: context.user.userName });

            const user = await User.findOneAndUpdate(
                { userName: context.user.userName },
                { $addToSet: { myAlbums: album._id } }
            );

            return album;
        },

        // add authentication at some level to validate img dimensions (must be square)
        createPost: async (parent, { postImg, caption, albumName}, context) => {
            const post = await Post.create({ postImg, caption, albumName, username: context.user.userName });

            const album = await Album.findOneAndUpdate(
                { albumName: albumName },
                { $addToSet: { posts: post._id } }
            );

            return post;
        },

        // this will populate the comment field as a subdocument
        createComment: async (parent, { postId, text }, context) => {
            return Post.findOneAndUpdate(
                { _id: postId },
                {
                    $addToSet: {
                        comments: { username: context.user.userName, text },
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
        deleteAlbum: async (parent, { albumId }, context) => {

            if(context.user.myAlbums.contains(albumId)){
                const album = await Album.findOneAndDelete(
                    { _id: albumId }
                );
    
                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { myAlbums: album._id } }
                );
    
                await Post.deleteMany({ albumName: album.albumName });
    
                return album;
            }else{
                throw new AuthenticationError('User does not have an album with this id!');
            }
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
            return { token, user };
        },

        //friend mutations require non-stale context. currently, the context is not updated when the logged in user's properties are changed. This must be done somehow.

        //addFriend
        //return for this is broken, but the mutation works
        addFriend: async (parent, {friendId}, context) => {
            //create friend object for user
            console.log(context.user)
            if(context.user){
                const user = await User.updateOne({ _id: context.user._id}, 
                    { $push: { friends: {friendId, sender: true, accepted: false}}})
                //create friend object for friend
                await User.updateOne({_id: friendId}, 
                    { $push: { friends: { friendId: context.user._id, sender: false, accepted: false}} })
                
                return user;
            }
            return;
        },

        //acceptFriend
        acceptFriend: async (parent, {friendId}, context) => {

            const friends = context.user.friends;
            const friend = friends.find((friend) => friend.friendId === friendId);

            console.log(friend.sender)
            
            //check if user is the reciever of the friend request
            if(friend?.sender === false){
                
                //update user's friend object
                const user1Friend = {friendId, accepted: true, sender: null}
                const user1 = await User.findOneAndUpdate({ "_id": context.user._id, "friends.friendId": friendId }, 
                { "friends.$": user1Friend })
                
                //update friend's friend object
                const user2Friend = { friendId: context.user._id, accepted: true, sender: null}
                const user2 = await User.findOneAndUpdate({ "_id": friendId, "friends.friendId": context.user._id }, 
                { "friends.$": user2Friend })
    
                // console.log(user);
                return user1;

            }else if(friend?.sender === true){
                throw new AuthenticationError('User must be receiver of request to accept!');
            }else{
                throw new AuthenticationError('User is already your friend!');
            }
        },


        //declineFriend
        //needs more testing
        declineFriend: async (parent, {friendId, context}) => {
            const friends = context.user.friends;
            const friend = friends.find((friend) => friend.friendId === friendId);

            // console.log(context.user);

            if(friend?.sender === false){
                const user1 = await User.findOneAndUpdate({ _id: context.user._id, "friends.friendId": friendId},
                 { $pull: { friends: { friendId: friendId} } })
    
                const user2 = await User.findOneAndUpdate({ _id: friendId, "friends.friendId": context.user._id},
                 { $pull: { friends: { friendId: context.user._id} } })

                 return user1;

            }else if (friend?.sender === true){

                throw new AuthenticationError("Sender of friend request cannot decline!")

            }else{

                throw new AuthenticationError("You are already friends!")

            }
        },
        //deleteFriend
        //works with pending friend atm -- should not?
        deleteFriend: async (parent, {friendId}, context) => {

            const friends = context.user.friends;
            const friend = friends.find((friend) => friend.friendId === friendId);

            if(friend?.sender === null){
                const user1 = await User.findOneAndUpdate({ _id: context.user._id, "friends.friendId": friendId},
                 { $pull: { friends: { friendId: friendId} } })
    
                const user2 = await User.findOneAndUpdate({ _id: friendId, "friends.friendId": context.user._id},
                 { $pull: { friends: { friendId: context.user._id} } })

                 return user1;
            }else{
                throw new AuthenticationError("Friend request is still pending!")
            }
        },


        // //likePost
        // likePost: async (parent, {postId}) => {
            
        // },
    }
};

module.exports = resolvers;