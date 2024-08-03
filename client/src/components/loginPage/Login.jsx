import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Button,
  CssBaseline,
  TextField,
  Link,
  Typography,
  Container,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
} from "@mui/material";
import Footer from "../partials/footer/Footer";
import Header from "../partials/header/Headerr";

export default function LoginPage({toggleTheme}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [typeUser, setTypeUser] = useState("Sportsman");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3101/api/login", {
        email,
        password,
        typeUser,
      });
      if (response.data.Login) {
        navigate("/home");
      } else navigate("/login");
    } catch (error) {
      const keys = Object.keys(error.response.data);
      const hasKey = keys.includes("findErrors");
      if (!hasKey) {
        setError(error.response.data);
      } else {
        const errorMessages = error.response.data.findErrors.map((err) => err);
        setError(errorMessages);
      }
    }
  };

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      
      <CssBaseline />
      <Header />
     
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          flex: "1 0 auto",
          display: "flex",
         
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            {error && (
              <Box
                sx={{
                  textAlign:"center",
                  color: "red",
                  p: 1,
                  border: 0.5,
                  borderColor: "red",
                  borderRadius: 2,
                }}
              >
               Error: {error}
              </Box>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={email}
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="typeUser-label">Select your role</InputLabel>
              <Select
                labelId="typeUser-label"
                id="typeUser"
                value={typeUser}
                label="Select your role"
                onChange={(e) => setTypeUser(e.target.value)}
              >
                <MenuItem value={"Sportsman"}>Sportsman</MenuItem>
                <MenuItem value={"Trainer"}>Trainer</MenuItem>
              </Select>
            </FormControl>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
                <Link href="/register" variant="body1">
                  {"Don't have an account? Sign Up"}
                </Link>
          </Box>
        </Box>
      </Container>
      <Footer />
    </Container>
  );
}
