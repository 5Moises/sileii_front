import { Container, Grid, Paper, Typography, Box } from "@mui/material";
import LabForm from "../componentes/LabForm";
import Escudo from "../assets/imagenes/login_back.png";
/* import Navigation from "../componentes/Nav"; */
import { useLocation } from 'react-router-dom';

function App() {
    const location = useLocation();
    const labToEdit = location.state?.labToEdit;
    
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
              Editar Registro de Laboratorio
            </Typography>
            <LabForm labData={labToEdit} />
          </Paper>
        </Grid> 

        {/* Columna Derecha (Formulario) */}

        <Grid item xs={4} sm={4} md={4} lg={5}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <img
              src={Escudo}
              alt="Logo-Sileii"
              style={{ width: "50%" ,heigth: "auto" }}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;


