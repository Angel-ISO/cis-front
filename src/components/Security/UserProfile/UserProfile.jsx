import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  InputAdornment,
  Divider,
  Avatar,
  IconButton,
  Card,
  CardContent,
} from "@mui/material"
import { Person, Email, Lock, AccountCircle, Edit, Save, Cancel, Delete, Visibility, VisibilityOff, Token } from "@mui/icons-material"
import { useState, useEffect } from "react"
import Footer from "../../Common/Foot/Footer"
import Header from "../../Common/Head/Header"
import { GetCurrentUserAct, UpdateCurrentUserAct, DeleteCurrentUserAct, GetCurrentUserRole  } from "../../../actions/CurrentUserAction"
import toast from "react-hot-toast"
import { showInputAlert } from "../../../Utils/Alerts"
import { useLocation } from 'wouter'




const UserProfile = () => {
  const [, navigate] = useLocation()
  const [isEditing, setIsEditing] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [userRole, setUserRole] = useState("")


  useEffect(() => {
  const fetchUser = async () => {
    const res = await GetCurrentUserAct()
    if (res.success) {
      setUserData(res.data)
      setEditData(res.data)
    } else {
      console.error("Error al cargar el usuario:", res.message)
      toast.error(res.message)
    }

    const role = GetCurrentUserRole()
    if (role) {
      setUserRole(role)
    }
  }

  fetchUser()
}, [])


  const [userData, setUserData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  })

  const [editData, setEditData] = useState({ ...userData })

  const handleEdit = () => {
    setIsEditing(true)
    setEditData({ ...userData })
  }

  const handleSave = async () => {
  try {
    const payload = {}

    if (editData.name !== userData.name) payload.name = editData.name
    if (editData.username !== userData.username) payload.username = editData.username
    if (editData.email !== userData.email) payload.email = editData.email
    if (editData.password && editData.password.trim() !== "") payload.password = editData.password

    const res = await UpdateCurrentUserAct(payload)

    if (res.success) {
      if (res.data?.token) {
        localStorage.setItem("token", res.data.token)
      }

      toast.success("Perfil actualizado correctamente")
      setUserData((prev) => ({ ...prev, ...payload }))
      setIsEditing(false)
    } else {
      toast.error(res.message)
    }
  } catch (err) {
    toast.error("Error al guardar los cambios")
    console.error(err)
  }
}


