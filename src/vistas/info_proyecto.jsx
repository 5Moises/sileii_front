import { Container, Grid, Paper, Typography, Box, Button } from "@mui/material";
import LabForm from "../componentes/LabForm";
import React, { useRef } from 'react';
import Escudo from "../assets/imagenes/login_back.png";
import { useLocation } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

function App() {
    const location = useLocation();
    const labData = location.state?.userToEdit;

    return (
        <Container maxWidth="lg" sx={{
            minHeight: '80vh',
            paddingTop: '5%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'top',
            alignItems: 'top',

        }}>
            <Grid item xs={12} sm={12} md={12} lg={12} style={{ paddingBottom: "30px" }}>
                <Paper elevation={12} style={{ padding: "30px", width: '100%' }}>
                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                        {/* Columna Izquierda (Imagen y Botones) */}
                        <Grid item xs={12} sm={12} md={2} lg={2}>
                            <Typography variant="h6" gutterBottom align="left" style={{ color: "#64001D", fontWeight: "bold" }}>
                                Nombre Proyecto
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={10} lg={10}>
                            <Typography gutterBottom align="left">
                                {labData.nombre_proyecto}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <Grid container spacing={2} justifyContent="left" alignItems="center">
                                {/* Columna Izquierda (Imagen y Botones) */}
                                <Grid item xs={12} sm={12} md={2} lg={2}>
                                    <Typography variant="h6" gutterBottom align="left" style={{ color: "#64001D", fontWeight: "bold" }}>
                                        DOI
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={10} lg={10}>
                                    <Typography gutterBottom align="left">
                                        {labData.doi}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <Grid container spacing={2} justifyContent="right" alignItems="center">
                                {/* Columna Izquierda (Imagen y Botones) */}
                                <Grid item xs={12} sm={12} md={2} lg={2}>
                                    <Typography variant="h6" gutterBottom align="right" style={{ color: "#64001D", fontWeight: "bold" }}>
                                        duracion
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <Typography gutterBottom align="right">
                                        {labData.duracion}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <Grid container spacing={2} justifyContent="left" alignItems="center">
                                {/* Columna Izquierda (Imagen y Botones) */}
                                <Grid item xs={12} sm={12} md={2} lg={2}>
                                    <Typography variant="h6" gutterBottom align="left" style={{ color: "#64001D", fontWeight: "bold" }}>
                                        Etapa
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={10} lg={10}>
                                    <Typography gutterBottom align="left">
                                        {labData.etapa}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <Grid container spacing={2} justifyContent="right" alignItems="center">
                                {/* Columna Izquierda (Imagen y Botones) */}
                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <Typography variant="h6" gutterBottom align="right" style={{ color: "#64001D", fontWeight: "bold" }}>
                                        Linea de Investigación
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <Typography gutterBottom align="right">
                                        {labData.lineas_investigacion}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid container spacing={4} justifyContent="center" alignItems="center" style={{ paddingBottom: "30px" }}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Paper elevation={12} style={{ padding: "30px", width: '100%' }}>
                        <Typography variant="h5" gutterBottom align="left" style={{ color: "#64001D", fontWeight: "bold" }}>
                            Resumen
                        </Typography>
                        <Typography gutterBottom align="left">
                            {labData.resumen}
                        </Typography>
                    </Paper>
                </Grid>
                {/* Columna Izquierda (Imagen y Botones) */}
                <Grid item xs={12} sm={12} md={6} lg={6} style={{ paddingLeft: "10%" }} >
                    <Box display="flex" justifyContent="space-between" alignItems="center" flexDirection="column" height="100%">
                        <img src={Escudo} alt="Logo-Sileii" style={{ maxWidth: "100%", height: "auto" }} />
                    </Box>
                </Grid>

                {/* Columna Derecha (Formulario) */}

            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} style={{ paddingBottom: "30px" }}>
                <Paper elevation={12} style={{ padding: "5%", width: '100%' }}>
                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <Typography variant="h6" gutterBottom align="left" style={{ color: "#64001D", fontWeight: "bold" }}>
                                Investigador
                            </Typography>
                            <Typography gutterBottom align="left">
                                {labData.investigador_principal}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <Typography variant="h6" gutterBottom align="left" style={{ color: "#64001D", fontWeight: "bold" }}>
                                Co-Investigadores
                            </Typography>
                            <Typography gutterBottom align="left">
                                {labData.coinvestigadores}
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Container>

    );
}

export default App;
