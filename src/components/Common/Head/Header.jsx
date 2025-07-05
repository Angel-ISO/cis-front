import { Box, Typography } from "@mui/material"
import Logo from "../../../assets/react.svg" 

const Header = () => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" mb={3} gap={2}>
      <img src={Logo || "/placeholder.svg"} alt="Logo" style={{ width: 48, height: 48 }} />
      <Typography variant="h5" fontWeight={600}>
        CIS-System
      </Typography>
    </Box>
  )
}

export default Header
