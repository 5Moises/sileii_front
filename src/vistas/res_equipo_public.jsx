
import React, { useState, useEffect } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../js/config';
import { Box, Grid, Card, CardContent, CardMedia, Typography, IconButton } from '@mui/material';
import Escudo from "../assets/imagenes/login_back.png";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
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
                const response = await axios.get(`${API_BASE_URL}invitado/equipos/${labData.registro_id}`, {
                    headers: {
                        'Accept': 'application/json',
                    },
                });


                if (response.status === 200) {
                    const filteredDocs = response.data.equipos.filter(doc => doc.estado === true);
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
    const handleInfo = (userToEdit) => navigate('/info_equipo', { state: { userToEdit } });


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

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <IconButton aria-label="back" onClick={handleCancel}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h5" component="div" sx={{ ml: 2 }}>
                    Equipos de Laboratorio
                </Typography>
            </Box>
            <Grid container spacing={2}>
                {paginatedUsers.map((project, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index} onClick={() => handleInfo(project)}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                src={`${project.image_url}`}
                                alt={`${project.nombre}`}
                            />
                            <CardContent sx={{ textAlign: 'center' }}>
                                <Typography gutterBottom variant="h6" component="div">
                                    {project.nombre}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default ListaLab;
