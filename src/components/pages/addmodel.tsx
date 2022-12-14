import { Grid , Card , CardActions , CardContent , Button } from "@mui/material";
import { TextField } from "formik-mui"
import { Formik , Field , Form} from "formik";
import { useMutation } from '@apollo/client';
import { ADD_MODEL } from "../apollo/mutations";
import { GET_MODELS } from "../apollo/querys";

type Props = {
    manufacturer: string
}

function AddModel({manufacturer}:Props) {

    const [submitPost, { data, loading, error }] = useMutation(ADD_MODEL , {
        refetchQueries: [
            {query: GET_MODELS}, 
            'GetModels'  
          ],
        onCompleted() {
            console.log("Beküldve")
        }
    },)


    function validateModel(model:String) {
        if (model === ''){
            return 'There should be name!';
        }
        if (model.length > 20){
            return 'Maximum length of the name should be 80 characters!';
        }
      }

  return ( 
    <Formik initialValues={{model:"" , manufacturer:manufacturer}} onSubmit={
        async (value, {setFieldError, setSubmitting , resetForm}) => {
            setSubmitting(true)
            await submitPost({ variables: value })
            setFieldError('model', error?.message);
            setSubmitting(false)
            console.log(value)
            resetForm()
        }}>
        <Form>
            <Card elevation={4}>
                <CardContent>
                    <Grid textAlign="center" >
                        <Field type="text" placeholder="Modell" name="model" component={TextField} label="Modell" fullWidth validate={validateModel}/>
                    </Grid>
                </CardContent>
                <CardActions>
                    <Button type="submit" variant="contained" fullWidth >Add model</Button>
                </CardActions>
            </Card>
        </Form>
    </Formik>
  );
}

export default AddModel;