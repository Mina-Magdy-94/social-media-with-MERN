import React from 'react'
import { useState } from 'react'
import { Box, Button, TextField, Typography, useTheme, useMediaQuery } from '@mui/material'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { Formik } from "formik"
import * as yup from "yup"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../store/slices/authSlice';
import Dropzone from 'react-dropzone'
import { FlexBetween } from '../FlexBetween';

const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("Invalid Email"),
    password: yup.string().required("required"),
    location: yup.string().required("required"),
    occupation: yup.string().required("required"),
    picture: yup.string().required("required")
})



const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid Email"),
    password: yup.string().required("required"),
})


const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picture: ""
}

const initialValuesLogin = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picture: ""
}

const Form = () => {
    const [pageType, setPageType] = useState("login")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isNonMobileScreen = useMediaQuery("(min-width:600px)")
    const { palette } = useTheme()
    const isLogin = pageType === "login"
    const isRegister = pageType === "register"


    const baseURLForRegister = "http://localhost:3001/auth/register"
    const baseURLForLogin =    "http://localhost:3001/auth/login"

    const register = async (values, onSubmitProps) => {
        const formData = new FormData()
        for (let value in values) {
            formData.append(value, values[value])
        }
        formData.append('picturePath', values.picture.name)

        const savedUserResponse = await fetch(baseURLForRegister, { method: "POST", body: formData })
        const savedUser = await savedUserResponse.json()
        onSubmitProps.resetForm()

        if (savedUser) {
            setPageType("login")
        }
    }

    const login = async (values, onSubmitProps) => {
        const loggedInUserResponse = await fetch(baseURLForLogin, { method: "POST", headers: { "Content-Type": "application/json"}, body: JSON.stringify(values)})
        const loggedIn = await loggedInUserResponse.json()
        console.log(loggedIn)
        onSubmitProps.resetForm()

        if (loggedIn) {
            dispatch(setLogin({
                user: loggedIn.user,
                token: loggedIn.token
            }))
            navigate("/home")
        }

    }

    const submitHandler = async (values, onSubmitProps) => {
        if (isLogin) await login(values, onSubmitProps)
        if (isRegister) await register(values, onSubmitProps)
    }
    return (
        <Formik
            onSubmit={submitHandler}
            initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
            validationSchema={isLogin ? loginSchema : registerSchema}
        >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm
            }) => {
                return (
                    <form onSubmit={handleSubmit} style={{ width: "100%", height: "500px" }}>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0,1fr))"
                            sx={{
                                "& . div": {
                                    gridColumn: isNonMobileScreen ? undefined : "span 4"
                                }
                            }
                            }
                        >
                            {isRegister && (
                                <>
                                    <TextField
                                        label="First Name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.firstName}
                                        name="firstName"
                                        error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                                        helperText={touched.firstName && errors.firstName}
                                        sx={{
                                            gridColumn: "span 2"
                                        }}
                                    />
                                    <TextField
                                        label="Last Name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.lastName}
                                        name="lastName"
                                        error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                        helperText={touched.lastName && errors.lastName}
                                        sx={{
                                            gridColumn: "span 2"
                                        }}
                                    />
                                    <TextField
                                        label="Location"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.location}
                                        name="location"
                                        error={Boolean(touched.location) && Boolean(errors.location)}
                                        helperText={touched.location && errors.location}
                                        sx={{
                                            gridColumn: "span 4"
                                        }}
                                    />
                                    <TextField
                                        label="Occupation"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.occupation}
                                        name="occupation"
                                        error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                                        helperText={touched.occupation && errors.occupation}
                                        sx={{
                                            gridColumn: "span 4"
                                        }}
                                    />
                                    <Box
                                        gridColumn="span 4"
                                        border={`1px solid ${palette.neutral.medium}`}
                                        borderRadius="5px"
                                        p="1rem"
                                    >
                                        <Dropzone
                                            acceptedFiles=".jpg,.jpeg,.png"
                                            multiple={false}
                                            onDrop={(acceptedFiles) =>
                                                setFieldValue("picture", acceptedFiles[0])
                                            }
                                        >
                                            {({ getRootProps, getInputProps }) => (
                                                <Box
                                                    {...getRootProps()}
                                                    border={`2px dashed #00D5FA`}
                                                    p="1rem"
                                                    sx={{ "&:hover": { cursor: "pointer" } }}
                                                >
                                                    <input {...getInputProps()} />
                                                    {!values.picture ? (
                                                        <p>Add Picture Here</p>
                                                    ) : (
                                                        <FlexBetween>
                                                            <Typography>{values.picture.name}</Typography>
                                                            <ModeEditOutlineIcon />
                                                        </FlexBetween>
                                                    )}
                                                </Box>
                                            )}
                                        </Dropzone>
                                    </Box>
                                </>
                            )}

                            <TextField
                                label="Email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.email}
                                name="email"
                                error={Boolean(touched.email) && Boolean(errors.email)}
                                helperText={touched.email && errors.email}
                                sx={{
                                    gridColumn: "span 4"
                                }}
                            />
                            <TextField
                                label="Password"
                                type='password'
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.password}
                                name="password"
                                error={Boolean(touched.password) && Boolean(errors.password)}
                                helperText={touched.password && errors.password}
                                sx={{
                                    gridColumn: "span 4"
                                }}
                            />
                        </Box>


                        {/* Buttons */}

                        <Box>
                            <Button
                                fullWidth
                                type='submit'
                                sx={{
                                    margin: "2rem 0",
                                    padding: "1rem",
                                    backgroundColor: "#00D5FA",
                                    color: "#1A1A1A",
                                    "&:hover": {
                                        color: "#00D5FA"
                                    }
                                }}
                            >
                                {isRegister ? "Register" : "Login"}
                            </Button>
                            <Typography
                                onClick={() => {
                                    setPageType(isLogin ? "register" : "login")
                                    resetForm()
                                }}
                                sx={{
                                    textDecoration: "underline",
                                    color: "#00D5FA",
                                    "&:hover": {
                                        cursor: "pointer",
                                        color: "#00353F"
                                    }
                                }}
                            >
                                {isLogin ? "Do not have an account? Sign Up here." : "Already have an account? Login here."}
                            </Typography>
                        </Box>

                    </form>
                )
            }}
        </Formik >
    )
}

export default Form