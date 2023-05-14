import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      username
      savedBooks {
        _id
        authors
        bookId
        description
        image
        link
        title
      }
      email
      bookCount
    }
  }
}
`;

export const ADD_USER = gql`
mutation Mutation($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
    user {
      _id
      bookCount
      email
      savedBooks {
        _id
        authors
        bookId
        description
        image
        link
        title
      }
      username
    }
  }
}
`;

export const SAVE_BOOK = gql`
mutation SaveBook($input: bookEntry!) {
  saveBook(input: $input) {
    _id
    bookCount
    email
    username
    savedBooks {
      _id
      authors
      bookId
      description
      image
      link
      title
    }
  }
}
`;

export const REMOVE_BOOK = gql`
mutation RemoveBook($bookId: String!) {
  removeBook(bookId: $bookId) {
    _id
    bookCount
    email
    username
    savedBooks {
      _id
      authors
      bookId
      description
      image
      link
      title
    }
  }
}
`;