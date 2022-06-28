import { Box, Container, CssBaseline, Typography } from "@mui/material";
import React from "react";

function Homepage() {
  return (
    <Container component="main">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h2">
          EMS-Cert-Track
        </Typography>
        <Typography component="p">
          Your one stop shop for recertification
        </Typography>
      </Box>
    </Container>
  );
}

export default Homepage;
