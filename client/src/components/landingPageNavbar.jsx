import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
  Button,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";

const LandingPageNavbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <FlexBetween padding="1rem 6%" backgroundColor="F4F4F4">
      <FlexBetween gap="20px">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          Visitor Tracker
        </Typography>
      </FlexBetween>
      <Button
        onClick={() => navigate("/login")}
        variant="contained"
        color="primary"
      >
        Sign UP / Log In
      </Button>
    </FlexBetween>
  );
};

export default LandingPageNavbar;
