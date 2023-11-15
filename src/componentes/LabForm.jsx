import React, { useState, useEffect } from 'react';
import { TextField, Button, Autocomplete } from '@mui/material';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function Formulario({ labData }) {
  const [responsable, setResponsable] = useState(null);
  const [laboratorio, setLaboratorio] = useState(null);
  const [area, setArea] = useState(null);
  const [lineasInvestigacion, setLineasInvestigacion] = useState(null);
  const [ubicacion, setUbicacion] = useState('');
  const [laboratoriosOptions, setLaboratoriosOptions] = useState([]);
  const [areasOptions, setAreasOptions] = useState([]);
  const [disciplinasOptions, setDisciplinasOptions] = useState([]);
  const [responsablesOptions, setResponsablesOptions] = useState([]);
  const [error, setError] = useState('');
  const [registroId, setRegistroId] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const navigate = useNavigate();

  const BASE_URL = 'https://reliably-busy-polecat.ngrok-free.app/api';


  useEffect(() => {
    if (
      responsablesOptions.length &&
      laboratoriosOptions.length &&
      areasOptions.length &&
      disciplinasOptions.length &&
      labData
    ) {
      const foundResponsable = responsablesOptions.find(
        (option) => option.value === labData.coordinador_id
      );
      const foundLaboratorio = laboratoriosOptions.find(
        (option) => option.value === labData.laboratorio_id
      );
      const foundArea = areasOptions.find(
        (option) => option.value === labData.area_id
      );
      const foundLineasInvestigacion = disciplinasOptions.find(
        (option) => option.value === labData.disciplina_id
      );

      if (foundResponsable) setResponsable(foundResponsable);
      if (foundLaboratorio) setLaboratorio(foundLaboratorio);
      if (foundArea) setArea(foundArea);
      if (foundLineasInvestigacion) setLineasInvestigacion(foundLineasInvestigacion);
      setUbicacion(labData.ubicacion);
      setRegistroId(labData.registro_id);     
    }
  }, [
    responsablesOptions,
    laboratoriosOptions,
    areasOptions,
    disciplinasOptions,
    labData
  ]);

  const getAuthToken = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token de autenticación no encontrado en el localStorage.');
      return null;
    }
    return token;
  }

  const fetchAPI = async (endpoint, method = 'GET', data = null) => {
    try {
      const token = getAuthToken();
      if (!token) return;

      const headers = {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };

      const config = {
        method: method,
        url: `${BASE_URL}${endpoint}`,
        headers: headers
      };

      if (data) {
        config.data = JSON.stringify(data);
      }

      const response = await axios(config);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        console.error('Error en la respuesta de la API:', response.status);
        return null;
      }
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchOptions = async () => {
      const disciplinasData = await fetchAPI('/disciplinas');
      const responsablesData = await fetchAPI('/usuarios/coordinadores');
      const laboratoriosData = await fetchAPI('/laboratorios');
      const areasData = await fetchAPI('/areas');

      if (disciplinasData && disciplinasData.disciplinas) {
        const transformedData = disciplinasData.disciplinas.map(disciplina => ({
          label: disciplina.nombre,
          value: disciplina.disciplina_id
        }));
        setDisciplinasOptions(transformedData);
      }

      if (responsablesData && responsablesData.coordinadores) {
        const transformedResponsables = responsablesData.coordinadores.map(coordinador => ({
          label: `${coordinador.nombre} ${coordinador.apellido_paterno} ${coordinador.apellido_materno}`,
          value: coordinador.usuario_id
        }));
        setResponsablesOptions(transformedResponsables);
      }

      if (laboratoriosData && laboratoriosData.laboratorios) {
        const transformedData = laboratoriosData.laboratorios.map(lab => ({
          label: lab.nombre,
          value: lab.laboratorio_id
        }));
        setLaboratoriosOptions(transformedData);
      }

      if (areasData && areasData.areas) {
        const transformedData = areasData.areas.map(area => ({
          label: area.nombre,
          value: area.area_id
        }));
        setAreasOptions(transformedData);
      }

      setDataLoaded(true);
    };


    fetchOptions();
  }, []);

  
  if (!dataLoaded) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!responsable || !laboratorio || !area || !lineasInvestigacion || !ubicacion) {
      setError('Todos los campos deben completarse.');
      return;
    }

    const data = {
      coordinador_id: responsable.value,
      laboratorio_id: laboratorio.value,
      area_id: area.value,
      disciplina_id: lineasInvestigacion.value,
      ubicacion: ubicacion
    };
    let response;
    if (registroId) {
      // Actualizar el registro existente
      response = await fetchAPI(`/registroLaboratorio/${registroId}`, 'PUT', data);
    } else {
      // Crear un nuevo registro
      response = await fetchAPI('/registroLaboratorio', 'POST', data);
    }
    if (response) {
      navigate('/gestion_resp_lab');
    } else {
      setError('Ocurrió un error al procesar la solicitud.');
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Autocomplete
          options={responsablesOptions}
          getOptionLabel={(option) => option.label}
          style={{ width: '100%' }}
          value={responsable} // <-- Aquí usamos la propiedad "value"
          renderInput={(params) => (
            <TextField {...params} label="Responsable" variant="outlined" />
          )}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          onChange={(event, newValue) => setResponsable(newValue)}
        />
        <Autocomplete
          options={laboratoriosOptions} // Usamos las opciones de laboratorios
          getOptionLabel={(option) => option.label}
          style={{ width: '100%' }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Laboratorio"
              variant="outlined"
            />
          )}
          isOptionEqualToValue={(option, value) => option.value === value.value}

          onChange={(event, newValue) => setLaboratorio(newValue)}
        />
        <Autocomplete
          options={areasOptions}
          getOptionLabel={(option) => option.label}
          style={{ width: '100%' }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Área"
              variant="outlined"
            />
          )}
          isOptionEqualToValue={(option, value) => option.value === value.value}

          onChange={(event, newValue) => setArea(newValue)}
        />
        <Autocomplete
          options={disciplinasOptions}
          getOptionLabel={(option) => option.label}
          style={{ width: '100%' }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Líneas de investigación"
              variant="outlined"
            />
          )}
          isOptionEqualToValue={(option, value) => option.value === value.value}

          onChange={(event, newValue) => setLineasInvestigacion(newValue)}
        />
        <TextField
          label="Ubicación"
          variant="outlined"
          value={ubicacion}
          onChange={(event) => setUbicacion(event.target.value)}
        />
        <Button type="submit" variant="contained" style={{ background: "#64001d" }}>
          ENVIAR
        </Button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </form>
  );
}

export default Formulario;
