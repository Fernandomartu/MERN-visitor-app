import { Typography, Box } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import React, { useEffect, useState } from "react";

const VisitorInfoBox = ({ socket }) => {
  const [visitor, setVisitor] = useState(null);

  useEffect(() => {
    socket.on("messageResponse", (data) => {
      setVisitor(data);
      setTimeout(function () {
        setVisitor(null);
      }, 5000);
    });
  });

  console.log("visitor:", visitor);

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
