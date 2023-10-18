import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setVisitors } from "state";
import FlexBetween from "./FlexBetween";
import VisitorImage from "./VisitorImage";

const Visitor = ({ visitorId, name, subtitle, visitorPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const visitors = useSelector((state) => state.user.visitors);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isVisitor = visitors.find((visitor) => visitor._id === visitorId);

  const patchVisitor = async () => {
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
    const data = await response.json();
    dispatch(setVisitors({ visitors: data }));
  };

  return (
    <FlexBetween>
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
              "&:hover": { color: palette.primary.light, cursor: "pointer" },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      <IconButton
        onClick={() => patchVisitor()}
        sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
      >
        {isVisitor ? (
          <PersonRemoveOutlined sx={{ color: primaryDark }} />
        ) : (
          <PersonAddOutlined sx={{ color: primaryDark }} />
        )}
      </IconButton>
    </FlexBetween>
  );
};

export default Visitor;
