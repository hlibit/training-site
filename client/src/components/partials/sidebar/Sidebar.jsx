import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import HistoryIcon from "@mui/icons-material/History";
import { useTheme } from "@mui/material/styles";
import { useNavigate,useLocation } from "react-router-dom";

export default function Sidebar() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const getPath = () =>{
    return location.pathname;
  } ;
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
          <ListItemButton sx={{backgroundColor: getPath() === "/main/profile" ? theme.palette.primary.li: "inherit"}} onClick={()=>navigate("/main/profile")}>
            <ListItemIcon >
              <AccountCircleIcon
              sx={{color: theme.palette.primary.main}}
                fontSize="large"
              />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton >
            <ListItemIcon>
              <AddCircleIcon
               sx={{color: theme.palette.primary.main}}
                fontSize="large"
              />
            </ListItemIcon>
            <ListItemText primary="New Training" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <HistoryIcon
               sx={{color: theme.palette.primary.main}}
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
