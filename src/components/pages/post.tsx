import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Alert, Breadcrumbs, Button, Grid, LinearProgress, Link, Paper, Typography } from '@mui/material';
import { useState } from 'react';
import { ONE_POST } from '../apollo/querys';

const Post = () => {

    const { manufacturer = '' ,model = '' , postid= ''} = useParams()
    const navigate = useNavigate()

    const [isItOpen , setIsItOpen] = useState(false)

    const { loading, error, data } = useQuery(ONE_POST ,{
        variables:{ postid }
    });
    
    if (loading) return <LinearProgress/>
    if (error) return <Alert severity="error">{`Error! ${error.message}`}</Alert>

    const time = () => new Date(data.post[0].date *1 ).toUTCString()
    
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
                    <Link underline="hover" sx={{cursor: "pointer"}} color="inherit" onClick={() => {navigate(`/manufacturer/${manufacturer}/model/${model}/postid/${postid}`)}}>
                        {postid}
                    </Link>
                </Breadcrumbs>
            </Grid>
            <Grid item xs={12} >
                <Paper elevation={2}>
                    <Typography variant="h3" component="div">
                        Title: {data.post[0].title}
                    </Typography>
                    <Grid item xs={12} textAlign='center'>
                    <iframe className="text-center my-4" width="800" height="400" allowFullScreen src={`https://www.youtube.com/embed/${data.post[0].ytLink}` } />
                    </Grid>
                    <Typography variant="h6" component="div">
                        Description: {data.post[0].description}
                    </Typography>
                    <Button color='info' size='medium' variant='contained' onClick={()=>setIsItOpen(true)}>Edit</Button>
                    <Typography variant="h6" component="div">
                        Author: {data.post[0].author}
                    </Typography>
                    <Typography variant="h6" component="div">
                        Date: {time()}
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default Post;
