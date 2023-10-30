import { Box } from "@mui/material";
import Navbar from "scenes/navBar";
import UserInfoBox from "./visitorInfo";
import FlexBetween from "components/FlexBetween";

const ScanHistoryPage = () => {
  return (
    <Box>
      <Navbar />
      <Box width="100%" display="flex" justifyContent="center !important">
        <VisitorInfoBox />
      </Box>
    </Box>
  );
};

export default ScanHistoryPage;
