import { gql } from '@apollo/client';

// LOGIN_USER Mutation
export const LOGIN_USER = gql`
    mutation loginUser($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

// ADD_USER Mutation
export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

// SAVE_BOOK Mutation
export const SAVE_BOOK = gql`
    mutation saveBook($bookData: BookInput!) {
        saveBook(bookInput: $bookData) {
            _id
            username
            savedBooks {
                bookId
                title
            }
        }
    }
`;

// REMOVE_BOOK Mutation
export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: ID!) {
        removeBook(bookId: $bookId) {
            _id
            username
            savedBooks {
                bookId
                title
            }
        }
    }
`;