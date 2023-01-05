import { useMutation } from '@apollo/client';
import { DEL_POST } from '../apollo/mutations';

export const DeletePost = async(postid : String) => {
    const [delPost, {}] = useMutation(DEL_POST, {
        onCompleted:()=>{
            console.log("Post deleted:" , postid)
        }
    })
    console.log("DELETE" , postid)

 await delPost({variables : {postid:postid}});
}