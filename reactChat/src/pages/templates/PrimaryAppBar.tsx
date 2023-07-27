import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";

const PrimaryAppBar = () => {
  const theme = useTheme();
  const [isSideMenuOpen, setSideMenuOpen] = useState(false);

  return (
    <AppBar
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 2,
        backgroundColor: theme.palette.background.default,
        borderBottom: `3px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar
        variant="dense"
        sx={{
          height: theme.primaryAppBar.height,
          minHeight: theme.primaryAppBar.height,
        }}
      >
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <IconButton
            color="inherit"
            aria-label="Open menu"
            edge="start"
            sx={{ mr: 2 }}
            onClick={() => setSideMenuOpen(!isSideMenuOpen)}
          >
            <MenuIcon />
          </IconButton>
        </Box>
        <Drawer
          anchor="left"
          open={isSideMenuOpen}
          onClose={() => setSideMenuOpen(!isSideMenuOpen)}
        >
          {[...Array(100)].map((_, i) => (
            <Typography key={i} paragraph>
              {i + 1}
            </Typography>
          ))}
        </Drawer>
        <Link href="/" underline="none" color="inherit">
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { fontWeight: 700, letterSpacing: "-0.5px" } }}
          >
            ChatApp
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default PrimaryAppBar;
