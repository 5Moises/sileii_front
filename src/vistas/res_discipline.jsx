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

function ResLineas_de_investigacion() {
  const [lineas_de_investigacion, setLineas_de_investigacion] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [lineas_de_investigacionPerPage] = useState(5);
  const [showInactive, setShowInactive] = useState(false);
  const navigate = useNavigate();

  const [hasReloaded, setHasReloaded] = useState(false);
  
  useEffect(() => {
    const fetchLineas_de_investigacion = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          console.error('Token de autenticación no encontrado en el localStorage.');
          return;
        }

        const response = await axios.get(`${API_BASE_URL}disciplinas`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        });

        if (response.status === 200) {
          const data = response.data;
          const activelineas_de_investigacion = data['disciplinas'].filter(lineas_de_investigacion => lineas_de_investigacion.estado === true);

          setLineas_de_investigacion(activelineas_de_investigacion);
        } else {
          console.error('Error en la respuesta de la API:', response.status);
        }
        //  window.location.reload();
      } catch (error) {
        console.error('Error:', error);
      }
    };

    // Llama a la función para obtener los usuarios
    fetchLineas_de_investigacion();
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
  const handleUpdateLineas_de_investigacion = (datos) => {
    let option = 3;
    navigate('/updateManagement', { state: { datos,option } });
  };
  const deleteLineas_de_investigacion = (Lineas_de_investigacionId) => {
    // Realiza la solicitud para eliminar el usuario por su ID
    const token = localStorage.getItem('token');
    axios.delete(`${API_BASE_URL}disciplinas/${Lineas_de_investigacionId}`, {
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
  const indexOfLastLineas_de_investigacion = currentPage * lineas_de_investigacionPerPage;
  const indexOfFirstLineas_de_investigacion = indexOfLastLineas_de_investigacion - lineas_de_investigacionPerPage;
  const currentLineas_de_investigacion = lineas_de_investigacion.slice(indexOfFirstLineas_de_investigacion, indexOfLastLineas_de_investigacion);

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
          Lineas de Investigación
        </Typography>

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={10}>
            <Button
              variant="contained"
              style={{ backgroundColor: '#64001D', color: '#FFFFFF' }}
              onClick={() => add_management(3)}
            >
              Agregar Lineas de Investigación
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
              {currentLineas_de_investigacion
                .filter((lineas_de_investigacion) =>
                  lineas_de_investigacion.nombre.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((lineas_de_investigacion, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ textAlign: 'center' }}>{lineas_de_investigacion.laboratorio_id}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{lineas_de_investigacion.nombre}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Grid container spacing={1} alignItems="center">
                        <Grid item xs={6} sm={6} alignItems="center">
                          <Button
                            variant="contained"
                            fullWidth
                            style={{ backgroundColor: '#64001D', color: '#FFFFFF' }}
                            onClick={() => handleUpdateLineas_de_investigacion(lineas_de_investigacion)}
                          >
                            Modificar
                          </Button>
                        </Grid>
                        <Grid item xs={6} sm={6} alignItems="center">
                          <Button
                            variant="contained"
                            fullWidth
                            style={{ backgroundColor: '#64001D', color: '#FFFFFF' }}
                            onClick={() => deleteLineas_de_investigacion(lineas_de_investigacion.disciplina_id)}
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
          {Array.from({ length: Math.ceil(lineas_de_investigacion.length / lineas_de_investigacionPerPage) }).map((_, index) => (
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

export default ResLineas_de_investigacion;
