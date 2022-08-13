import { Button , Box , Typography , Toolbar , AppBar } from '@mui/material'
import { useNavigate } from 'react-router-dom';

function Menu() {

  const navigate = useNavigate()

  return (
    <Box sx={{ flexGrow: 1 , mb:10 }}>
        <AppBar position="fixed">
            <Toolbar>
                <Button color="inherit" onClick={() => {navigate('/')}}>
                    Kezdőlap
                </Button>            
                <Typography variant="h1" component="div" sx={{ flexGrow: 1 }} />
                <Typography variant="h1" component="div" sx={{ flexGrow: 1 }} />
                <Button color="inherit">Belépés</Button>
                <Button color="inherit">Regisztráció</Button>
                <Button color="inherit">Kilépés</Button>
            </Toolbar>
        </AppBar>
    </Box>
  );
}

export default Menu;
