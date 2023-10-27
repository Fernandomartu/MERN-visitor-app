import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navBar";
import AllVisitorsWidget from "widgets/AllVisitorsWidget";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

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
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="center"
      >
        {isNonMobileScreens ? (
          <Box flexBasis="70%">
            <Box m="2rem 0" />
            <AllVisitorsWidget userId={_id} />
          </Box>
        ) : (
          <Box flexBasis="90%">
            <Box m="2rem 0" />
            <AllVisitorsWidget userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
