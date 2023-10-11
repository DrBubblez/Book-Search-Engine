const { gql } = require('apollo-server-express');

const typeDefs = gql`
    #Custom types
    input BookInput {
        authors: [String]
        description: String!
        title: String!
        bookId: String!
        image: String
        link: String
    }

    #Main data types
    type Book {
        bookId: String!
        authors: [String]
        description: String!
        title: String!
        image: String
        link: String
    }

    type User {
        _id: ID!
        username: String!
        email: String!
        bookCount: Int
        savedBooks: [Book]
    }

    type Auth {
        token: String!
        user: User
    }

    #Main Operation types
    type Query {
        me: User
    }

    type Mutation {
        login(enail: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(bookInput: BookInput!): User
        removeBook(bookId: String!): User
    }
`;

module.exports = typeDefs;