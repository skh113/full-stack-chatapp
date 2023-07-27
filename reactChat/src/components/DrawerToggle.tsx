import { Box, IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

interface Props {
  isOpen: boolean;
  handleDrawerToggle: () => void;
}

const DrawerToggle = ({ isOpen, handleDrawerToggle }: Props) => {
  return (
    <Box
      sx={{
        height: "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <IconButton onClick={handleDrawerToggle}>
        {isOpen ? <ChevronLeft /> : <ChevronRight />}
      </IconButton>
    </Box>
  );
};

export default DrawerToggle;
