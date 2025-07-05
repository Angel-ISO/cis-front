import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  InputAdornment,
  Divider,
} from "@mui/material"
import { Lock, AccountCircle, Login } from "@mui/icons-material"
import { useLocation } from 'wouter'
import Header from "../../Common/Head/Header"
import Footer from "../../Common/Foot/Footer"
import { useState } from "react"
import { UserLoginAct } from "../../../actions/UserAction"
import toast from "react-hot-toast"

const UserLogin = () => {
  const [, navigate] = useLocation()

  const [userData, setUserData] = useState({
    username: "",
    password: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
  e.preventDefault()
  const res = await UserLoginAct(userData)

  if (res.success && res.data?.jwt) {
    localStorage.setItem("token", res.data.jwt) 
    toast.success("Inicio de sesión exitoso")
    navigate("/profile")
  } else {
    toast.error(res.message || "Credenciales incorrectas")
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
    }}>

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
          <Login sx={{ fontSize: 48, color: "primary.main", mb: 1 }} />
          <Typography variant="h4" component="h1" gutterBottom fontWeight={500}>
            Iniciar Sesión
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Ingresa tus credenciales para acceder a tu cuenta
          </Typography>
          <Divider sx={{ width: "60px", mx: "auto", borderColor: "primary.main", borderWidth: 1 }} />
        </Box>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="Nombre de usuario"
            name="username"
            value={userData.username}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
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
            label="Contraseña"
            name="password"
            type="password"
            value={userData.password}
            onChange={handleChange}
            variant="outlined"
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
            Iniciar Sesión
          </Button>

          <Box textAlign="center" mt={2}>
            <Typography variant="body2" color="text.secondary">
              ¿No tienes una cuenta?{" "}
              <Typography
                component="span"
                variant="body2"
                onClick={() => navigate("/register")}
                sx={{
                  color: "primary.main",
                  cursor: "pointer",
                  textDecoration: "underline",
                  "&:hover": { color: "primary.dark" },
                }}
              >
                Regístrate aquí
              </Typography>
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Footer />
    </Container>
  )
}

export default UserLogin