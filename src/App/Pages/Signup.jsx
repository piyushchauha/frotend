//React
import React, { useState } from "react";

//Mui
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

//React-Router
import { Link, useNavigate } from "react-router-dom";

//React-Redux
import { useDispatch } from "react-redux";

//Store
import { signup } from "App/Store/UserSlice";

//Assets
import leaf from "App/Assets/leaf.png";
import apple from "App/Assets/apple.png";

//React-GoogleButton
import GoogleButton from "react-google-button";

//Utils
import { validateEmail } from "App/Utils/validateEmail";
import { validatePassword } from "App/Utils/validatePassword";

export const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setnameError] = useState("");

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(validateEmail(value) ? "" : "Invalid Email");
  };

  const handlenameChange = (e) => {
    const value = e.target.value;
    setname(value);
    setnameError(value ? "" : "Please Enter name");
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(validatePassword(value) ? "" : "Invalid password");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    if (!name) {
      setnameError("Please enter the name");
      valid = false;
    }

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
      dispatch(signup({ name, email, password }));
      navigate("/signin");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.subcontainer}>
        <form onSubmit={handleSubmit}>
          <div style={styles.heading1}>
            <h1 style={styles.heading2}>Get Started Now</h1>

            <Box sx={styles.box}>
              <TextField
                fullWidth
                label="Name"
                value={name}
                onChange={handlenameChange}
              />
              <span style={styles.error}>{nameError}</span>
            </Box>

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
              sx={styles.signupbutton}
            >
              SignUp
            </Button>
            <p style={styles.ordiv}>
              ____________________Or_________________________
            </p>
          </div>
          <div style={styles.footer}>
            <div style={styles.googlediv}>
              <GoogleButton
                style={styles.GoogleButton}
                onClick={() => {
                  console.log("Google button clicked");
                }}
              />
            </div>
            <div style={styles.img2div1}>
              <a href="/">
                {" "}
                <img src={apple} alt="logo" style={styles.img2} />
              </a>
            </div>
          </div>
          <p style={styles.linkdiv}>
            Already have an account?<Link to="/signin"> Signin</Link>
          </p>
          <div>
            <img src={leaf} alt="logo" style={styles.img1} />
          </div>
        </form>
      </div>
    </div>
  );
};
const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "610px ",
  },

  subcontainer: {
    flex: "2",
    justifyContent: "center",
    height: "700px",
    width: "1300px",
    paddingTop: "40px",
  },
  heading1: {
    paddingLeft: "100px",
  },
  heading2: {
    paddingBottom: "10px",
    fontFamily: "Calibri",
  },
  box: {
    height: 50,
    width: 500,
    maxWidth: "100%",
    paddingBottom: "50px",
  },

  error: {
    display: "block",
    textAlign: "left",
    color: "red",
    textOverflow: "hidden",
  },

  buttondiv: {
    paddingLeft: "100px",
  },

  signupbutton: {
    width: 500,
    height: "50px",
    backgroundColor: "green",
  },

  ordiv: {
    paddingLeft: "80px",
    paddingBottom: "20px",
  },

  footer: {
    display: "flex",
  },

  googlediv: {
    paddingLeft: "100px",
  },

  GoogleButton: {
    paddingLeft: "5px",
  },

  img2div1: {
    paddingTop: "1px",
  },

  img2: {
    height: "49px",
    paddingLeft: "15px",
    width: "270px",
  },

  linkdiv: {
    paddingLeft: "250px",
  },

  img1: {
    height: "95%",
    width: "50%",
    position: "absolute",
    top: "0%",
    left: "50%",
    overflow: "hidden",
  },
};
