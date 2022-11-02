import {Dialog, DialogContent, DialogTitle, Grid , Button} from "@mui/material";
import {Form, Formik, Field} from "formik";
import {TextField} from 'formik-mui'
import { useMutation , gql } from '@apollo/client';

const EDIT_POST = gql`
    mutation EditPost($title:String , $description:String , $postid:String) {
        editPost (title:$title , description:$description , postid:$postid) {
            title
            description
        }
    }
`;

export default function EditModal({onClose , title , description , postid}) {

    const [submitPost, { data, loading, error }] = useMutation(EDIT_POST)

    return (
        <Dialog open={true} onClose={onClose}>
            <DialogTitle>Registration</DialogTitle>
            <DialogContent>
                <Formik initialValues={{title:title , description:description}}
                    onSubmit={async (value, {setFieldError, setSubmitting}) => {
                        setSubmitting(true);
                        const editedValue = {...value , postid:postid}
                        await submitPost({ variables: editedValue })
                        setSubmitting(loading);
                        setFieldError('title', error?.message);
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