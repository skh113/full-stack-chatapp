import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const SecondaryDraw = ({ children }: Props) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minWidth: `${theme.secondaryDraw.width}px`,
        mt: `${theme.primaryAppBar.height}px`,
        height: `calc(100vh - ${theme.primaryAppBar.height}px)`,
        borderRight: `${theme.secondaryDraw.borderBottom} ${theme.palette.divider}`,
        display: { xs: "none", md: "block" },
        overflow: "auto",
      }}
    >
      <Typography>Explore</Typography>
      {children}
    </Box>
  );
};

export default SecondaryDraw;
