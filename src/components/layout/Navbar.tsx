import { AppBar, Box, Typography, Toolbar, Button } from "@mui/material";
import React from "react";

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            App
          </Typography>
          <Button color="inherit">Users</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
