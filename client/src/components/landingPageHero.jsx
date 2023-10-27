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

const LandingPageHero = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width: 600px)");
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;

  return (
    <FlexBetween
      width={isNonMobileScreens ? "100%" : "100%"}
      p={isNonMobileScreens ? "4rem 6%" : "1rem 0"}
      backgroundColor="#735BE7"
      height="fit-content"
      display="flex"
      justifyContent={isNonMobileScreens ? "space-between" : "start"}
      alignContent="center"
      flexDirection={isNonMobileScreens ? "row" : "column"}
    >
      <Box width={isNonMobileScreens ? "50%" : "90%"}>
        <Typography
          fontWeight="bold"
          color="#FFFFFF"
          fontSize={isNonMobileScreens ? "32px" : "20px"}
          sx={{ mb: "0.5rem" }}
        >
          Easy to use visitor management system
        </Typography>
        <Typography
          fontWeight="500"
          color="#FFFFFF"
          variant={isNonMobileScreens ? "h5" : "h6"}
          sx={{ mb: "1.5rem" }}
        >
          Keep track of people visiting your company, residential buildings and
          more! Visitors are automatically assigned a PIN code they can use to
          access approved areas.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ backgroundColor: "white", color: "black" }}
        >
          Get started
        </Button>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        width={isNonMobileScreens ? "50%" : "90%"}
      >
        <img width="80%" src="assets/tour.png" />
      </Box>
    </FlexBetween>
  );
};

export default LandingPageHero;
