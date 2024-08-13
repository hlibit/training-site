import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import HistoryIcon from "@mui/icons-material/History";
import SecurityIcon from "@mui/icons-material/Security";
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import { useTheme } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function Sidebar() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  const getPath = () => location.pathname;

  useEffect(() => {
    const checkUserType = async () => {
      try {
        const response = await axios.get("http://localhost:3101/api/main", {
          withCredentials: true,
        });
        setUserType(response.data.userType);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); 
      }
    };

    checkUserType();
  }, []);

  if (loading) {
    return (
      <Box
        component="aside"
        sx={{
          borderRight: 1,
          borderRightColor: theme.palette.primary.border,
          minWidth: 300,
          width: "26%",
          height: "100%",
        }}
      >
      </Box>
    );
  }

  return (
    <Box
      component="aside"
      sx={{
        borderRight: 1,
        borderRightColor: theme.palette.primary.border,
        minWidth: 300,
        width: "26%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 4,
        alignItems: "center",
      }}
    >
      <List sx={{ m: 0, p: 0, width: "100%" }}>
        <ListItem disablePadding>
          <ListItemButton
            sx={{
              backgroundColor:
                getPath() === "/main/profile"
                  ? theme.palette.primary.li
                  : "inherit",
            }}
            onClick={() => navigate("/main/profile")}
          >
            <ListItemIcon>
              <AccountCircleIcon
                sx={{ color: theme.palette.primary.main }}
                fontSize="large"
              />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            sx={{
              backgroundColor:
                getPath() === "/main/security"
                  ? theme.palette.primary.li
                  : "inherit",
            }}
            onClick={() => navigate("/main/security")}
          >
            <ListItemIcon>
              <SecurityIcon
                sx={{ color: theme.palette.primary.main }}
                fontSize="large"
              />
            </ListItemIcon>
            <ListItemText primary="Security" />
          </ListItemButton>
        </ListItem>
        {userType === "Trainer" ? (
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/main/create")}>
              <ListItemIcon>
                <AddCircleIcon
                  sx={{ color: theme.palette.primary.main }}
                  fontSize="large"
                />
              </ListItemIcon>
              <ListItemText primary="Create Training" />
            </ListItemButton>
          </ListItem>
        ) : (
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ListAltOutlinedIcon
                  sx={{ color: theme.palette.primary.main }}
                  fontSize="large"
                />
              </ListItemIcon>
              <ListItemText primary="Find Training" />
            </ListItemButton>
          </ListItem>
        )}

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <HistoryIcon
                sx={{ color: theme.palette.primary.main }}
                fontSize="large"
              />
            </ListItemIcon>
            <ListItemText primary="History" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}
