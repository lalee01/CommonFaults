import { useNavigate, useParams } from 'react-router-dom';
import { useQuery , gql} from '@apollo/client';
import { Breadcrumbs, Button, Grid, LinearProgress, Link, Paper, Typography } from '@mui/material';
import { PostElement } from '@src/components/pages/listelements'
import {MODALS , useModals} from './../hooks/UseModal'

const Post = () => {

    const {showModal} = useModals();

    const GET_POST = gql`
        query Post($postid: String) {
            post (postid: $postid) {
                id
                model
                manufacturer
                title
                description
                postid
            }
        }
    `

    const { manufacturer = '' ,model = '' , postid= ''} = useParams()
    const navigate = useNavigate()

    const { loading, error, data } = useQuery(GET_POST ,{
        variables:{ postid }
    });
    
    if (loading) return <LinearProgress/>
    if (error) return <h3>{`Error! ${error.message}`}</h3>;
    
    console.log(data.post[0].title)
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
                        <Typography variant="h6" component="div">
                            Title: {data.post[0].title}
                        </Typography>
                        <Typography variant="h6" component="div">
                            Description: {data.post[0].description}
                        </Typography>
                        <Button color='info' size='medium' variant='contained' 
                        onClick={()=>showModal(MODALS.EDIT , {title:data.post[0].title , description:data.post[0].description , postid:postid})}>Edit</Button>
                    </Paper>
                </Grid>
        </Grid>
    );
}

export default Post;
