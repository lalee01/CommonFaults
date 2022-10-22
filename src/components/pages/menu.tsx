import { Button , Box , Typography , Toolbar , AppBar } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import {MODALS , useModals} from './../hooks/UseModal'

function Menu() {

  const navigate = useNavigate()
  const {showModal} = useModals();

  return (
    <Box sx={{ flexGrow: 1 , mb:10 }}>
        <AppBar position="fixed">
            <Toolbar>
                <Button color="inherit" onClick={() => {navigate('/')}}>
                    Home
                </Button>            
                <Typography variant="h1" component="div" sx={{ flexGrow: 1 }} />
                <Typography variant="h1" component="div" sx={{ flexGrow: 1 }} />
                <Button color="inherit" onClick={() => {
                  showModal(MODALS.LOGIN)}}>Login</Button>
                <Button color="inherit" onClick={() => {
                  showModal(MODALS.REG)}}>Regisztration</Button>
                <Button color="inherit" >Logout</Button>
            </Toolbar>
        </AppBar>
    </Box>
  );
}

export default Menu;
