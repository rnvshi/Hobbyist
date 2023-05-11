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
    createUser(firstName: String!, lastName: String!, userName: String!, email: String!, password: String!): Auth
    createAlbum(albumName: String!, description: String, username: String!): Album
    createPost(postImg: String!, caption: String!, albumName: String!, username: String!): Post
    createComment(username: String!, postId: String!, text: String!): Comment
  }
`;

module.exports = typeDefs;