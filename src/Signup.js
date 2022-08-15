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


const theme = createTheme();

const url_signup = 'http://localhost/ws-login/signup.php';


export default function Signup() {


    const refMail = React.useRef(null);
    const refNombre = React.useRef(null);
    const refPassword = React.useRef(null);
    const refEdad = React.useRef(null);
    const refPhone = React.useRef(null);
    const refDireccion = React.useRef(null);
    
    const handleSignup = () => {
        const params = {
            mail: refMail.current.value,
            password: refPassword.current.value,
            nombre: refNombre.current.value,
            edad: refEdad.current.value,
            telefono: refPhone.current.value,
            direccion: refDireccion.current.value,
            tipo_usuario: '1'

        }
        console.log(params);
        
        if(refMail.current.value !== '' && refPassword.current.value !== '' && 
        refNombre.current.value !== '' && refEdad.current.value !== '' && refPhone !== '' && 
        refDireccion.current.value !== '')
        {
            axios.post(url_signup,JSON.stringify(params)).then(response =>{
                console.log(response.data);

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
                  window.alert("Error")
                }
            });
        }
        else 
        {
            window.alert('Llena todos los campos requeridos')
        }
    };




    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className="form">
                    <Box
                        sx={{
                            minWidth: 400,
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>

                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="mail"
                                label="Mail"
                                name="mail"
                                autoComplete="Mail"
                                autoFocus
                                inputRef={refMail}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Contraseña"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                inputRef={refPassword}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="nombre"
                                label="Nombre"
                                type="nombre"
                                id="nombre"
                                autoComplete="nombre"
                                inputRef={refNombre}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="edad"
                                label="Edad"
                                type="number"
                                id="edad"
                                autoComplete="apellido"
                                inputRef={refEdad}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="telefono"
                                label="Teléfono"
                                type="number"
                                name="telefono"
                                autoComplete="telefono"
                                autoFocus
                                inputRef={refPhone}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="direccion"
                                label="Dirección"
                                id="direccion"
                                autoComplete="direccion"
                                inputRef={refDireccion}
                            />
                        <Button
                            onClick={handleSignup}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="/Contacto" variant="body2">
                                    El DPI ya ha sido registrado?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Ya tienes una cuenta? Log In
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </div>

        </Container>
        </ThemeProvider >
    );
}