import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../partials/header/Headerr";
import Footer from "../../partials/footer/Footer";
import { Container, Box, Button, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Sidebar from "../../partials/sidebar/Sidebar";

export default function Security() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [password, setPassword] = useState("");
  const [repPassword, setRepPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  //checks state of user
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

  //logout
  const logoutHandler = async () => {
    try {
       const response = await axios.post("http://localhost:3101/api/logout",
            {
              withCredentials: true,
            })
            if(response.status === 200){
                alert(response.data.message);
                navigate("/login")
            }
    } catch (error) {
        setError("Something went wrong...")
    }
  };

  //change password
  const handleChangePasswordSubmit = async (event) => {
    event.preventDefault();
    try {
      if (password === repPassword) {
        const response = await axios.post(
          "http://localhost:3101/api/main/profile/changePassword",
          {
            password,
          },
          {
            withCredentials: true,
          }
        );
        setMessage(response.data.message);
        if (response.status === 200){
          navigate("/main/security")
          setPassword("")
          setRepPassword("")
        }
        else {
          setError("Something went wrong.");
        }
      } else {
        setError("Passwords doesn't match");
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
              <h2 style={{ padding: 0, margin: 0 }}>Change your password</h2>
            </Box>
            <Box
              component="form"
              onSubmit={handleChangePasswordSubmit}
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
                id="password"
                name="password"
                type="password"
                value={password}
                label="Create Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="repPassword"
                name="repPassword"
                type="password"
                value={repPassword}
                label="Repeat password"
                onChange={(e) => setRepPassword(e.target.value)}
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
                Save Password
              </Button>
            </Box>
          </Box>
          <Button
            variant="outlined"
            onClick={() => logoutHandler()}
            sx={{
              mt: 10,
              px: 4,
              py: 2.5,
              borderColor: "#c50101",
              ":hover": {
                bgColor: "#ef0409",
              },
            }}
          >
            LOGOUT
          </Button>
        </Box>
      </Box>
      <Footer />
    </Container>
  );
}
