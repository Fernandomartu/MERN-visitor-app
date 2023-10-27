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

const LandingPageSecondSection = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;

  return (
    <FlexBetween
      width={isNonMobileScreens ? "100%" : "100%"}
      p={isNonMobileScreens ? "4rem 6%" : "1rem 0"}
      backgroundColor="white"
      height="fit-content"
      display="flex"
      justifyContent="space-between"
      alignContent="center"
      flexDirection={isNonMobileScreens ? "row" : "column"}
    >
      <Box width={isNonMobileScreens ? "50%" : "90%"}>
        <Typography
          fontWeight="bold"
          color="#1F1F1F"
          fontSize={isNonMobileScreens ? "48px" : "22px"}
          width="90%"
          sx={{ mb: "0.5rem" }}
        >
          Why manage your visitors?
        </Typography>
        <Typography
          fontWeight="400"
          color="#1F1F1F"
          variant={isNonMobileScreens ? "h5" : "h6"}
          width="90%"
          sx={
            isNonMobileScreens
              ? { mb: "1.5rem", lineHeight: 2 }
              : { mb: "1.5rem", lineHeight: 1.5 }
          }
        >
          Keeping track of visitors is a valuable practice for companies of all
          sizes and across various industries. Visitor tracking provides crucial
          insights into a company's operations. By monitoring who visits their
          premises, businesses can gather data on customer demographics, entry
          and exit times, and frequency of visits. This information can be
          instrumental in tailoring marketing strategies, optimizing staffing
          levels, and tailoring product offerings to better meet customer needs.
          For instance, a retail store can use visitor tracking data to identify
          peak shopping hours, enabling them to allocate resources more
          efficiently.
        </Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        width={isNonMobileScreens ? "50%" : "90%"}
        borderRadius="20px"
        padding={isNonMobileScreens ? "1rem" : "0rem"}
      >
        <img width="100%" src="assets/reception.jpg" />
      </Box>
    </FlexBetween>
  );
};

export default LandingPageSecondSection;
