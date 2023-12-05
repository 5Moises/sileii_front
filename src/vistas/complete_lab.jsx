import { useLocation } from 'react-router-dom'; // Importar useLocation
import axios from 'axios'; // Asumiendo que estás usando axios para las peticiones HTTP
import Escudo from "../assets/imagenes/login_back.png";
import { Container, Grid, Paper, Typography, Box, TextField, Button } from "@mui/material";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../js/config';


const styles = {
    container: {
        paddingTop: '5%',
        minHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    paper: {
        width: '100%',
        maxWidth: '100%',
    },
    typography: {
        color: "#64001D",
        fontWeight: "bold",
        padding: '5%',
    },
    gridItemLeft: {
        marginRight: '10px'
    },
    logoImage: {
        maxWidth: "100%",
        maxHeight: "100%",
        width: "auto"
    },
    form: {
        paddingLeft: '5%',
        paddingBottom: '5%',
    },
    button: {

        backgroundColor: "#64001D",
        color: "#FFFFFF",
        "&:hover": {
            backgroundColor: "#64001D",
        },
        marginTop: "10px",
        marginBottom: "5px",
    },
}
function LaboratorioForm() {
    const location = useLocation(); // Accede a la ubicación actual en la navegación
    const userToEdit = location.state?.userToEdit || {};
    const navigate = useNavigate();

    const [mision, setMision] = useState(userToEdit.mision || '');
    const [vision, setVision] = useState(userToEdit.vision || '');
    const [historia, setHistoria] = useState(userToEdit.historia || '');
    const [error, setError] = useState(false);

    const handleAgregar = async () => {
        if (!mision || !vision || !historia) {
            setError(true);
            return;
        }
        
        setError(false);
        const token = localStorage.getItem('token');
        try {
            const response = await axios.put(`${API_BASE_URL}registroLaboratorio/completar/${userToEdit.registro_id}`, {
                mision,
                vision,
                historia,
              
            },{
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                }
            });
            if (response.status === 200) {
                
                navigate('/op_listaLab')
            }

           
            // Aquí puedes añadir lógica adicional para manejar la respuesta del servidor, como navegación o mensajes de éxito/error.
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
            // Puedes manejar errores específicos aquí si es necesario.
        }
    };

    return (
        <Container maxWidth="lg" className='fondo' style={styles.container}>
            <Grid container spacing={4} justifyContent="center" alignItems="center">
                {/* Columna Derecha (Formulario) */}
                <Grid item xs={6} sm={6} md={6} lg={7}>
                    <Paper elevation={3} style={styles.paper}>
                        <Typography
                            variant="h5"
                            gutterBottom
                            align="left"
                            style={styles.typography}
                        >
                            Laboratorio
                        </Typography>
                        <form style={styles.form}>
                            <Grid container spacing={1}>
                                <TextField
                                    label="id"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    sx={{
                                        visibility: 'hidden',
                                        position: 'absolute',
                                    }}
                                    name="id"
                                />
                                <Grid item xs={5.8} style={styles.gridItemLeft}>
                                    <TextField
                                        fullWidth
                                        name="Misión"
                                        label="Misión"
                                        variant="outlined"
                                        size='small'
                                        margin="dense"
                                        value={mision}
                                        onChange={(e) => setMision(e.target.value)}
                                    />
                                    <TextField
                                        fullWidth
                                        name="Visión"
                                        label="Visión"
                                        variant="outlined"
                                        size='small'
                                        margin="dense"
                                        value={vision}
                                        onChange={(e) => setVision(e.target.value)}
                                    />
                                    <TextField
                                        fullWidth
                                        name="Historia"
                                        label="Historia"
                                        variant="outlined"
                                        size='small'
                                        margin="dense"
                                        value={historia}
                                        onChange={(e) => setHistoria(e.target.value)}
                                    />

                                </Grid>
                            </Grid>
                            <Button
                                variant="contained"
                                onClick={handleAgregar} // Vinculado al handler
                                style={{ marginTop: '20px', width: "260px" }}
                                sx={{ ...styles.button }}>

                                Agregar
                            </Button>
                        </form>
                    </Paper>
                </Grid>
                {/* Columna Izquierda (Imagen) */}
                <Grid item xs={4} sm={4} md={4} lg={3.5}>
                    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                        <img src={Escudo} alt="Logo-Sileii" style={styles.logoImage} />
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}

export default LaboratorioForm;
