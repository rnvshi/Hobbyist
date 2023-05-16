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
            return User.findOne({ _id: userId })
                .populate({
                    path: 'myAlbums',
                    populate: {
                        path: 'posts'
                    }
                });
        },

        me: async (parent, args, context) => {
            return User.findOne({ _id: context.user._id })
                .populate({
                    path: 'myAlbums',
                    populate: {
                        path: 'posts'
                    }
                });
        },

        singleUsername: async (parent, { username }) => {
            return User.findOne({ userName: username });
        },

        // GET all albums associated with a username
        // only postIds populate the posts field
        allAlbums: async (parent, { username }) => {
            return Album.find({ username: username })
                .populate('posts');
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
        },

        getFeed: async (parent, args, context) => {
            let user = User.findOne({ _id: context.user._id })
                .populate({
                    path: 'followedAlbums',
                    populate: {
                        path: 'posts',
                    }
                });

            return user;
        }
    },

    Mutation: {
        login: async (parent, { userName, password }) => {

            const user = await User.findOne({ userName });

            if (!user) {
                throw new AuthenticationError('No user found with this email address');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        },

        createUser: async (parent, { firstName, lastName, userName, email, password }) => {
            const user = await User.create({ firstName, lastName, userName, email, password });
            const token = signToken(user);
            return { token, user };
        },

        // remember to add context code to this after back-end is up and running
        // also later on can use context.user to populate username field here (or use userID)
        // this will populate the myAlbum field in the User collection with albumIds only
        createAlbum: async (parent, { albumName, description }, context) => {
            const album = await Album.create({ albumName, description, username: context.user.userName });

            const user = await User.findOneAndUpdate(
                { userName: context.user.userName },
                { $addToSet: { myAlbums: album._id } }
            );

            return album;
        },

        // add authentication at some level to validate img dimensions (must be square)
        createPost: async (parent, { postImg, caption, albumName }, context) => {
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

            const user = await User.findOne({ _id: context.user._id })

            //find() will return undefined if friend with friendId is not found
            const album = user.myAlbums.find((album) => album.albumId == albumId);

            if (album) {
                const deletedalbum = await Album.findOneAndDelete(
                    { _id: albumId }
                );

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { myAlbums: album._id } }
                );

                await Post.deleteMany({ albumName: album.albumName });

                return deletedalbum;
            } else {
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
        login: async (parent, { userName, password }) => {
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



        //addFriend
        addFriend: async (parent, { friendId }, context) => {
            //check if user is logged in
            if (!context.user) {
                throw new AuthenticationError("Must be logged in to do this!")
            }

            //check userId against friendId
            if (context.user._id == friendId) {
                throw new AuthenticationError("You cannot add yourself as a friend!")
            }

            const user = await User.findOne({ _id: context.user._id })

            //find() will return undefined if friend with friendId is not found
            const friend = user.friends.find((friend) => friend.friendId == friendId);
            //ensure that this friendId does not exist already inside user.friends

            if (friend) {
                throw new AuthenticationError("This user is already your friend!")
            }

            //create friend object for user
            const updatedUser = await User.findOneAndUpdate({ _id: context.user._id },
                { $push: { friends: { friendId, sender: true, accepted: false } } }, { new: true })

            //create friend object for friend
            await User.updateOne({ _id: friendId },
                { $push: { friends: { friendId: context.user._id, sender: false, accepted: false } } })

            return updatedUser;
        },

        //acceptFriend
        acceptFriend: async (parent, { friendId }, context) => {

            if (!context.user) {
                throw new AuthenticationError("Must be logged in to do this!")
            }

            const user = await User.findOne({ _id: context.user._id })

            //find() will return undefined if friend with friendId is not found
            const friend = user.friends.find((friend) => friend.friendId == friendId);
            //ensure that this friendId does not exist already inside user.friends

            if (!friend) {
                throw new AuthenticationError("There is no pending friend request to accept!")
            }

            if (friend.sender === true) {
                throw new AuthenticationError('User must be receiver of request to accept!');
            }

            if (friend.sender === null) {
                throw new AuthenticationError('User is already your friend!');
            }

            //update user's friend object
            const user1Friend = { friendId, accepted: true, sender: null }
            const user1 = await User.findOneAndUpdate({ "_id": context.user._id, "friends.friendId": friendId },
                { "friends.$": user1Friend }, { new: true })

            //update friend's friend object
            const user2Friend = { friendId: context.user._id, accepted: true, sender: null }
            const user2 = await User.findOneAndUpdate({ "_id": friendId, "friends.friendId": context.user._id },
                { "friends.$": user2Friend })

            return user1;
        },

        //declineFriend
        declineFriend: async (parent, { friendId }, context) => {

            if (!context.user) {
                throw new AuthenticationError("Must be logged in to do this!")
            }

            const user = await User.findOne({ _id: context.user._id })
            //find() will return undefined if friend with friendId is not found
            const friend = user.friends.find((friend) => friend.friendId == friendId);

            if (!friend) {
                throw new AuthenticationError("This user is not your friend!")
            }

            if (friend.sender === true) {
                throw new AuthenticationError("Sender of friend request cannot decline!")
            }

            if (friend.sender === null) {
                throw new AuthenticationError("You are already friends!")
            }

            //delete user1's friend object of user2
            const user1 = await User.findOneAndUpdate({ _id: context.user._id, "friends.friendId": friendId },
                { $pull: { friends: { friendId: friendId } } }, { new: true })

            //delete user2's friend object of user1
            const user2 = await User.findOneAndUpdate({ _id: friendId, "friends.friendId": context.user._id },
                { $pull: { friends: { friendId: context.user._id } } })

            return user1;
        },

        //deleteFriend
        deleteFriend: async (parent, { friendId }, context) => {

            if (!context.user) {
                throw new AuthenticationError("Must be logged in to do this!")
            }

            const user = await User.findOne({ _id: context.user._id })

            //find() will return undefined if friend with friendId is not found
            const friend = user.friends.find((friend) => friend.friendId == friendId);

            if (!friend) {
                throw new AuthenticationError("This user is not your friend!")
            }

            if (friend.sender !== null) {
                throw new AuthenticationError("Friend request still pending!")
            }

            const user1 = await User.findOneAndUpdate({ _id: context.user._id, "friends.friendId": friendId },
                { $pull: { friends: { friendId: friendId } } })

            const user2 = await User.findOneAndUpdate({ _id: friendId, "friends.friendId": context.user._id },
                { $pull: { friends: { friendId: context.user._id } } })

            return user1;
        },


        //likePost
        //will add like to post, or remove like if ID is present in array already
        likePost: async (parent, {postId}, context) => {
            if(!context.user){
                throw new AuthenticationError("Must be logged in to do this!");
            }

            const post = await Post.findOne({_id: postId});

            //checks if userId is already in like array, if it is, removes it
            if(post.likes.some((like) => like == context.user._id)){
                const updatedPost = await Post.findOneAndUpdate({ _id: postId}, { $pull: { likes: context.user._id }}, { new: true});


                return updatedPost;
            }else{
                //userId is not in like array, add it
                const updatedPost = await Post.findOneAndUpdate({ _id: postId}, { $push: { likes: { _id: context.user._id }}}, { new: true})
    
                return updatedPost;
            }
        },

        followAlbum: async (parent, { albumId }, context) => {
            if (!context.user) {
                throw new AuthenticationError("Must be logged in to do this!");
            }

            const album = await Album.findOne({ _id: albumId });

            if (!album) {
                throw new AuthenticationError("The album requested does not exist.");
            }

            return User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { followedAlbums: albumId } },
                {
                    new: true,
                    runValidators: true,
                }
            );
        },

        unfollowAlbum: async (parent, { albumId }, context) => {
            if (!context.user) {
                throw new AuthenticationError("Must be logged in to do this!");
            }

            return User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { followedAlbums: albumId } },
                {
                    new: true,
                    runValidators: true,
                }
            );
        }
    }
};

module.exports = resolvers;