import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../partials/header/Headerr";
import Footer from "../../partials/footer/Footer";
import { useTheme } from "@mui/material/styles";
import Sidebar from "../../partials/sidebar/Sidebar";
import {
  Button,
  TextField,
  Container,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
} from "@mui/material";

export default function CreateTraining() {
  const [sports, setSports] = useState("Fitness");
  const [level, setLevel] = useState("Light");
  const [energy, setEnergy] = useState("");
  const [duration, setDuration] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const enterFunc = async () => {
      try {
        await axios.get("http://localhost:3101/api/main", {
          withCredentials: true,
        });
      } catch (error) {
        if (error.response && error.response.data.unLogged) {
          navigate("/login");
        } else {
          console.error(error);
        }
      }
    };

    enterFunc();
  }, [navigate]);

  const handleCreateTrainingSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3101/api/main/training/create", {
        sports,
        level,
        energy,
        duration,
        status: "Pending",
      });
      if(response.data.message) {
        console.log(response)
        setMessage(response.data.message);
      }
       
    } catch (error) {
      console.log(error);
      const keys = Object.keys(error.response.data);
      const hasKey = keys.includes("findErrors");
      if (!hasKey) {
        setError(error.response.data.message);
      } else {
        const errorMessages = error.response.data.findErrors.map((err) => err);
        setError(errorMessages);
      }
    }
  };

  useEffect(() => {
    if (message !== "" || error !== "") {
      const timer = setTimeout(() => {
        setMessage("");
        setError("")
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [message,error]);

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        display: "flex",
        flexDirection: "column",
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.secondary.main,
        height: "100vh",
      }}
    >
      <Header />
      <Box
        component="main"
        sx={{
          flex: "1 0 auto",
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          alignItems: "center",
          gap: 5,
          textAlign: "center",
        }}
      >
        <Sidebar />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box
            sx={{
              borderBottom: 1,
              pt: 1,
            }}
          >
            <h2 style={{ padding: 0, margin: 0 }}>Create Training</h2>
            <p style={{ color: "gray", padding: 0, margin: "5px" }}>
              Set parameters of Training
            </p>
          </Box>
          <Box
            component="form"
            onSubmit={handleCreateTrainingSubmit}
            noValidate
            sx={{ mt: 1, width: 600 }}
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
            {message && (
              <Box
                sx={{
                  textAlign: "center",
                  color: "greean",
                  p: 1,
                  border: 0.5,
                  borderColor: "green",
                  borderRadius: 2,
                }}
              >
                {message}
              </Box>
            )}
            <FormControl fullWidth margin="normal">
              <InputLabel id="sports-label">Select Sport</InputLabel>
              <Select
                labelId="sports-label"
                id="sports"
                value={sports}
                label="Select Sport"
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
            <FormControl fullWidth margin="normal">
              <InputLabel id="level-label">Select Level</InputLabel>
              <Select
                labelId="level-label"
                id="level"
                value={level}
                label="Select Level"
                onChange={(e) => setLevel(e.target.value)}
              >
                <MenuItem value={"Light"}>Light</MenuItem>
                <MenuItem value={"Medium"}>Medium</MenuItem>
                <MenuItem value={"Hard"}>Hard</MenuItem>
              </Select>
            </FormControl>
            <TextField
              margin="normal"
              required
              fullWidth
              id="energy"
              type="number"
              label="Set Callories"
              name="energy"
              value={energy}
              autoComplete="energy"
              autoFocus
              onChange={(e) => setEnergy(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="duration"
              type="number"
              label="Set Duration"
              name="duration"
              value={duration}
              autoComplete="duration"
              autoFocus
              onChange={(e) => setDuration(e.target.value)}
            />
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
          </Box>
        </Box>
      </Box>
      <Footer />
    </Container>
  );
}
