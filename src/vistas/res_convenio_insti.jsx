import React, { useState, useEffect } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
    Container, Paper, Typography, TextField, Table, TableContainer,
    TableHead, TableBody, TableRow, TableCell, Button, Grid, IconButton, Box
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import BuildIcon from '@mui/icons-material/Build';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { API_BASE_URL } from '../js/config';

// Componente entidadal FuntionInsti
function FuntionInsti() {
    const navigate = useNavigate();
    const location = useLocation();
    const labData = location.state?.labData;
    const [showInactive, setShowInactive] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [linesInves, setLinesInves] = useState([]);
    const [showPaper, setShowPaper] = useState(false);
    const [userToDelete, setuserToDelete] = useState(null);
    const [convenio_id, setconvenio_id] = useState(null);



    useEffect(() => {
        // Obtener el token de autenticación y el correo electrónico del almacenamiento local
        const token = localStorage.getItem('token');

        // Verificar si el token existe en el almacenamiento local
        if (!token) {
            console.log('Token de autenticación no encontrado en el localStorage.');
            setShowPaper(false);
            return;

        }
        else {
            setShowPaper(true);
        }

        // Verificar si el correo electrónico existe en el almacenamiento local
        if (labData?.instituto_id) {
            // Realizar una solicitud para obtener información del usuario por correo electrónico
            axios.get(`${API_BASE_URL}directores/convenios/${labData?.instituto_id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                },
            })
                .then((response) => {
                    if (response.status === 200) {
                        const rawData = response.data.convenios;
                        const filteredData = rawData.filter(entry => entry.estado === true);
                        if (filteredData[0]?.convenio_id) {
                            setconvenio_id(true);
                        } else {
                            setconvenio_id(null);
                        }

                        setLinesInves(filteredData);

                    }

                })
                .catch(
                    console.error()
                );
        }
    }, []);
    // Datos de ejemplo para la tabla


    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const rowsPerPage = 5;
    //const handleView = (userToEdit) => navigate('/view_responsable', { state: { userToEdit } });

    // Usuarios filtrados por la búsqueda
    const filteredUsers = linesInves.filter((user) =>
        user.entidad.toLowerCase().includes(searchQuery.toLowerCase())
    );
    // Usuarios paginados según la página actual
    const paginatedUsers = filteredUsers.slice(
        currentPage * rowsPerPage,
        currentPage * rowsPerPage + rowsPerPage
    );
    const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);

    const handleCancel = () => {
        navigate(-1);
    };

    const handleadd = () => {
        navigate('/add_covenios_insti', { state: { labData } });
    };
    const handleUpdateUser = (labData) => {
        navigate('/add_covenios_insti', { state: { labData } });
    };


    const deleteUser = async convenio_id => {
        const token = localStorage.getItem('token');

        try {
            const response = await axios.delete(`${API_BASE_URL}directores/convenios/eliminar/${convenio_id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });


            if (response.status === 200) {
                const updatedUsers = linesInves.filter(user => user.convenio_id !== convenio_id);
                setLinesInves(updatedUsers);
                setconvenio_id(null);
            } else {
                console.error('Error en la respuesta de la API:', response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleOpenDialog = (convenio_id) => {
        setuserToDelete(convenio_id);
        setOpenDialog(true);
    };


    const handleCloseDialog = () => {
        setOpenDialog(false);
        setuserToDelete(null);
    };

    const confirmDelete = () => {
        deleteUser(userToDelete);
        handleCloseDialog();
    };

    // Renderizar el componente FuntionInsti    
    return (

        <Container maxWidth="xl" sx={{ minHeight: '80vh', paddingTop: '5%', paddingBottom: '5%', maxWidth: '90%' }}>
            <Paper elevation={3} sx={{ padding: 3, width: '100%' }}>

                {/* Encabezado */}
                <Box sx={{ alignItems: 'center', mb: 1 }}>
                    <IconButton aria-label="back" onClick={handleCancel} sx={{ color: '#64001D', fontWeight: 'bold' }}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h4" align="center" gutterBottom sx={{ textAlign: 'center', color: '#64001D', fontWeight: 'bold' }}>
                        Convenios
                    </Typography>
                </Box>

                {/* Botones de Agregar y Buscar */}
                {/* {showPaper ? (</>):(</>)}*/}
                {showPaper ? (
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={10}>
                            <Button
                                variant="contained"
                                style={{ backgroundColor: '#64001D', color: '#FFFFFF' }}
                                onClick={() => handleadd()}
                            >
                                Añadir
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <TextField
                                label="Buscar"
                                variant="outlined"
                                margin="normal"
                                InputLabelProps={{ style: { color: '#64001D' } }}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </Grid>
                    </Grid>

                ) : (
                    <></>
                )}
                {/* Tabla de servicioses */}
                {convenio_id ? (
                    <TableContainer sx={{ maxHeight: '50vh', marginTop: 2 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '110%' }}>Nombre</TableCell>
                                    {showPaper ? (<TableCell sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '110%' }}>Accion</TableCell>) : (<></>)}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {paginatedUsers.map((user, index) => (
                                    <TableRow key={index}>
                                        <TableCell sx={{ textAlign: 'center', }}>{user.entidad}</TableCell>
                                        {showPaper ? (

                                            <TableCell sx={{ textAlign: 'center' }}>
                                                {/* Acciones: Editar y Eliminar */}
                                                <Grid container spacing={1} alignItems="center" justifyContent="center">
                                                    <Grid item xs={4}>
                                                        <IconButton
                                                            onClick={() => handleUpdateUser(user)}>
                                                            <BuildIcon color="action" />
                                                        </IconButton>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <IconButton
                                                            onClick={() => handleOpenDialog(user.convenio_id)}>
                                                            <DeleteIcon color="error" />
                                                        </IconButton>
                                                    </Grid>
                                                </Grid>
                                            </TableCell>

                                        ) : (<></>)}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <Grid container spacing={2} justifyContent="center" sx={{ marginTop: 2 }}>
                        <h1 sx={{ textAlign: 'center' }}>LA INFORMACIÓN ESTARÁ DISPONIBLE PRÓXIMAMENTE</h1>
                    </Grid>
                )}
                {/* Paginación */}
                <Grid container spacing={2} justifyContent="center" sx={{ marginTop: 2 }}>
                    {[...Array(totalPages)].map((_, index) => (
                        <Grid item key={index}>
                            <Button
                                variant={currentPage === index ? 'contained' : 'outlined'}
                                onClick={() => setCurrentPage(index)}
                                sx={{ mx: 0.5 }}
                            >
                                {index + 1}
                            </Button>
                        </Grid>
                    ))}
                </Grid>
            </Paper>

            {/* Cuadro de diálogo de confirmación de eliminación */}
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Confirmación de Eliminación"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        ¿Estás seguro de que quieres eliminar esta Convenio?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {/* Botones de Cancelar y Eliminar */}
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={confirmDelete} color="primary" autoFocus>
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}


export default FuntionInsti;
