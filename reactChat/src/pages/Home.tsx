import { Box, CssBaseline, Typography } from "@mui/material";
import PrimaryAppBar from "./templates/PrimaryAppBar.tsx";
import PrimaryDraw from "./templates/PrimaryDraw.tsx";
import SecondaryDraw from "./templates/SecondaryDraw.tsx";
import MainContent from "./templates/MainContent.tsx";
import useCategory from "../hooks/useCategory.ts";

const Home = () => {
  const { data, error } = useCategory();
  console.log(data);

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
        {data.map((category) => (
          <Typography>{category.name}</Typography>
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
