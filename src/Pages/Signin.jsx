//React
import React, { useState, useEffect } from "react";

//Mui
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ToggleButton } from "@mui/material";
import { ToggleButtonGroup } from "@mui/material";

//React-router
import { Link, useNavigate } from "react-router-dom";

//React-Redux
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

//Store
import { signin } from "Store/UserSlice";
import { setlanguage } from "Store/UserSlice";

//Assets
import leaf from "Assets/Images/leaf.png";
import apple from "Assets/Images/apple.png";

//GoogleButton
import GoogleButton from "react-google-button";

//Utils
import { validateEmail } from "Utils/validateEmail";
import { validatePassword } from "Utils/validatePassword";

//Locales
import i18n from "Locales/i18n";

//React-i18next
import { useTranslation } from "react-i18next";

//App.css
import "App.css";

export const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const Email = useSelector((state) => state.user.email);
  const Password = useSelector((state) => state.user.password);
  const language=useSelector((state)=>state.user.language);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(validateEmail(value) ? "" : t("InvalidEmailError"));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(validatePassword(value) ? "" : t("InvalidPasswordError"));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;

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
      dispatch(signin({ email, password }));
    }

    if (Email === email && Password === password) {
      return navigate("/dashboard");
    } else {
      return navigate("/");
    }
  };

  const handlelanguage = (event, newlanguage) => {
    if (newlanguage === "en") {
      i18n.changeLanguage("en");
      
    } else if (newlanguage === "fr") {
      i18n.changeLanguage("fr");
    }

    dispatch(setlanguage(newlanguage));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div style={styles.subcontainer}>
          <div style={styles.heading1div}>
            <div style={styles.welcome}>
              <h1 style={styles.heading1}>{t("WelcomeBack")}</h1>
            </div>
            <div style={styles.lngbutton}>
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
          <h3 style={styles.heading2}>{t("Entervalidate")}</h3>
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
            onClick={handleSubmit}
            sx={styles.signinbutton}
          >
            {t("signin")}
          </Button>
          <p style={styles.ordiv}>
            ____________________{t("or")}_________________________
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
        {t("noaccount")} <Link to="/">{t("signup")}</Link>
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
    fontFamily: "Arima",
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

  heading1div: {
    display: "flex",
  },

  lngbutton: {
    paddingTop: "15px",
    // paddingLeft: "200px",
  },

  french: {
    margin: "10px",
    backgroundColor: "green",
  },

  english: {
    backgroundColor: "green",
  },

  welcome: {
    width: "400px",
  },
};
