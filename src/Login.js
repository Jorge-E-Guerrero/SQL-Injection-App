import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import axios from 'axios';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const url_login = 'http://localhost/ws-login/login.php';


export default function Login() {


  const refMail = React.useRef(null);
  const refPassword = React.useRef(null);

  const [json, setJson] = React.useState([""]);

  const handleLogin = () => {
    const params = {
      mail: refMail.current.value,
      password: refPassword.current.value
    }
    console.log(params);

    if(params.mail != "" && params.password != ""){
      axios.post(
        url_login,JSON.stringify(params)
      ).then(response => {
        console.log(response.data);
        setJson(response.data);
        
        function isJson(item) {
          item = typeof item !== "string"
              ? JSON.stringify(item)
              : item;
      
          try {
              item = JSON.parse(item);
          } catch (e) {
              return false;
          }
      
          if (typeof item === "object" && item !== null) {
              return true;
          }
      
          return false;
        }

        if(response.data.error != true){
          if(isJson(JSON.stringify(response.data))){
            function fetchData() {
              //var json_data =  JSON.stringify(json);
              //console.log(json_data);
              window.localStorage.setItem('data', JSON.stringify(response.data));
            }
  
            fetchData();
            
            var anonimo = {
              conectado: true
            }
            setTimeout(() => {
              window.localStorage.setItem('session', JSON.stringify(anonimo));
              //window.alert("Loggeado Exitosamente");
              window.location.reload();
              window.location.replace("/Home");
            }, "1000")
          }
          else
          {
            window.alert("Error")
          }
        }
        else
        {
          window.alert("Usuario o Contraseña Incorrecta")
        }
      });
    }
    else
    {
      window.alert("Llenar todos los campos")
    }
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className="form">
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>

            </Avatar>
            <Typography component="h1" variant="h5">
              Secure Log in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ minWidth:400 , mt: 1 }}>
              <TextField
                inputRef={refMail}
                margin="normal"
                required
                fullWidth
                id="mail"
                label="Mail"
                name="mail"
                autoComplete="mail"
                autoFocus

              />
              <TextField
                inputRef={refPassword}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleLogin}
              >
                Log in
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Olvidaste tu contraseña?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    Aún no tienes cuenta? Sign Up
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          
        </div>
      <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
      
    </ThemeProvider>
  );
}