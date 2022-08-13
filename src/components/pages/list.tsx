import { Grid , CardActions , Card , Typography , Button , CardContent } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery , gql} from '@apollo/client';

type DataType = {
    id:Number
    model:String
    manufacturer:String
    title:String
    description:String
    postid:String
}

const List = () => {

    const GET_POST = gql`
    query GetPost($manufacturer: String) {
        posts (manufacturer: $manufacturer) {
            id
            model
            manufacturer
            title
            description
            postid
        }
    }
    `
    const { manufacturer = '' } = useParams()

    const { loading, error, data } = useQuery(GET_POST ,{
        variables:{ manufacturer }
    });

    const navigate = useNavigate()
    
    if (loading) return <div>Loading...</div>
    if (error) return <div>{`Error! ${error.message}`}</div>;
    
    
    return (
        <Grid container spacing={2}>
            {data && data?.posts?.map((post:DataType)=>{
                console.log(post)
                return(
                    <Grid item xs={12} md={4}>
                        <Card elevation={4} >
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                Gyártó: {post.manufacturer}
                                </Typography>
                                <Typography variant="h5" color="text.secondary">
                                Modell: {post.model}
                                </Typography>
                            </CardContent>
                            <CardActions >
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Button variant="contained" fullWidth id={`${post.postid}`}  onClick={() => {navigate(`/manufacturer/${post.manufacturer}`)}}>Tovább...</Button>
                                    </Grid>
                                    <Grid item xs={6} textAlign="center" >
                                        <Button variant="contained" color="error" fullWidth ><DeleteIcon /> </Button>
                                    </Grid>
                                </Grid>
                            </CardActions>
                        </Card>
                    </Grid>     
                )}
            )}
        </Grid>
    );
}

export default List;
