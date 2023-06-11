import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { FlexBetween } from '../FlexBetween'
import { Box, FormControl, IconButton, InputBase, MenuItem, Select, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import MessageIcon from '@mui/icons-material/Message';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HelpIcon from '@mui/icons-material/Help';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { setLogout, setMode } from '../../store/slices/authSlice'


const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const user = useSelector(state => state.user)
  const { mode } = useSelector(state => state)
   const user = useSelector((state) => state.user)
  console.log({user})
  const isNonMobileScreen = useMediaQuery("(min-width:1000px)")

  const theme = useTheme()
  console.log(theme.palette)
  const neutralLight = "#333333" //theme.palette.neutral.light
  const dark = "#E0E0E0" //theme.palette.neutral.dark
  const background = "#0A0A0A" //theme.palette.background.default
  const primaryLight = "#00353F" //theme.palette.primary.light
  const alt = "#1A1A1A" //theme.palette.background.alt

  const fullName = `${user.firstName} ${user.lastName}`
  const searchBar = (<FlexBetween backgroundColor={mode === "dark" ? neutralLight : dark} borderRadius="9px" gap="3rem" padding="0.1rem 1.5rem">
    <InputBase placeholder='Search' sx={{
      "& .MuiInputBase-input::placeholder": {
        color: "#00A0BC",
        fontSize: "1.2em"
      }
    }} />
    <IconButton >
      <SearchIcon sx={{
        color: "#00A0BC"
      }} />
    </IconButton>
  </FlexBetween>)


  return (
    <FlexBetween padding="1rem 6%" backgroundColor={mode === "dark" ? dark : neutralLight}>
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem,2rem,2.25rem)"
          color="primary"
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              cursor: "pointer"
            }
          }}
        >
          Socialize
        </Typography>
        {isNonMobileScreen && searchBar}
      </FlexBetween>
      {isNonMobileScreen ? (
        <FlexBetween gap='2rem' backgroundColor={mode === "dark" ? dark : neutralLight}>
          <IconButton sx={{ color: mode === "dark" ? "#00A0BC" : dark, fontSize: '25px' }} onClick={() => dispatch(setMode())}>
            {mode === "dark" ?
              <DarkModeIcon sx={{ color: mode === "dark" ? "#00A0BC" : dark, fontSize: '25px' }} /> :
              <LightModeIcon sx={{ color: mode === "dark" ? "#00A0BC" : dark, fontSize: '25px' }} />
            }
          </IconButton>
          <MessageIcon sx={{ color: mode === "dark" ? "#00A0BC" : dark, fontSize: '25px', cursor:"pointer","&:hover":{color:mode==="dark"?"#006B7D":"#FFFFFF"}}} />
          <NotificationsIcon sx={{ color: mode === "dark" ? "#00A0BC" : dark, fontSize: '25px', cursor:"pointer","&:hover":{color:mode==="dark"?"#006B7D":"#FFFFFF"}}} />
          <HelpIcon sx={{ color: mode === "dark" ? "#00A0BC" : dark, fontSize: '25px', cursor:"pointer","&:hover":{color:mode==="dark"?"#006B7D":"#FFFFFF"}}} />
          <FormControl variant='standard' value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: mode === "dark" ? neutralLight : dark,
                color: "#00A0BC",
                width: '150px',
                borderRadius: "0.25rem",
                padding: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  paddingRight: "0.25rem",
                  width: "3rem",
                  color: "#00A0BC",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: mode === "dark" ? neutralLight : dark
                }
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout)}>LogOut</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) :
        (<IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <MenuIcon />
        </IconButton>)}
      {/* For Mobile Navigation */}
      {!isNonMobileScreen && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0px"
          bottom="0px"
          height="100%"
          zIndex="100"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={mode === "dark" ? dark : neutralLight}
        >
          {/* Close Icon */}
          <Box display="flex" justifyContent="flex-end" padding="1rem">
            <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
              <CloseIcon sx={{ fontSize: '25px' }} />
            </IconButton>
          </Box>

          {/* Menu Icons */}

          <FlexBetween display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap='3rem' backgroundColor={mode === "dark" ? dark : neutralLight}>
          <IconButton sx={{ color: mode === "dark" ? "#00A0BC" : dark, fontSize: '25px' }} onClick={() => dispatch(setMode())}>
            {mode === "dark" ?
              <DarkModeIcon sx={{ color: mode === "dark" ? "#00A0BC" : dark, fontSize: '25px' }} /> :
              <LightModeIcon sx={{ color: mode === "dark" ? "#00A0BC" : dark, fontSize: '25px' }} />
            }
          </IconButton>
          <MessageIcon sx={{ color: mode === "dark" ? "#00A0BC" : dark, fontSize: '25px', cursor:"pointer","&:hover":{color:mode==="dark"?"#006B7D":"#FFFFFF"}}} />
          <NotificationsIcon sx={{ color: mode === "dark" ? "#00A0BC" : dark, fontSize: '25px', cursor:"pointer","&:hover":{color:mode==="dark"?"#006B7D":"#FFFFFF"}}} />
          <HelpIcon sx={{ color: mode === "dark" ? "#00A0BC" : dark, fontSize: '25px', cursor:"pointer","&:hover":{color:mode==="dark"?"#006B7D":"#FFFFFF"}}} />
            <FormControl variant='standard' value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: mode === "dark" ? neutralLight : dark,
                  color:"#00A0BC" ,
                  width: '150px',
                  borderRadius: "0.25rem",
                  padding: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    paddingRight: "0.25rem",
                    width: "3rem",
                    color: "#00A0BC",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: mode === "dark" ? neutralLight : dark
                  }
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout)}>LogOut</MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>



        </Box>
      )}
    </FlexBetween>
  )
}

export default Navbar