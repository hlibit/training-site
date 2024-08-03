import React, { useEffect, useState } from "react";
import { Box, Typography, Avatar, Button, Link } from "@mui/material";
import { useLocation } from "react-router-dom";
import FitnessCenterRoundedIcon from "@mui/icons-material/FitnessCenterRounded";
import LightModeIcon from "@mui/icons-material/LightMode";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import { lightTheme, darkTheme } from "../../theme/theme";

export default function Header() {
  const location = useLocation();
  const getPath = () => {
    return location.pathname;
  };
  const [theme, setTheme] = useState(lightTheme);
  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme.palette.mode === "light" ? darkTheme : lightTheme
    );
  };

  return (
    <Box
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
        <FitnessCenterRoundedIcon />
      </Avatar>
      <Box sx={{ ml: "auto", display: "flex", alignItems: "center", gap: 1.5 }}>
        <Button
          variant="outlined"
          sx={{
            border: 0.5,
            borderColor: theme.palette.primary.main,
            borderRadius: "30px",
            p: 1,
          }}
          onClick={toggleTheme}
        >
          {theme == lightTheme ? (
            <LightModeIcon sx={{ color: "black" }} />
          ) : (
            <ModeNightIcon sx={{ color: "white" }} />
          )}
        </Button>
        {getPath() === "/login" ? (
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
              Register
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
        )}
      </Box>
    </Box>
  );
}
