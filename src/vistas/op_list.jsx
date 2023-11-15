import React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, Table, TableBody, TableCell, TableRow, TextField, IconButton,TableHead  } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

function SelectorOperador() {
  const navigate = useNavigate();

  const handleRedirect = () => navigate('/op_listaLab');


  return (
    <Dialog open={true} fullWidth maxWidth="sm">
      <DialogTitle>
        Seleccionar Operador
        <IconButton
          style={{ position: 'absolute', right: 10, top: 10 }}
          size="small"
          onClick={handleRedirect}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
          <TextField
            fullWidth
            variant="outlined"
            label="Operador"
            size="small"
            style={{ marginRight: 10 }}
            InputProps={{
              endAdornment: <SearchIcon color="action" />
            }}
          />
          <Button variant="contained" color="primary">Agregar Operador</Button>
        </div>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '110%' }}>Laboratorio</TableCell>
              <TableCell sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '110%' }}>Nombres y Apellido</TableCell>
              <TableCell sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '110%' }}>Actividad</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>           
            <TableRow>
              <TableCell>Laboratorio</TableCell>
              <TableCell>Nombres y Apellido</TableCell>
              <TableCell>
                <Button variant="outlined" color="secondary">Eliminar</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
}

export default SelectorOperador;
