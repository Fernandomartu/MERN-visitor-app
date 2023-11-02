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

const Module = ({ moduleId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isNonMobileScreens = useMediaQuery("(min-width:600px)");

  const [isHovered, setIsHovered] = useState(false);
  const [isDeleteHovered, setIsDeleteHovered] = useState(false);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const containerStyles = {
    border: "1px solid gray",
    padding: "1rem",
    backgroundColor: isHovered ? "lightblue" : "transparent", // Change to your desired background color
    transition: "background-color 0.3s", // Add a smooth transition for the color change
    cursor: "pointer",
  };

  return (
    <FlexBetween
      sx={containerStyles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        navigate(`/check-in/${moduleId}`);
      }}
    >
      {isNonMobileScreens && (
        <>
          <FlexBetween gap="1rem">
            <Box
              onClick={() => {
                console.log("placeholder");
              }}
            >
              <Typography color={main} variant="h5" fontWeight="500">
                Check in module
              </Typography>
            </Box>
            <Typography color={main} variant="h5" fontWeight="500">
              {moduleId}
            </Typography>
          </FlexBetween>
          <IconButton
            onMouseEnter={() => setIsDeleteHovered(true)}
            onMouseLeave={() => setIsDeleteHovered(false)}
            sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
          >
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          </IconButton>
        </>
      )}
      {!isNonMobileScreens && (
        <>
          <FlexBetween gap="1rem">
            <Box
              onClick={() => {
                console.log("placeholder");
              }}
            >
              <Typography color={main} variant="h5" fontWeight="500">
                Check in module
              </Typography>
            </Box>
          </FlexBetween>
          <IconButton
            onMouseEnter={() => setIsDeleteHovered(true)}
            onMouseLeave={() => setIsDeleteHovered(false)}
            sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
          >
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          </IconButton>
        </>
      )}
    </FlexBetween>
  );
};

export default Module;
