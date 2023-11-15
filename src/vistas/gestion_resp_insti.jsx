import React, { useState, useEffect } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Button,
    Grid,
    IconButton
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../js/config';

function ListaLab() {
    const [Rol, setLab] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchLab = async () => {
            try {
                const token = localStorage.getItem('token');

                if (!token) {
                    console.error('Token de autenticación no encontrado en el localStorage.');
                    return;
                }

                const response = await axios.get(`${API_BASE_URL}institutos`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                    },
                });

                if (response.status === 200) {

                    const rawData = response.data.institutos;
                    const filteredData = rawData.filter(entry => entry.estado === true);


                    setLab(filteredData);
                } else {
                    console.error('Error en la respuesta de la API:', response.status);
                }
                //  window.location.reload();
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchLab();
    }, []);

    const handleModificarInfo = (labToEdit) => {
        navigate('/update_resp_lab', { state: { labToEdit } });
    };
    const handleVerInfo = (userToEdit) => {
        navigate('/info_laboratorio', { state: { userToEdit } });
    };

    const filteredUsers = Rol.filter((user) =>
        user.nombre.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const paginatedUsers = filteredUsers.slice(
        currentPage * rowsPerPage,
        currentPage * rowsPerPage + rowsPerPage
    );

    const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);

    const handleDeleteInfo = async userId => {
        const token = localStorage.getItem('token');

        try {
            const response = await axios.delete(`${API_BASE_URL}registroLaboratorio/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                const updatedUsers = users.filter(user => user.registro_id !== userId);
                fetchLab();
            } else {
                console.error('Error en la respuesta de la API:', response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleCompleteInfo = (labToEdit) => {
        navigate('/view_director', { state: { labToEdit } });
    };
    return (
        <Container maxWidth="xl" sx={{ minHeight: '50vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: '5%', }}>
            <Paper elevation={3} sx={{ p: 2, width: '100%' }}>
                <Typography variant="h4" align="left" gutterBottom sx={{ color: '#64001D', fontWeight: 'bold' }}>
                    Asignar Director
                </Typography>

                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={9} md={10}>
                        <Button
                            component={Link}
                            to="/add_insti"
                            variant="contained"
                            style={{ backgroundColor: '#64001D', color: '#FFFFFF' }}
                        >
                            Agregar
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={3} md={2}>
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

                <TableContainer style={{ maxHeight: '50vh' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '100%', Width: '30%' }}>id</TableCell>
                                <TableCell sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '100%', Width: '30%' }}>Nombre de Instituto</TableCell>
                                <TableCell sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '100%', Width: '40%' }}>Director</TableCell>
                                <TableCell sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '100%', Width: '40%' }}>Acción</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedUsers.map((user, index) => (
                                <TableRow key={index}>
                                    <TableCell sx={{ textAlign: 'center' }}>{user.instituto_id}</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>{user.nombre}</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>{user.director.nombre}</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>
                                        <Grid container alignItems="center" justifyContent="center">
                                            <Grid item xs={12} sm={4}>
                                                <IconButton
                                                    style={{ backgroundColor: '#64001D', color: '#FFFFFF' }}
                                                    onClick={() => handleVerInfo(user)}
                                                >
                                                    <VisibilityIcon />
                                                </IconButton>
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                                <Button
                                                    variant="contained"
                                                    style={{ backgroundColor: '#64001D', color: '#FFFFFF' }}
                                                    onClick={() => handleModificarInfo(user)}
                                                >
                                                    Modificar
                                                </Button>
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                                <Button
                                                    variant="contained"
                                                    style={{ backgroundColor: '#64001D', color: '#FFFFFF' }}
                                                    onClick={() => handleDeleteInfo(user.registro_id)}
                                                >
                                                    Eliminar
                                                </Button>
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                                <Button
                                                    variant="contained"
                                                    style={{ backgroundColor: '#64001D', color: '#FFFFFF' }}
                                                    onClick={() => handleCompleteInfo(user)}
                                                >
                                                    Completar
                                                </Button>
                                            </Grid>

                                        </Grid>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
                    {[...Array(totalPages)].map((_, index) => (
                        <Button
                            key={index}
                            variant={currentPage === index ? 'contained' : 'outlined'}
                            onClick={() => setCurrentPage(index)}
                            style={{ margin: '0 5px' }}
                        >
                            {index + 1}
                        </Button>
                    ))}
                </div>
            </Paper>
        </Container>

    );
}

export default ListaLab;
