import { Box, CssBaseline, Typography } from "@mui/material";
import PrimaryAppBar from "./templates/PrimaryAppBar.tsx";
import PrimaryDraw from "./templates/PrimaryDraw.tsx";
import SecondaryDraw from "./templates/SecondaryDraw.tsx";
import MainContent from "./templates/MainContent.tsx";

const Home = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <PrimaryAppBar />

      <PrimaryDraw>
        {[...Array(10)].map((_, i) => (
          <Typography key={i} paragraph>
            {i + 1}
          </Typography>
        ))}
      </PrimaryDraw>
      <SecondaryDraw>
        {[...Array(15)].map((_, i) => (
          <Typography key={i} paragraph>
            {i + 1}
          </Typography>
        ))}
      </SecondaryDraw>
      <MainContent>
        {[...Array(30)].map((_, i) => (
          <Typography key={i} paragraph>
            {i + 1}
          </Typography>
        ))}
      </MainContent>
    </Box>
  );
};

export default Home;
