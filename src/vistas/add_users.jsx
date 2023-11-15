import { Container, Grid, Paper, Typography, Box } from "@mui/material";
import UserForm from "../componentes/UserForm";
import Escudo from "../assets/imagenes/login_back.jpg";
/* import Navigation from "../componentes/Nav"; */

function add_users() {

  return (
    <Container 
      maxWidth="lg"
      className='fondo'
      style={{
        minHeight: '90vh', 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center', 
        
      }}>
      <Grid
        container
        spacing={4}
        justifyContent="center"
        alignItems="center"
      >
        {/* Columna Izquierda (Imagen) */}
        <Grid item xs={4} sm={4} md={4} lg={3.5}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <img
              src={Escudo}
              alt="Logo-Sileii"
              style={{ maxWidth: "100%", maxHeight: "100%", width: "auto" }}
            />
          </Box>
        </Grid>

        {/* Columna Derecha (Formulario) */}
        <Grid item xs={6} sm={6} md={6} lg={7}>
          <Paper
            elevation={3}
            style={{
              padding: "30px",
              width: '100%',
              maxWidth: '600px'
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              align="left"
              style={{ color: "#64001D", fontWeight: "bold", marginBottom: "20px" }}
            >
              Registrar Usuario
            </Typography>
            <UserForm />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default add_users;
