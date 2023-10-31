import { Box } from "@mui/material";
import Navbar from "scenes/navBar";
import VisitorInfoBox from "./visitorInfo";
import FlexBetween from "components/FlexBetween";

const ScanHistoryPage = ({ socket }) => {
  return (
    <Box>
      <Navbar />
      <Box width="100%" display="flex" justifyContent="center !important">
        <VisitorInfoBox socket={socket} />
      </Box>
    </Box>
  );
};

export default ScanHistoryPage;
