import { Box, Avatar, Button, Link } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import FitnessCenterRoundedIcon from "@mui/icons-material/FitnessCenterRounded";
import LightModeIcon from "@mui/icons-material/LightMode";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import { useTheme } from "../../theme/themeContext";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const getPath = () => {
    return location.pathname;
  };
  const { theme, toggleTheme } = useTheme();

  return (
    <Box
      component="header"
      sx={{
        borderBottom: 0.5,
        borderBottomColor: theme.palette.primary.border,
        py: 0.5,
        px: 2,
        display: "flex",
        flexWrap: "nowrap",
        alignItems: "center",
        backgroundColor: theme.palette.secondary.main,
      }}
    >
      <Avatar
        sx={{
          m: 1,
          bgcolor: theme.palette.primary.main,
          color: theme.palette.secondary.main,
        }}
      >
        <FitnessCenterRoundedIcon onClick={()=>navigate("/main")} sx={{cursor:"pointer"}}/>
      </Avatar>
      <Box sx={{ ml: "auto", display: "flex", alignItems: "center", gap: 1.5 }}>
        <Button
          variant="outlined"
          sx={{
            border: 0.5,
            borderColor: theme.palette.primary.main,
            borderRadius: "30px",
            ":hover": {
              borderColor: "#91d9ff",
            },
            p: 1,
          }}
          onClick={toggleTheme}
        >
          {theme.palette.mode === "light" ? (
            <LightModeIcon sx={{ color: "black" }} />
          ) : (
            <ModeNightIcon sx={{ color: "white" }} />
          )}
        </Button>
        {getPath() ==="/login" || getPath() ==="/register" ?  getPath() === "/login" ? (
          <Button
            variant="contained"
            sx={{ m: 1.5, p: 0.3, backgroundColor: theme.palette.primary.main }}
          >
            <Link
              href="/register"
              variant="body1"
              underline="none"
              sx={{ color: theme.palette.secondary.main, p: 1, m: 0 }}
            >
              Sign Up
            </Link>
          </Button>
        ) : (
          <Button variant="outlined" sx={{ m: 1.5, p: 0.2 }}>
            <Link
              href="/login"
              variant="body1"
              underline="none"
              sx={{ p: 1, m: 0 }}
            >
              Login
            </Link>
          </Button>
        ) : null}
        
      </Box>
    </Box>
  );
}
