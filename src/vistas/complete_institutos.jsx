import React, { useState, useRef, useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios'; // Asumiendo que estás usando axios para las peticiones HTTP
import { API_BASE_URL } from '../js/config';
import { ListItemText, Checkbox, MenuItem, Select, Container, Grid, TextField, Button, Typography, IconButton, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel } from '@mui/material';

const MyFormPage = () => {
    const navigate = useNavigate();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const location = useLocation(); // Accede a la ubicación actual en la navegación
    const labToEdit = location.state?.userToEdit || {};
    const fileInputRef = useRef();
    const [fileName, setFileName] = useState(labToEdit?.nombre_mision || "");  // Inicializa fileName con el valor de labToEdit.nombre_mision
    const [selectedFile, setSelectedFile] = useState(null);


    const [instituto_id, SetInstituto_id] = useState(parseInt(labToEdit?.instituto_id, 10));
    const [mision, setmision] = useState(labToEdit.mision || '');
    const [vision, setvision] = useState(labToEdit.vision || '');
    const [historia, sethistoria] = useState(labToEdit.historia || '');
    const [apellidoMaterno, setApellidoMaterno] = useState(labToEdit.apellido_materno || '');
    const [, setDireccionUsuario] = useState(labToEdit.direccion); // Valor fijo 'UNSA'
    const [telefonoUsuario, setTelefonoUsuario] = useState(labToEdit.telefono || '');
    const [email, setEmail] = useState(labToEdit.correo || '');
    const [password, setPassword] = useState(labToEdit.password || '');
    const [idRol, setIdRol] = useState(parseInt(labToEdit.rol_id || 5, 10));
    const [estado, setEstado] = useState(true);
    const [categoria, setCategoria] = useState(labToEdit.categoria || "Principal"); // Supongamos que el valor predeterminado es 5
    const [regimen, setRegimen] = useState(labToEdit.regimen || "Tiempo Parcial"); // Supongamos que el valor predeterminado es 5
    const [selectedRoles, setSelectedRoles] = useState([]);

    const [error, setError] = useState(false);

    const handleCancel = () => {
        navigate(-1);
    };

    const styles = {
        label: {
            color: '#555',
            borderColor: '#64001D',
        },
        formField: {
            marginBottom: '20px',

        },
        button: {
            backgroundColor: '#64001D',

            '&:hover': {
                backgroundColor: '#44001F',
            },
            color: '#fff',
            padding: '10px 30px',
            width: '100%',
        },
        fileInput: {
            display: 'none',
        },
    };
    const triggerFileSelect = () => {
        fileInputRef.current.click();
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        setFileName(file.name);
    };
    const handleSave = async () => {
        if (!mision || !vision || !historia || !apellidoMaterno || !direccionUsuario || !telefonoUsuario || !email || !password || !idRol || !categoria || !regimen) {
            setError(true);
            setDialogMessage("Hay campos obligatorios que debe completar.");
            setDialogOpen(true);
            return;
        }

        setError(false);
        const token = localStorage.getItem('token');
        let vision = vision;
        let apellidopa = historia;
        let apellidoma = apellidoMaterno;
        let direccionusuario = direccionUsuario;
        let telefonousuario = telefonoUsuario;
        let idrol = idRol
        if (idUsuario) {
            try {
                const response = await axios.put(`${API_BASE_URL}comiteDirectivo/${idUsuario}`, {
                    mision,
                    vision,
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
        else {
            try {
                const response = await axios.post(`${API_BASE_URL}comiteDirectivo`, {
                    mision,
                    vision,
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
    const handleFileNameChange = (e) => {
        setFileName(e.target.value);
    };

    // Actualiza la función de manejo de cambios para manejar un array de valores


    // Datos de ejemplo para los roles del comité directivo
    const roles = [
        { id: 1, name: 'Presidente' },
        { id: 2, name: 'Vicepresidente' },
        { id: 3, name: 'Secretario' },
        { id: 4, name: 'Tesorero' },
        // ... otros roles
    ];

    const handleChange = (event) => {
        // Set the selected roles to the new value
        setSelectedRoles(event.target.value);
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
                            Completar Información Instituto
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            label="Mision"
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            value={vision}
                            onChange={(e) => setvision(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Vision"
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            value={historia}
                            onChange={(e) => sethistoria(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Reseña Historica"
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            value={apellidoMaterno}
                            onChange={(e) => setApellidoMaterno(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Ubicación"
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            value={mision}
                            onChange={(e) => setmision(e.target.value)}
                        />
                    </Grid>




                    <Grid item xs={12}>

                        <FormControl variant="outlined" fullWidth>
                            <InputLabel id="demo-multiple-checkbox-label">Comité Directivo</InputLabel>
                            <Select
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                multiple
                                value={selectedRoles}
                                onChange={handleChange}
                                renderValue={(selected) => selected.map(id => roles.find(role => role.id === id).name).join(', ')}
                                label="Comité Directivo"
                            >
                                {roles.map((role) => (
                                    <MenuItem key={role.id} value={role.id}>
                                        <Checkbox checked={selectedRoles.indexOf(role.id) > -1} />
                                        <ListItemText primary={role.name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                    </Grid>


                    <Grid item xs={12}>
                        <TextField
                            label="Contacto"
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Grid>


                    <Grid item xs={12} container alignItems="flex-end" spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                name="fileName"
                                label="Nombre del mision"
                                variant="outlined"
                                size='small'
                                margin="dense"
                                InputLabelProps={{ style: styles.label }}
                                style={{ borderColor: "#64001D" }}
                                value={fileName || " "}
                                onChange={handleFileNameChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            {/* Botón para disparar el input de tipo "file" */}
                            <Button onClick={triggerFileSelect} variant="outlined" style={{ width: '100%', color: '#64001D', borderColor: "#64001D", }}>
                                Seleccionar archivo
                            </Button>
                            <input type="file" ref={fileInputRef} style={styles.fileInput} onChange={handleFileChange} />
                            {/* Muestra el nombre del archivo seleccionado */}

                        </Grid>
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
