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
        const response = await axios.get("http://localhost:3101/api/main/training/", { withCredentials: true });
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
            mr:4,
            border: 1,
            width: "100%",
            height: "90%"
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
          {userTrainings.length > 0  ? (
            <Box
              sx={{
                mt: 5,
                height: 300,
                width: 300,
                display: "flex",
                flexDirection: "row",
                flexWrap: "nowrap",
                alignItems:"center",
                gap: 5,
              }}
            >
                {userTrainings.map((t,index)=>{
                    return (
                        <Box key={index} sx={{
                            width:200,
                            height:200,
                            border:1
                        }}> 
                            <h3>{t.sports}</h3>
                            <p>{t.energy} ccal</p>
                            <p>Trainer: {t.trainers[0].name}</p>
                        </Box>
                    )
                })}
            </Box> 
          ) : (
            <Box>
                <h1>No trainings available.</h1>
            </Box>
          )}

          <Button
            type="submit"
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
      <Footer />
    </Container>
  );
}
