import React, { useState, useEffect } from 'react';
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
  Switch,
} from '@mui/material';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../js/config';

function ResArea() {
  const [area, setArea] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [areaPerPage] = useState(5);
  const [showInactive, setShowInactive] = useState(false);
  const navigate = useNavigate();

  const [hasReloaded, setHasReloaded] = useState(false);
  
  useEffect(() => {
    const fetchArea = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          console.error('Token de autenticación no encontrado en el localStorage.');
          return;
        }

        const response = await axios.get(`${API_BASE_URL}areas`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        });

        if (response.status === 200) {
          const data = response.data;
          const activearea = data['areas'].filter(area => area.estado === true);

          setArea(activearea);
        } else {
          console.error('Error en la respuesta de la API:', response.status);
        }
        //  window.location.reload();
      } catch (error) {
        console.error('Error:', error);
      }
    };

    // Llama a la función para obtener los usuarios
    fetchArea();
  }, []);

  const handleToggleInactive = () => {
    setShowInactive((prevState) => !prevState);
  };
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  const add_management = (option) => {
    // Redirige a la página de edición de usuario
   
    navigate('/add_management', { state: { option } });

  };
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleUpdateArea = (datos) => {
    let option = 2;
    navigate('/updateManagement', { state: { datos,option } });
  };
  const deleteArea = (AreaId) => {
    // Realiza la solicitud para eliminar el usuario por su ID
    const token = localStorage.getItem('token');
    axios.delete(`${API_BASE_URL}areas/${AreaId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          // Eliminación exitosa, actualiza el estado para reflejar los cambios
          window.location.reload();
        } else {
          console.error('Error en la respuesta de la API:', response.status);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  const indexOfLastArea = currentPage * areaPerPage;
  const indexOfFirstArea = indexOfLastArea - areaPerPage;
  const currentArea = area.slice(indexOfFirstArea, indexOfLastArea);

  return (
    <Container
      className='fondo'
      maxWidth="lg"
      sx={{
        minHeight: '80vh',
        paddingTop:'10%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'top',
        alignItems: 'top',
        
      }}
    >
      <Paper
        elevation={3}
        style={{ padding: '20px', width: '100%', overflowY: 'auto', maxHeight: '70vh' }}

      >
        <Typography
          variant="h4"
          align="left"
          gutterBottom
          style={{ color: '#64001D', fontWeight: 'bold' }}
        >
          Áreas
        </Typography>

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={10}>
            <Button
              variant="contained"
              style={{ backgroundColor: '#64001D', color: '#FFFFFF' }}
              onClick={() => add_management(2)}
            >
              Agregar Área
            </Button>
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              label="Buscar Área"
              variant="outlined"
              margin="normal"
              InputLabelProps={{ style: { color: '#64001D' } }}
              value={searchQuery}
              onChange={handleSearch}
            />
          </Grid>
        </Grid>

        <TableContainer style={{ maxHeight: '50vh' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '110%' }}>ID</TableCell>
                <TableCell sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '110%' }}>Nombre</TableCell>
                <TableCell sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '110%',width:'60%' }}>Actividad</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentArea
                .filter((area) =>
                  area.nombre.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((area, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ textAlign: 'center' }}>{area.laboratorio_id}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{area.nombre}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Grid container spacing={1} alignItems="center">
                        <Grid item xs={6} sm={6} alignItems="center">
                          <Button
                            variant="contained"
                            fullWidth
                            style={{ backgroundColor: '#64001D', color: '#FFFFFF' }}
                            onClick={() => handleUpdateArea(area)}
                          >
                            Modificar
                          </Button>
                        </Grid>
                        <Grid item xs={6} sm={6} alignItems="center">
                          <Button
                            variant="contained"
                            fullWidth
                            style={{ backgroundColor: '#64001D', color: '#FFFFFF' }}
                            onClick={() => deleteArea(area.area_id)}
                          >
                            Eliminar
                          </Button>
                        </Grid>
                       
                      </Grid>
                    </TableCell>

                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* Paginación */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          {Array.from({ length: Math.ceil(area.length / areaPerPage) }).map((_, index) => (
            <Button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              variant={currentPage === index + 1 ? 'contained' : 'outlined'}
              style={{ margin: '5px' }}
            >
              {index + 1}
            </Button>
          ))}
        </div>

      </Paper>
    </Container>
  );
}

export default ResArea;
