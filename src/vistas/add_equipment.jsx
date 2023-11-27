import { Container, Grid, Paper, Typography, Box } from "@mui/material";
import React, { useState, useEffect } from 'react';

import EquipmentForm from "../componentes/equipment_form";
import Escudo from "../assets/imagenes/login_back.png";
/* import Navigation from "../componentes/Nav"; */
import { Link, useNavigate, useLocation } from 'react-router-dom';

// Definir un componente funcional llamado add_equipment
function add_equipment() {

  return (
    <Container
      maxWidth="lg"
      className='fondo'
      style={{
        paddingTop: '10%', // Espaciado en la parte superior del contenedor
        minHeight: '90vh', // Altura mínima del contenedor para ocupar al menos el 90% del viewport
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'top', // Alineación de contenido en la parte superior
        alignItems: 'center',
      }}
    >
      {/* Contenedor principal con dos columnas */}      
      <Grid
        container
        spacing={2} // Espaciado entre elementos reducido para dispositivos más pequeños
        justifyContent="center" // Alineación de contenido en el centro horizontal
        alignItems="center" // Alineación de contenido en el centro vertical
      >
        {/* Columna izquierda */}        
        <Grid item xs={12} sm={6} md={6} lg={7}>
          <Paper
            elevation={3}
            style={{
              padding: "20px", // Espaciado interior reducido para dispositivos más pequeños
              width: '100%',
              maxWidth: '600px'
            }}
          >
            {/* Título de la sección */}            
            <Typography
              variant="h5"
              gutterBottom
              align="left"
              style={{ color: "#64001D", fontWeight: "bold", marginBottom: "10px" }} // Color, fuente y margen del título
            >
              Registro Equipo
            </Typography>
            {/* Renderizar el formulario del equipo */}            
            <EquipmentForm />
          </Paper>
        </Grid>

        {/* Columna derecha */}        
        <Grid item xs={12} sm={6} md={6} lg={5}> {/* Cambiado el valor de lg para darle más espacio */}
          {/* Contenedor flexible para centrar la imagen */}        
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            {/* Imagen del escudo */}            
            <img
              src={Escudo}
              alt="Logo-Sileii"
              style={{ width: "50%" ,height: "auto" }} // Ancho fijo y altura automática para mantener la proporción
            />
          </Box>
        </Grid>
      </Grid>
    </Container>

  );
}

export default add_equipment;
