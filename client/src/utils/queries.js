import { gql } from '@apollo/client';

// GET all the information needed for a single user
export const QUERY_USER = gql`
query user($userId: ID!) {
  singleUser(userId: $userId) {
    _id
    firstName
    lastName
    userName
    pseudonym
    avatar
    bio
    myAlbums {
      _id
      albumName
      description
    }
    }
}
`;

export const QUERY_USERNAME = gql`
query Query($username: String!) {
  singleUsername(username: $username) {
    _id
    firstName
    lastName
    userName
    pseudonym
    avatar
    bio
    myAlbums {
      _id
      albumName
      description
    }
  }
}
`;

// GET all the information needed for Album gallery
export const QUERY_GALLERY = gql`
query AllPosts($albumName: String!) {
    allPosts(albumName: $albumName) {
      _id
      postImg
    }
  }
`;

// GET all the information needed for a Post
export const QUERY_POST = gql`
query SinglePost($postId: ID!) {
    singlePost(postId: $postId) {
      _id
      albumName
      postImg
      caption
      comments {
        _id
        username
        text
      }
    }
  }
`;

export const GET_FEED = gql`
query Query {
  getFeed {
    followedAlbums {
      _id
      posts {
        _id
        albumName
        postImg
        caption
        comments {
          _id
          username
          text
        }
      }
    }
  }
}
`;