import React, { useRef, useState } from 'react';
import axios from 'axios';
import { Grid, TextField, Button, InputAdornment, IconButton } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../js/config';

// Definir estilos para el componente
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
    paddingRight: 0
  },
};

// Función para formatear la fecha
function formatDate(dateString) {
  // Extrae solo la fecha (ignorando la hora)
  return dateString.split(' ')[0];
}

// Componente funcional EquipmentForm
function EquipmentForm() {
  // Obtener la ubicación y datos del laboratorio de la ubicación actual  
  const location = useLocation();
  const labData = location.state?.userToEdit;

  // Configurar la navegación  
  const navigate = useNavigate();
  // Referencia para el input de archivo
  const fileInputRef = useRef();
  // Función para obtener la fecha actual en formato YYYY-MM-DD  
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Los meses en JS van de 0 a 11, por lo que sumamos 1
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Estado para el formulario  
  const [formData, setFormData] = useState({
    fileName: labData?.nombre_imagen || "",
    selectedFile: null,
    nombreEquipmento: labData?.nombre || "",
    codigo_patrimonio: labData?.codigo_patrimonio || "",
    accesorios: labData?.accesorio || "",
    marca: labData?.marca_modelo || "",
    insumos: labData?.insumos || "",
    fecha_adquisicion: labData?.fecha_adquisicion ? formatDate(labData.fecha_adquisicion) : getCurrentDate(),
    descripcion: labData?.descripcion || ""
  });

  // Manejar cambios en los campos del formulario
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };


  // Manejar cambios en el input de archivo
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      selectedFile: file,
      fileName: file.name
    }));
  };

  // Mostrar el selector de archivo al hacer clic en el icono
  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };
  // Función para enviar el formulario y subir el archivo  
  const subirArchivo = async () => {
    try {
      // Desestructurar datos del formulario      
      const { selectedFile, fileName, nombreEquipmento, codigo_patrimonio, accesorios, marca, insumos, descripcion, fecha_adquisicion } = formData;
      const file = selectedFile;
      // Crear un objeto FormData y agregar datos
      const formPayload = new FormData(); // Aquí cambiamos el nombre
      formPayload.append("registro_id", labData.registro_id);
      formPayload.append("nombre_imagen", fileName);
      formPayload.append("nombre", nombreEquipmento);
      formPayload.append("marca_modelo", marca);
      formPayload.append("fecha_adquisicion", fecha_adquisicion);

      formPayload.append("codigo_patrimonio", codigo_patrimonio);
      formPayload.append("accesorio", accesorios);
      formPayload.append("insumos", insumos);
      formPayload.append("descripcion", descripcion);
      formPayload.append("imagen_equipo", file);

      // Verificar existencia de datos y token      
      if (!labData || labData.registro_id === undefined) {
        console.error('registro_id no está definido.');
        return;
      }

      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token de autenticación no encontrado en el localStorage.');
        return;
      }

      // Configuración de encabezados para la solicitud
      const config = {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      // Inicializar la variable de respuesta
      let response;

      // Verificar si el equipo ya tiene un ID (solicitud PUT) o no (solicitud POST)      
      if (labData.equipo_id) {
        const apiUrl = `${API_BASE_URL}coordinador/equipos/${labData.equipo_id}`;
        // Si labData.nombre_documento tiene datos, realiza una solicitud PUT
        response = await axios.post(apiUrl, formPayload, config);
      } else {
        const apiUrl = `${API_BASE_URL}coordinador/equipos`;
        // Si labData.nombre_documento no tiene datos, realiza una solicitud POST
        response = await axios.post(apiUrl, formPayload, config);
      }

      // Registrar la respuesta en la consola      

      // Redirige al usuario después de una respuesta exitosa
      if (response.status === 200) {
        // Aquí puedes agregar más condiciones si es necesario, como verificar campos específicos en response.data

        // Redirige al usuario después de una respuesta exitosa
        navigate('/res_equipment', { state: { labData } });
      } else {
        console.error("La solicitud no fue exitosa:", response.status, response.data);
      }

    } catch (error) {
      console.error("Error:", error);
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
      paddingRight: 0
    },
   
  };


  // Renderizar el formulario
  return (
    <form style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '8px', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)' }}>
      <Grid container spacing={3}>
        {/* Input de imagen */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            name="imagenReferencial"
            label="Imagen"
            variant="outlined"
            InputLabelProps={{ style: styles.label }}
            style={styles.textField}
            value={formData.fileName || " "}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" style={styles.inputWithIcon}>
                  <IconButton edge="end" onClick={triggerFileSelect}>
                    <AttachFileIcon color="primary" />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          {/* Input oculto de tipo archivo */}
          <input type="file" ref={fileInputRef} style={styles.fileInput} onChange={handleFileChange} />
        </Grid>
        {/* Otros campos del formulario */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            name="codigo_patrimonio"
            label="Cod. Patrimonio"
            variant="outlined"
            InputLabelProps={{ style: styles.label }}
            style={styles.textField}
            value={formData.codigo_patrimonio}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            name="nombreEquipmento"
            label="Nombre"
            variant="outlined"
            InputLabelProps={{ style: styles.label }}
            style={styles.textField}
            value={formData.nombreEquipmento}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            name="accesorios"
            label="Accesorios"
            variant="outlined"
            InputLabelProps={{ style: styles.label }}
            style={styles.textField}
            value={formData.accesorios}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            name="marca"
            label="Marca"
            variant="outlined"
            InputLabelProps={{ style: styles.label }}
            style={styles.textField}
            value={formData.marca}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            name="insumos"
            label="Insumos"
            variant="outlined"
            InputLabelProps={{ style: styles.label }}
            style={styles.textField}
            value={formData.insumos}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            name="fecha_adquisicion"
            label="Fecha de Adquisición"
            variant="outlined"
            type="date"
            InputLabelProps={{ style: styles.label }}
            style={styles.textField}
            value={formData.fecha_adquisicion}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            name="descripcion"
            label="Descripción"
            variant="outlined"
            InputLabelProps={{ style: styles.label }}
            style={styles.textField}
            value={formData.descripcion}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          {/* Botón para guardar el formulario */}
          <Button variant="contained" style={styles.button} onClick={subirArchivo}>Guardar</Button>
        </Grid>
      </Grid>
    </form>
  );

}

export default EquipmentForm;
