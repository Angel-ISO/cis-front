import {
  Container, Paper, TextField, Button, Typography, Box, InputAdornment, Divider, Select, MenuItem, FormControl, InputLabel
} from "@mui/material"
import { Person, Email, Lock, AccountCircle } from "@mui/icons-material"
import { useLocation } from 'wouter'
import Header from "../../Common/Head/Header"
import Footer from "../../Common/Foot/Footer"
import { useState } from "react"
import { UserRegisterAct } from "../../../actions/UserAction" 
import { toast } from "react-hot-toast"



const UserRegister = () => {
  const [, navigate] = useLocation()

  const [userData, setUserData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  })

  const handleUserDataChange = (e) => {
    const { name, value } = e.target
    setUserData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

    const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const response = await UserRegisterAct(userData)  
      console.log("Usuario registrado con éxito:", response)
      toast.success("Registro exitoso! Bienvenido" + response.data.name)
      window.localStorage.setItem("token", response.data.jwt) 
      navigate("/profile")
    } catch (error) {
      console.error("Error en el registro:", error)
      toast.error(error?.response?.data?.Message || "Hubo un error al registrarse")
    }
  }

  return (
    <Container maxWidth="sm" sx={{
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    py: 4,
  }} >
      <Header />


      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 2,
          background: "linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%)",
        }}
      >
        <Box textAlign="center" mb={3}>
          <AccountCircle sx={{ fontSize: 48, color: "primary.main", mb: 1 }} />
          <Typography variant="h4" component="h1" gutterBottom fontWeight={500}>
            Crear Cuenta
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Completa los siguientes campos para registrarte
          </Typography>
          <Divider sx={{ width: "60px", mx: "auto", borderColor: "primary.main", borderWidth: 1 }} />
        </Box>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="Nombre completo"
            name="name"
            variant="outlined"
            margin="normal"
            value={userData.name}
            onChange={handleUserDataChange}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person color="action" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Nombre de usuario"
            name="username"
            variant="outlined"
            margin="normal"
            value={userData.username}
            onChange={handleUserDataChange}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle color="action" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Correo electrónico"
            name="email"
            type="email"
            variant="outlined"
            margin="normal"
            value={userData.email}
            onChange={handleUserDataChange}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email color="action" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Contraseña"
            name="password"
            type="password"
            variant="outlined"
            value={userData.password}
            onChange={handleUserDataChange}
            margin="normal"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock color="action" />
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{
              mt: 3,
              mb: 2,
              py: 1.5,
              borderRadius: 2,
              textTransform: "none",
              fontSize: "1.1rem",
              fontWeight: 500,
              background: "linear-gradient(45deg, #e53935 30%, #ff6f60 90%)",
              boxShadow: "0 3px 5px 2px rgba(229, 57, 53, .3)",
              "&:hover": {
                background: "linear-gradient(45deg, #ab000d 30%, #e53935 90%)",
                boxShadow: "0 6px 10px 4px rgba(229, 57, 53, .3)",
                transform: "translateY(-1px)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Crear Cuenta
          </Button>

          <Box textAlign="center" mt={2}>
            <Typography variant="body2" color="text.secondary">
              ¿Ya tienes una cuenta?{""}
              <Typography
                component="span"
                variant="body2"
                onClick={() => navigate("/login")}
                sx={{
                  color: "primary.main",
                  cursor: "pointer",
                  textDecoration: "underline",
                  "&:hover": { color: "primary.dark" },
                }}
              >
                Inicia sesión aquí
              </Typography>
            </Typography>
          </Box>
        </Box>
      </Paper>

     
      <Footer />
    </Container>
  )
}

export default UserRegister
