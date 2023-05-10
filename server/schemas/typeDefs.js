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
    username: String!
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
    users: [User]
    user(userId: ID!): User
    albums(userId: ID!): [Album]
    posts(albumId: ID!): [Post]
    comments(postId: ID!): [Comment]
  }

  type Mutation {
  }
`;

module.exports = typeDefs;