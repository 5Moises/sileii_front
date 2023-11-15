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

function ResLaboratory() {
  const [laboratory, setLaboratory] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [laboratoryPerPage] = useState(5);
  const [showInactive, setShowInactive] = useState(false);
  const navigate = useNavigate();

  const [hasReloaded, setHasReloaded] = useState(false);
  
  useEffect(() => {
    const fetchRol = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          console.error('Token de autenticación no encontrado en el localStorage.');
          return;
        }

        const response = await axios.get(`${API_BASE_URL}laboratorios`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        });

        if (response.status === 200) {
          const data = response.data;
          const activelaboratory = data['laboratorios'].filter(laboratory => laboratory.estado === true);

          setLaboratory(activelaboratory);
        } else {
          console.error('Error en la respuesta de la API:', response.status);
        }
        //  window.location.reload();
      } catch (error) {
        console.error('Error:', error);
      }
    };

    // Llama a la función para obtener los usuarios
    fetchRol();
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
  const handleUpdateLaboratory = (datos) => {
    let option = 1;
    navigate('/updateManagement', { state: { datos,option } });
  };
  const deleteLaboratory = (RolId) => {
    // Realiza la solicitud para eliminar el usuario por su ID
    const token = localStorage.getItem('token');
    axios.delete(`${API_BASE_URL}laboratorios/${RolId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          // Eliminación exitosa, actualiza el estado para reflejar los cambios
          const updatedRol = laboratory.filter(laboratory => laboratory.laboratorio_id !== RolId);
          setLaboratory(updatedRol);
        } else {
          console.error('Error en la respuesta de la API:', response.status);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  const indexOfLastLaboratory = currentPage * laboratoryPerPage;
  const indexOfFirstLaboratory = indexOfLastLaboratory - laboratoryPerPage;
  const currentLaboratory = laboratory.slice(indexOfFirstLaboratory, indexOfLastLaboratory);

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
          Laboratorios
        </Typography>

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={10}>
            <Button
              variant="contained"
              style={{ backgroundColor: '#64001D', color: '#FFFFFF' }}
              onClick={() => add_management(1)}
            >
              Agregar
            </Button>
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              label="Buscar Laboratorio"
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
              {currentLaboratory
                .filter((laboratory) =>
                  laboratory.nombre.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((laboratory, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ textAlign: 'center' }}>{laboratory.laboratorio_id}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{laboratory.nombre}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Grid container spacing={1} alignItems="center">
                        <Grid item xs={6} sm={6} alignItems="center">
                          <Button
                            variant="contained"
                            fullWidth
                            style={{ backgroundColor: '#64001D', color: '#FFFFFF' }}
                            onClick={() => handleUpdateLaboratory(laboratory)}
                          >
                            Modificar
                          </Button>
                        </Grid>
                        <Grid item xs={6} sm={6} alignItems="center">
                          <Button
                            variant="contained"
                            fullWidth
                            style={{ backgroundColor: '#64001D', color: '#FFFFFF' }}
                            onClick={() => deleteLaboratory(laboratory.laboratorio_id)}
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
          {Array.from({ length: Math.ceil(laboratory.length / laboratoryPerPage) }).map((_, index) => (
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

export default ResLaboratory;
