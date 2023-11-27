import React, { useRef, useState } from 'react';
import axios from 'axios';
import { Grid, TextField, Button, InputAdornment, IconButton, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../js/config';

function ProyectForm() {
  const location = useLocation();
  const labData = location.state?.userToEdit;
  const [fileName, setFileName] = useState(labData?.nombre_documento || "");  // Inicializa fileName con el valor de labData.nombre_documento
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef();
  const [nombreProyecto, setNombreProyecto] = useState(labData?.nombre_proyecto || "");
  const [investigador, setInvestigador] = useState(labData?.investigador_principal || "");
  const [coinvestigadores, setCoinvestigadores] = useState(labData?.coinvestigadores || "");
  const [doi, setDOI] = useState(labData?.doi || "");
  const [resumen, setResumen] = useState(labData?.resumen || "");
  const [iba, setIBA] = useState(labData?.iba || "");
  const [etapa, setetapa] = useState(labData?.etapa || "");

  const navigate = useNavigate(); // Hook para la navegación

  const handleFileNameChange = (e) => {
    setFileName(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setFileName(file.name);
  };
  const handleNombreProyectoChange = (e) => {
    setNombreProyecto(e.target.value);
  };

  const handleInvestigadorChange = (e) => {
    setInvestigador(e.target.value);
  };

  const handleCoinvestigadoresChange = (e) => {
    setCoinvestigadores(e.target.value);
  };

  const handleDOIChange = (e) => {
    setDOI(e.target.value);
  };

  const handleResumenChange = (e) => {
    setResumen(e.target.value);
  };

  const handleIBAChange = (e) => {
    setIBA(e.target.value);
  };

  const subirArchivo = async () => {
    try {
      const file = selectedFile;
      const formData = new FormData();

      formData.append("nombre_imagen", fileName);
      formData.append("nombre_proyecto", nombreProyecto);
      formData.append("investigador_principal", investigador);
      formData.append("coinvestigadores", coinvestigadores);
      formData.append("doi", doi);
      formData.append("resumen", resumen);
      formData.append("iba", iba);
      formData.append("imagen_referencial", file);
      formData.append("etapa", etapa);


      if (!labData || labData.registro_id === undefined) {
        console.error('registro_id no está definido.');
        return;
      }
      formData.append('registro_id', labData.registro_id);

      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token de autenticación no encontrado en el localStorage.');
        return;
      }

      const config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      };

      let response;

      if (labData.proyecto_id) {
        console.log(labData.proyecto_id)
        const apiUrl = `${API_BASE_URL}coordinador/proyectos/update/${labData.proyecto_id}`;
        // Si labData.nombre_documento tiene datos, realiza una solicitud PUT
        response = await axios.post(apiUrl, formData, config);
      } else {
        const apiUrl = `${API_BASE_URL}coordinador/proyectos`;
        // Si labData.nombre_documento no tiene datos, realiza una solicitud POST
        response = await axios.post(apiUrl, formData, config);
      }

      console.log('Response:', response.data);

      // Redirige al usuario después de una respuesta exitosa
      navigate('/ManageProyects', { state: { labData } });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const styles = {
    label: {
      color: '#555',
    },

    button: {
      backgroundColor: '#64001D',
      '&:hover': {
        backgroundColor: '#44001F',
      },
      color: '#fff',
      padding: '10px 30px',
    },
    fileInput: {
      display: 'none',
    },
    inputWithIcon: {
      paddingRight: 0,
    },
  };

  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };

  return (
    <form>
      <Grid container spacing={2} direction="row">
        <Grid item xs={6}>
          <TextField
            fullWidth
            name="nombreProyecto"
            label="Nombre"
            variant="outlined"
            size="small"
            margin="dense"
            InputLabelProps={{ style: styles.label }}
            style={styles.textField}
            value={nombreProyecto}
            onChange={handleNombreProyectoChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            name="imagenReferencial"
            label="Imagen de Equipos"
            variant="outlined"
            size="small"
            margin="dense"
            InputLabelProps={{ style: styles.label }}
            style={styles.textField}
            value={fileName || ' '}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" style={styles.inputWithIcon}>
                  <IconButton edge="end" onClick={triggerFileSelect}>
                    <AttachFileIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <input type="file" ref={fileInputRef} style={styles.fileInput} onChange={handleFileChange} />
        </Grid>
      </Grid>
      <Grid container spacing={2} direction="row">
        <Grid item xs={6}>
          <TextField
            fullWidth
            name="investigador"
            label="Investigador"
            variant="outlined"
            size="small"
            margin="dense"
            InputLabelProps={{ style: styles.label }}
            style={styles.textField}
            value={investigador}
            onChange={handleInvestigadorChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            name="doi"
            label="DOI"
            variant="outlined"
            size="small"
            margin="dense"
            InputLabelProps={{ style: styles.label }}
            style={styles.textField}
            value={doi}
            onChange={handleDOIChange}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} direction="row">
        <Grid item xs={6}>
          <TextField
            fullWidth
            name="coinvestigadores"
            label="Co-Investigadores"
            variant="outlined"
            size="small"
            margin="dense"
            InputLabelProps={{ style: styles.label }}
            style={styles.textField}
            value={coinvestigadores}
            onChange={handleCoinvestigadoresChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            name="resumen"
            label="Resumen"
            variant="outlined"
            size="small"
            margin="dense"
            InputLabelProps={{ style: styles.label }}
            style={styles.textField}
            value={resumen}
            onChange={handleResumenChange}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} direction="row">
        <Grid item xs={6}>
          <TextField
            fullWidth
            name="iba"
            label="IBA"
            variant="outlined"
            size="small"
            margin="dense"
            InputLabelProps={{ style: styles.label }}
            style={styles.textField}
            value={iba}
            onChange={handleIBAChange}
          />
        </Grid>
        <Grid item xs={6} sx={{ marginTop: '8px', }}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="demo-simple-select-label">
              Etapa
            </InputLabel>
            <Select
              name="Etapa"
              label="Etapa"
              size='small'
              value={etapa}
              margin="dense"
              labelId="demo-simple-select-label"
              onChange={(e) => setetapa(e.target.value)}
            >
              <MenuItem value={"Inicio"}>Inicio</MenuItem>
              <MenuItem value={"En Proceso"}>En Proceso</MenuItem>
              <MenuItem value={"Finalizado"}>Finalizado</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <br />
      <Button variant="contained" style={styles.button} onClick={subirArchivo}>
        Guardar
      </Button>
    </form>
  );
}

export default ProyectForm;
