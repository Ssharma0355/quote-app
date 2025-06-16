import {ApolloServer,gql} from "apollo-server";

import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

import { quotes,users } from "./fakeDb.js";

//creating schema 
const typeDefs = gql`
  type Query {
    users: [User]
    quotes: [Quote]
  }
  type User {
    id: ID
    firstName: String
    lastName: String
    email: String
  }
  type Quote {
    name:String
    by:ID
  }
`;

// resolver

const resolvers = {
  Query: {
    users: () => users,
    quotes: () => quotes,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen().then(({url})=>{
    console.log(`Server sunning ${url}`)
})