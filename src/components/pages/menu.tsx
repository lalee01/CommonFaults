import { Button , Box , Typography , Toolbar , AppBar } from '@mui/material'
import { useNavigate } from 'react-router-dom';

function Menu() {

  const navigate = useNavigate()

  return (
    <Box sx={{ flexGrow: 1 , mb:10 }}>
        <AppBar position="fixed">
            <Toolbar>
                <Button color="inherit" onClick={() => {navigate('/')}}>
                    Home
                </Button>            
                <Typography variant="h1" component="div" sx={{ flexGrow: 1 }} />
                <Typography variant="h1" component="div" sx={{ flexGrow: 1 }} />
                <Button color="inherit">Login</Button>
                <Button color="inherit">Regisztration</Button>
                <Button color="inherit">Logout</Button>
            </Toolbar>
        </AppBar>
    </Box>
  );
}

export default Menu;
