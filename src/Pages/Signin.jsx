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

//Store
import { signin } from "Store/UserSlice";

//Assets
import leaf from "Assets/leaf.png";
import apple from "Assets/apple.png";

//GoogleButton
import GoogleButton from "react-google-button";

//Utils
import { validateEmail } from "Utils/validateEmail";
import { validatePassword } from "Utils/validatePassword";

//Messages
import { Messages } from "Constants/Messages";


export const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const Email = useSelector((state) => state.user.email);
  const Password = useSelector((state) => state.user.password);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(validateEmail(value) ? "" : Messages.InvalidEmailError);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(
      validatePassword(value) ? "" : Messages.InvalidPasswordError
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;

    if (!email) {
      setEmailError(Messages.EmptyEmailError);
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError(Messages.InvalidEmailError);
      valid = false;
    }

    if (!password) {
      setPasswordError(Messages.EmptyPasswordError);
      valid = false;
    } else if (!validatePassword(password)) {
      setPasswordError(Messages.InvalidPasswordError);
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
    <div>
      <form onSubmit={handleSubmit}>
        <div style={styles.subcontainer}>
          <h1 style={styles.heading1}>Welcome Back</h1>
          <h3 style={styles.heading2}>
            Enter Validate Credentials to access your account
          </h3>
          <Box sx={styles.box}>
            <TextField
              fullWidth
              label="Email"
              value={email}
              onChange={handleEmailChange}
            />
            <span style={styles.error}>{emailError}</span>
          </Box>
          <Box sx={styles.box}>
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <span style={styles.error}>{passwordError}</span>
          </Box>
        </div>

        <div style={styles.buttondiv}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            onClick={handleSubmit}
            sx={styles.signinbutton}
          >
            Signin
          </Button>
          <p style={styles.ordiv}>
            ____________________Or_________________________
          </p>
        </div>

        <div style={styles.footer}>
          <div style={styles.googlediv1}>
            <GoogleButton
              style={styles.GoogleButton}
              onClick={() => {
                console.log("Google button clicked");
              }}
            />
          </div>
          <div style={styles.img2div1}>
            <a href="/">
              <img src={apple} alt="logo" style={styles.img2} />
            </a>
          </div>
        </div>
      </form>
      <p style={styles.linkdiv}>
        Don't have an account?<Link to="/"> Signup</Link>
      </p>
      <div>
        <img src={leaf} alt="logo" style={styles.img1} />
      </div>
    </div>
  );
};
const styles = {
  heading1: {
    paddingBottom: "10px",
    fontFamily: "Calibri",
  },

  heading2: {
    fontFamily: "Calibri",
  },

  img1: {
    height: "90%",
    width: "50%",
    position: "absolute",
    top: "0%",
    left: "50%",
    overflow: "hidden",
  },

  img2: {
    height: "50px",
    paddingLeft: "15px",
    width: "270px",
  },

  box: {
    height: 50,
    width: "500px",
    paddingBottom: "50px",
  },

  error: {
    display: "block",
    textAlign: "left",
    color: "red",
    textOverflow: "hidden",
  },

  subcontainer: {
    paddingLeft: "100px",
  },

  signinbutton: {
    width: 500,
    height: "50px",
    backgroundColor: "green",
  },

  footer: {
    display: "flex",
  },

  googlediv1: {
    paddingLeft: "100px",
  },

  img2div1: {
    paddingTop: "1px",
  },

  GoogleButton: {
    borderRadius: "0px",
    paddingLeft: "5px",
  },

  ordiv: {
    paddingLeft: "80px",
    paddingBottom: "20px",
  },

  linkdiv: {
    paddingLeft: "250px",
  },

  buttondiv: {
    paddingLeft: "100px",
  },
};
