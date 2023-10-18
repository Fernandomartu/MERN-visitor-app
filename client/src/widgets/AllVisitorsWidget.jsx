import { Box, Typography, useTheme, IconButton } from "@mui/material";
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import Visitor from "components/Visitor";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setVisitors } from "state";
import FlexBetween from "components/FlexBetween";
import { useNavigate } from "react-router-dom";

const AllVisitorsWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const visitors = useSelector((state) => state.user.visitors);
  const navigate = useNavigate();

  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;

  const getVisitors = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_ENDPOINT_BASE_URL}/users/${userId}/visitors`,
      { method: "GET", headers: { Authorization: `Bearer ${token}` } }
    );
    const data = await response.json();
    dispatch(setVisitors({ visitors: data }));
  };

  useEffect(() => {
    getVisitors();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      <FlexBetween sx={{ mb: "1.5rem" }}>
        <Typography color={palette.neutral.dark} variant="h5" fontWeight="500">
          Visitor List
        </Typography>
        <IconButton
          onClick={() => {
            navigate("/add-visitor");
          }}
          sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
        >
          <PersonAddOutlined sx={{ color: "#FFFFFF" }} />
        </IconButton>
      </FlexBetween>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {visitors.map((visitor) => (
          <Visitor
            key={visitor._id}
            visitorId={visitor._id}
            name={`${visitor.firstName} ${visitor.lastName}`}
            subtitle={visitor.occupation}
            userPicturePath={visitor.picturePath}
          ></Visitor>
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default AllVisitorsWidget;
