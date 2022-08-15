//import { useParams } from 'react-router-dom';
//import logo from './logo.svg';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';


import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import MediaCard from './homepage/card';
import { Typography } from '@mui/material';

const theme = createTheme();

var conexion = JSON.parse(window.localStorage.getItem("session"));
var datos = window.localStorage.getItem("data");


export default function Home() {
    return (
        <div>

            <CardMedia
                component="img"
                height="200"
                image="https://academy.avast.com/hs-fs/hubfs/New_Avast_Academy/SQL%20injection/What%20is%20a%20SQL%20injection.png?width=660&name=What%20is%20a%20SQL%20injection.png"
                alt="vacuna"
            />
            <Typography id="tituloHome">Bienvenidos al SQL Injection App </Typography>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs" id="home">
                    <CssBaseline />
                    <div className="form2" id="divHome">
                      {conexion.conectado === true &&
                        <Box
                          sx={{
                              marginTop: 4,
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                          }}
                        >
                          <MediaCard imagen="https://kinsta.com/es/wp-content/uploads/sites/8/2020/01/inyeccion-sql.jpg" titulo="Tus datos" texto={datos} />
                        </Box>
                      }
                      {conexion.conectado === false &&
                        <Box
                            sx={{
                                marginTop: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}
                        >
                          <MediaCard imagen="https://miro.medium.com/max/815/1*zB5JlbMSA26pklzNRAmSEg.png" titulo="Ingresa para ver tus datos" texto="Cuando hagas Log In tus datos apareceran en esta parte" />
                        </Box>
                      }
                    </div>
                </Container>

            </ThemeProvider>
        </div>
    );
}