import { Card, CardContent, Grid, Typography } from "@mui/material"
import { MANUFACTURER_LIST } from "@src/manufacturers"
import { useNavigate } from "react-router-dom";

const ManufacturerList = () => {

    const navigate = useNavigate()
    
    return (
        <Grid container spacing={2} >
            {MANUFACTURER_LIST.map((manufacturer:String)=>
                <Grid item xs={12} md={4}>
                    <Card elevation={4}>
                        <CardContent 
                            onClick={() => {navigate(`/manufacturer/${manufacturer}`)}} 
                            sx={{ p:2, '&:last-child': { pb: 0 }}}>
                                <Typography textAlign="center" gutterBottom variant="h3" component="div">
                                    {manufacturer}
                                </Typography>
                        </CardContent>
                    </Card>
                </Grid>     
            )}
        </Grid>
    )
}
export default ManufacturerList