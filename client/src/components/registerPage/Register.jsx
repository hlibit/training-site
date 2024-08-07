import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

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

export default function Register() {
  const [name, setName] = useState("");
  const [surname,setSurname] = useState("");
  const [age, setAge] = useState();
  const [sports, setSports] = useState("Fitness");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [typeUser, setTypeUser] = useState("Sportsman");
  const [error, setError] = useState("");
  
const theme = useTheme();
const navigate = useNavigate();
axios.defaults.withCredentials = true;

const handleRegisterSubmit = async(event)=>{
event.preventDefault();
try {
  const response = await axios.post("http://localhost:3101/api/register",{
    name,
    surname,
    age,
    sports,
    email,
    password,
    typeUser,
  })
  if(response.data.isCreated) return navigate("/main") 
    else{
    setError("Undefined error...")
  } 
} catch (error) {
  console.log(error);
  const keys = Object.keys(error.response.data);
      const hasKey = keys.includes("findErrors");
      if (!hasKey) {
        setError(error.response.data);
      } else {
        const errorMessages = error.response.data.findErrors.map((err) => err);
        setError(errorMessages);
      }
}
}

 
  return (
    <Container
    disableGutters
      maxWidth={false}
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.palette.secondary.main,
        height: "100vh",
      }}
    >
    <CssBaseline />
    <Header />
    <Container
        disableGutters
        component="main"
        maxWidth="xs"
        sx={{
          flex: "1 0 auto",
          display: "flex",
          flexDirection: "column",
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.primary.main,
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
            Start your sports Journey!
          </Typography>
          <Box
            component="form"
            onSubmit={handleRegisterSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {error && (
              <Box
                sx={{
                  textAlign: "center",
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
              id="name"
              label="Enter your Name"
              name="name"
              value={name}
              autoComplete="name"
              autoFocus
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="surname"
              label="Enter your Surname"
              name="surname"
              value={surname}
              autoComplete="surname"
              autoFocus
              onChange={(e) => setSurname(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="age"
              type="number"
              label="Enter your Age"
              name="age"
              value={age}
              autoComplete="age"
              autoFocus
              onChange={(e) => setAge(e.target.value)}
            />
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
            <FormControl fullWidth margin="normal">
              <InputLabel id="sports-label">Select your Sport</InputLabel>
              <Select
                labelId="sports-label"
                id="sports"
                value={sports}
                label="Select your Sport"
                onChange={(e) => setSports(e.target.value)}
              >
                <MenuItem value={"Power-Lifting"}>Power-Lifting</MenuItem>
                <MenuItem value={"Swimming"}>Swimming</MenuItem>
                <MenuItem value={"Running"}>Running</MenuItem>
                <MenuItem value={"Fitness"}>Fitness</MenuItem>
                <MenuItem value={"Boxing"}>Boxing</MenuItem>
                <MenuItem value={"Cross-Fit"}>Cross-Fit</MenuItem>
              </Select>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                ":hover": {
                  backgroundColor: () =>
                    theme.palette.mode === "light" ? "#313131" : "#b5b5b5",
                },
              }}
            >
              Create
            </Button>
            <Link href="/login" variant="body1">
              {"Have an account? Sign in"}
            </Link>
          </Box>
        </Box>
        </ Container>
    <Footer />
    </Container>

  )

  ;
}
