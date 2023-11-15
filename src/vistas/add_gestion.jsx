import { Container, Grid, Paper, Typography, Box } from "@mui/material";
import LabForm from "../componentes/LabForm";
import Escudo from "../assets/imagenes/login_back.jpg";

function App() {
  return (
    <Container className='fondo'
      maxWidth="lg"
      sx={{
        paddingTop: '5%',
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'top',
        alignItems: 'top',
        
      }}>
      <Grid
        container
        spacing={4}
        justifyContent="center"
        alignItems="center"
      >
        {/* Columna Izquierda (Imagen) */}
        <Grid item xs={12} sm={6} md={6} lg={7}>
          <Paper
            elevation={3}
            sx={{
              padding: "30px",
              width: '100%',
              maxWidth: '600px',
              marginBottom: { xs: '20px', sm: 0 }
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              align="left"
              sx={{
                color: "#64001D",
                fontWeight: "bold",
                marginBottom: "20px"
              }}
            >
              Registro de Laboratorio
            </Typography>
            <LabForm />
          </Paper>
        </Grid>

        {/* Columna Derecha (Formulario) */}
        <Grid item xs={12} sm={6} md={4} lg={5}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            sx={{
              img: {
                maxWidth: "100%",
                maxHeight: "100%",
                width: "auto"
              }
            }}
          >
            <img
              src={Escudo}
              alt="Logo-Sileii"
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
