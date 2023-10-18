import { useState } from "react";
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

const registerVisitorSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  companyName: yup.string().required("required"),
  ExpirationDate: yup.date().required("required"),
  phone: yup.string().required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  companyName: "",
  ExpirationDate: "",
  phone: "",
};

const Form = ({ userId }) => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  const registerVisitor = async (values, onSubmitProps) => {
    // this allows us to send form info with image

    values.id = userId;
    values.OnPremises = true;
    console.log(values);
    const formData = new FormData();

    for (let value in values) {
      formData.append(value, values[value]);
    }

    const savedVisitorResponse = await fetch(
      `${process.env.REACT_APP_ENDPOINT_BASE_URL}/visitors`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      }
    );

    onSubmitProps.resetForm();
    console.log(savedVisitorResponse);
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    await registerVisitor(values, onSubmitProps);
  };

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
                />
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
                {/* <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg, .jpeg, .png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps} />
                        {!values.picture ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box> */}
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
                Add Visitor
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </WidgetWrapper>
  );
};

export default Form;
