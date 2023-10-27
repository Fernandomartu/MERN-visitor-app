import { useState, useRef, useCallback, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import { DatePicker } from "@mui/x-date-pickers";
import WidgetWrapper from "components/WidgetWrapper";
import Webcam from "react-webcam";
import dayjs from "dayjs";

const registerVisitorSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  companyName: yup.string().required("required"),
  ExpirationDate: yup.date().required("required"),
  phone: yup.string().required("required"),
});

const Form = ({
  userId,
  visitorId,
  firstName,
  lastName,
  visitorPicturePath,
  company,
  expirationDate,
  OnPremises,
  email,
  phone,
}) => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  console.log(expirationDate);

  const initialValuesRegister = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    companyName: company,
    ExpirationDate: expirationDate ? dayjs(expirationDate) : null,
    phone: phone,
  };

  const updateVisitor = async (values, onSubmitProps) => {
    // this allows us to send form info with image

    values.visitorId = visitorId;
    values.OnPremises = true;
    values.image = imgSrc;
    // console.log(values);
    const formData = new FormData();

    for (let value in values) {
      formData.append(value, values[value]);
    }

    for (const pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    const savedVisitorResponse = await fetch(
      `${process.env.REACT_APP_ENDPOINT_BASE_URL}/visitors/${visitorId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      }
    );
    const visitors = await savedVisitorResponse.json();
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    await updateVisitor(values, onSubmitProps);
  };

  const takePicture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  };

  const clearPicture = () => {
    setImgSrc(null);
  };

  useEffect(() => {
    setImgSrc(visitorPicturePath);
  }, []);

  return (
    <WidgetWrapper>
      <Typography fontWeight="bold" fontSize="1.5rem" color="black">
        Visitor Details
      </Typography>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValuesRegister}
        validationSchema={registerVisitorSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          resetForm,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                ></TextField>
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Company Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.companyName}
                  name="companyName"
                  error={
                    Boolean(touched.companyName) && Boolean(errors.companyName)
                  }
                  helperText={touched.companyName && errors.companyName}
                  sx={{ gridColumn: "span 4" }}
                />
                <DatePicker
                  label="Expiration Date"
                  name="ExpirationDate"
                  value={values.ExpirationDate}
                  onChange={(date) => setFieldValue("ExpirationDate", date)}
                  error={
                    Boolean(touched.ExpirationDate) &&
                    Boolean(errors.ExpirationDate)
                  }
                  helperText={touched.ExpirationDate && errors.ExpirationDate}
                  sx={{ gridColumn: "span 4" }}
                />

                <TextField
                  label="Phone"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.phone}
                  name="phone"
                  error={Boolean(touched.phone) && Boolean(errors.phone)}
                  helperText={touched.phone && errors.phone}
                  sx={{ gridColumn: "span 4" }}
                />
                <Box>
                  <Typography>Image</Typography>
                  {imgSrc ? (
                    <img src={imgSrc} />
                  ) : (
                    <Webcam
                      audio={false}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      width="200px"
                    />
                  )}
                  {imgSrc ? (
                    <Button
                      fullWidth
                      sx={{
                        backgroundColor: palette.primary.main,
                        color: palette.background.alt,
                        "&:hover": { color: palette.primary.main },
                      }}
                      onClick={clearPicture}
                    >
                      Retake Picture
                    </Button>
                  ) : (
                    <Button
                      fullWidth
                      sx={{
                        backgroundColor: palette.primary.main,
                        color: palette.background.alt,
                        "&:hover": { color: palette.primary.main },
                      }}
                      onClick={takePicture}
                    >
                      Take Picture
                    </Button>
                  )}
                </Box>
              </>
            </Box>
            <Box>
              <Button
                fullWidth
                type="submit"
                sx={{
                  m: "2rem 0",
                  p: "1rem",
                  backgroundColor: palette.primary.main,
                  color: palette.background.alt,
                  "&:hover": { color: palette.primary.main },
                }}
              >
                Update Visitor
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </WidgetWrapper>
  );
};

export default Form;
