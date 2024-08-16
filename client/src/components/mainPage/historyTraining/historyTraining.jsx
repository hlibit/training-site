import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../partials/header/Headerr";
import Footer from "../../partials/footer/Footer";
import { useTheme } from "@mui/material/styles";
import Sidebar from "../../partials/sidebar/Sidebar";
import { Container, Box } from "@mui/material";

export default function History() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [userHistory, setUserHistory] = useState([]);
  const [typeUser, setTypeUser] = useState("");

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
    const GetUserHistory = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3101/api/main/training/history",
          { withCredentials: true }
        );
        if (response.data) {
          const history = response.data.history;
          console.log(response.data);
          setUserHistory(history);
          setTypeUser(response.data.typeUser);
        }
      } catch (error) {
        console.error(error);
      }
    };
    GetUserHistory();
  }, []);

  useEffect(() => {
    if (message !== "") {
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
            <h2 style={{ padding: 0, margin: 0 }}>History of Trainings.</h2>
          </Box>
          {userHistory.length > 0 ? (
            typeUser === "Sportsman" ? (
              <Box
                sx={{
                  my: 3,
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <ul>
                  {userHistory.map((i) => {
                    return (
                      <li
                        style={{
                          borderBottom: "1px solid gray",
                          margin: 0,
                          padding: 0,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent:"space-around",
                            gap: 1,
                            "& > *": {
                              borderRight: "1px solid gray",
                              pr: 1,
                            },
                            "& > *:last-child": {
                              borderRight: "none",
                            },
                          }}
                        >
                          <p>ID: {i._id}</p>
                          <h4>Sport: {i.trainings[0].sports}</h4>
                          <h4>
                            Trainer: {i.trainers[0].name}{" "}
                            {i.trainers[0].surname}
                          </h4>
                          <p>Duration {i.trainings[0].duration}</p>
                          <p>Status: {i.status}</p>
                          <h4>Cancelled by: {i.canceledBy}</h4>
                        </Box>
                      </li>
                    );
                  })}
                </ul>
              </Box>
            ) : (
              <Box
                sx={{
                  my: 3,
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <ul>
                  {userHistory.map((i) => {
                    return (
                      <li
                        style={{
                          borderBottom: "1px solid gray",
                          margin: 0,
                          padding: 0,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent:"space-around",
                            gap: 1,
                            "& > *": {
                              borderRight: "1px solid gray",
                              pr: 1,
                            },
                            "& > *:last-child": {
                              borderRight: "none",
                            },
                          }}
                        >
                          <p>ID: {i._id}</p>
                          <h4>Sport: {i.trainings[0].sports}</h4>
                          <h4>
                            Sportsmen: {i.sportsmen.map((s)=>{
                              return <p>{s.name} {s.surname}</p>
                            })}
                          </h4>
                          <p>Duration {i.trainings[0].duration}</p>
                          <p>Status: {i.status}</p>
                          <h4>Cancelled by: {i.canceledBy}</h4>
                        </Box>
                      </li>
                    );
                  })}
                </ul>
              </Box>
            )
          ) : (
            <Box>
              <h2>History is clear.</h2>
            </Box>
          )}
        </Box>
      </Box>
      <Footer />
    </Container>
  );
}
