import { Box, CssBaseline } from "@mui/material";
import PrimaryAppBar from "./templates/PrimaryAppBar.tsx";
import PrimaryDraw from "./templates/PrimaryDraw.tsx";

const Home = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <PrimaryAppBar />
      <PrimaryDraw>
        <h2>hey</h2>
      </PrimaryDraw>
    </Box>
  );
};

export default Home;
