import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import LandingPageNavbar from "components/landingPageNavbar";
import LandingPageHero from "components/landingPageHero";
import LandingPageSecondSection from "components/landingPageSecondSection";
import LandingPageReviews from "components/landingPageReviews";

const LandingPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <LandingPageNavbar />
      <LandingPageHero />
      <LandingPageSecondSection />
      <LandingPageReviews />
    </Box>
  );
};

export default LandingPage;
