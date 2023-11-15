import { useState } from "react";
import {
  MenuItem,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  Drawer, // Importa la componente Drawer
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu"; // Importa el ícono de menú
import IconUnsa from "../assets/imagenes/logo.jpg";

function UserForm() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Estado para controlar la apertura del Drawer

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsDrawerOpen(open);
  };

  const list = (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button>
          <ListItemText primary="Opción 1" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Opción 2" />
        </ListItem>
        {/* Agrega más elementos de menú aquí */}
      </List>
    </div>
  );

  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: "#B40135" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)} // Abre el Drawer al hacer clic en el ícono de menú
          >
            <MenuIcon />
          </IconButton>
          {/* Logo */}
          <img src={IconUnsa} alt="Logo" width="40" height="40" />

          {/* Nombre */}
          <Typography variant="h6" sx={{ flexGrow: 1, marginLeft: "2%" }}>
            UNSA
          </Typography>

          {/* Icono de Usuario */}
          <IconButton
            onClick={handleMenuOpen}
            size="large"
            edge="end"
            color="inherit"
            aria-controls="menu-appbar"
            aria-haspopup="true"
          >
            <AccountCircle />
          </IconButton>

          {/* Menú de Usuario */}
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Perfil</MenuItem>
            <MenuItem onClick={handleMenuClose}>Salir</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Drawer (menú desplegable izquierdo) */}
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        sx={{ width: "250px" }} // Establece el ancho del Drawer
      >
        {list}
      </Drawer>
    </div>
  );
}

export default UserForm;
