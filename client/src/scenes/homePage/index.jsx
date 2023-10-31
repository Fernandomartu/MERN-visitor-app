import { Box, useMediaQuery, Button } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navBar";
import AllVisitorsWidget from "widgets/AllVisitorsWidget";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import WidgetWrapper from "components/WidgetWrapper";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const userData = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (!userData) {
      // If user data is null or _id is null, navigate to another page
      navigate("/");
    }
  }, [userData, navigate]);

  if (!userData) {
    return null;
  }

  const { _id, picturePath } = userData;

  return (
    <Box>
      <Navbar />

      {isNonMobileScreens ? (
        <Box
          width="100%"
          padding="2rem 6%"
          display={isNonMobileScreens ? "flex" : "block"}
          gap="0.5rem"
          justifyContent="space-between"
        >
          <Box m="2rem 0" width="70%">
            <AllVisitorsWidget userId={_id} />
          </Box>
          <Box m="2rem 0" width="20%">
            <WidgetWrapper
              display="flex"
              flexDirection="column"
              justifyContent="center"
              gap="20px"
            >
              <Button variant="contained" onClick={() => navigate(`/check-in`)}>
                Launch Check In Module
              </Button>
              <Button
                variant="contained"
                onClick={() => navigate(`/scan-history`)}
              >
                Launch Scan Log Module
              </Button>
            </WidgetWrapper>
          </Box>
        </Box>
      ) : (
        <Box
          width="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box m="2rem 0" width="80%">
            <WidgetWrapper
              display="flex"
              flexDirection="column"
              justifyContent="center"
              gap="20px"
            >
              <Button variant="contained" onClick={() => navigate(`/check-in`)}>
                Launch Check In Module
              </Button>
              <Button
                variant="contained"
                onClick={() => navigate(`/scan-history`)}
              >
                Launch Scan Log Module
              </Button>
            </WidgetWrapper>
          </Box>
          <Box m="2rem 0" width="90%">
            <AllVisitorsWidget userId={_id} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default HomePage;
