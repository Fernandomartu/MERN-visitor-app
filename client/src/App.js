import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import LandingPage from "scenes/landingPage";
import ProfilePage from "scenes/profilePage";
import AddNewVisitorPage from "scenes/addNewVisitorPage";
import EditVisitorPage from "scenes/editVisitor";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/profile/:userId" element={<ProfilePage />} />

              <Route path="/add-visitor" element={<AddNewVisitorPage />} />
              <Route
                path="/edit-visitor/:visitorId"
                element={<EditVisitorPage />}
              />
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
      </LocalizationProvider>
    </div>
  );
}

export default App;