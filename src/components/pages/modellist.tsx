import { Grid , CardActions , Card , Typography , Button , CardContent, LinearProgress } from '@mui/material'
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

const ModelList = () => {

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
    
    if (loading) return <LinearProgress/>
    if (error) return <div>{`Error! ${error.message}`}</div>;
    
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} >
                <Typography variant="h6" component="div">
                    {manufacturer}
                </Typography>
            </Grid>
            {data && data?.posts?.map((post:DataType)=>{
                <Grid item xs={12} md={4}>
                    <Card elevation={4}>
                        <CardContent 
                            onClick={() => {navigate(`/manufacturer/${manufacturer}/model/${post.model}`)}} 
                            sx={{ p:2, '&:last-child': { pb: 0 }}}>
                                <Typography textAlign="center" gutterBottom variant="h3" component="div">
                                    {post.model}
                                </Typography>
                        </CardContent>
                    </Card>
                </Grid>     
                }
            )}
        </Grid>
    );
}

export default ModelList;
