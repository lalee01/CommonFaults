import {Dialog, DialogContent, DialogTitle, Grid , Button} from "@mui/material";
import {Form, Formik, Field} from "formik";
import {TextField} from 'formik-mui'
import { useMutation , gql } from '@apollo/client';

type ModalProps = {
    title:string
    description:string
    postid: string
    isItOpen : boolean
    setIsItOpen: (isItOpen:boolean)=>boolean
}

const GET_POST = gql`
    query Post($postid: String) {
        post (postid: $postid) {
            title
            description
            postid
        }
    }
`

const EDIT_POST = gql`
    mutation EditPost($title:String , $description:String , $postid:String) {
        editPost (title:$title , description:$description , postid:$postid) {
            postid
            title
            description
        }
    }
`;

const EditModal = ({title , description , postid , isItOpen, setIsItOpen}:ModalProps)=> {

    const [editPost, { data, loading, error }] = useMutation(EDIT_POST, {
        refetchQueries: [
            {query: GET_POST}, 
            'Post'  
        ]
    })
    
    const onClose = () =>setIsItOpen(false)

    return (
        <Dialog open={isItOpen} onClose={onClose} >
            <DialogTitle>Edit post</DialogTitle>
            <DialogContent>
                <Formik initialValues={{title:title , description:description}}
                    onSubmit={async (value, {setFieldError, setSubmitting}) => {
                        setSubmitting(true);
                        const editedValue = {...value , postid:postid}
                        await editPost({ variables: editedValue })
                        setFieldError('description' , error?.message)
                        setSubmitting(loading)
                        onClose()
                    }}>
                    <Form>
                        <Grid container spacing={2} sx={{mt:1}}>
                            <Grid item xs={12}>
                                <Field component={TextField} name="title" label="Title" type="text" fullWidth/>
                            </Grid>
                            <Grid item xs={12}>
                                <Field component={TextField} name="description" label="Description" type="text" fullWidth/>
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" fullWidth>Edit</Button>
                            </Grid>
                        </Grid>
                    </Form>
                </Formik> 
            </DialogContent>
        </Dialog>
    )
}
export default EditModal