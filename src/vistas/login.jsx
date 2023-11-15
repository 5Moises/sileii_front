import React, { useState } from 'react';
import {
  Container, Paper, Typography, TextField, Button, Grid, Box, ThemeProvider,
  createTheme, Alert, AlertTitle
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../js/config';

import logo from "../assets/imagenes/login_back.jpg";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#64001D",
    },
  },
});

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });
  const navigate = useNavigate();

  const isFormValid = () => {
    return email && password; // Aquí puedes añadir más validaciones si es necesario
  };

  const handleLogin = async () => {
    if (!isFormValid()) {
      setAlert({ show: true, type: 'error', message: 'Por favor complete todos los campos.' });
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('correo', email);
        localStorage.setItem('rol_id', data.usuario.rol_id);
        navigate('/Inicio', { state: { correo: email } });
      } else {
        setAlert({ show: true, type: 'error', message: 'Usuario o contraseña incorrectos. Por favor, inténtelo de nuevo.' });
      }
    } catch (error) {
      setAlert({ show: true, type: 'error', message: 'Error al iniciar sesión. Intente de nuevo.' });
      console.error('Error al iniciar sesión:', error);
    }
  };

  const handleInvitado = () => navigate('/Inicio');

  return (
    <Container maxWidth="md">
      <Grid container justifyContent="center" alignItems="flex-start" style={{ minHeight: '100vh', marginTop: '100px' }}>
        <Grid item xs={12} sm={12} md={8} lg={6} style={{ marginTop: '70px' }}>
          <ThemeProvider theme={customTheme}>
            <Paper elevation={3} style={{ padding: '20px' }}>
              <Typography variant="h4" align="center" gutterBottom style={{ color: '#64001D', fontWeight: 'bold' }}>
                Iniciar Sesión
              </Typography>
              <TextField
                label="Nombre de usuario"
                variant="outlined"
                margin="normal"
                fullWidth
                InputLabelProps={{ style: { color: '#64001D' } }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Contraseña"
                type="password"
                variant="outlined"
                margin="normal"
                fullWidth
                InputLabelProps={{ style: { color: '#64001D' } }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                variant="contained"
                fullWidth
                onClick={handleLogin}
                style={{ backgroundColor: '#64001D', color: '#FFFFFF', margin: '1% 1% 1% 1%' }}
              >
                Iniciar Sesión
              </Button>

              <Button
                variant="contained"
                fullWidth
                onClick={handleInvitado}
                style={{ backgroundColor: '#64001D', color: '#FFFFFF', margin: '1% 1% 1% 1%' }}
              >
                Invitado
              </Button>
              {alert.show && (
                <Alert severity={alert.type}>
                  <AlertTitle>{alert.type === 'error' ? 'Error' : 'Éxito'}</AlertTitle>
                  {alert.message}
                </Alert>
              )}
            </Paper>
          </ThemeProvider>
        </Grid>
        <Grid item xs={12} sm={8} md={6} lg={6}>
          <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <img src={logo} alt="Imagen de fondo" style={{ maxWidth: '80%', marginTop: '40%', maxHeight: '100%', width: 'auto' }} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Login;
