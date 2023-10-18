import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navBar";
import Form from "./Form";
import { useEffect, useState } from "react";

const AddNewVisitorPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px");
  const { _id, picturePath } = useSelector((state) => state.user);
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="center"
      >
        {isNonMobileScreens && (
          <Box flexBasis="50%">
            <Box m="2rem 0" />
            <Form userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AddNewVisitorPage;
