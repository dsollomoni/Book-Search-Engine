import {gql} from '@apollo/client'

const LOGIN = gql`
        query login($email: String, $password: String) {
          login(email:$email, password:$password) {
            User{
              username
              password
              id
              email
              savedBooks{
                title
                authors
                description
                image
                link
                bookId
              }
            }
            token{
              token
            }
          }
        }
      `

const SIGNUP = gql`
      mutation createUser($email: String, $password: String, $username: String) {
        createUser(email:$email, password:$password,username:$username) {
          User{
            username
            password
            id
            email
            savedBooks{
              title
              authors
              description
              image
              link
              bookId
            }
          }
          token{
            token
          }
        }
      }
    `
const SAVEBOOK = gql`
mutation SaveBook($BookInput:BookInput, $token: String){
    saveBook (token: $token, book: $BookInput){
          id
      savedBooks {
      title
      authors 
      description
      bookId
      image
      link
    }
    }
  }
`

const DELETEBOOK = gql`
mutation deleteBook($bookId: ID, $token: String){
    deleteBook (token: $token, bookId: $bookId){
          id
      savedBooks {
      title
      authors 
      description
      bookId
      image
      link
    }
    }
  }
`
const GETME = gql`
query getUserById{
  getUserById{
    id
    savedBooks {
      title
      authors 
      description
      bookId
      image
      link
    }
  }
}
`


export {
    LOGIN,
    SIGNUP,
    SAVEBOOK,
    DELETEBOOK,
    GETME
}