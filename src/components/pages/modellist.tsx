import { Grid , Card , Typography , CardContent, LinearProgress , Alert, Breadcrumbs, Link } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { PostElement } from '@src/components/pages/listelements'
import AddModel from '@src/components/pages/addmodel';
import { GET_MODELS } from '../apollo/querys';

const ModelList = () => {

    const { manufacturer = '' } = useParams()

    const { loading, error, data } = useQuery(GET_MODELS ,{
        variables:{ manufacturer }
    });

    const navigate = useNavigate()
    
    if (loading) return <LinearProgress/>
    if (error) return <Alert severity="error">{`Error! ${error.message}`}</Alert>

    console.log(data)

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} >
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" sx={{cursor: "pointer"}} color="inherit" onClick={() => {navigate(`/`)}}>
                    Home
                    </Link>
                    <Link underline="hover" sx={{cursor: "pointer"}} color="inherit" onClick={() => {navigate(`/manufacturer/${manufacturer}`)}}>
                    {manufacturer}
                    </Link>
                </Breadcrumbs>
            </Grid>
            {data && data?.getModels?.map((post:PostElement , index : number)=>
                <Grid item xs={12} md={4} key={index}>
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
            <Grid item xs={12} md={4}>
            <AddModel manufacturer={manufacturer}/>
            </Grid>
        </Grid>
    );
}

export default ModelList;
