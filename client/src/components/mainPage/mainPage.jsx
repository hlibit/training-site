import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../partials/header/Headerr";
import Footer from "../partials/footer/Footer";
import { Container, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Sidebar from "../partials/sidebar/Sidebar";

export default function MainPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const theme = useTheme();

  useEffect(() => {
    const enterFunc = async () => {
      try {
        const response = await axios.get("http://localhost:3101/api/main", {
          withCredentials: true,
        });
        setName(response.data.message);
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
          <h1>Achive your goals now. Upgrade yourself.</h1>
          <h3 style={{ color: "gray" }}>Welcome, {name} !</h3>
        </Box>
      </Box>
      <Footer />
    </Container>
  );
}
