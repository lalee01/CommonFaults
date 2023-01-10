import { Grid , Card , CardActions , CardContent , Button, LinearProgress, Alert } from "@mui/material";
import { TextField } from "formik-mui"
import { Formik , Field , Form} from "formik";
import { useMutation } from '@apollo/client';
import { ADD_MODEL } from "../apollo/mutations";
import { GET_MODELS } from "../apollo/querys";

type Props = {
    manufacturer: string
}

function AddModel({manufacturer}:Props) {

    const [submitPost, { loading, error }] = useMutation(ADD_MODEL , {
        refetchQueries: [
            {query: GET_MODELS}, 
            'GetModels'  
          ]
    })

    if (loading) return <LinearProgress/>

  return ( 
    <Formik initialValues={{model:"" , manufacturer:manufacturer}} onSubmit={
        async (value, {setFieldError, setSubmitting , resetForm}) => {
            setSubmitting(loading)
            await submitPost({ variables: value })
            setFieldError('model', error?.message);
            setSubmitting(loading)
            resetForm()
        }}>
        <Form>
            <Card elevation={4}>
                <CardContent>
                    <Grid textAlign="center" >
                        <Field type="text" placeholder="Modell" name="model" component={TextField} label="Modell" fullWidth />
                    </Grid>
                </CardContent>
                <CardActions>
                    <Button disabled={loading} type="submit" variant="contained" fullWidth >Add model</Button>
                </CardActions>
            </Card>
        </Form>
    </Formik>
  );
}

export default AddModel;