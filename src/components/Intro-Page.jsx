import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  Paper,
  Avatar,
  Chip,
  Fade,
  Slide,
  Zoom,
} from "@mui/material"
import { Forum, People, Security, Speed, Chat, ArrowForward, Star } from "@mui/icons-material"
import { useState, useEffect } from "react"
import { useLocation } from 'wouter'


const CountUp = ({ end, duration = 2000, delay = 0, suffix = "", prefix = "" }) => {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  useEffect(() => {
    if (!isVisible) return

    if (isNaN(Number.parseInt(end))) {
      setCount(end)
      return
    }

    const numericEnd = Number.parseInt(end.toString().replace(/[^\d]/g, ""))
    let startTime = null
    const startCount = 0

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = Math.floor(startCount + (numericEnd - startCount) * easeOutQuart)

      setCount(currentCount)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(numericEnd)
      }
    }

    requestAnimationFrame(animate)
  }, [isVisible, end, duration])

  const formatNumber = (num) => {
    if (typeof end === "string" && end.includes("/")) {
      return end 
    }

    if (typeof end === "string" && end.includes("K")) {
      return `${num}K+`
    }

    return `${prefix}${num.toLocaleString()}${suffix}`
  }

  return (
    <span
      style={{
        display: "inline-block",
        minWidth: "60px",
        transition: "all 0.3s ease",
      }}
    >
      {formatNumber(count)}
    </span>
  )
}



