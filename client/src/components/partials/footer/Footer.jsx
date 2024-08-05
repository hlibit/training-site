import { Box, Typography} from "@mui/material";
import { useTheme } from "@mui/material/styles";
export default function Footer() {
  const theme = useTheme();
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  return (
    <Box
      component="footer"
      sx={{
        flex: "0 0 auto",
        borderTop: 1,
        borderTopColor: theme.palette.primary.border,
        py: 2,
        textAlign: "center",
        backgroundColor: theme.palette.secondary.main,
      }}
    >
      <Typography variant="body1" sx={{ fontSize: "14px" }}>
        © {currentYear} kushii Training.All rights reserved.
      </Typography>
    </Box>
  );
}
