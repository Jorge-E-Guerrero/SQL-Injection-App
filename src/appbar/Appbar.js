import Menu from './Menu';
import { AppBar } from '@mui/material';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';


import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#005c5c',
    },
    secondary: {
      main: '#f44336',
    },
  },
});

function logOut() {
    localStorage.clear();
    var anonimo = {
        conectado: false
    }
    window.localStorage.setItem('session', JSON.stringify(anonimo));
    
    window.location.reload();
    window.location.replace('/Home');
    
}





function Appbar() {

    const data = JSON.parse(localStorage.getItem('session'));
    const conexion = data.conectado;
    
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" theme={theme}>
                    <Toolbar>
                        <Menu />
                        <SupervisedUserCircleIcon />
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            SQL Injection
                        </Typography>
                        { conexion === true &&
                            <Link to='/home'>
                            <Button variant='contained' color="inherit" onClick={logOut}>Log out</Button>
                        </Link>
                        }
                        {conexion === false &&
                        <div>
                            <Link to='/login'>
                            <Button variant='contained' color="inherit">Secure Log in</Button>
                            </Link>
                            <Link to='/weak-login'>
                            <Button variant='contained' color="inherit">Weak Log in</Button>
                            </Link>
                        </div>
                    }
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    );
}

export default Appbar;