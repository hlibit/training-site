import { Box, Typography,Avatar } from "@mui/material";
import FitnessCenterRoundedIcon from "@mui/icons-material/FitnessCenterRounded";

export default function Header() {
  return (
    <Box
      sx={{
        borderBottom: 0.5,
        borderBottomColor: "gray",
        py: 0.75,
        px: 2,
        display:"flex",
        flexWrap:"nowrap",
        alignItems:"center"
      }}
    >
        <Avatar  sx={{ m: 1, bgcolor: "black" }}>
            <FitnessCenterRoundedIcon />
          </Avatar>
      <Typography variant="body1" sx={{ fontSize: "18px",ml:"auto"}}>
        Welcome!
      </Typography>
    </Box>
  );
}
