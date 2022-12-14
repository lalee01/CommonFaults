import { useMutation } from "@apollo/client";
import { Dialog, DialogContent, DialogTitle, Grid , Button } from "@mui/material";
import { Form, Formik, Field } from "formik";
import { TextField } from 'formik-mui'
import { REGISTRATE } from "../apollo/mutations";

export default function RegModal({onClose}) {

    const [registrate, { data, loading, error }] = useMutation(REGISTRATE)

    return (
        <Dialog open={true} onClose={onClose}>
            <DialogTitle>Registration</DialogTitle>
            <DialogContent>
                <Formik initialValues={{username:"" , password:"" , rePassword:""}}
                    onSubmit={async (value, {setFieldError, setSubmitting}) => {
                        setSubmitting(true);
                        await registrate({variables: value})
                        onClose()
                    }}>
                    <Form>
                        <Grid container spacing={2} sx={{mt:1}}>
                            <Grid item xs={12}>
                                <Field component={TextField} name="username" label="Username" type="text" fullWidth/>
                            </Grid>
                            <Grid item xs={12}>
                                <Field component={TextField} name="password" label="Password" type="password" fullWidth/>
                            </Grid>
                            <Grid item xs={12}>
                                <Field component={TextField} name="rePassword" label="Password again" type="password" fullWidth/>
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" fullWidth>Register</Button>
                            </Grid>
                        </Grid>
                    </Form>
                </Formik> 
            </DialogContent>
        </Dialog>
    )
}