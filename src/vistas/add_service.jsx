import React, { useState, useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios'; // Asumiendo que estás usando axios para las peticiones HTTP
import { API_BASE_URL } from '../js/config';
import { MenuItem, Select, Container, Grid, TextField, Button, Typography, IconButton, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel } from '@mui/material';

const MyFormPage = () => {
    const navigate = useNavigate();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const location = useLocation(); // Accede a la ubicación actual en la navegación
    const labToEdit = location.state?.userToEdit || {};



    const [registro_id, setregistro_id] = useState(parseInt(labToEdit?.registro_id, 10));
    const [nombre, setnombre] = useState(labToEdit.dni || '');


    const [error, setError] = useState(false);

    const handleCancel = () => {
        navigate(-1);
    };


    const handleSave = async () => {
        if (!nombre || !registro_id) {
            setError(true);
            setDialogMessage("Hay campos obligatorios que debe completar.");
            setDialogOpen(true);
            return;
        }

        setError(false);
        const token = localStorage.getItem('token');

        if (registro_id) {
            try {
                const response = await axios.put(`${API_BASE_URL}comiteDirectivo/${registro_id}`, {

                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                    }
                });
                if (response.status >= 200 && response.status <= 300) {
                    setDialogMessage("Petición exitosa");
                    setDialogOpen(true);

                }


                // Aquí puedes añadir lógica adicional para manejar la respuesta del servidor, como navegación o mensajes de éxito/error.
            } catch (error) {
                setDialogMessage("Error al enviar el formulario:", error);
                setDialogOpen(true);
                // Puedes manejar errores específicos aquí si es necesario.
            }
        }
        else {
            try {
                const response = await axios.post(`${API_BASE_URL}comiteDirectivo`, {
                    nombre,
                    nombreusuario,
                    apellidopa,
                    apellidoma,
                    direccionusuario,
                    telefonousuario,
                    email,
                    password,
                    idrol,
                    estado,
                    categoria,
                    regimen
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                    }
                });
                if (response.status >= 200 && response.status <= 300) {
                    setDialogMessage("Petición exitosa");
                    setDialogOpen(true);

                }


                // Aquí puedes añadir lógica adicional para manejar la respuesta del servidor, como navegación o mensajes de éxito/error.
            } catch (error) {
                setDialogMessage("Error al enviar el formulario:", error);
                setDialogOpen(true);
                // Puedes manejar errores específicos aquí si es necesario.
            }
        }

    };
    const handleCloseDialog = () => {
        if (dialogMessage === 'Petición exitosa') {
            navigate(-1);
        }
        else {
            setDialogOpen(false);
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
                            Servicio y Actividad
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>

                        <TextField
                            label="Nombre del Servicio / Actividad"
                            multiline
                            rows={4}
                            placeholder="Ingrese el nombre"
                            variant="outlined"
                            fullWidth
                            value={nombre}
                            onChange={(e) => setnombre(e.target.value)}
                        />

                    </Grid>

                    <Grid item xs={12} display="flex" justifyContent="flex-end" gap={2}>
                        <Button variant="outlined" onClick={handleCancel}>
                            Cancelar
                        </Button>
                        <Button variant="contained">
                            Guardar
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>Información</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {dialogMessage}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cerrar</Button>
                </DialogActions>
            </Dialog>
        </Container >
    );
};

export default MyFormPage;
