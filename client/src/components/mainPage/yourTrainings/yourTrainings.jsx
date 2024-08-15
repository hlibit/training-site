import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../partials/header/Headerr";
import Footer from "../../partials/footer/Footer";
import { useTheme } from "@mui/material/styles";
import Sidebar from "../../partials/sidebar/Sidebar";
import { Container, Button, Box } from "@mui/material";
import { ChangeIcon } from "../findTraining/changeIcon";

export default function YourTraining() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [userTrainings, setUserTrainings] = useState([]);
  const [userType, setUserType] = useState("");
  const [error, setError] = useState(null);

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
    const GetUserTrainings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3101/api/main/training/yourTrainings",
          { withCredentials: true }
        );
        if (response.data) {
          const result = response.data;
          setUserType(result.typeUser);
          setUserTrainings(result.filteredTrainings);
        }
      } catch (error) {
        setError("Failed to fetch your trainings.");
        console.error(error);
      }
    };
    GetUserTrainings();
  }, []);

  useEffect(() => {
    if (message !== "") {
      const timer = setTimeout(() => {
        setMessage("");
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  const handlerChangeStatus = async (status, id) => {
    try {
      const response = await axios.post(
        "http://localhost:3101/api/main/training/switch",
        {
          trainingId: id,
          status: status,
        },
        {
          withCredentials: true,
        }
      );
      if (response.data) {
        setUserTrainings((prevTrainings) =>
          prevTrainings.filter((training) => training._id !== id)
        );
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error(error);
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
            <h2 style={{ padding: 0, margin: 0 }}>Your Challenges.</h2>
            {message && (
              <Box
                sx={{
                  textAlign: "center",
                  color: "green",
                  p: 1,
                  m: 1,
                  border: 0.5,
                  borderColor: "green",
                  borderRadius: 2,
                }}
              >
                {message}
              </Box>
            )}
            {error && (
              <Box
                sx={{
                  textAlign: "center",
                  color: "red",
                  p: 1,
                  m: 1,
                  border: 0.5,
                  borderColor: "red",
                  borderRadius: 2,
                }}
              >
                {error}
              </Box>
            )}
          </Box>
          {userTrainings.length > 0 &&
          userTrainings.some(
            (t) => t.status !== "Canceled" && t.status !== "Finished"
          ) ? (
            <Box
              sx={{
                my: 3,
                width: "100%",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 3,
              }}
            >
              {userType === "Sportsman"
                ? userTrainings.map(
                    (t, index) =>
                      t.status === "Pending" && (
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
                            variant="contained"
                            onClick={() =>
                              handlerChangeStatus("Canceled", t._id)
                            }
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
                            Cancel
                          </Button>
                        </Box>
                      )
                  )
                : userTrainings.map(
                    (t, index) =>
                      t.status === "Pending" && (
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

                          <ul>
                            {" "}
                            Sportsmen: {""}
                            {t.sportsmen.length > 0 ? (
                              t.sportsmen.map((s, index) => {
                                return (
                                  <li key={index}>
                                    <b>
                                      {s.name} {s.surname}
                                    </b>
                                  </li>
                                );
                              })
                            ) : (
                              <li>
                                <b>No sportsmen</b>
                              </li>
                            )}
                          </ul>

                          <p>Status: {t.status}</p>
                          <Button
                            variant="outlined"
                            onClick={() =>
                              handlerChangeStatus("Finished", t._id)
                            }
                            sx={{
                              my: 1,
                              ":hover": {
                                backgroundColor: "#bf2626",
                              },
                            }}
                          >
                            Finished
                          </Button>
                          <Button
                            variant="contained"
                            onClick={() =>
                              handlerChangeStatus("Canceled", t._id)
                            }
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
                            Cancel
                          </Button>
                        </Box>
                      )
                  )}
            </Box>
          ) : (
            <Box>
              <h1>You have no trainings.</h1>
            </Box>
          )}
        </Box>
      </Box>
      <Footer />
    </Container>
  );
}
