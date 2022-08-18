import { Grid , CardActions , Card , Typography , Button , CardContent, LinearProgress , Alert } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery , gql} from '@apollo/client';
import { PostElement } from '@src/components/pages/listelements'

const ModelList = () => {

    const GET_POST = gql`
    query GetPost($manufacturer: String) {
        posts (manufacturer: $manufacturer) {
            id
            model
            manufacturer
        }
    }
    `
    const { manufacturer = '' } = useParams()

    const { loading, error, data } = useQuery(GET_POST ,{
        variables:{ manufacturer }
    });

    const navigate = useNavigate()
    
    if (loading) return <LinearProgress/>
    if (error) return <Alert severity="error">{`Error! ${error.message}`}</Alert>;

    
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} >
                <Typography variant="h3" component="div">
                    {manufacturer}
                </Typography>
            </Grid>
            {data && data?.posts?.map((post:PostElement)=>
                <Grid item xs={12} md={4}>
                    <Card elevation={4}>
                        <CardContent 
                            onClick={() => {navigate(`/manufacturer/${manufacturer}/model/${post.model}`)}} 
                            sx={{ cursor:'pointer', p:2, '&:last-child': { pb: 0 }}}>
                                <Typography textAlign="center" gutterBottom variant="h3" component="div">
                                    {post.model}
                                </Typography>
                        </CardContent>
                    </Card>
                </Grid>     
            )}
        </Grid>
    );
}

export default ModelList;
