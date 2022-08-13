import { Grid , Typography } from "@mui/material";

function Page404() {

  return ( 
    <Grid container spacing={2}>
        <Grid item xs={12} textAlign="center" >
            <Typography variant={"h1"}>Not Found </Typography>
            <Typography variant={"h1"}>404 </Typography>
        </Grid>
    </Grid>
  );
}

export default Page404;