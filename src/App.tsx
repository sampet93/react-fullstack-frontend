import { Box } from "@mui/material";
import "./App.css";
import Home from "./components/pages/Home";
import Navbar from "./components/layout/Navbar";

function App() {
  return (
    <Box>
      <Navbar></Navbar>
      <Home></Home>
    </Box>
  );
}

export default App;
