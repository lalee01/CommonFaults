import express from "express";
import { ApolloServer, gql } from "apollo-server-express"
import Knex from 'knex'
import "dotenv/config";

interface KnexConfig {
  [key: string]: object;
};

const knexConfig: KnexConfig = {
  local: {
    client: 'mysql',
      connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DATABASE
      }
  }
}

const knex =Knex(knexConfig.local)
console.log(knexConfig)

const typeDefs = gql`
    type Post {
        id: Int
        title: String
        model:String
        description: String
        postid:String
        manufacturer:String
    }

    type Query {
        posts(manufacturer:String): [Post]
    }
`;

const resolvers = {
  Query: {
    posts: async (_:null,args:any) => await knex('post').select().modify((queryBuilder) => {
      if (args.manufacturer) {
          queryBuilder.where('post.manufacturer',args.manufacturer);
      }
    })  
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
server.start().then(()=> {
    const PORT = 3004;
    const app = express();
    server.applyMiddleware({ app });
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
})

