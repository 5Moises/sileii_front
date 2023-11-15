import { Container, Grid, Paper, Typography, Box, Button } from "@mui/material";
import LabForm from "../componentes/LabForm";
import Escudo from "../assets/imagenes/login_back.jpg";
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';


function App() {
    const location = useLocation();
    const labData = location.state?.userToEdit;


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
    const handleViewLines = (userToEdit) => navigate('/res_linesInvest', { state: { userToEdit } });
    const handleViewpost = (userToEdit) => navigate('/res_publicaciones_public', { state: { userToEdit } });
    const handleViwService = (userToEdit) => navigate('/res_servicios_public', { state: { userToEdit } });
    const handleViewProyectos = (userToEdit) => navigate('/res_proyectos_public', { state: { userToEdit } });
    const handleViewEquipos = (userToEdit) => navigate('/res_equipo_public', { state: { userToEdit } });

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
                {/* Columna Izquierda (Imagen) */}
                <Grid item xs={12} sm={12} md={6} lg={6}>
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
                            Información
                        </Typography>
                        {/* Información para el encargado */}
                        <Typography variant="h6" gutterBottom align="left">
                            Encargado: {labData.responsable}
                        </Typography>
                        {/* ... (información del encargado) */}

                        {/* Información para el laboratorio */}
                        <Typography variant="h6" gutterBottom align="left">
                            Laboratorio: {labData.laboratorio}
                        </Typography>
                        {/* ... (información del laboratorio) */}

                        {/* Información para el área */}
                        <Typography variant="h6" gutterBottom align="left">
                            Área: {labData.area}
                        </Typography>
                        {/* ... (información del área) */}

                        {/* Información para la misión */}
                        <Typography variant="h6" gutterBottom align="left">
                            Misión:
                        </Typography>
                        <Typography variant="body1" paragraph align="left">
                            {labData.mision}
                        </Typography>

                        {/* Información para la visión */}
                        <Typography variant="h6" gutterBottom align="left">
                            Visión:
                        </Typography>
                        <Typography variant="body1" paragraph align="left">
                            {labData.vision}
                        </Typography>
                        <Typography variant="h6" gutterBottom align="left">
                            Ubicación:
                        </Typography>
                        <Typography variant="body1" paragraph align="left">
                            {labData.ubicacion}
                        </Typography>
                        {showPaper ? (<><></></>) : (
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <Typography
                                    variant="h5"
                                    gutterBottom
                                    align="left"
                                    style={{ color: "#64001D", fontWeight: "bold", marginBottom: "20px" }}
                                >
                                    Solicitar Información
                                </Typography>
                                <Typography variant="h6" gutterBottom align="left" style={{ lineHeight: '0.5' }}>
                                    <Button
                                        style={{ background: 'transparent', color: '#2424E1', textDecoration: 'underline', lineHeight: '0.5' }}
                                        onClick={() => handleViewEquipos(labData)}
                                    >
                                        Equipos especializados
                                    </Button>
                                </Typography>
                                <Typography variant="h6" gutterBottom align="left" style={{ lineHeight: '0.5' }}>
                                    <Button
                                        style={{ background: 'transparent', color: '#2424E1', textDecoration: 'underline', lineHeight: '0.5' }}
                                        onClick={() => handleViewProyectos(labData)}

                                    >
                                        Proyectos de Investigación
                                    </Button>
                                </Typography>
                                <Typography variant="h6" gutterBottom align="left" style={{ lineHeight: '0.5' }}>
                                    <Button
                                        style={{ background: 'transparent', color: '#2424E1', textDecoration: 'underline', lineHeight: '0.5' }}
                                        onClick={() => handleViwService(labData)}

                                    >
                                        Servicios y Actividades
                                    </Button>
                                </Typography>
                                <Typography variant="h6" gutterBottom align="left" style={{ lineHeight: '0.5' }}>
                                    <Button
                                        style={{ background: 'transparent', color: '#2424E1', textDecoration: 'underline', lineHeight: '0.5' }}
                                        onClick={() => handleViewpost(labData)}
                                    >
                                        Publicaciones
                                    </Button>
                                </Typography>


                                <Typography variant="h6" gutterBottom align="left">
                                    <Button
                                        align="left"
                                        style={{ background: 'transparent', color: '#2424E1', textDecoration: 'underline', textAlign: 'left' }}
                                        onClick={() => handleViewLines(labData)}

                                    >
                                        Lineas de Investigación del Laboratorio
                                    </Button>
                                </Typography>

                            </Grid>
                        )}

                    </Paper>
                </Grid>


            </Grid>
        </Container>
    );
}

export default App;
