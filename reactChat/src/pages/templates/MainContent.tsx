import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";

interface Props {
  children: React.ReactNode;
}
const MainContent = ({ children }: Props) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        flexGrow: 1,
        mt: `${theme.primaryAppBar.height}px`,
        height: `calc(100vh - ${theme.primaryAppBar.height}px)`,
        overflow: "hidden",
      }}
    >
      {children}
    </Box>
  );
};

export default MainContent;
