import { useState } from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";

const Footer = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <FlexBetween
      padding="6rem 6%"
      flexDirection={isNonMobileScreens ? "row" : "column"}
      backgroundColor="white"
      alignItems="start !important"
    >
      <Box display="flex" flexDirection="column">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
        >
          Visitor Tracker
        </Typography>
        <Typography variant="h5" color="black">
          A234 Sample Street,
        </Typography>
        <Typography variant="h5" color="black">
          New York, NY, 234241
        </Typography>
        <Typography variant="h5" color="black">
          United States
        </Typography>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        color="primary"
        alignItems="start"
        flexBasis="400px"
      >
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
        >
          Social Media Links
        </Typography>
        <Typography variant="h5" color="black">
          Cras fermentum odio eu feugiat lide par naso tierra videa magna derita
          valies
        </Typography>
      </Box>
    </FlexBetween>
  );
};

export default Footer;
