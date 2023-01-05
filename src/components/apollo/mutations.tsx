import { gql } from "@apollo/client";

export const ADD_POST = gql`
    mutation AddPost($title:String , $manufacturer:String , $model:String , $description:String ,$author:String , $ytLink:String) {
        addPost (title:$title , manufacturer:$manufacturer , model:$model , description:$description , author:$author ,ytLink:$ytLink) {
            title
        }
    }
`

export const REGISTRATE = gql`
    mutation Reg($username:String , $password:String) {
        reg (username:$username , password:$password) {
            username
        }
    }
`

export const EDIT_POST = gql`
    mutation EditPost($title:String , $description:String , $postid:String) {
        editPost (title:$title , description:$description , postid:$postid) {
            postid
            title
            description
        }
    }
`

export const DEL_POST = gql`
    mutation DeletePost($postid: String) {
        deletePost (postid: $postid) {
            postid
        }
    }
`

export const ADD_MODEL = gql`
    mutation AddModel($manufacturer:String , $model:String) {
        addModel (manufacturer:$manufacturer , model:$model) {
            model
        }
    }
`