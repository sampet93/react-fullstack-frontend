import { AppBar, Box, Typography, Toolbar, Button } from "@mui/material";

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            App
          </Typography>
          <Button color="inherit">Manage users</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
