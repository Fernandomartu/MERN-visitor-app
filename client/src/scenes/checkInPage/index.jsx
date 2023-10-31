import {
  Box,
  Typography,
  useMediaQuery,
  Button,
  TextField,
} from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navBar";
import AllVisitorsWidget from "widgets/AllVisitorsWidget";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import WidgetWrapper from "components/WidgetWrapper";
import FlexBetween from "components/FlexBetween";
import { useForm } from "react-hook-form";

const CheckInPage = ({ socket }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm();

  const [showStatus, setShowStatus] = useState({ show: false, status: null });

  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const onSubmit = async (data) => {
    data.userId = user._id;
    data.token = token;

    const response = await fetch(
      `${process.env.REACT_APP_ENDPOINT_BASE_URL}/visitors/validate`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const accessStatus = await response.json();
    showVisitorStatus(accessStatus);
    console.log(accessStatus);
    sendToScanModule(data);
  };

  const showVisitorStatus = (accessStatus) => {
    setShowStatus({ show: true, status: accessStatus.message });

    setTimeout(() => {
      setShowStatus({ show: false, status: null });
    }, 3000);
  };

  const sendToScanModule = (data) => {
    console.log("working", data);
    socket.emit("message", {
      text: data,
      name: user.firstName,
      id: `${socket.id}${Math.random()}`,
      socketID: socket.id,
    });
  };

  return (
    <Box>
      <Box display="flex" justifyContent="center">
        <WidgetWrapper
          marginTop="200px"
          width={isNonMobileScreens ? "30%" : "80%"}
        >
          {!showStatus.show ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <FlexBetween flexDirection="column" gap="20px" width="100%">
                <Box width="100%">
                  <Typography>Barcode ID</Typography>
                  <TextField
                    {...register("barcodeId", {
                      required: "Barcode Id is required",
                      minLength: {
                        value: 4,
                        message: "barcode should be at least 4 digits",
                      },
                    })}
                    fullWidth
                    size="small"
                    type="text"
                    name="barcodeId"
                  />
                </Box>
                <Box width="100%">
                  <Typography>Pin Code</Typography>
                  <TextField
                    {...register("pincode", {
                      required: "Pin Code is required",
                      minLength: {
                        value: 6,
                        message: "Pin code incorrect",
                      },
                    })}
                    fullWidth
                    size="small"
                    type="password"
                    name="pincode"
                  />
                </Box>
                <Button
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              </FlexBetween>
            </form>
          ) : (
            <FlexBetween flexDirection="column" gap="20px" width="100%">
              <Typography
                color={showStatus.status == "Access Granted" ? "green" : "red"}
                variant="h1"
                fontWeight="500"
              >
                {showStatus.status}
              </Typography>
            </FlexBetween>
          )}
        </WidgetWrapper>
      </Box>
    </Box>
  );
};

export default CheckInPage;
