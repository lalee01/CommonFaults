import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Alert, Breadcrumbs, Grid, LinearProgress, Link, Paper, Typography } from '@mui/material';
import { PostElement } from '@src/components/pages/listelements'
import AddPost from './addpost';
import { GET_POST } from '../apollo/querys';

const PostList = () => {

    const { manufacturer = '' , model = ''} = useParams()

    const { loading, error, data } = useQuery(GET_POST ,{
        variables:{ manufacturer , model }
    });

    const navigate = useNavigate()
    
    if (loading) return <LinearProgress/>
    if (error) return <Alert severity="error">{`Error! ${error.message}`}</Alert>

    return (
        <Grid container spacing={2} sx={{mt:1}}>
            <Grid item xs={12} >
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" sx={{cursor: "pointer"}} color="inherit" onClick={() => {navigate(`/`)}}>
                        Home
                    </Link>
                    <Link underline="hover" sx={{cursor: "pointer"}} color="inherit" onClick={() => {navigate(`/manufacturer/${manufacturer}`)}}>
                        {manufacturer}
                    </Link>
                    <Link underline="hover" sx={{cursor: "pointer"}} color="inherit" onClick={() => {navigate(`/manufacturer/${manufacturer}/model/${model}`)}}>
                        {model}
                    </Link>
                </Breadcrumbs>
            </Grid>
            <AddPost manufacturer={manufacturer} model={model}/>
            {data && data?.posts?.map((item:PostElement)=>
                <Grid item xs={12}>
                    <Paper elevation={2} sx={{cursor:'pointer',pb:1}} onClick={() => {navigate(`/manufacturer/${manufacturer}/model/${model}/postid/${item.postid}`)}}>
                        <Grid container spacing={1} sx={{pr:1 , pl:1}}>
                            <Grid item xs={12} md={6} >
                                <Typography variant="h6" component="div">
                                    Title: {item.title}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Typography variant="h6" component="div">
                                Description: {item.description}
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
