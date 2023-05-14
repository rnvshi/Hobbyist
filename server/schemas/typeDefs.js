const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String!
    lastName: String!
    userName: String!
    pseudonym: String
    email: String!
    password: String!
    bio: String
    avatar: String
    myAlbums: [Album]
    followedAlbums: [Album]
    friends: [Friend]
  }

  type Friend {
    friendId: ID
    sender: Boolean
    accepted: Boolean
  }

  type Album {
    _id: ID
    username: String!
    albumName: String!
    description: String
    posts: [Post]
  }

  type Post {
    _id: ID
    albumName: String!
    postImg: String!
    caption: String!
    comments: [Comment]
  }

  type Comment {
    _id: ID
    username: String!
    text: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    allUsers: [User]
    singleUser(userId: ID!): User
    allAlbums(username: String!): [Album]
    allPosts(albumName: String!): [Post]
    singlePost(postId: ID!): Post
  }

  type Mutation {
    login(userName: String!, password: String!): Auth
    createUser(firstName: String!, lastName: String!, userName: String!, email: String!, password: String!): Auth
    createAlbum(albumName: String!, description: String): Album
    createPost(postImg: String!, caption: String!, albumName: String!): Post
    createComment(postId: String!, text: String!): Comment
    deleteAlbum(userId: ID!, albumId: ID!): Album
    deletePost(albumId: ID!, postId: ID!): Post
    deleteComment(postId: ID!, commentId: ID!): Comment
    addFriend(friendId: ID!): User
    acceptFriend(friendId: ID!): User
    declineFriend(friendId: ID!): User
    deleteFriend(friendId: ID!): User
    followAlbum(albumId: ID!): User
    unfollowAlbum(albumId: ID!): User
  }
`;

module.exports = typeDefs;