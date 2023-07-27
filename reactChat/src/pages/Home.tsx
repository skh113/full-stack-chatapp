import { Box, CssBaseline, Typography } from "@mui/material";
import PrimaryAppBar from "./templates/PrimaryAppBar.tsx";
import PrimaryDraw from "./templates/PrimaryDraw.tsx";

const Home = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <PrimaryAppBar />
      <PrimaryDraw>
        {[...Array(25)].map((_, i) => (
          <Typography key={i} paragraph>
            {i + 1}
          </Typography>
        ))}
      </PrimaryDraw>
    </Box>
  );
};

export default Home;
