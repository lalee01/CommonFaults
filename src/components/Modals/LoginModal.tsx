import { useLazyQuery } from "@apollo/client";
import { Dialog, DialogContent, DialogTitle, Grid , Button } from "@mui/material";
import { Form, Formik, Field } from "formik";
import { TextField } from 'formik-mui'
import { useNavigate } from "react-router-dom";
import { LOGIN } from "../apollo/querys";

export default function LoginModal({onClose} : {onClose: () => void}) {
    
    const navigate = useNavigate()
    const [login, { loading, error, data }] = useLazyQuery(LOGIN , {
        onCompleted: (data)=>{
            if(data.login[0].id !== 0){
                console.log(data.login[0])
                localStorage.setItem('token' , data.login[0].token)
                localStorage.setItem('username' , data.login[0].username)
                navigate('/home')
                onClose()
            }
        }
    });
    
    return (
        <Dialog open={true} onClose={onClose}>
            <DialogTitle>Login</DialogTitle>
            <DialogContent>
                <Formik initialValues={{username:"" , password:""}} onSubmit={
                    (value, {setFieldError, setSubmitting}) => {
                        setSubmitting(true);
                        login({ variables: value })
                        setSubmitting(loading)
                        setFieldError('password' , error?.message)
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
                                <Button type="submit" variant="contained" fullWidth>Login</Button>
                            </Grid>
                        </Grid>
                    </Form>
                </Formik>
            </DialogContent>
        </Dialog>
    )
}