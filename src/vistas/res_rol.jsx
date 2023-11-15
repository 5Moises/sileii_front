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

function ResRol() {
  const [Rol, setRol] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [RolPerPage] = useState(5);
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

        const response = await axios.get(`${API_BASE_URL}roles`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        });

        if (response.status === 200) {
          const data = response.data;
          const activeRoles = data['roles'].filter(rol => rol.estado === true);

          setRol(activeRoles);
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

  const handleUpdateRol = (datos) => {
    let option = 4;
    // Redirige a la página de edición del rol con el Rol seleccionado
    navigate('/updateManagement', { state: { datos,option } });
  };
  /*const handleUpdateRol = (RolToEdit) => {
    // Redirige a la página de edición de usuario
    const email_local = localStorage.getItem('email');
    if (email_local === RolToEdit.email) {
      localStorage.setItem('id_Rol_l', RolToEdit.id);
    }
    navigate('/UpdateRol', { state: { RolToEdit } });

  };*/


  const deleteRol = (RolId) => {
    // Realiza la solicitud para eliminar el usuario por su ID
    const token = localStorage.getItem('token');
    axios.delete(`${API_BASE_URL}roles/${RolId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          // Eliminación exitosa, actualiza el estado para reflejar los cambios
          const updatedRol = Rol.filter(Rol => Rol.rol_id !== RolId);
          setRol(updatedRol);
        } else {
          console.error('Error en la respuesta de la API:', response.status);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const indexOfLastRol = currentPage * RolPerPage;
  const indexOfFirstRol = indexOfLastRol - RolPerPage;
  const currentRol = Rol.slice(indexOfFirstRol, indexOfLastRol);

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
          Roles
        </Typography>

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={10}>
            <Button
              variant="contained"
              style={{ backgroundColor: '#64001D', color: '#FFFFFF' }}
              onClick={() => add_management(4)}
            >
              Agregar
            </Button>
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              label="Buscar Rol"
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
                <TableCell sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '110%',width: '10%' }}>ID</TableCell>
                <TableCell sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '110%',width: '60%' }}>Rol</TableCell>
                <TableCell sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '110%',width: '30%' }}>Actividad</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentRol
                .filter((Rol) =>
                  Rol.nombre.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((Rol, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ textAlign: 'center' }}>{Rol.rol_id}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{Rol.nombre}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={6} sm={4}>
                          <Button
                            variant="contained"
                            fullWidth
                            style={{ backgroundColor: '#64001D', color: '#FFFFFF' }}
                            onClick={() => handleUpdateRol(Rol)}
                          >
                            Modificar
                          </Button>
                        </Grid>
                        <Grid item xs={6} sm={4}>
                          <Button
                            variant="contained"
                            fullWidth
                            style={{ backgroundColor: '#64001D', color: '#FFFFFF' }}
                            onClick={() => deleteRol(Rol.rol_id)}
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
          {Array.from({ length: Math.ceil(Rol.length / RolPerPage) }).map((_, index) => (
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

export default ResRol;
