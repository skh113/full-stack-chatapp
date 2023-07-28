import React, { useEffect, useState } from "react";
import { Box, styled, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DrawerToggle from "../../components/DrawerToggle.tsx";
import MuiDrawer from "@mui/material/Drawer";

interface Props {
  children: React.ReactNode;
}

const PrimaryDraw = ({ children }: Props) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [isPrimaryDrawOpen, setPrimaryDrawOpen] = useState(!isSmallScreen);

  const openedMixin = () => ({
    overflowX: "hidden",
  });

  const closedMixin = () => ({
    overflowX: "hidden",
    width: theme.primaryDraw.closedWidth,
  });

  useEffect(() => {
    setPrimaryDrawOpen(!isSmallScreen);
  }, [isSmallScreen]);

  // FIXME
  const CustomDrawer = styled(
    MuiDrawer,
    {},
  )(({ theme, open }) => {
    return {
      width: theme.primaryDraw.width,
      whiteSpace: "nowrap",
      boxSizing: "border-box",
      ...(open && { ...openedMixin(), "& .MuiDrawer-paper": openedMixin() }),
      ...(!open && { ...closedMixin(), "& .MuiDrawer-paper": closedMixin() }),
    };
  });

  return (
    <CustomDrawer
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
          <DrawerToggle
            isOpen={isPrimaryDrawOpen}
            handleDrawerToggle={() => setPrimaryDrawOpen(!isPrimaryDrawOpen)}
          />
          {children}
        </Box>
      </Box>
    </CustomDrawer>
  );
};

export default PrimaryDraw;
