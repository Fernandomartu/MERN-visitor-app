import { Typography, Box } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setScanModules, setScanModule, setLogin } from "state";

const VisitorInfoBox = ({ socket }) => {
  const dispatch = useDispatch();
  const [visitor, setVisitor] = useState(null);
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const getUserModulesCount = async () => {
    console.log(user._id);
    const savedUserResponse = await fetch(
      `${process.env.REACT_APP_ENDPOINT_BASE_URL}/users/${user._id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const savedUserResponseData = await savedUserResponse.json();
    return savedUserResponseData.modulesCreated;
  };

  const createModule = async (requestData) => {
    const savedModuleResponse = await fetch(
      `${process.env.REACT_APP_ENDPOINT_BASE_URL}/create-module`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
      }
    );
    console.log("module created");
  };

  const generateModule = async (socketId) => {
    const moduleCount = await getUserModulesCount();
    const newModule = {
      _id: moduleCount + 1, // You can assign the appropriate ID.
      senderSocketId: null, // Assuming socket.id is the sender's socket ID.
      receiverSocketId: socketId, // Assuming you don't have a receiver socket ID initially.
    };
    const requestData = [newModule, user._id];

    createModule(requestData);
  };

  useEffect(() => {
    socket.on("messageResponse", (data) => {
      console.log(data);
      setVisitor(data);
      setTimeout(function () {
        setVisitor(null);
      }, 5000);
    });

    socket.on("socketId", (socketId) => {
      generateModule(socketId);
    });
  }, []);

  return (
    <Box>
      {visitor && (
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
                  {`Name: ${visitor.firstName} ${visitor.lastName}`}
                </Typography>
                <Typography variant="h5" fontWeight="500">
                  {`Company: ${visitor.companyName}`}
                </Typography>
                <Typography variant="h5" fontWeight="500">
                  {`Email: ${visitor.email}`}
                </Typography>
                <Typography variant="h5" fontWeight="500">
                  {`Expiration Date: ${visitor.ExpirationDate}`}
                </Typography>
              </Box>
              <Box display="flex" flexDirection="column" gap="20px">
                <Typography variant="h5" fontWeight="500">
                  {`Id: ${visitor.barcodeId}`}
                </Typography>
                <Typography variant="h5" fontWeight="500">
                  {`phone: ${visitor.phone}`}
                </Typography>
                <img src={visitor.picturePath} />
              </Box>
            </Box>
          </WidgetWrapper>
        </Box>
      )}
    </Box>
  );
};

export default VisitorInfoBox;
