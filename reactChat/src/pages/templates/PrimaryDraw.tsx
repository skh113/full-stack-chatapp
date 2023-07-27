import React, { useEffect, useState } from "react";
import { Box, Drawer, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DrawerToggle from "../../components/DrawerToggle.tsx";

interface Props {
  children: React.ReactNode;
}

const PrimaryDraw = ({ children }: Props) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [isPrimaryDrawOpen, setPrimaryDrawOpen] = useState(!isSmallScreen);

  useEffect(() => {
    setPrimaryDrawOpen(!isSmallScreen);
  }, [isSmallScreen]);

  return (
    <Drawer
      open={isPrimaryDrawOpen}
      variant={isSmallScreen ? "temporary" : "permanent"}
      PaperProps={{
        sx: {
          mt: `${theme.primaryAppBar.height}px`,
          height: `calc(100vh - ${theme.primaryAppBar.height}px)`,
          width: theme.primaryDraw.width,
        },
      }}
    >
      <Box>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            p: 0,
            width: isPrimaryDrawOpen ? "auto" : "100%",
          }}
        >
          <DrawerToggle />
          {[...Array(25)].map((_, i) => (
            <Typography key={i} paragraph>
              {i + 1} and some other text.
            </Typography>
          ))}
        </Box>
      </Box>
    </Drawer>
  );
};

export default PrimaryDraw;
