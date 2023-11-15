import React from 'react';
import { Container, Grid, Paper, Typography, Box, Button } from "@mui/material";
import { useLocation } from 'react-router-dom';
function ResponsableComponent() {
    const location = useLocation();
    const labData = location.state?.userToEdit;
    return (
        <Container
            maxWidth="lg"
            sx={{
                paddingTop: '5%',
                minHeight: '80vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'top',
                alignItems: 'top',
               
            }}>
            <Grid
                container
                spacing={4}
                justifyContent="center"
                alignItems="center"
            >
                {/* Columna Derecha (Formulario) */}
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Paper
                        elevation={3}
                        style={{
                            padding: "30px",
                            width: '100%',
                            maxWidth: '600px'
                        }}
                    >
                        <Typography
                            variant="h5"
                            gutterBottom
                            align="left"
                            style={{ color: "#64001D", fontWeight: "bold", marginBottom: "20px" }}
                        >
                            RESPONSABLE
                        </Typography>
                        {/* Información para el laboratorio */}
                        <Typography variant="h6" gutterBottom align="left"  style={{marginLeft:'20%' }}> 
                            Datos:  {labData.coordinador.nombre} {labData.coordinador.apellido_paterno} {labData.coordinador.apellido_materno}
                        </Typography>
                        {/* ... (información del laboratorio) */}

                        {/* Información para el área */}
                        <Typography variant="h6" gutterBottom align="left" style={{marginLeft:'20%' }}>
                            Teléfono: {labData.coordinador.telefono}
                        </Typography>
                        {/* ... (información del área) */}

                        {/* Información para la misión */}
                        <Typography variant="h6" gutterBottom align="left" style={{marginLeft:'20%' }}>
                            Correo: {labData.coordinador.correo}
                        </Typography>
                        {/* Información para la visión */}
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}

export default ResponsableComponent;
