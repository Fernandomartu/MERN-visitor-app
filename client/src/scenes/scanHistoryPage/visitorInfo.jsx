import { Typography, Box } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const VisitorInfoBox = () => {
  return (
    <Box display="flex" width="fit-content" height="500px">
      <WidgetWrapper
        display="flex"
        flexDirection="column"
        gap="20px"
        width="100%"
        mt="4rem"
      >
        <Typography variant="h3" fontWeight="500">
          Visitor Details
        </Typography>
        <Box display="flex" flexDirection="row" gap="50px">
          <Box display="flex" flexDirection="column" gap="20px">
            <Typography variant="h5" fontWeight="500">
              Name: Fernando Marturet{" "}
            </Typography>
            <Typography variant="h5" fontWeight="500">
              Company: Fernando Marturet{" "}
            </Typography>
            <Typography variant="h5" fontWeight="500">
              Email: Fernando Marturet{" "}
            </Typography>
            <Typography variant="h5" fontWeight="500">
              Expiration Date: Fernando Marturet{" "}
            </Typography>
          </Box>
          <Box display="flex" flexDirection="column" gap="20px">
            <Typography variant="h5" fontWeight="500">
              Name: Fernando Marturet{" "}
            </Typography>
            <Typography variant="h5" fontWeight="500">
              Company: Fernando Marturet{" "}
            </Typography>
            <Typography variant="h5" fontWeight="500">
              Email: Fernando Marturet{" "}
            </Typography>
            <Typography variant="h5" fontWeight="500">
              Expiration Date: Fernando Marturet{" "}
            </Typography>
          </Box>
        </Box>
      </WidgetWrapper>
    </Box>
  );
};

export default VisitorInfoBox;
