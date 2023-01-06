import { Dialog, DialogContent, DialogTitle, Grid , Button } from "@mui/material";
import { Form, Formik, Field } from "formik";
import { TextField } from 'formik-mui'
import { useMutation } from '@apollo/client';
import { EDIT_POST } from "../apollo/mutations";
import { GET_POST } from "../apollo/querys";

type ModalProps = {
    title:string
    description:string
    postid: string
    isItOpen : boolean
    onClose : {onClose:()=> void}
}

const EditModal = ({onClose ,title , description , postid}:ModalProps)=> {

    const [editPost, { data, loading, error }] = useMutation(EDIT_POST, {
        refetchQueries: [
            {query: GET_POST}, 
            'Post'  
        ]
    })

    return (
        <Dialog open={true}>
            <DialogTitle>Edit post</DialogTitle>
            <DialogContent>
                <Formik initialValues={{title:title , description:description}}
                    onSubmit={async (value, {setFieldError, setSubmitting}) => {
                        setSubmitting(true);
                        const editedValue = {...value , postid:postid}
                        await editPost({ variables: editedValue })
                        setFieldError('description' , error?.message)
                        setSubmitting(loading)
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