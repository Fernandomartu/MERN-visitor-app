import { useEffect, useState } from "react";
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
import ReviewBox from "./reviewBox";

const LandingPageReviews = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const [reviews, setReviews] = useState(null);
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;

  const getReviews = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_ENDPOINT_BASE_URL}/users/reviews`,
      { method: "GET" }
    );
    const data = await response.json();

    setReviews(data);
  };

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <FlexBetween
      width={isNonMobileScreens ? "100%" : "100%"}
      p={isNonMobileScreens ? "4rem 6%" : "2rem 0"}
      backgroundColor="#F2F2F2"
      height="fit-content"
      display="flex"
      justifyContent="space-between"
      alignContent="center"
      flexDirection={isNonMobileScreens ? "row" : "column"}
    >
      <Box
        display="flex"
        flexDirection="row"
        gap="1.5rem"
        flexWrap="wrap"
        justifyContent="center"
      >
        {reviews ? (
          reviews.map((review, index) => (
            <ReviewBox
              key={index}
              name={`${review.name}`}
              review={review.review}
              picturePath={review.picturePath}
            />
          ))
        ) : (
          <Typography color={palette.neutral.dark}>
            No reviews to display
          </Typography>
        )}
      </Box>
    </FlexBetween>
  );
};

export default LandingPageReviews;
