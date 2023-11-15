import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Container, Grid, Paper, Typography, Box, Button } from "@mui/material";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { API_BASE_URL } from '../js/config';

function formatDate(dateString) {
    // Extrae solo la fecha (ignorando la hora)
    return dateString.split(' ')[0];
}
export default function View_Maintenance() {
    // State para manejar los valores de los campos
    const navigate = useNavigate();
    const location = useLocation();
    const labData = location.state?.userToEdit;
    const [equipmentToSuccess, setEquipmentToSuccess] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);


    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Los meses en JS van de 0 a 11, por lo que sumamos 1
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    const [formData, setFormData] = useState({
        nombre: labData.nombre ?? labData.equipo?.nombre,
        marca: labData.marca_modelo ?? labData.equipo?.nombre,
        fechaAdquisicion: formatDate(labData.equipo?.fecha_adquisicion ?? labData.fecha_adquisicion),
        fechaSolicitud: labData.fecha_solicitud ?? getCurrentDate(),
        codPatrimonial: labData.codigo_patrimonio ?? labData.equipo?.codigo_patrimonio,
        accesorios: labData.accesorio ?? labData.equipo?.accesorio,
        detalle: labData.detalle ?? '',
        oficio: labData.oficio ?? '',
        estado: labData.estado ?? 'asdas', // 'asdas' seems like a placeholder, replace with actual default value if needed
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleCancel = () => {
        navigate(-1);  // Esto es equivalente a history.goBack()
    }
    const handleSend = () => {
        // Validando que todos los campos tengan valores
        for (let key in formData) {
            if (!formData[key]) {
                alert('Todos los campos deben tener valores.');
                return;
            }
        }
        // Aquí puedes continuar con la lógica para enviar el formulario
        console.log('Formulario enviado:', formData);
    };

    const handleRegisterClick = () => {
        handleSend();
        const id_user = localStorage.getItem('id_user_l');
        const requestBody = {
            usuario_id: parseInt(id_user, 10),
            equipo_id: labData.equipo_id,
            fecha_solicitud: formData.fechaSolicitud,
            detalle: formData.detalle,
            oficio: formData.oficio,
            // Agrega otros campos si es necesario
        };
        const token = localStorage.getItem('token');

        // Verifica si se ha almacenado un token en el localStorage
        if (!token) {
            navigate('/');
            console.error('Token de autenticación no encontrado en el localStorage.');
            return;
        }


        axios
            .post(`${API_BASE_URL}coordinador/solicitud`, requestBody, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    setEquipmentToSuccess(true);
                    setOpenDialog(true);
                } else {
                    console.error("Error en la respuesta de la API:", response.status);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });


    };
    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEquipmentToSuccess(null);
    };
    const confirm_view = () => {
        navigate(-1);
    };



    return (
        <Container
            className='fondo'
            maxWidth="lg"
            sx={{
                minHeight: '80vh',
                paddingTop: '2%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'top',
                alignItems: 'top',
            }}
        >
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <Paper elevation={12} style={{ padding: "30px", width: '100%' }}>
                    <TextField
                        fullWidth
                        label="Nombre"
                        variant="outlined"
                        margin="normal"
                        name="nombre"
                        value={formData.nombre}
                    />
                    <TextField
                        fullWidth
                        label="Marca"
                        variant="outlined"
                        margin="normal"
                        name="marca"
                        value={formData.marca}
                    />
                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextField
                                fullWidth
                                label="Fecha de adquisición"
                                variant="outlined"
                                margin="normal"
                                name="fechaAdquisicion"
                                type="date"
                                value={formData.fechaAdquisicion}

                            />
                            <TextField
                                fullWidth
                                label="Fecha de solicitud mant."
                                variant="outlined"
                                margin="normal"
                                name="fechaSolicitud"
                                value={formData.fechaSolicitud}
                                onChange={handleInputChange}
                                type="date"


                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextField
                                fullWidth
                                label="Cod. Patrimonial"
                                variant="outlined"
                                margin="normal"
                                name="codPatrimonial"
                                value={formData.codPatrimonial}
                            />
                            <TextField
                                fullWidth
                                label="Accesorios"
                                variant="outlined"
                                margin="normal"
                                name="accesorios"
                                value={formData.accesorios}

                            />
                        </Grid>
                    </Grid>

                    <TextField
                        fullWidth
                        label="Detalle"
                        variant="outlined"
                        margin="normal"
                        name="detalle"
                        value={formData.detalle}
                        onChange={handleInputChange}
                        multiline
                        rows={4}
                    />
                    <TextField
                        fullWidth
                        label="Ingrese un oficio solicitando mantenimiento"
                        variant="outlined"
                        margin="normal"
                        name="oficio"
                        value={formData.oficio}
                        onChange={handleInputChange}
                    />

                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                        <Grid item xs={12} sm={12} md={6} lg={6}>

                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    style={{ marginRight: '10px' }}
                                    onClick={handleRegisterClick}
                                >
                                    Enviar solicitud
                                </Button>
                                <Button variant="outlined" color="secondary"
                                    onClick={handleCancel}
                                >
                                    Cancelar solicitud
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                    <Dialog
                        open={openDialog}
                        onClose={handleCloseDialog}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Confirmación Registro"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                SOLICITUD DE MANTENIMIENTO EN ENVIADA CON ÉXITO
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={confirm_view} color="primary" autoFocus>
                                Listo
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Paper>
            </Grid>
        </Container>
    );

}
