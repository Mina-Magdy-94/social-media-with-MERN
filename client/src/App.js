import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage/HomePage";
import LoginPage from "./pages/loginPage/LoginPage";
import Profilepage from "./pages/profilePage/Profilepage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import {ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme } from '@mui/material/styles'
import { themeSettings } from "./theme";



function App() {
  const mode = useSelector(state => state.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile/:userId" element={<Profilepage />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
