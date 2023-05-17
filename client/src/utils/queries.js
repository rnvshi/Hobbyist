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
    friends {
      friendId
      sender
      accepted
    }
    myAlbums {
      _id
      albumName
      description
      posts {
        postImg
      }
    }
  }
}
`;

export const QUERY_ME = gql`
query me {
  me {
    _id
    userName
    bio
    avatar
    myAlbums {
      _id
      albumName
      posts {
        postImg
      }
    }
  }
}
`

export const QUERY_USERNAME = gql`
query Query($username: String!) {
  singleUsername(username: $username) {
    _id
    userName
    avatar
    bio
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
// Example of using multiple queries in one
export const GET_FEED_PAGE_DATA = gql`
query Query($userId: ID!) {
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