const handleDeleteAccount = async () => {
  const { inputValue, isConfirmed } = await showInputAlert({
    title: 'Eliminar cuenta',
    inputLabel: 'Escribe tu nombre de usuario para confirmar:',
    inputPlaceholder: 'TuNombreDeUsuario'
  })

  if (!isConfirmed) return

  if (inputValue !== userData.username) {
    toast.error("El nombre de usuario no coincide")
    return
  }

  const res = await DeleteCurrentUserAct()
  if (res.success) {
    await toast.success("Cuenta eliminada correctamente")
    localStorage.removeItem("token")
    navigate("/")
  } else {
    toast.error("error al eliminar la cuenta: ", res.message)
  }
}


  const handleCancel = () => {
    setEditData({ ...userData })
    setIsEditing(false)
  }

  useEffect(() => {
  const fetchUser = async () => {
    const res = await GetCurrentUserAct()
    if (res.success) {
      setUserData(res.data)
      setEditData(res.data)
    } else {
      console.error("Error al cargar el usuario:", res.message)
      toast.error(res.message)
    }
  }

  fetchUser()
}, [])

  const handleInputChange = (field, value) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }


  

  return (
    <Container maxWidth="md" 
    
    sx={{
    width: "100%", 
    maxWidth: 700, 
    p: 4,
    borderRadius: 2,
    py: 4,
    }}
    >
      <Header />

      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 2,
          background: "linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%)",
        }}
      >
        {/* Header del perfil */}
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
          <Box display="flex" alignItems="center" gap={3}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                bgcolor: "primary.main",
                fontSize: "2rem",
              }}
            >
              {userData.name.charAt(0).toUpperCase()}
            </Avatar>
            <Box>
              <Typography variant="h4" component="h1" fontWeight={500}>
                Mi Perfil
              </Typography>
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                 Rol: {userRole}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Gestiona tu información personal
              </Typography>
            </Box>
          </Box>

          {!isEditing && (
            <Button
              variant="outlined"
              startIcon={<Edit />}
              onClick={handleEdit}
              sx={{
                borderColor: "primary.main",
                color: "primary.main",
                "&:hover": {
                  borderColor: "primary.dark",
                  backgroundColor: "primary.main",
                  color: "white",
                },
              }}
            >
              Editar Perfil
            </Button>
          )}

          
        <Button
      variant="outlined"
      color="error"
      startIcon={<Delete />}
      onClick={handleDeleteAccount}
      sx={{
        borderColor: "error.main",
        color: "error.main",
        "&:hover": {
          borderColor: "error.dark",
          backgroundColor: "error.main",
          color: "white",
        },
      }}
    >
      Eliminar Cuenta
    </Button>
          
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* Información del usuario */}
        <Box component="form" sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom color="text.primary" sx={{ mb: 3 }}>
            Información Personal
          </Typography>

          {/* Nombre completo */}
          <Card sx={{ mb: 2, boxShadow: 1 }}>
            <CardContent sx={{ py: 2 }}>
              {isEditing ? (
                <TextField
                  fullWidth
                  label="Nombre completo"
                  value={editData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  variant="outlined"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              ) : (
                <Box display="flex" alignItems="center" gap={2}>
                  <Person color="action" />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Nombre completo
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {userData.name}
                    </Typography>
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>

          {/* Nombre de usuario */}
          <Card sx={{ mb: 2, boxShadow: 1 }}>
            <CardContent sx={{ py: 2 }}>
              {isEditing ? (
                <TextField
                  fullWidth
                  label="Nombre de usuario"
                  value={editData.username}
                  onChange={(e) => handleInputChange("username", e.target.value)}
                  variant="outlined"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              ) : (
                <Box display="flex" alignItems="center" gap={2}>
                  <AccountCircle color="action" />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Nombre de usuario
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {userData.username}
                    </Typography>
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>

          {/* Email */}
          <Card sx={{ mb: 2, boxShadow: 1 }}>
            <CardContent sx={{ py: 2 }}>
              {isEditing ? (
                <TextField
                  fullWidth
                  label="Correo electrónico"
                  type="email"
                  value={editData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  variant="outlined"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              ) : (
                <Box display="flex" alignItems="center" gap={2}>
                  <Email color="action" />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Correo electrónico
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {userData.email}
                    </Typography>
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>

          {/* Contraseña */}
          <Card sx={{ mb: 4, boxShadow: 1 }}>
            <CardContent sx={{ py: 2 }}>
              {isEditing ? (
                <TextField
                  fullWidth
                  label="Nueva contraseña"
                  type={showPassword ? "text" : "password"}
                  value={editData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  variant="outlined"
                  size="small"
                  placeholder="Dejar vacío para mantener la actual"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              ) : (
                <Box display="flex" alignItems="center" gap={2}>
                  <Lock color="action" />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Contraseña
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      ••••••••
                    </Typography>
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>

          {/* Botones de acción */}
          {isEditing && (
            <Box display="flex" gap={2} justifyContent="flex-end">
              <Button
                variant="outlined"
                startIcon={<Cancel />}
                onClick={handleCancel}
                sx={{
                  borderColor: "text.secondary",
                  color: "text.secondary",
                  "&:hover": {
                    borderColor: "text.primary",
                    backgroundColor: "grey.100",
                  },
                }}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                startIcon={<Save />}
                onClick={handleSave}
                sx={{
                  background: "linear-gradient(45deg, #e53935 30%, #ff6f60 90%)",
                  boxShadow: "0 3px 5px 2px rgba(229, 57, 53, .3)",
                  "&:hover": {
                    background: "linear-gradient(45deg, #ab000d 30%, #e53935 90%)",
                    boxShadow: "0 6px 10px 4px rgba(229, 57, 53, .3)",
                  },
                }}
              >
                Guardar Cambios
              </Button>
            </Box>
          )}
        </Box>
      </Paper>

      <Footer />
    </Container>
  )
}

export default UserProfile