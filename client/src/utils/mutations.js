import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_USER = gql`
mutation CreateUser($firstName: String!, $lastName: String!, $userName: String!, $email: String!, $password: String!) {
    createUser(firstName: $firstName, lastName: $lastName, userName: $userName, email: $email, password: $password) {
      token
      user {
        _id
        userName
      }
    }
  }
`;

export const CREATE_ALBUM = gql`
mutation CreateAlbum($albumName: String!, $username: String!, $description: String) {
    createAlbum(albumName: $albumName, username: $username, description: $description) {
      _id
      albumName
      description
    }
  }
`;

export const CREATE_POST = gql`
mutation CreatePost($postImg: String!, $caption: String!, $albumName: String!, $username: String!) {
    createPost(postImg: $postImg, caption: $caption, albumName: $albumName, username: $username) {
      _id
    }
  }
`;

export const CREATE_COMMENT = gql`
mutation CreateComment($username: String!, $postId: String!, $text: String!) {
    createComment(username: $username, postId: $postId, text: $text) {
      _id
    }
  }
`;

export const DELETE_ALBUM = gql`
mutation DeleteAlbum($userId: ID!, $albumId: ID!) {
    deleteAlbum(userId: $userId, albumId: $albumId) {
      _id
      albumName
    }
  }
`;

export const DELETE_POST = gql`
mutation DeletePost($albumId: ID!, $postId: ID!) {
    deletePost(albumId: $albumId, postId: $postId) {
      _id
    }
  }
`;

export const DELETE_COMMENT = gql`
mutation DeleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      _id
    }
  }
`;

export const FOLLOW_ALBUM = gql`
mutation FollowAlbum($albumId: ID!) {
  followAlbum(albumId: $albumId) {
    _id
    followedAlbums {
      _id
    }
  }
}
`;

export const UNFOLLOW_ALBUM = gql`
mutation UnfollowAlbum($albumId: ID!) {
  unfollowAlbum(albumId: $albumId) {
    _id
    followedAlbums {
      _id
    }
  }
}
`;