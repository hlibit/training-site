import React, { useEffect, useState } from "react";
import { Box, Typography, Avatar, Button, Link } from "@mui/material";
import { useLocation } from "react-router-dom";
import FitnessCenterRoundedIcon from "@mui/icons-material/FitnessCenterRounded";
import axios from "axios";

export default function Header() {
  const [greetings, setGreetings] = useState("");
  const location = useLocation();
  const getPath = () => {
    return location.pathname;
  };

  const dynamicResponse = async () => {
    try {
      const response = await axios.get("http://localhost:3101/api/main", {
        withCredentials: true,
      });
      setGreetings(response.data.message);
      return true;
    } catch (error) {
      if (error.response && error.response.data.unLogged) {
        return false;
      } else return console.log(error);
    }
  };

  useEffect(() => {
    dynamicResponse();
  }, []);

  return (
    <Box
      sx={{
        borderBottom: 0.5,
        borderBottomColor: "gray",
        py: 0.5,
        px: 2,
        display: "flex",
        flexWrap: "nowrap",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "black" }}>
        <FitnessCenterRoundedIcon />
      </Avatar>
      {greetings? (
        <Typography variant="body1" sx={{ fontSize: "18px", ml: "auto" }}>
          {greetings}!
        </Typography>
      ) : (
        <Box sx={{ ml: "auto", display: "flex", gap: 2 }}>
          {getPath() === "/login" ? (
            <Button
              variant="contained"
              sx={{ mt: 3, mb: 2, p: 0.3, backgroundColor: "black" }}
            >
              <Link
                href="/register"
                variant="body1"
                underline="none"
                sx={{ color: "white", p: 1 }}
              >
                Register
              </Link>
            </Button>
          ) : (
            <Button variant="outlined" sx={{ mt: 2, mb: 2 ,p: 0.3}}>
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
      )}
    </Box>
  );
}
