import { Formik , Field , Form } from 'formik'
import { Card , Button , Grid , CardContent } from '@mui/material'
import { TextField } from 'formik-mui'
import { useMutation } from '@apollo/client'
import { GET_POST } from './../apollo/querys';
import { ADD_POST } from './../apollo/mutations'

type Props = {
    manufacturer: string
    model: string
}

const username=localStorage.getItem('username')

const linkRegexp = new RegExp('(v[=]|be[/]|v[=]|v[/])[aA-zZ , 0-9]{11}', "g")
const linkConverting = (props : string) =>linkRegexp.exec(props) ?? []

const AddPost = ({ manufacturer , model}:Props) => {

    const [submitPost, { data, loading, error }] = useMutation(ADD_POST , {
        refetchQueries: [
            {query: GET_POST}, 
            'GetPost'  
          ],
    },)

  return ( 
    <Grid item xs={12}>
      <Formik initialValues={{title:"" ,manufacturer:manufacturer , model:model , description:"" , ytLink:""}} onSubmit={
        async (value, {setFieldError, setSubmitting , resetForm}) => {
            setSubmitting(true)
            const link = linkConverting(value.ytLink)[0].slice(-11)
            const sendData = {...value , author: username ,ytLink:link}
            await submitPost({ variables: sendData })
            setFieldError('title', error?.message);
            setSubmitting(false)
            resetForm()
        }}>
        <Form>
          <Card elevation={2} >
            <CardContent >
              <Grid container spacing={1} sx={{ p:1, '&:last-child': { pb: 0 }}} alignItems='center'>
                <Grid item xs={12} md={6} >
                  <Field type="text" placeholder="Title" name="title" component={TextField} label="Title"size="medium" fullWidth />
                </Grid>
                <Grid item xs={12} md={3} > 
                  <Field type="text" placeholder="Description" name="description" component={TextField} label="Description" fullWidth/>
                </Grid>
                <Grid item xs={12} md={3} > 
                  <Field type="text" placeholder="Youtube link" name="ytLink" component={TextField} label="Youtube link" fullWidth/>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Button type="submit" variant="contained" fullWidth>Send</Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Form>
      </Formik>
    </Grid>
  );
}

export default AddPost;