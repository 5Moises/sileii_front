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
    const [fileName, setFileName] = useState(labToEdit?.nombre_imagen || "");  // Inicializa fileName con el valor de labToEdit.nombre_mision
    const [selectedFile, setSelectedFile] = useState(null);
    const [instituto_id, SetInstituto_id] = useState(parseInt(labToEdit?.instituto_id, 10));
    const [mision, setmision] = useState(labToEdit?.mision || '');
    const [vision, setvision] = useState(labToEdit?.vision || '');
    const [historia, sethistoria] = useState(labToEdit?.historia || '');
    const [ubicacion, setubicacion] = useState(labToEdit?.ubicacion || '');
    const [contacto, setContacto] = useState(labToEdit?.contacto || '');
    const [comite_directivo, setcomite_directivo] = useState(labToEdit?.comite_directivo || '');
    const [isLoading, setIsLoading] = useState(true);
    const [url_instituto, SetUrl_instituto] = useState(labToEdit?.url_instituto || '');

    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem('token');
            console.log(labToEdit?.comite_directivo)
            if (!token) {
                console.error('Token de autenticación no encontrado en el localStorage.');
                return;
            }

            try {
                const response = await axios.get(`${API_BASE_URL}usuarios`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                    },
                });

                if (response.status === 200) {
                    const updatedUsers = response.data.usuarios.filter(user => user.rol_id === 5 && user.estado === true);
                    setcomite_directivo(updatedUsers);
                    setIsLoading(false);
                } else {
                    console.error('Error en la respuesta de la API:', response.status);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchUsers();
    }, []);
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
        if (!mision || !vision || !instituto_id || !historia || !ubicacion || !contacto || !comite_directivo || !url_instituto) {
            setError(true);
            setDialogMessage("Hay campos obligatorios que debe completar.");
            setDialogOpen(true);
            return;
        }

        setError(false);
        const token = localStorage.getItem('token');

        const config = {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        };

        let response;
        if (instituto_id) {
            const file = selectedFile;
            const formData = new FormData();
            formData.append("imagen_instituto", file);
            formData.append("nombre_imagen", fileName);
            formData.append("mision", mision);
            formData.append("vision", vision);
            formData.append("historia", historia);
            formData.append("contacto", contacto);
            formData.append("ubicacion", ubicacion);
            formData.append("comite_directivo", comite_directivo);
            formData.append("url_instituto", url_instituto);


            try {
                const apiUrl = `${API_BASE_URL}directores/completar/${instituto_id}`;
                // Si labData.nombre_documento tiene datos, realiza una solicitud PUT
                response = await axios.post(apiUrl, formData, config);

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
    const roles = [
        { id: 1, name: 'Presidente' },
        { id: 2, name: 'Vicepresidente' },
        { id: 3, name: 'Secretario' },
        { id: 4, name: 'Tesorero' },
        // ... otros roles
    ];
    const handleChange = (event) => {
        // Set the selected roles to the new value
        setcomite_directivo(event.target.value);
    };

    if (isLoading) {
        return <div>Cargando...</div>;
    }
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
                            Completar Información Instituto <strong>{labToEdit.nombre}</strong>
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
                            value={mision}
                            onChange={(e) => setmision(e.target.value)}
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
                            value={vision}
                            onChange={(e) => setvision(e.target.value)}
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
                            value={historia}
                            onChange={(e) => sethistoria(e.target.value)}
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
                            value={ubicacion}
                            onChange={(e) => setubicacion(e.target.value)}
                        />
                    </Grid>


                    <Grid item xs={12}>
                        {comite_directivo.length > 0 ? (
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel id="demo-multiple-checkbox-label">Comité Directivo</InputLabel>
                                <Select
                                    labelId="demo-multiple-checkbox-label"
                                    id="demo-multiple-checkbox"
                                    multiple
                                    value={comite_directivo}
                                    onChange={handleChange}
                                    renderValue={(selected) =>
                                        (selected || [])
                                            .map(id => comite_directivo.find(role => role && role.usuario_id === id))
                                            .filter(role => role != null && role.usuario_id != null)
                                            .map(role => role.nombre)
                                            .join(', ')
                                    }
                                    label="Comité Directivo"
                                >
                                    {comite_directivo.filter(role => role.nombre).map((role) => (
                                        <MenuItem key={role.usuario_id} value={role.usuario_id}>
                                            <Checkbox checked={comite_directivo.indexOf(role.usuario_id) > -1} />
                                            <ListItemText primary={role.nombre} />
                                        </MenuItem>
                                    ))}


                                </Select>
                            </FormControl>
                        ) : (
                            <div>Cargando opciones...</div>
                        )}

                    </Grid>


                    <Grid item xs={12}>
                        <TextField
                            label="Contacto"
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            value={contacto}
                            onChange={(e) => setContacto(e.target.value)}
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
                    <Grid item xs={12}>
                        <TextField
                            label="URL"
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            value={url_instituto}
                            onChange={(e) => SetUrl_instituto(e.target.value)}
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
