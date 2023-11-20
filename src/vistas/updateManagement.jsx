import { Container, Grid, Paper, Typography, Box } from "@mui/material";
import React, { useState, useEffect } from 'react';

import ManagementForm from "../componentes/management_form";
import Escudo from "../assets/imagenes/login_back.png";
/* import Navigation from "../componentes/Nav"; */
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Update_management() {
  const location = useLocation();
  const [management, setManagement] = useState({ name: '' }); // Inicializamos users con un objeto vacío
  const [management_name, setManagementName] = useState({ name: '' });
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Token de autenticación no encontrado en el localStorage.');
      return;
    }

    const option = location.state?.option;
    const data = location.state?.datos;
    if (option === 1) {
      setManagement({ name: 'Laboratorio' });
      setManagementName({ name: data.nombre });
    }
    if (option === 2) {
      setManagement({ name: 'Área' });
      setManagementName({ name: data.nombre });
    }
    if (option === 3) {
      setManagement({ name: 'Disciplina' });
      setManagementName({ name: data.nombre });
    }
    if (option === 4) {
      setManagement({ name: 'Rol' });
      setManagementName({ name: data.nombre });
    }
  }, []);

  return (
    <Container
      className='fondo'
      maxWidth="lg"
      sx={{
        paddingTop: '5%',
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'top',
        alignItems: 'top',
        
      }}
    >
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} sm={6} md={6} lg={7}>
          <Paper
            elevation={3}
            style={{
              pUpdateing: "20px",
              width: '100%',
              maxWidth: '600px'
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              align="left"
              style={{ color: "#64001D", fontWeight: "bold", marginBottom: "10px" }}
            >
              Edición de {management.name}
            </Typography>
            <ManagementForm />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={5}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <img
              src={Escudo}
              alt="Logo-Sileii"
              style={{ width: "50%" ,heigth: "auto" }}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>

  );
}

export default Update_management;
