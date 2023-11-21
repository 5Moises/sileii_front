import React, { useState, useEffect } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
    Container, Paper, Typography, TextField, Table, TableContainer,
    TableHead, TableBody, TableRow, TableCell, Button, Grid, IconButton
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../js/config';

function ListaLab() {
    const navigate = useNavigate();
    //const [linesInves, setLinesInves] = useState([]);
    const location = useLocation();
    const labData = location.state?.userToEdit;


    const [linesInves, setLinesInves] = useState([]);

    useEffect(() => {
        const fetchLab = async () => {
            try {
                // Aquí se añade await para esperar la respuesta de la petición
                const response = await axios.get(`${API_BASE_URL}invitado/proyectos/${labData.registro_id}`, {
                    headers: {
                        'Accept': 'application/json',
                    },
                });

                console.log(response.status); // Ahora esto debería mostrar el código de estado HTTP

                if (response.status === 200) {
                    const filteredDocs = response.data.proyectos.filter(doc => doc.estado === true);
                    setLinesInves(filteredDocs);
                } else {
                    console.error('Error en la respuesta de la API:', response.status);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchLab();
    }, [labData.registro_id]); // Asegúrate de incluir todas las dependencias necesarias aquí

    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const rowsPerPage = 5;
    const handleInfo = (userToEdit) => navigate('/info_proyecto', { state: { userToEdit } });


    const filteredUsers = linesInves.filter((user) =>
        user.nombre_proyecto.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const paginatedUsers = filteredUsers.slice(
        currentPage * rowsPerPage,
        currentPage * rowsPerPage + rowsPerPage
    );
    const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
    return (
        <Container maxWidth="xl" sx={{ minHeight: '80vh', paddingTop: '5%', paddingBottom: '5%' }}>
            <Paper elevation={3} sx={{ padding: 3, width: '100%' }}>
                <Typography variant="h4" align="left" gutterBottom sx={{ color: '#64001D', fontWeight: 'bold' }}>
                    Proyectos de Investigación
                </Typography>

                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={10}>
                        <TextField
                            label="Buscar"
                            variant="outlined"
                            InputLabelProps={{ style: { color: '#64001D', width: '100%' } }}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </Grid>
                </Grid>

                <TableContainer sx={{ maxHeight: '50vh', marginTop: 2 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '110%' }}>ID</TableCell>
                                <TableCell sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '110%' }}>Nombre Proyecto</TableCell>
                                <TableCell sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '110%' }}>Etapa</TableCell>
                                <TableCell sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '110%' }}>Información</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedUsers.map((user, index) => (
                                <TableRow key={index}>
                                    <TableCell sx={{ textAlign: 'center' }}>{user.proyecto_id}</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>{user.nombre_proyecto}</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>EN PROCESO</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>
                                        <IconButton
                                            sx={{ backgroundColor: '#64001D', color: '#FFFFFF' }}
                                            onClick={() => handleInfo(user)}
                                        >
                                            <VisibilityIcon />
                                        </IconButton>
                                    </TableCell>
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
        </Container>
    );
}

export default ListaLab;