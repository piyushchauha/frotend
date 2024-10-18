//React
import React, { useState } from "react";

//Mui
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

//React-router
import { Link, useNavigate } from "react-router-dom";

//React-Redux
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

//UserSlice
import { signin } from "Features/UserSlice";

//Image
import leaf from "Image/leaf.png";
import apple1 from "Image/apple1.png";

//GoogleButton
import GoogleButton from "react-google-button";

export const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Email = useSelector((state) => state.user.email);
  const Password = useSelector((state) => state.user.password);

  const validateEmail = (email) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
  const validatePassword = (password) =>
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/.test(password);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(validateEmail(value) ? "" : "Invalid Email");
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(validatePassword(value) ? "" : "Invalid password");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;

    if (!email) {
      setEmailError("Please enter the email");
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Invalid Email");
      valid = false;
    }

    if (!password) {
      setPasswordError("Please enter the password");
      valid = false;
    } else if (!validatePassword(password)) {
      setPasswordError("Invalid password");
      valid = false;
    }

    if (valid) {
      dispatch(signin({ email, password }));
    }
    if (Email === email && Password === password) {
      return navigate("/dashboard");
    } else {
      return navigate("/");
    }
  };

  return (
    <div
      className="container"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "600px",
        paddingTop:"10px"
      }}
    >
      <div
        style={{
          flex: "2",
          justifyContent: "center",
          height: "700px",
          width: "1300px",
          paddingTop: "50px",
        }}
      >
        <form onSubmit={handleSubmit}>
          <div style={{ flex: "1", paddingLeft: "100px" }}>
            <h1 style={{ paddingBottom: "10px", fontFamily: "Calibri" }}>
              Welcome Back
            </h1>
            <h3 style={{ fontFamily: "Calibri" }}>
              Enter Validate Credentials to access your account
            </h3>
            <Box
              sx={{
                height: 50,
                width: 500,
                maxWidth: "100%",
                paddingBottom: "50px",
              }}
            >
              <TextField
                fullWidth
                label="Email"
                value={email}
                onChange={handleEmailChange}
              />
              <span
                style={{
                  display: "block",
                  textAlign: "left",
                  color: "red",
                  textOverflow: "hidden",
                }}
              >
                {emailError}
              </span>
            </Box>
            <Box
              sx={{
                height: 50,
                width: 500,
                maxWidth: "100%",
                paddingBottom: "50px",
              }}
            >
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
              <span
                style={{
                  display: "block",
                  textAlign: "left",
                  color: "red",
                  textOverflow: "hidden",
                }}
              >
                {passwordError}
              </span>
            </Box>
          </div>

          <div style={{ paddingLeft: "100px" }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              onClick={handleSubmit}
              sx={{
                width: 500,
                height: "50px",
                backgroundColor: "green",
              }}
            >
              Signin
            </Button>
            <p style={{ paddingLeft: "80px", paddingBottom: "20px" }}>
              ____________________Or_________________________
            </p>
          </div>

          <div style={{ display: "flex" }}>
            <div style={{ paddingLeft: "100px" }}>
              <GoogleButton
                style={{ borderRadius: "0px", paddingLeft: "5px" }}
                onClick={() => {
                  console.log("Google button clicked");
                }}
              />
            </div>
            <div style={{ paddingTop: "1px" }}>
              <a href="/">
                {" "}
                <img
                  src={apple1}
                  alt="logo"
                  style={{
                    height: "50px",
                    paddingLeft: "15px",
                    width: "270px",
                  }}
                />
              </a>
            </div>
          </div>
        </form>
        <p style={{ paddingLeft: "250px" }}>
          Don't have an account?<Link to="/"> Signup</Link>
        </p>
        <div style={{ flex: "1" }}>
          <img
            src={leaf}
            alt="logo"
            style={{
              height: "90%",
              width: "50%",
              position: "absolute",
              top: "0%",
              left: "50%",
              overflow: "hidden",
            }}
          />
        </div>
      </div>
    </div>
  );
};
