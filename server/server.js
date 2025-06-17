import {ApolloServer,gql} from "apollo-server";

import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

import { quotes,users } from "./fakeDb.js";

//creating schema 
const typeDefs = gql`
  type Query {
    users: [User]
    user(id:ID!):User
    quotes: [Quote]
    userquote(by:ID!):[Quote]
  }
  type User {
    id: ID!
    firstName: String
    lastName: String
    email: String
    quotes: [Quote]
  }
  type Quote {
    name: String
    by: ID
  }
`;

// resolver

const resolvers = {
  Query: {
    users: () => users,
    user: (_, args) => users.find((user) => user.id == args.id),
    quotes: () => quotes,
    userquote:(_,{by})=>quotes.filter((quote)=> quote.by == by)
  },
  User: {
    quotes: (ur) => quotes.filter((quote) => quote.by == ur.id), // quotes:(parent which is user) = >
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