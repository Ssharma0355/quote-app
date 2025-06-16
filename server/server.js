import {ApolloServer,gql} from "apollo-server";

import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

//creating schema 
const typeDefs = gql`
  type Query{
    greet:String
  }
`

// resolver

const resolvers = {
Query:{
    greet:()=>{
       return "Hello Sachin"
    }
}
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen().then(({url})=>{
    console.log(`Server sunning ${url}`)
})