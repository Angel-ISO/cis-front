import { Box, Typography } from "@mui/material"

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        py: 2,
        mt: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "transparent", 
      }}
    >
      <Box display="flex" gap={2}>
        <Typography variant="body2" color="text.secondary" sx={{ cursor: "pointer" }}>
          About
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ cursor: "pointer" }}>
          Help
        </Typography>
      </Box>
    </Box>
  )
}

export default Footer