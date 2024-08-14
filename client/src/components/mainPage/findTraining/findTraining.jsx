import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../partials/header/Headerr";
import Footer from "../../partials/footer/Footer";
import { useTheme } from "@mui/material/styles";
import Sidebar from "../../partials/sidebar/Sidebar";
import {
  TextField,
  Container,
  Select,
  MenuItem,
  Slider,
  InputLabel,
  FormControl,
  Button,
  Box,
} from "@mui/material";
import { dynamicFilterFunc } from "./filterLogic";
import { ChangeIcon } from "./changeIcon";

export default function FindTraining() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [trainingParam, setTrainingParam] = useState("");
  const [userTrainings, setUserTrainings] = useState([]);
  const [searchNumQuery, setSearchNumQuery] = useState(null);
  const [filteredTrainings, setFilteredTrainings] = useState([]);

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

  useEffect(() => {
    const GetTrainings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3101/api/main/training/",
          { withCredentials: true }
        );
        if (response.data) {
          const result = response.data;
          setUserTrainings(result);
          setFilteredTrainings(result);
        }
      } catch (error) {
        console.error(error);
      }
    };
    GetTrainings();
  }, []);

  const handleAddSportsmanTraining = async (id) => {
    try {
      const response = await axios.post(
        "http://localhost:3101/api/main/training/addTraining",
        {
          trainingId: id,
        },
        { withCredentials: true }
      );
      if (response.status === 200) {
        const updatedTrainings = filteredTrainings.filter(
          (training) => training._id !== id
        );
        setMessage(response.data.message);
        setFilteredTrainings(updatedTrainings);
      } 
    } catch (error) {
      console.error(error);
    }
  };

  //timer showing update
  useEffect(() => {
    if (message === "Challenge Accepted") {
      const timer = setTimeout(() => {
        setMessage("");
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSearchQueryChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    const filteredResults = dynamicFilterFunc(
      userTrainings,
      trainingParam,
      query,
      searchNumQuery
    );
    setFilteredTrainings(filteredResults);
  };

  const handleSearchNumQueryChange = (e, newValue) => {
    const numQuery = newValue;
    setSearchNumQuery(numQuery);

    const filteredResults = dynamicFilterFunc(
      userTrainings,
      trainingParam,
      searchQuery,
      numQuery
    );
    setFilteredTrainings(filteredResults);
  };

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        display: "flex",
        flexDirection: "column",
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.secondary.main,
        minHeight: "100vh",
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
            mr: 4,
            width: "100%",
            height: "100%",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              borderBottom: 1,
              pt: 1,
              minWidth: 500,
            }}
          >
            <h2 style={{ padding: 0, margin: 0 }}>Find. Your. Challenge.</h2>
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
            <Box
              sx={{
                display: "flex",
                gap: 4,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FormControl margin="dense" sx={{ minWidth: 120 }}>
                <InputLabel id="filterParam">Filter by</InputLabel>
                <Select
                  labelId="filterParam"
                  id="filterParam"
                  value={trainingParam}
                  label="Filter by"
                  onChange={(e) => setTrainingParam(e.target.value)}
                >
                  <MenuItem value={"level"}>Level</MenuItem>
                  <MenuItem value={"sports"}>Sport</MenuItem>
                  <MenuItem value={"energy"}>Calories</MenuItem>
                  <MenuItem value={"duration"}>Duration</MenuItem>
                  <MenuItem value={"trainers"}>Trainer</MenuItem>
                </Select>
              </FormControl>
              {trainingParam === "energy" ? (
                <Slider
                  aria-label="kCal"
                  defaultValue={300}
                  valueLabelDisplay="auto"
                  step={50}
                  marks
                  min={300}
                  max={800}
                  onChange={handleSearchNumQueryChange}
                />
              ) : trainingParam === "duration" ? (
                <Slider
                  aria-label="Duration"
                  defaultValue={45}
                  valueLabelDisplay="auto"
                  step={10}
                  marks
                  min={45}
                  max={120}
                  onChange={handleSearchNumQueryChange}
                />
              ) : (
                <TextField
                  value={searchQuery}
                  label="Type here"
                  margin="dense"
                  onChange={handleSearchQueryChange}
                ></TextField>
              )}
            </Box>
          </Box>
          {filteredTrainings.length > 0 ? (
            <Box
              sx={{
                mt: 5,
                width: "100%",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 3,
              }}
            >
              {filteredTrainings.map((t, index) => (
                <Box
                  key={index}
                  sx={{
                    minWidth: 200,
                    maxWidth: 300,
                    flex: "1 1 200px",
                    border: 1,
                    height: "auto",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: 2,
                    m: 1,
                    ":hover": {
                      scale: "1.05",
                      transition: "0.25s",
                    },
                  }}
                >
                  <h3 style={{ margin: "10px" }}>{t.sports}</h3>
                  <Box sx={{ m: 0 }}>{ChangeIcon(t.sports)}</Box>
                  <p>
                    Level:{" "}
                    <b
                      style={
                        t.level === "Hard"
                          ? { color: "Red" }
                          : t.level === "Medium"
                          ? { color: "yellow" }
                          : { color: "green" }
                      }
                    >
                      {t.level}
                    </b>
                  </p>
                  <p>Wasting: {t.energy} ccal</p>
                  <p>Duration: {t.duration} Minutes</p>
                  <p>
                    Trainer:{" "}
                    <b>
                      {t.trainers[0].surname} {t.trainers[0].name}
                    </b>
                  </p>
                  <p>Status: {t.status}</p>
                  <Button
                    type="submit"
                    variant="contained"
                    onClick={() => handleAddSportsmanTraining(t._id)}
                    sx={{
                      my: 1,
                      ":hover": {
                        backgroundColor: () =>
                          theme.palette.mode === "light"
                            ? "#313131"
                            : "#b5b5b5",
                      },
                    }}
                  >
                    Take Challenge
                  </Button>
                </Box>
              ))}
            </Box>
          ) : (
            <Box>
              <h1>No trainings available.</h1>
            </Box>
          )}
        </Box>
      </Box>
      <Footer />
    </Container>
  );
}
