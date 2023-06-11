import { Routes, Route, redirect, Navigate } from "react-router-dom";
import HomePage from "./pages/homePage/HomePage";
import LoginPage from "./pages/loginPage/LoginPage";
import Profilepage from "./pages/profilePage/Profilepage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme } from '@mui/material/styles'
import { themeSettings } from "./theme";
import Navbar from "./components/navbar/Navbar";
import { useLocation } from "react-router-dom";



function App() {
  const mode = useSelector(state => state.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
  const {pathname}=useLocation()
  const isAuth=!!useSelector(state=>state.token)
  return (
    <>
    {pathname !=="/" && <Navbar/>}
      <div className="app">
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={isAuth? <HomePage /> : <Navigate to="/"/>}/> 
            <Route path="/profile/:userId" element={isAuth?<Profilepage /> : <Navigate to="/"/>} />
          </Routes>
        </ThemeProvider>
      </div>
    </>
  );
}

export default App;
