import { gql } from "@apollo/client";

export const GET_MODELS = gql`
query GetModels($manufacturer: String) {
    getModels (manufacturer: $manufacturer) {
        id
        model
    }
}
`

export const GET_POST = gql`
    query GetPost($manufacturer: String , $model:String ) {
        posts (manufacturer: $manufacturer , model: $model ) {
            id
            model
            manufacturer
            title
            description
            postid
            author
        }
    }
`
export const ONE_POST = gql`
    query Post($postid: String) {
        post (postid: $postid) {
            id
            model
            manufacturer
            title
            description
            postid
            author
        }
    }
`

export const LOGIN = gql`
    query login($username: String , $password:String) {
        login (username: $username , password: $password) {
            username
            id
            token
        }
    }
`