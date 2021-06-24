const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
require ("dotenv").config()
const {User} = require("./models")
const bookSchema = require('./models/Book');
const {ApolloServer, gql} = require("apollo-server-express")
const typeDefs = require('./schema/typeDefs') ;
const resolvers = require('./schema/resolvers') 
const {authMiddleware} = require("./utils/auth")


const PORT = process.env.PORT || 3001;
const app = express();






const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});



app.use(express.urlencoded({ extended: false }));
app.use(express.json());

server.applyMiddleware({ app });
  app.use(express.static(path.join(__dirname, '../client/build')));


app.use(routes)

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});