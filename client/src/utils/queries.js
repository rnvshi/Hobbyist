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