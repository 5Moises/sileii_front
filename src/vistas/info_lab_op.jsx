import { Container, Grid, Paper, Typography, Box, Button } from "@mui/material";
import LabForm from "../componentes/LabForm";
import React, { useRef } from 'react';
import Escudo from "../assets/imagenes/login_back.jpg";
import { useLocation } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

function App() {    
    const location = useLocation();
    const labData = location.state?.userToEdit;
    const navigate = useNavigate();

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleFileSelected = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            console.log('Archivo seleccionado:', selectedFile.name);
        }
    };

    const handlecrudequipos = () => {      
        navigate('/res_equipment', { state: { labData } });
    };
    const handlecrudproyects = () => {       
        navigate('/ManageProyects', { state: { labData } });
    };
    const handlecruddocuments = () => {       
        navigate('/ManageDocuments', { state: { labData } });
    };
    //ManageDocuments

    //ManageProyects
    return (
        <Container maxWidth="lg" sx={{
            minHeight: '80vh',
            paddingTop: '10%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'top',
            alignItems: 'top',
           
        }}>
            <Grid container spacing={4} justifyContent="center" alignItems="center">

                {/* Columna Izquierda (Imagen y Botones) */}
                <Grid item xs={12} sm={12} md={6} lg={6}>

                    <Box display="flex" justifyContent="space-between" alignItems="center" flexDirection="column" height="100%">
                        <img src={Escudo} alt="Logo-Sileii" style={{ maxWidth: "100%", height: "auto" }} />

                        <Box display="flex" justifyContent="center" alignItems="center">
                            <Button variant="contained" color="primary" style={{ margin: "10px", fontSize: "15px", background: "#64001d" }} onClick={() => handlecrudequipos()}>
                                Gestionar Equipo
                            </Button>
                            <Button variant="contained" style={{ margin: "10px", fontSize: "15px", background: "#64001d" }} onClick={() => handlecrudproyects()}>
                                Gestionar Proyectos
                            </Button>
                            <Button variant="contained" style={{ margin: "10px", fontSize: "15px", background: "#64001d" }}  onClick={() => handlecruddocuments()}>
                                subir Documentos
                            </Button>
                           
                        </Box>
                    </Box>

                </Grid>

                {/* Columna Derecha (Formulario) */}
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Paper elevation={3} style={{ padding: "30px", width: '100%', maxWidth: '600px' }}>
                        <Typography variant="h5" gutterBottom align="left" style={{ color: "#64001D", fontWeight: "bold", marginBottom: "20px" }}>
                            Información de Laboratorio
                        </Typography>
                        {/* Información para el encargado */}
                        <Typography variant="h6" gutterBottom align="left">
                            Encargado:  {labData.responsable}
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
                        
                        {/* Información para la visión */}
                        <Typography variant="h6" gutterBottom align="left">
                            Historia:
                        </Typography>
                        <Typography variant="body1" paragraph align="left">
                        {labData.historia}
                        </Typography>

                    </Paper>
                </Grid>
            </Grid>
        </Container>

    );
}

export default App;
