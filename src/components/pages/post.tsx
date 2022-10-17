import { useParams } from 'react-router-dom';
import { useQuery , gql} from '@apollo/client';
import { Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { PostElement } from '@src/components/pages/listelements'

const Post = () => {

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

    const { manufacturer = '' ,model = '' } = useParams()

    const { loading, error, data } = useQuery(GET_POST ,{
        variables:{ manufacturer , model }
    });
    
    if (loading) return <LinearProgress/>
    if (error) return <h3>{`Error! ${error.message}`}</h3>;
    
    console.log(data)
    return (
        <Grid container spacing={2} sx={{mt:1}}>
            <Grid item xs={12} >
                <Typography variant="h3" component="div">
                    {manufacturer} {model} {data.posts[0].title}
                </Typography>
            </Grid>
            {data && data?.posts?.map((item:PostElement)=>
                <Grid item xs={12} >
                    <Paper elevation={2}>
                        <Typography variant="h6" component="div">
                            Title: {item.title}
                        </Typography>
                        <Typography variant="h6" component="div">
                            Description: {item.description}
                        </Typography>
                    </Paper>
                </Grid>
            )}
        </Grid>
    );
}

export default Post;