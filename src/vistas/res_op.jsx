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

/**
 * Componente ResUsers para gestionar la visualización y acciones sobre usuarios.
 */
function ResUsers() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;  // Convertido a constante ya que no se modifica
  const [showInactive, setShowInactive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('Token de autenticación no encontrado en el localStorage.');
        return;
      }

      try {
        const response = await axios.get(`${API_BASE_URL}usuarios`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        });

        if (response.status === 200) {
          const updatedUsers = response.data.usuarios.filter(user => user.rol_id===3 && user.estado===true);
          setUsers(updatedUsers);
        } else {
          console.error('Error en la respuesta de la API:', response.status);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleToggleInactive = () => setShowInactive(prevState => !prevState);

  const handleSearch = e => setSearchQuery(e.target.value);

  const handleUpdateUser = userToEdit => {
    const email_local = localStorage.getItem('correo');
    if (email_local === userToEdit.correo) {
      localStorage.setItem('id_user_l', userToEdit.usuario_id);
    }
    navigate('/UpdateUser', { state: { userToEdit } });
  };

  const deleteUser = async userId => {
    const token = localStorage.getItem('token');

    try {
      const response = await axios.delete(`${API_BASE_URL}usuarios/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const updatedUsers = users.filter(user => user.usuario_id !== userId);
        setUsers(updatedUsers);
      } else {
        console.error('Error en la respuesta de la API:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handlePageChange = pageNumber => setCurrentPage(pageNumber);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const add_users = (option) => {
    // Redirige a la página de edición de usuario
   
    navigate('/AddUser', { state: { option } });

  };

  return (
    <Container
      className='fondo'
      maxWidth="lg"
      sx={{
        paddingTop: '5%',
        minHeight: '80vh',
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
          sx={{
            color: '#64001D',
            fontWeight: 'bold',
            
          }}
        >
          Gestión de Operadores
        </Typography>

        <Grid container spacing={2} alignItems="center">

          <Grid item xs={12} sm={9} md={10}>
            <Button
             
              onClick={() => add_users(2)}
              variant="contained"
              style={{ backgroundColor: '#64001D', color: '#FFFFFF' }}
            >
              Agregar Operadores
            </Button>
          </Grid>
          <Grid item xs={12} sm={3} md={2}>
            <TextField
              label="Buscar Operadores"
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
                <TableCell sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '110%' }}>Código de Operadores</TableCell>
                <TableCell sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '110%' }}>Nombre y Apellidos</TableCell>
                <TableCell sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '110%' }}>Rol</TableCell>
                <TableCell sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '110%' }}>Correo Institucional</TableCell>
                <TableCell sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '110%' }}>Actividad</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentUsers
                .filter((user) =>
                  user.correo.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((user, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ textAlign: 'center' }}>{user.usuario_id}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{user.nombre} {user.apellido_paterno} {user.apellido_materno}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>  {user.rol_id === 1 ? 'Administrador' : user.rol_id === 3 ? 'Operador' : user.rol_id === 2 ? 'Coordinador' : 'Desconocido'}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{user.correo}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Grid container spacing={1} alignItems="center" justifyContent="center">
                        <Grid item xs={12} sm={4}>
                          <Button
                            variant="contained"
                            fullWidth
                            style={{ backgroundColor: '#64001D', color: '#FFFFFF' }}
                            onClick={() => handleUpdateUser(user)}
                          >
                            Modificar
                          </Button>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Button
                            variant="contained"
                            fullWidth
                            style={{ backgroundColor: '#64001D', color: '#FFFFFF' }}
                            onClick={() => deleteUser(user.usuario_id)}
                          >
                            Eliminar
                          </Button>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Switch
                            checked={user.estado}
                            onChange={handleToggleInactive}
                            color="primary"
                          />
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
          {Array.from({ length: Math.ceil(users.length / usersPerPage) }).map((_, index) => (
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

export default ResUsers;
