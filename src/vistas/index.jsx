import React, { useState, useEffect } from 'react';
import theme from '../js/temaConfig';
import { Container, Grid, Box, Paper, Typography, Button } from '@mui/material';
import Escudo from "../assets/imagenes/login_back.png";
import ico1 from "../assets/imagenes/ico_1.png";
import ico2 from "../assets/imagenes/ico_2.ico";


import { Link, useNavigate } from 'react-router-dom';

const styles = {
  fondo: {
    backgroundColor: '#64001D',
  },
  button: {
    backgroundColor: '#64001D',
    color: '#FFFFFF',
  }
};

function Inicio() {
  const navigate = useNavigate();
  const [showPaper, setShowPaper] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      setShowPaper(true);
    } else {
      setShowPaper(false);
    }

  }, []);

  const handlaLab = () => navigate('/res_laboratory_public');
  const handInst = () => navigate('/res_insti_public');

  

  return (
    <Container maxWidth="100%" style={{ display: "flex", justifyContent: "center" }} className='fondo'>
      {showPaper ? (
        <Grid
          container
          spacing={4}
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: "calc(100vh - 64px)" }}
        >
          {/* Texto */}

          <Grid item xs={12} sm={10} md={6} lg={7}>
            <Paper
              elevation={3}
              sx={{
                padding: "10px 35px 10px",
                marginLeft: { xs: 0, sm: "10%" },
                minHeight: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                background: "#",
                text: "center"
              }}
            >
              <Typography
                variant="h5"
                gutterBottom
                align="center"
                sx={{
                  color: "#64001D",
                  fontWeight: "bold",
                  
                }}
              >
                Bienvenido a SILEII
              </Typography>
              <Typography>
                Les damos la más cordial bienvenida a nuestro sistema de SILEII,
                este sistema ha sido diseñado para brindarles acceso y gestión eficiente de datos
                y recursos clave para apoyar sus necesidades y objetivos.
                Nuestra prioridad es proporcionarles una experiencia de usuario fluida y segura.
              </Typography>
            </Paper>
          </Grid>

          {/* Imagen */}
          <Grid item xs={12} sm={10} md={6} lg={5}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
            >
              <img
                src={Escudo}
                alt="Logo-Sileii"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                
                }}
              />
            </Box>
          </Grid>
        </Grid>
      ) : (
        // Contenido nuevo que quieres mostrar cuando showPaper es false
        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: "calc(90vh - 64px)", marginLeft: '10%' }}
        >
          {/* Botón de Laboratorios */}
          <Grid item xs={6}>
            <Button
              variant="outlined"
              style={{
                width: "30%",
                height: "100px",
                borderColor: "#000",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: '50%'
              }}
              onClick={handlaLab}
            >
              <img
                src={ico1}
                alt="Logo-Sileii"
                style={{
                  maxWidth: "80%",
                  maxHeight: "80%",
                
                }}
              />
              <Typography>Laboratorios</Typography>
            </Button>
          </Grid>

          {/* Botón de Institutos */}
          <Grid item xs={6}>
            <Button
              variant="outlined"
              style={{
                width: "30%",
                height: "100px",
                borderColor: "#000",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
              }}
              onClick={handInst}
            >
              <img
                src={ico2}
                alt="Logo-Sileii"
                style={{
                  maxWidth: "80%",
                  maxHeight: "80%",
                
                }}
              />

              <Typography>Institutos</Typography>
            </Button>
          </Grid>
        </Grid>
      )}
    </Container>

  );
}
export default Inicio;