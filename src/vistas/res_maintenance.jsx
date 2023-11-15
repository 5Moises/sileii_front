import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  Container, Paper, Typography, TextField, Table, TableContainer,
  TableHead, TableBody, TableRow, TableCell, Button, Grid, IconButton
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import edit from "../assets/iconos/edit.ico";
import delete_ico from "../assets/iconos/delete.ico";
import maintenance_ico from "../assets/iconos/maintenance.ico";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BuildIcon from '@mui/icons-material/Build';
import { API_BASE_URL } from '../js/config';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
function G_maintenances() {
  const location = useLocation();
  const [openDialog, setOpenDialog] = useState(false);
  const [maintenanceToDelete, setmaintenanceToDelete] = useState(null);
  const [Rol, setLab] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();
  const labData = location.state?.labData;

  const [maintenance, setMaintenance] = useState([]);




  useEffect(() => {
    const fetchLab = async () => {
      try {
        const token = localStorage.getItem('token');

        // Aquí se añade await para esperar la respuesta de la petición
        const response = await axios.get(`${API_BASE_URL}solicitudes`, {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,

          },
        });

        if (response.status === 200) {
          const filteredDocs = response.data.solicitudes.filter(doc => doc.estado === true);
          setMaintenance(filteredDocs);
        } else {
          console.error('Error en la respuesta de la API:', response.status);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchLab();
  }, []);




  const filteredItems = maintenance.filter(doc => String(doc.maintenanceo_id).includes(searchQuery));

  const paginatedItems = filteredItems.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage);
  const totalPages = Math.ceil(filteredItems.length / rowsPerPage);



  const handleMaintenance = (userToEdit) => navigate('/view_maintenance', { state: { userToEdit } });




  const handleOpenDialog = (maintenanceId) => {
    setmaintenanceToDelete(maintenanceId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setmaintenanceToDelete(null);
  };

  const confirmDelete = () => {
    handleDeleteInfo(maintenanceToDelete);
    handleCloseDialog();
  };
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
          Solicitudes de Mantenimiento
        </Typography>


        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={10}>

          </Grid>
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
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '110%' }}>Nombre</TableCell>
                <TableCell sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '110%' }}>Estado</TableCell>
                <TableCell sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '110%', whiteSpace: 'normal', wordWrap: 'break-word',width:'50%' }}>Detalle</TableCell>
                <TableCell sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '110%' }}>Acción</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedItems.map((maintenance, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ textAlign: 'center' }}>{maintenance.equipo.nombre}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{maintenance.etapa}</TableCell>
                  <TableCell sx={{
                    textAlign: 'center',
                    whiteSpace: 'normal',
                    wordBreak: 'break-word',
                    overflowWrap: 'break-word'
                  }}>
                    {maintenance.detalle}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    <Grid container spacing={1} alignItems="center" justifyContent="center">
                      <Grid item xs={4}>
                        <IconButton onClick={() => handleMaintenance(maintenance)}>
                          <BuildIcon color="action" />
                        </IconButton>
                      </Grid>
                      <Grid item xs={4}>
                        <IconButton onClick={() => handleOpenDialog(maintenance.solicitud_id)}>
                          <DeleteIcon color="error" />
                        </IconButton>
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
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirmación de Eliminación"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Estás seguro de que quieres eliminar este Mantenimiento?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={confirmDelete} color="primary" autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>

  );

}

export default G_maintenances;
