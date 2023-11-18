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


function ListaLab() {
    const navigate = useNavigate();
    const location = useLocation();
    const labData = location.state?.labData;
    const [showInactive, setShowInactive] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    //const [linesInves, setLinesInves] = useState([]);

    const [showPaper, setShowPaper] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            setShowPaper(true);
        } else {
            setShowPaper(false);
        }

    }, []);

    const [linesInves, setLinesInves] = useState([
        { id: 1, documento: 'Bioquímica.pdf', nombre: 'Estudio de proteínas' },
        { id: 2, documento: 'Física.pdf', nombre: 'Mecánica cuántica' },
        { id: 3, documento: 'Matemáticas.pdf', nombre: 'Álgebra lineal avanzada' },
        { id: 4, documento: 'Medicina.pdf', nombre: 'Investigación genómica' },
        { id: 5, documento: 'Química.pdf', nombre: 'Estudio de moléculas orgánicas' },
        { id: 6, documento: 'Ingeniería.pdf', nombre: 'Robótica avanzada' },
    ]);

    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const rowsPerPage = 5;
    //const handleView = (userToEdit) => navigate('/view_responsable', { state: { userToEdit } });


    const filteredUsers = linesInves.filter((user) =>
        user.nombre.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const paginatedUsers = filteredUsers.slice(
        currentPage * rowsPerPage,
        currentPage * rowsPerPage + rowsPerPage
    );
    const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);

    const handleCancel = () => {
        navigate(-1);
    };

    const handleadd = () => {
        navigate('/add_posted', { state: { labData } });
    };

    const handleOpenDialog = (userId) => {
        //setuserToDelete(userId);
        setOpenDialog(true);
    };


    const handleCloseDialog = () => {
        setOpenDialog(false);
        //setuserToDelete(null);
    };

    const confirmDelete = () => {
        //deleteUser(userToDelete);
        handleCloseDialog();
    };
    return (
        <Container maxWidth="xl" sx={{ minHeight: '80vh', paddingTop: '5%', paddingBottom: '5%' }}>
            <Paper elevation={3} sx={{ padding: 3, width: '100%' }}>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <IconButton aria-label="back" onClick={handleCancel} sx={{ color: '#64001D', fontWeight: 'bold' }}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h4" align="left" gutterBottom sx={{ color: '#64001D', fontWeight: 'bold' }}>
                       Publicaciones
                    </Typography>
                </Box>

                {/* {showPaper ? (</>):(</>)}*/}
                {showPaper ? (
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={10}>
                            <Button
                                variant="contained"
                                style={{ backgroundColor: '#64001D', color: '#FFFFFF' }}
                                onClick={() => handleadd()}
                            >
                                Agregar
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
                    <Grid container spacing={2} alignItems="center">

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
                )}

                <TableContainer sx={{ maxHeight: '50vh', marginTop: 2 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '110%' }}>Nombre</TableCell>
                                {showPaper ? (<TableCell sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '110%' }}>Acciones</TableCell>) : (<></>)}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedUsers.map((user, index) => (
                                <TableRow key={index}>
                                    <TableCell sx={{ textAlign: 'center', }}>{user.nombre}</TableCell>
                                    {showPaper ? (

                                        <TableCell sx={{ textAlign: 'center' }}>
                                            <Grid container spacing={1} alignItems="center" justifyContent="center">
                                                <Grid item xs={4}>
                                                    <IconButton
                                                        onClick={() => handleUpdateUser(user)}>
                                                        <BuildIcon color="action" />
                                                    </IconButton>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <IconButton
                                                        onClick={() => handleOpenDialog(user.usuario_id)}>
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
                        ¿Estás seguro de que quieres eliminar esta Publicación?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
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

export default ListaLab;
