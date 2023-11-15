import React, { useState, useEffect } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
    Container, Paper, Typography, TextField, Table, TableContainer,
    TableHead, TableBody, TableRow, TableCell, Button, Grid, IconButton
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ListaLab() {
    const navigate = useNavigate();
    //const [linesInves, setLinesInves] = useState([]);


    
    const [linesInves, setLinesInves] = useState([
        { id: 1, laboratorio: 'Bioquímica', nombre: 'Estudio de proteínas' },
        { id: 2, laboratorio: 'Física', nombre: 'Mecánica cuántica' },
        { id: 3, laboratorio: 'Matemáticas', nombre: 'Álgebra lineal avanzada' },
        { id: 4, laboratorio: 'Medicina', nombre: 'Investigación genómica' },
        { id: 5, laboratorio: 'Química', nombre: 'Estudio de moléculas orgánicas' },
        { id: 6, laboratorio: 'Ingeniería', nombre: 'Robótica avanzada' },
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
    return (
        <Container maxWidth="xl" sx={{ minHeight: '80vh', paddingTop: '5%', paddingBottom: '5%' }}>
            <Paper elevation={3} sx={{ padding: 3, width: '100%' }}>
                <Typography variant="h4" align="left" gutterBottom sx={{ color: '#64001D', fontWeight: 'bold' }}>
                    Lineas de Investigación
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
                                <TableCell sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '110%' }}>Linea de Investigación</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedUsers.map((user, index) => (
                                <TableRow key={index}>
                                    <TableCell sx={{ textAlign: 'center' }}>{user.id}</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>{user.nombre}</TableCell>
                                   
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
