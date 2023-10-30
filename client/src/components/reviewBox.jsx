import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setVisitors } from "state";
import FlexBetween from "./FlexBetween";
import VisitorImage from "./VisitorImage";
import { useState } from "react";
import WidgetWrapper from "./WidgetWrapper";

const ReviewBox = ({ name, review, picturePath }) => {
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const containerStyles = {
    padding: "2rem",
    transition: "background-color 0.3s", // Add a smooth transition for the color change
    cursor: "pointer",
    height: "150px",
    width: "40%",
    display: "flex",
  };

  const isBetween600And1000 = useMediaQuery(
    "(min-width: 600px) and (max-width: 1000px)"
  );
  const isSmallerThan600 = useMediaQuery("(max-width: 600px)");

  if (isBetween600And1000) {
    containerStyles.width = "60%"; // Change width for screens between 400px and 1000px
  } else if (isSmallerThan600) {
    containerStyles.width = "90%"; // Change width for screens smaller than 400px
  }

  return (
    <WidgetWrapper sx={containerStyles}>
      <Box
        gap="1rem"
        display="flex"
        overflow="hidden"
        alignContent="end !important"
      >
        <VisitorImage
          image={`${process.env.REACT_APP_ENDPOINT_BASE_URL}/assets/${picturePath}`}
          size="80px"
        />
        <Box>
          <Typography color={main} variant="h5" fontWeight="500">
            {name}
          </Typography>
          <Typography color={main} variant="h6" fontWeight="500">
            {review}
          </Typography>
        </Box>
      </Box>
    </WidgetWrapper>
  );
};

export default ReviewBox;
