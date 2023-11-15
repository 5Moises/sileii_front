import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
    Container, Paper, Typography, TextField, Table, TableContainer,
    TableHead, TableBody, TableRow, TableCell, Button, Grid, IconButton
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../js/config';

/**
 * Componente ListaLab - Muestra una lista de laboratorios relacionados con un usuario.
 */
function ListaLab() {
    const [Rol, setLab] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const navigate = useNavigate();
    const [users, setUsers] = useState({ nombreusuario: '', rol: 0, id_user: 0 });

    useEffect(() => {
        const token = localStorage.getItem('token');
        const email_local = localStorage.getItem('correo');

        if (!token) {
            console.error('Token de autenticación no encontrado en el localStorage.');
            return;
        }

        // Buscar al usuario por correo
        if (email_local) {
            axios.get(`${API_BASE_URL}usuarios/getAllByEmail/${email_local}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                },
            })
                .then((response) => {
                    if (response.status === 200) {
                        const userData = response.data.usuarios[0];
                        setUsers({
                            nombreusuario: userData.correo,
                            rol: userData.rol.rol_id,
                            id_user: userData.usuario_id
                        });

                        // Una vez que obtenemos el id del usuario, hacemos la solicitud para obtener sus laboratorios.
                        fetchUserLabs(userData.usuario_id, token);
                    }
                })
                .catch(console.error);
        }
    }, []);

    /**
     * Fetch the labs for a specific user by their ID.
     * 
     * @param {number} userId - The ID of the user.
     * @param {string} token - Authentication token.
     */
    const fetchUserLabs = async (userId, token) => {
        try {
            const response = await axios.get(`${API_BASE_URL}registroLaboratorio/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                },
            });

            if (response.status === 200) {
                const filteredData = response.data.coordLabs.filter(entry => entry.estado === true);
                const transformedData = filteredData.map(entry => ({                
                    laboratorio: entry.laboratorio.nombre,
                    responsable: `${entry.coordinador.nombre} ${entry.coordinador.apellido_paterno} ${entry.coordinador.apellido_materno}`,
                    estado: entry.estado,
                    area: entry.area.nombre,
                    coordinador_id: entry.coordinador_id,
                    laboratorio_id: entry.laboratorio_id,
                    area_id: entry.area_id,
                    disciplina_id: entry.disciplina_id,
                    mision: entry.mision,
                    vision: entry.vision,
                    historia: entry.historia,
                    ubicacion: entry.ubicacion,
                    registro_id: entry.registro_id,
                    disciplina: entry.disciplina.nombre,
                    registro_id: entry.registro_id,

                }));

                setLab(transformedData);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const filteredUsers = Rol.filter(user => String(user.laboratorio_id).includes(searchQuery));
    const paginatedUsers = filteredUsers.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage);
    const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);

    const handleUpdateUser = (userToEdit) => navigate('/info_lab_op', { state: { userToEdit } });

    const handleCompleteLab = (userToEdit) => navigate('/complete_lab', { state: { userToEdit } });

    const handleOperador = (userToEdit) => navigate('/op_list', { state: { userToEdit } });






    return (
        <Container
            maxWidth="xl"
            sx={{
                minHeight: '50vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: '5%',
            }}
        >
            <Paper
                elevation={3}
                style={{ padding: '5px', width: '100%' }}
            >
                <Typography
                    variant="h4"
                    align="left"
                    gutterBottom
                    style={{ color: '#64001D', fontWeight: 'bold' }}
                >
                    Mis Laboratorios
                </Typography>

                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={10}></Grid>
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

                <TableContainer style={{ maxHeight: '50vh' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '110%', width:'37%' }}>Laboratorio</TableCell>
                                <TableCell sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '110%', width:'37%' }}>Responsable</TableCell>
                                <TableCell sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '110%' , width:'25%' }}>Actividad</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedUsers.map((user, index) => (
                                <TableRow key={index}>
                                    <TableCell sx={{ textAlign: 'center' }}>{user.laboratorio}</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>{user.responsable}</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>
                                        <Grid container spacing={3} alignItems="center" direction="row">
                                            <Grid item xs={12} sm={2}>
                                                <IconButton // Usar IconButton en lugar de Button
                                                    style={{ backgroundColor: '#64001D', color: '#FFFFFF' }}
                                                    onClick={() => handleUpdateUser(user)}
                                                >
                                                    <VisibilityIcon /> {/* Agregar el ícono de un ojo */}
                                                </IconButton>
                                            </Grid>
                                            <Grid item xs={12} sm={5}>
                                                <Button
                                                    variant="contained"
                                                    style={{ backgroundColor: '#64001D', color: '#FFFFFF' }}
                                                    onClick={() => handleCompleteLab(user)}
                                                >
                                                    completar
                                                </Button>
                                               
                                            </Grid>
                                            <Grid item xs={12} sm={5}>
                                                <Button
                                                    variant="contained"
                                                    style={{ backgroundColor: '#64001D', color: '#FFFFFF' }}
                                                    onClick={() => handleOperador(user)}                                                 
                                                >
                                                    Operador
                                                </Button>
                                               
                                            </Grid>
                                        </Grid>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {/* PAGINACIÓN DE LA TABLA */}
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
