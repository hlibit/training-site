import { Box, Typography } from "@mui/material";

export default function Footer() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  return (
    <Box sx={{ flex: "0 0 auto", borderTop: .5, borderTopColor: "gray", py: 2, textAlign: "center" }}>
    <Typography variant="body1" sx={{fontSize:'14px'}}>
    © {currentYear} kushii Training.All rights reserved.
    </Typography>
  </Box>
  );
}
