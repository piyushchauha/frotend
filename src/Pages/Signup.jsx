//React
import React, { useEffect, useState } from "react";

//Mui
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ToggleButton } from "@mui/material";
import { ToggleButtonGroup } from "@mui/material";
//React-Router
import { Link, useNavigate } from "react-router-dom";

//React-Redux
import { useDispatch } from "react-redux";

//Store
import { signup } from "Store/UserSlice";

//Assets
import leaf from "Assets/leaf.png";
import apple from "Assets/apple.png";

//React-GoogleButton
import GoogleButton from "react-google-button";

//Utils
import { validateEmail } from "Utils/validateEmail";
import { validatePassword } from "Utils/validatePassword";

//Locales
import i18n from "Locales/i18n";

//React-i18n
import { useTranslation } from "react-i18next";


export const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { t } = useTranslation();

  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setnameError] = useState("");
  const [language, setlanguage] = useState("en");


  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(validateEmail(value) ? "" : t("InvalidEmailError"));
  };

  const handlenameChange = (e) => {
    const value = e.target.value;
    setname(value);
    setnameError(value ? "" : t("EmptyNameError"));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(validatePassword(value) ? "" : t("InvalidPasswordError"));
  };

  const handlelanguage = (event, newlangauge) => {
    if (language === "en") {
      i18n.changeLanguage("fr");
    } else {
      i18n.changeLanguage("en");
    }
    setlanguage(newlangauge);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    if (!name) {
      setnameError(t("EmptyNameError"));
      valid = false;
    }

    if (!email) {
      setEmailError(t("EmptyEmailError"));
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError(t("InvalidEmailError"));
      valid = false;
    }

    if (!password) {
      setPasswordError(t("EmptyPasswordError"));
      valid = false;
    } else if (!validatePassword(password)) {
      setPasswordError(t("InvalidPasswordError"));
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
            <div style={styles.lngbutton}><div style={styles.welcome}>
              <h1 style={styles.heading2}>{t("started")}</h1></div>
              <div style={styles.toggle}>
                <ToggleButtonGroup
                  color="primary"
                  value={language}
                  exclusive
                  onChange={handlelanguage}
                  aria-label="Platform"
                >
                  <ToggleButton value="en">English</ToggleButton>
                  <ToggleButton value="fr">French</ToggleButton>
                </ToggleButtonGroup>
              </div>
            </div>
            <Box sx={styles.box}>
              <TextField
                fullWidth
                label={t("name")}
                value={name}
                onChange={handlenameChange}
              />
              <span style={styles.error}>{nameError}</span>
            </Box>

            <Box sx={styles.box}>
              <TextField
                fullWidth
                label={t("email")}
                value={email}
                onChange={handleEmailChange}
              />
              <span style={styles.error}>{emailError}</span>
            </Box>
            <Box sx={styles.box}>
              <TextField
                fullWidth
                label={t("password")}
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
              {t("signup")}
            </Button>
            <p style={styles.ordiv}>
              ____________________{t("or")}_________________________
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
                <img src={apple} alt="logo" style={styles.img2} />
              </a>
            </div>
          </div>
          <p style={styles.linkdiv}>
            {t("noaccount")}
            <Link to="/signin">{t("signin")}</Link>
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

  lngbutton: {
    display: "flex",
  },

  toggle: {
    paddingTop: "20px",
  },

  welcome:{
    width:"400px",
  }
};
