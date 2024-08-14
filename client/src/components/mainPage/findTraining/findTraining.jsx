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
import SportsMmaIcon from "@mui/icons-material/SportsMma";
import PoolIcon from "@mui/icons-material/Pool";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import SportsGymnasticsIcon from "@mui/icons-material/SportsGymnastics";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

export default function FindTraining() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [userTrainings, setUserTrainings] = useState([]);

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
    const GetTrainigs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3101/api/main/training/",
          { withCredentials: true }
        );
        console.log(response);
        if (response.data) {
          const result = response.data;
          setUserTrainings(result);
        } else return setError("error!!!");
      } catch (error) {
        console.error(error);
      }
    };
    GetTrainigs();
  }, []);

  const ChangeIcon = (sport) => {
    switch (sport) {
      case "Swimming":
        return <PoolIcon />;
      case "Running":
        return <DirectionsRunIcon />;
      case "Power-Lifting":
        return <FitnessCenterIcon />;
      case "Fitness":
        return <SportsGymnasticsIcon />;
      case "Boxing":
        return <SportsMmaIcon />;
      case "Cross-Fit":
        return <EmojiEventsIcon />;
      default:
        return null;
    }
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
        minHeight:"100vh",
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
            overflow: "hidden", // Убираем overflow, чтобы карточки не выходили за границы контейнера
          }}
        >
          <Box
            sx={{
              borderBottom: 1,
              pt: 1,
            }}
          >
            <h2 style={{ padding: 0, margin: 0 }}>Find. Your. Challenge.</h2>
          </Box>
          {userTrainings.length > 0 ? (
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
              {userTrainings.map((t, index) => {
                return (
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
                      sx={{
                        mt: 1,
                        mb: 2,
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
                );
              })}
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
