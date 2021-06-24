const {gql} = require("apollo-server-express")

const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
  }

  type User {
      username: String
      email: String
      password: String
      savedBooks: [Book]
      id: ID!
  }

  input BookInput {
    title: String
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
  }


  type token {
    token: String
  }

  type UserAndToken {
    User: User
    token: token
  }


  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    login(email: String, password: String): UserAndToken
    getUserByUsername(username: String): User
    getUserById(id: ID, token: String): User
  }
  
  type Mutation {
    saveBook(id: ID, book: BookInput, token: String): User
    createUser(username: String, email: String, password: String): UserAndToken
    deleteBook(id: ID, bookId: ID, token: String): User
  }
  
  `
;
module.exports = typeDefs 