import express from "express";
import { ApolloServer, gql } from "apollo-server-express"
import Knex from 'knex'
import "dotenv/config";
import {uid} from 'uid'

interface KnexConfig {
  [key: string]: object;
};

type AddPostValues = {
  manufacturer:String
  model:String
  title:String
  description:String
}

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
        posts(manufacturer:String , model:String ): [Post]
        getModels(manufacturer:String): [Post]
    }

    type Mutation {
        addPost(title:String , manufacturer:String , model:String , description:String): [Post]
        addModel(manufacturer:String , model:String): [Post]
    }
  `

const resolvers = {
  Query: {
    posts: async (_:null,args:any) => await knex('post').select().modify((queryBuilder) => {
      if (args.manufacturer) {
          queryBuilder.where('post.manufacturer',args.manufacturer)
      }
      if (args.model) {
        queryBuilder.where('post.model',args.model)
      }
    }),
    getModels: async (_:null,args:any) => await knex('models').select().where('manufacturer', args.manufacturer)
  },
  Mutation: {
    addPost: async (_:any , args:AddPostValues)=> await knex('post').insert({...args , postid:uid(15)}),
    addModel: async (_:any , args:AddPostValues)=> await knex('models').insert(args)
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