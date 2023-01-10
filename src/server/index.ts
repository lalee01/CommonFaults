import express from "express";
import { ApolloServer, gql } from "apollo-server-express"
import Knex from 'knex'
import "dotenv/config";
import {uid} from 'uid'
import cors from 'cors'
import bcrypt from 'bcrypt'
import { renderPostgresConfig } from "./knexConfig.js";

const saltRounds = 10;

const url = process.env.URL_SERVER

var corsOptions = {
  origin: url,
  credentials: true
};

interface KnexConfig {
  [key: string]: object;
};

type AddPostValues = {
  manufacturer:String
  model:String
  title:String
  description:String
  postid:String
  author:String
  ytLink:String
}

type EditPost = {
  title : String
  description : String
  postid : String
}

type registrate = {
  username:String
  password:String
  rePassword:String
}

const knex =Knex(renderPostgresConfig.local)

const typeDefs = gql`
    type Post {
        id: Int
        title: String
        model:String
        description: String
        postid:String
        manufacturer:String
        author:String
        ytLink:String
        date:String
    }

    type login {
      token:String
      username: String 
      password: String
      id: Int
    }

    type Registrate {
      username:String
      password:String
      rePassword:String
    }

    type EditPost {
      title : String
      description : String
      postid : String
    }

    type Query {
        posts(manufacturer:String , model:String ): [Post]
        getModels(manufacturer:String): [Post]
        login(username:String , password:String):[login]
        post(postid:String):[Post]
    }

    type Mutation {
        addPost(title:String , manufacturer:String , model:String , description:String , author:String , ytLink:String ): [Post]
        addModel(manufacturer:String , model:String): [Post]
        editPost(title:String , description:String , postid:String):[EditPost]
        deletePost(postid:String):[Post]
        reg(username:String,password:String,rePassword:String):[Registrate]
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
    post: async (_:null,args:any) => await knex('post').select().where('postid', args.postid),
    getModels: async (_:null,args:any) => await (await knex('models').select().where('manufacturer', args.manufacturer).orderBy('model','asc')),
    login: async (_:null , args:any) => {

      const postInfo = [{
        username: "" ,
        id:0,
        token:""
      }]

      const userInfo = await knex('users').select().modify((queryBuilder) =>  queryBuilder.where('username',args.username))
      console.log(userInfo)
      const stringToHash = userInfo[0].username + userInfo[0].id

      if(bcrypt.compareSync(args.password, userInfo[0].password)){

        const hash = bcrypt.hashSync(stringToHash, saltRounds);
        postInfo[0].username = userInfo[0].username
        postInfo[0].id = userInfo[0].id
        postInfo[0].token = hash
      }
        
      return postInfo
    }
  },
  Mutation: {
    addPost: async (_:any , args:AddPostValues)=> {
      console.log(args)

      return await knex('post').insert({...args , postid:uid(15)})
    },
    addModel: async (_:any , args:AddPostValues)=> await knex('models').insert(args),
    editPost: async (_ :any , args:EditPost)=> {
      await knex('post').where('postid',args.postid).update(args) 
    },
    deletePost: async (_ :any , args:{postid:String})=> {await knex('post').where('postid',args.postid).del()},
    reg:async (_ :any , args:registrate)=> {
      const hash = bcrypt.hashSync(args.password as string, saltRounds)

      const regData = {
        username:args.username,
        password:hash
      }

      console.log(args)
     await knex('users').insert(regData)
    }} 
};

const server = new ApolloServer({ typeDefs, resolvers });

server.start().then(()=> {
    const PORT = 3000;
    const app = express();
    server.applyMiddleware({ app });
    app.use(cors(corsOptions));
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
})