import { Box, Typography, useTheme, IconButton } from "@mui/material";
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import Module from "components/module";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setVisitors } from "state";
import FlexBetween from "components/FlexBetween";
import { useNavigate } from "react-router-dom";

const AllModulesWidget = () => {
  const dispatch = useDispatch();
  const { palette } = useTheme();

  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [modules, setModules] = useState([]);

  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;

  const getModules = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_ENDPOINT_BASE_URL}/users/${user._id}/modules`,
      { method: "GET", headers: { Authorization: `Bearer ${token}` } }
    );
    const data = await response.json();

    setModules(data);
  };

  useEffect(() => {
    getModules();
  }, []);

  return (
    <WidgetWrapper mt="5rem" width="30%">
      <Typography variant="h3">Module List</Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {modules.length > 0 ? (
          modules.map((module) => (
            <Module key={module._id} moduleId={module._id} />
          ))
        ) : (
          <Typography color={palette.neutral.dark}>
            No modules to display
          </Typography>
        )}
      </Box>
    </WidgetWrapper>
  );
};

export default AllModulesWidget;
