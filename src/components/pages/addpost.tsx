import { Formik , Field , Form } from 'formik'
import { Card , Button , Grid , CardContent } from '@mui/material'
import { TextField } from 'formik-mui'
import { useMutation , gql } from '@apollo/client';
import { PostElement } from '@src/components/pages/listelements'

const AddPost = ({manufacturer , model}:PostElement) => {

    const GET_POST = gql`
        query GetPost($manufacturer: String , $model:String) {
            posts (manufacturer: $manufacturer , model: $model) {
                id
                model
                manufacturer
                title
                description
                postid
            }
        }
    `

    const ADD_POST = gql`
        mutation AddTodo($title:String , $manufacturer:String , $model:String , $description:String) {
            teszt (title:$title , manufacturer:$manufacturer , model:$model , description:$description) {
                title
            }
        }
    `;

    const [submitPost, { data, loading, error }] = useMutation(ADD_POST , {
        refetchQueries: [
            {query: GET_POST}, 
            'GetPost'  
          ],
        onCompleted() {
            console.log("Beküldve")
        } 
    },)

  return ( 
    <Grid item xs={12}>
      <Formik initialValues={{title:"" ,manufacturer:manufacturer , model:model , description:""}} onSubmit={
        async (value, {setFieldError, setSubmitting}) => {
            setSubmitting(true)
            await submitPost({ variables: value })
            setFieldError('title', error?.message);
            setSubmitting(false)
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
                <Grid item xs={12} md={3}>
                  <Button type="submit" variant="contained" fullWidth>Beküldés</Button>
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