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
    height: "200px",
    width: "40%",
  };

  const isBetween400And1000 = useMediaQuery(
    "(min-width: 400px) and (max-width: 1000px)"
  );
  const isSmallerThan400 = useMediaQuery("(max-width: 400px)");

  if (isBetween400And1000) {
    containerStyles.width = "60%"; // Change width for screens between 400px and 1000px
  } else if (isSmallerThan400) {
    containerStyles.width = "90%"; // Change width for screens smaller than 400px
  }

  return (
    <WidgetWrapper sx={containerStyles}>
      <FlexBetween gap="1rem">
        <VisitorImage image={picturePath} size="55px" />
        <Box
          onClick={() => {
            console.log("placeholder");
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": { color: palette.primary.light, cursor: "pointer" },
            }}
          >
            {name}
          </Typography>
          <Typography
            color={main}
            variant="h6"
            fontWeight="500"
            sx={{
              "&:hover": { color: palette.primary.light, cursor: "pointer" },
            }}
          >
            {review}
          </Typography>
        </Box>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default ReviewBox;
