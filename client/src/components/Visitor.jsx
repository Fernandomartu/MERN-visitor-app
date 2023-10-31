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

const Visitor = ({
  visitorId,
  name,
  visitorPicturePath,
  company,
  expirationDate,
  OnPremises,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const visitors = useSelector((state) => state.user.visitors);
  const isNonMobileScreens = useMediaQuery("(min-width:600px)");

  const [isHovered, setIsHovered] = useState(false);
  const [isDeleteHovered, setIsDeleteHovered] = useState(false);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isVisitor = visitors.find((visitor) => visitor._id === visitorId);

  const containerStyles = {
    border: "1px solid gray",
    padding: "1rem",
    backgroundColor: isHovered ? "lightblue" : "transparent", // Change to your desired background color
    transition: "background-color 0.3s", // Add a smooth transition for the color change
    cursor: "pointer",
  };

  const deleteVisitor = async () => {
    console.log(visitorId);

    const response = await fetch(
      `${process.env.REACT_APP_ENDPOINT_BASE_URL}/users/${_id}/${visitorId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("running");
    const data = await response.json();
    console.log(data["visitors"]);
    dispatch(setVisitors({ visitors: data["visitors"] }));
  };

  const navigateToEditVisitor = () => {
    if (!isDeleteHovered) {
      navigate(`/edit-visitor/${visitorId}`);
    }
  };

  return (
    <FlexBetween
      sx={containerStyles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        navigateToEditVisitor();
      }}
    >
      {isNonMobileScreens && (
        <>
          <FlexBetween gap="1rem">
            <VisitorImage image={visitorPicturePath} size="55px" />
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
                  "&:hover": {
                    color: palette.primary.light,
                    cursor: "pointer",
                  },
                }}
              >
                {name}
              </Typography>
            </Box>
            <Typography
              color={main}
              variant="h5"
              fontWeight="500"
              sx={{
                "&:hover": { color: palette.primary.light, cursor: "pointer" },
              }}
            >
              {company}
            </Typography>
          </FlexBetween>
          <IconButton
            onMouseEnter={() => setIsDeleteHovered(true)}
            onMouseLeave={() => setIsDeleteHovered(false)}
            onClick={() => deleteVisitor()}
            sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
          >
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          </IconButton>
        </>
      )}
      {!isNonMobileScreens && (
        <>
          <FlexBetween gap="1rem">
            <VisitorImage image={visitorPicturePath} size="55px" />
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
                  "&:hover": {
                    color: palette.primary.light,
                    cursor: "pointer",
                  },
                }}
              >
                {name}
              </Typography>
            </Box>
          </FlexBetween>
          <IconButton
            onMouseEnter={() => setIsDeleteHovered(true)}
            onMouseLeave={() => setIsDeleteHovered(false)}
            onClick={() => deleteVisitor()}
            sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
          >
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          </IconButton>
        </>
      )}
    </FlexBetween>
  );
};

export default Visitor;
