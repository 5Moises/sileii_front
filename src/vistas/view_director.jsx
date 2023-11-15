import React, { useState, useEffect } from 'react';
import { Container, Grid, TextField, Button, Typography, IconButton, Paper } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios'; // Asumiendo que estás usando axios para las peticiones HTTP
import { API_BASE_URL } from '../js/config';

const MyFormPage = () => {
    const navigate = useNavigate();

    const location = useLocation(); // Accede a la ubicación actual en la navegación
    const labToEdit = location.state?.labToEdit || {};

    const [resumen, setresumen] = useState(labToEdit.resumen || '');
    const [fecha_culminacion, setfecha_culminacion] = useState(labToEdit.fecha_culminacion || '');
    const [fecha_eleccion, setfecha_eleccion] = useState(labToEdit.fecha_eleccion || '');
    const [error, setError] = useState(false);

    const handleCancel = () => {
        navigate(-1);
    };


    const handleSave = async () => {
        if (!resumen || !fecha_culminacion || !fecha_eleccion) {
            setError(true);
            return;
        }

        setError(false);
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post(`${API_BASE_URL}directores/completar/${labToEdit.usuario_director}`, {
                resumen,
                fecha_culminacion,
                fecha_eleccion,

            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                }
            });
            if (response.status === 200) {
                console.log(response.data);
                navigate(-1);
            }


            // Aquí puedes añadir lógica adicional para manejar la respuesta del servidor, como navegación o mensajes de éxito/error.
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
            // Puedes manejar errores específicos aquí si es necesario.
        }
    };


    return (
        <Container maxWidth="md" sx={{ py: 8 }}> {/* Padding top and bottom */}
            <Paper elevation={3} sx={{ p: { xs: 2, md: 4 } }}> {/* Responsive padding */}
                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={12} display="flex" justifyContent="flex-start">
                        <IconButton aria-label="back" onClick={handleCancel}>
                            <ArrowBackIcon />
                        </IconButton>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h5" component="h2" textAlign="center">
                            Completar información de Director
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Resumen"
                            multiline
                            rows={4}
                            placeholder="Ingrese el resumen"
                            variant="outlined"
                            fullWidth
                            value={resumen}
                            onChange={(e) => setresumen(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Fecha de elección"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            value={fecha_eleccion}
                            onChange={(e) => setfecha_eleccion(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Fecha de culminación"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            value={fecha_culminacion}
                            onChange={(e) => setfecha_culminacion(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} display="flex" justifyContent="flex-end" gap={2}>
                        <Button variant="outlined" onClick={handleCancel}>
                            Cancelar
                        </Button>
                        <Button variant="contained" onClick={handleSave}>
                            Guardar
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default MyFormPage;
