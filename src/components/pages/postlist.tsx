import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery , gql} from '@apollo/client';
import { Button, Grid, LinearProgress, Paper, Typography } from '@mui/material';

type DataType = {
    id:Number
    model:String
    manufacturer:String
    title:String
    description:String
    postid:String
}

const PostList = () => {

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
    const { model = '' } = useParams()
    const { manufacturer = ''} = useParams()

    const { loading, error, data } = useQuery(GET_POST ,{
        variables:{ manufacturer , model }
    });

    const navigate = useNavigate()
    
    if (loading) return <LinearProgress/>
    if (error) return <div>{`Error! ${error.message}`}</div>;
    
    
    return (
        <Grid container spacing={2} sx={{mt:1}}>
            <Grid item xs={12} >
                <Typography variant="h6" component="div">
                    {manufacturer} {model}
                </Typography>
            </Grid>
            {data && data?.posts?.map((item:DataType)=>
                <Grid item xs={12} >
                    <Paper elevation={2} sx={{pb:1}}>
                        <Grid container spacing={1} sx={{pr:1 , pl:1}}>
                            <Grid item xs={12} md={6} >
                                <Typography variant="h6" component="div">
                                    Title: {item.title}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Typography variant="h6" component="div">
                                Amount: {item.description}
                                </Typography>
                            </Grid> 
                        </Grid>
                    </Paper>
                </Grid>
            )}
        </Grid>
    );
}

export default PostList;
