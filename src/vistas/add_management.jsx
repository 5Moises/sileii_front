import { Container, Grid, Paper, Typography, Box } from "@mui/material";
import React, { useState, useEffect } from 'react';

import ManagementForm from "../componentes/management_form";
import Escudo from "../assets/imagenes/login_back.jpg";
/* import Navigation from "../componentes/Nav"; */
import { Link, useNavigate, useLocation } from 'react-router-dom';

function add_management() {
  const location = useLocation();
  const [management, setManagement] = useState({ name: '' }); // Inicializamos users con un objeto vacío

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Token de autenticación no encontrado en el localStorage.');
      return;
    }

    const option = location.state?.option;
    if (option === 1) {
      setManagement({ name: 'Laboratorio' });
    }
    if (option === 2) {
      setManagement({ name: 'Área' });
    }
    if (option === 3) {
      setManagement({ name: 'Disciplina' });
    }
    if (option === 4) {
      setManagement({ name: 'Rol' });
    }

  }, []);

  return (
    <Container
      maxWidth="lg"
      className='fondo'
      style={{
        paddingTop: '10%',
        minHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'top',
        alignItems: 'center',
      }}
    >
      <Grid
        container
        spacing={2} // Reducido el espacio entre elementos para dispositivos más pequeños
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} sm={6} md={6} lg={7}>
          <Paper
            elevation={3}
            style={{
              padding: "20px", // Reducido el espacio interior para dispositivos más pequeños
              width: '100%',
              maxWidth: '600px'
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              align="left"
              style={{ color: "#64001D", fontWeight: "bold", marginBottom: "10px" }} // Reducido el margen inferior
            >
              Registro {management.name}
            </Typography>
            <ManagementForm />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={5}> {/* Cambiado el valor de lg para darle más espacio */}
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <img
              src={Escudo}
              alt="Logo-Sileii"
              style={{ maxWidth: "100%", maxHeight: "100%", width: "auto" }}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>

  );
}

export default add_management;