const IntroPage = () => {
  const [visible, setVisible] = useState(false)
  const [cardVisible, setCardVisible] = useState(false)
  const [, navigate] = useLocation()
  

  useEffect(() => {
    setVisible(true)
    const timer = setTimeout(() => setCardVisible(true), 500)
    return () => clearTimeout(timer)
  }, [])

  const features = [
    {
      icon: <Forum sx={{ fontSize: 40 }} />,
      title: "Discusiones Dinámicas",
      description: "Participa en conversaciones interactivas con la comunidad",
    },
    {
      icon: <People sx={{ fontSize: 40 }} />,
      title: "Comunidad Activa",
      description: "Conecta con usuarios de todo el mundo",
    },
    {
      icon: <Security sx={{ fontSize: 40 }} />,
      title: "Seguro y Confiable",
      description: "Tu privacidad y seguridad son nuestra prioridad",
    },
    {
      icon: <Speed sx={{ fontSize: 40 }} />,
      title: "Rápido y Eficiente",
      description: "Experiencia fluida y sin interrupciones",
    },
  ]

  const stats = [
    { number: "1.000+", label: "Usuarios Activos" },
    { number: "5.000+", label: "Discusiones" },
    { number: "10.000+", label: "Mensajes" },
    { number: "24/7", label: "Soporte" },
  ]

  return (
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)",
        }}
      >
        {/* Navbar */}
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            borderBottom: "1px solid rgba(229, 57, 53, 0.1)",
          }}
        >
          <Toolbar>
            <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
              <Forum sx={{ color: "primary.main", mr: 1, fontSize: 28 }} />
              <Typography
                variant="h5"
                component="div"
                sx={{
                  fontWeight: 600,
                  color: "primary.main",
                  background: "linear-gradient(45deg, #e53935, #ff6f60)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                CIS-System
              </Typography>
            </Box>
            <Button
              variant="contained"
              onClick={() => navigate("/login")}
              sx={{
                borderRadius: 3,
                px: 3,
                py: 1,
                background: "linear-gradient(45deg, #e53935 30%, #ff6f60 90%)",
                boxShadow: "0 3px 15px rgba(229, 57, 53, 0.3)",
                "&:hover": {
                  background: "linear-gradient(45deg, #ab000d 30%, #e53935 90%)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 20px rgba(229, 57, 53, 0.4)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Iniciar Sesión
            </Button>            
          </Toolbar>
        </AppBar>

        {/* Hero Section */}
        <Container maxWidth="lg" sx={{ pt: 12, pb: 8 }}>
          <Fade in={visible} timeout={1000}>
            <Box textAlign="center" mb={8}>
              <Zoom in={visible} timeout={1200}>
                <Avatar
                  sx={{
                    width: 120,
                    height: 120,
                    mx: "auto",
                    mb: 4,
                    background: "linear-gradient(45deg, #e53935, #ff6f60)",
                    animation: "float 3s ease-in-out infinite",
                    "@keyframes float": {
                      "0%, 100%": { transform: "translateY(0px)" },
                      "50%": { transform: "translateY(-10px)" },
                    },
                  }}
                >
                  <Chat sx={{ fontSize: 60, color: "white" }} />
                </Avatar>
              </Zoom>

              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  background: "linear-gradient(45deg, #212121, #484848)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mb: 2,
                  animation: "slideInUp 1s ease-out",
                  "@keyframes slideInUp": {
                    from: { opacity: 0, transform: "translateY(30px)" },
                    to: { opacity: 1, transform: "translateY(0)" },
                  },
                }}
              >
                Bienvenido a CIS-System
              </Typography>

              <Typography
                variant="h5"
                color="text.secondary"
                sx={{
                  mb: 4,
                  maxWidth: 600,
                  mx: "auto",
                  animation: "slideInUp 1s ease-out 0.2s both",
                }}
              >
                La plataforma de foros más avanzada para conectar, discutir y compartir conocimiento
              </Typography>

              <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    fontSize: "1.1rem",
                    background: "linear-gradient(45deg, #e53935 30%, #ff6f60 90%)",
                    boxShadow: "0 4px 20px rgba(229, 57, 53, 0.3)",
                    "&:hover": {
                      background: "linear-gradient(45deg, #ab000d 30%, #e53935 90%)",
                      transform: "translateY(-3px)",
                      boxShadow: "0 8px 25px rgba(229, 57, 53, 0.4)",
                    },
                    transition: "all 0.3s ease",
                    animation: "pulse 2s infinite",
                    "@keyframes pulse": {
                      "0%": { boxShadow: "0 4px 20px rgba(229, 57, 53, 0.3)" },
                      "50%": { boxShadow: "0 4px 30px rgba(229, 57, 53, 0.5)" },
                      "100%": { boxShadow: "0 4px 20px rgba(229, 57, 53, 0.3)" },
                    },
                  }}
                >
                  Comenzar Ahora
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    fontSize: "1.1rem",
                    borderColor: "primary.main",
                    color: "primary.main",
                    "&:hover": {
                      borderColor: "primary.dark",
                      backgroundColor: "rgba(229, 57, 53, 0.04)",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Explorar Foros
                </Button>
              </Box>
            </Box>
          </Fade>

{/* Stats Section - Ahora perfectamente centrada con CountUp */}
        <Slide direction="up" in={cardVisible} timeout={800}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              mb: 8,
              borderRadius: 4,
              background: "linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%)",
              border: "1px solid rgba(229, 57, 53, 0.1)",
              maxWidth: "1000px",
              mx: "auto",
            }}
          >
            <Grid 
              container 
              spacing={4}
              justifyContent="center"
              alignItems="center"
            >
              {stats.map((stat, index) => (
                <Grid 
                  item 
                  xs={12}
                  sm={6}
                  md={3}
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Box textAlign="center" sx={{ width: "100%" }}>
                    <Typography
                      variant="h3"
                      component="div"
                      sx={{
                        fontWeight: 700,
                        color: "primary.main",
                        mb: 1,
                        minHeight: "64px", 
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <CountUp
                        end={stat.number}
                        duration={2000}
                        delay={stat.delay}
                        suffix={stat.suffix}
                      />
                    </Typography>
                    <Typography variant="body1" color="text.secondary" fontWeight={500}>
                      {stat.label}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Slide>

          {/* Features Section */}
          <Typography
            variant="h3"
            component="h2"
            textAlign="center"
            gutterBottom
            sx={{
              fontWeight: 600,
              mb: 6,
              color: "text.primary",
            }}
          >
            ¿Por qué elegir CIS-System?
          </Typography>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Zoom in={cardVisible} timeout={1000} style={{ transitionDelay: `${index * 200}ms` }}>
                  <Card
                    elevation={2}
                    sx={{
                      height: "100%",
                      borderRadius: 3,
                      transition: "all 0.3s ease",
                      border: "1px solid rgba(229, 57, 53, 0.1)",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: "0 12px 40px rgba(229, 57, 53, 0.15)",
                        borderColor: "primary.main",
                      },
                    }}
                  >
                    <CardContent sx={{ textAlign: "center", p: 3 }}>
                      <Box
                        sx={{
                          color: "primary.main",
                          mb: 2,
                          animation: "bounce 2s infinite",
                          "@keyframes bounce": {
                            "0%, 20%, 50%, 80%, 100%": { transform: "translateY(0)" },
                            "40%": { transform: "translateY(-10px)" },
                            "60%": { transform: "translateY(-5px)" },
                          },
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Typography variant="h6" component="h3" gutterBottom fontWeight={600}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Zoom>
              </Grid>
            ))}
          </Grid>

          {/* CTA Section */}
          <Fade in={cardVisible} timeout={1500}>
            <Box
              textAlign="center"
              sx={{
                mt: 10,
                p: 6,
                borderRadius: 4,
                background: "linear-gradient(135deg, #e53935 0%, #ff6f60 100%)",
                color: "white",
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background:
                    'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fillRule="evenodd"%3E%3Cg fill="%23ffffff" fillOpacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                  animation: "float 20s linear infinite",
                },
              }}
            >
              <Typography variant="h4" component="h2" gutterBottom fontWeight={600}>
                ¿Listo para unirte a la comunidad?
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
                Únete a miles de usuarios que ya forman parte de CIS-System
              </Typography>
              <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
                <Chip
                  icon={<Star />}
                  label="Gratis para siempre"
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    color: "white",
                    fontWeight: 500,
                  }}
                />
                <Chip
                  icon={<Security />}
                  label="100% Seguro"
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    color: "white",
                    fontWeight: 500,
                  }}
                />
              </Box>
            </Box>
          </Fade>
        </Container>
      </Box>
  )
}

export default IntroPage