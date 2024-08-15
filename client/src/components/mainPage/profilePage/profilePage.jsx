import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../partials/header/Headerr";
import Footer from "../../partials/footer/Footer";
import {
  Container,
  Box,
  Button,
  TextField,
  Select,
  Typography,
  Rating,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Sidebar from "../../partials/sidebar/Sidebar";

export default function ProfilePage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [age, setAge] = useState();
  const [rating,setRating] = useState(null);
  const [sports, setSports] = useState("Fitness");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  //checks state of user
  useEffect(() => {
    const enterFunc = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3101/api/main/profile",
          {
            withCredentials: true,
          }
        );
        setName(response.data.data.name);
        setSurname(response.data.data.surname);
        setAge(response.data.data.age);
        setSports(response.data.data.sports);
        setEmail(response.data.data.email);
        setRating(response.data.data.rating);
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

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3101/api/main/profile/edit",
        {
          name,
          surname,
          age,
          sports,
          email,
        },
        {
          withCredentials: true,
        }
      );
      setMessage(response.data.message);
      if (response.data.isEdited) return navigate("/main/profile");
      else {
        setError("Something went wrong.");
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
  };

  //timer showing update
  useEffect(() => {
    if (message === "Your profile is updated!") {
      const timer = setTimeout(() => {
        setMessage("");
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [message]);

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
              display: "flex",
              flexDirection: "column",
              border: 1,
              width: 700,
              p: 3,
            }}
          >
            <Box
              sx={{
                borderBottom: 1,
                pt: 1,
              }}
            >
              <h2 style={{ padding: 0, margin: 0 }}>Your profile</h2>
              <p style={{ color: "gray", padding: 0, margin: "5px" }}>
                Change information about yourself
              </p>
              <Box sx={{display:"flex",gap:2,alignItems:"center",justifyContent:"center"}}>
                <Typography component="legend">Your Rating:</Typography>
                <Rating name="your-rating" value={rating} readOnly max={10} precision={0.5}/>
                <p>{rating}</p>
              </Box>
            </Box>

            <Box
              component="form"
              onSubmit={handleEditSubmit}
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
              
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                name="name"
                value={name}
                autoComplete="name"
                label="Change your Name"
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="surname"
                label="Change your Surname"
                name="surname"
                value={surname}
                autoComplete="surname"
                onChange={(e) => setSurname(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="age"
                type="number"
                label="Age"
                InputLabelProps={{
                  shrink: true,
                }}
                name="age"
                value={age}
                autoComplete="age"
                onChange={(e) => setAge(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Change Email Address"
                name="email"
                value={email}
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
              />
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
                Save changes
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Footer />
    </Container>
  );
}
