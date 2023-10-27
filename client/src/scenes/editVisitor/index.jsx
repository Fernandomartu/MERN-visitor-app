import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navBar";
import Form from "./Form";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EditVisitorPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px");
  const { _id, picturePath } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const { visitorId } = useParams();
  const [visitor, setVisitor] = useState(null);

  const getVisitor = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_ENDPOINT_BASE_URL}/visitors/${visitorId}`,
      { method: "GET", headers: { Authorization: `Bearer ${token}` } }
    );
    const data = await response.json();
    setVisitor(data);
  };

  useEffect(() => {
    getVisitor();
  }, []);

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
            {visitor ? (
              <Form
                userId={_id}
                visitorId={visitor._id}
                firstName={`${visitor.firstName}`}
                lastName={`${visitor.lastName}`}
                visitorPicturePath={visitor.picturePath}
                company={visitor.companyName}
                expirationDate={visitor.ExpirationDate}
                OnPremises={visitor.OnPremises}
                email={visitor.email}
                phone={visitor.phone}
              />
            ) : (
              // You can render a loading indicator or message here
              <p>Loading...</p>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default EditVisitorPage;
