import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation login($userName: String!, $password: String!) {
    login(userName: $userName, password: $password) {
      token
      user {
        _id
        userName
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
mutation createAlbum($albumName: String!, $description: String) {
  createAlbum(albumName: $albumName, description: $description) {
    _id
    albumName
    description
  }
}
`;

export const CREATE_POST = gql`
mutation CreatePost($postImg: String!, $caption: String!, $albumName: String!) {
    createPost(postImg: $postImg, caption: $caption, albumName: $albumName) {
      _id
    }
  }
`;

export const CREATE_COMMENT = gql`
mutation CreateComment($postId: String!, $text: String!) {
    createComment(postId: $postId, text: $text) {
      _id
    }
  }
`;

export const DELETE_ALBUM = gql`
mutation DeleteAlbum($albumId: ID!) {
    deleteAlbum(albumId: $albumId) {
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

export const ADD_FRIEND = gql`
mutation Mutation($friendId: ID!) {
  addFriend(friendId: $friendId) {
    _id
    userName
    friends {
      friendId
      sender
      accepted
    }
  }
}
`;

export const ACCEPT_FRIEND = gql`
mutation AcceptFriend($friendId: ID!) {
  acceptFriend(friendId: $friendId) {
    _id
    userName
    friends {
      friendId
      sender
      accepted
    }
  }
}
`;

export const DELETE_FRIEND = gql`
mutation Mutation($friendId: ID!) {
  deleteFriend(friendId: $friendId) {
    _id
    userName
    friends {
      friendId
      sender
      accepted
    }
  }
}
`;

export const DECLINE_FRIEND = gql`
mutation Mutation($friendId: ID!) {
  declineFriend(friendId: $friendId) {
    _id
    userName
    friends {
      friendId
      sender
      accepted
    }
  }
}
`;

export const LIKE_POST = gql`
mutation LikePost($postId: ID!) {
  likePost(postId: $postId) {
    _id
  }
}
`;

export const UPDATE_USER = gql`
mutation updateUser($bio: String!) {
  updateUser(bio: $bio) {
    userName
    _id
    bio
  }
}
`;
