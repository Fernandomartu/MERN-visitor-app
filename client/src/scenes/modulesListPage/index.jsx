import { Box } from "@mui/material";
import Navbar from "scenes/navBar";
import AllModulesWidget from "widgets/allModulesWidget";
import FlexBetween from "components/FlexBetween";
import { useSelector } from "react-redux";

const ModulesListPage = () => {
  const modules = useSelector((state) => state.modules);
  console.log(modules);
  return (
    <Box>
      <Navbar />
      <Box width="100%" display="flex" justifyContent="center !important">
        <AllModulesWidget />
      </Box>
    </Box>
  );
};

export default ModulesListPage;
