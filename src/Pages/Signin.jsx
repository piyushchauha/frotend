//React
import React, { useState, useEffect ,useRef} from "react";

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
import { changeLanguage } from "i18next";

export const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emailRef=useRef(null);
  const passwordRef=useRef(null);

  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const Email = useSelector((state) => state.user.email);
  const Password = useSelector((state) => state.user.password);
  const language = useSelector((state) => state.user.language);

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
  const handlekey=(e,RefUp,RefDown)=>{
    switch(e.key){
     case"ArrowUp":
     RefUp.current.focus();
     break;
     case "ArrowDown":
     RefDown.current.focus();
     break;
     default:
       break;
    }
   };
   const handlelanguagekey=(e)=>{
    if(e.key==="ArrowRight"){
      changeLanguage("fr");
    }
    else if(e.key==="ArrowLeft"){
      changeLanguage("en");
    }
    handlekey(e,null,emailRef); 
   };
  
  return (
    <div role="form">
      <form onSubmit={handleSubmit}>
        <div style={styles.innerContainer}>
          <div style={styles.header}>
            <div style={styles.welcomeText}>
              <h1 style={styles.title}>{t("WelcomeBack")}</h1>
            </div>
            <div style={styles.LanguageToggle}>
            <ToggleButtonGroup
                  color="primary"
                  value={language}
                  exclusive
                  onChange={handlelanguage}
                  aria-label="LanguageToggle"
                  tabIndex={0}
                  onKeyDown={(e)=>{
                  handlelanguagekey(e);}
                  }
                >
                <ToggleButton value="en">English</ToggleButton>
                <ToggleButton value="fr">French</ToggleButton>
              </ToggleButtonGroup>
            </div>
          </div>
          <h3 style={styles.instruction}>{t("Entervalidate")}</h3>
          <Box sx={styles.inputBox}>
            <TextField
              fullWidth
              label={t("email")}
              aria-label="email"
              value={email}
              onChange={handleEmailChange}
              inputRef={emailRef}
              onKeyDown={(e)=>handlekey(e,emailRef,passwordRef)}
            />
            <span style={styles.errorText} aria-label="emailerror">
              {emailError}
            </span>
          </Box>
          <Box sx={styles.inputBox}>
            <TextField
              fullWidth
              label={t("password")}
              aria-label="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              inputRef={passwordRef}
              onKeyDown={(e)=>handlekey(e,emailRef,passwordRef)}
            />
            <span style={styles.errorText} aria-label="passworderror">
              {passwordError}
            </span>
          </Box>
        </div>

        <div style={styles.buttonContainer}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            onClick={handleSubmit}
            sx={styles.signinButton}
            role="signinButton"
          >
            {t("signin")}
          </Button>
          <p style={styles.orDivider}>
            ____________________{t("or")}_________________________
          </p>
        </div>

        <div style={styles.footer}>
          <div style={styles.googleContainer}>
            <GoogleButton
              style={styles.googleButton}
              onClick={() => {
                console.log("Google button clicked");
              }}
            />
          </div>
          <div style={styles.appleImageContainer} aria-describedby="appleimage">
            <a href="/">
              <img src={apple} alt="logo" style={styles.appleImage} />
            </a>
          </div>
        </div>
      </form>
      <p style={styles.signupLinkContainer}>
        {t("noaccount")} <Link to="/">{t("signup")}</Link>
      </p>
      <div aria-describedby="leafimage">
        <img src={leaf} alt="logo" style={styles.leafImage} />
      </div>
    </div>
  );
};
const styles = {
  title: {
    paddingBottom: "10px",
    fontFamily: "Arima",
  },

  instruction: {
    fontFamily: "Calibri",
  },

  leafImage: {
    height: "90%",
    width: "50%",
    position: "absolute",
    top: "0%",
    left: "50%",
    overflow: "hidden",
  },

  appleImage: {
    height: "50px",
    paddingLeft: "15px",
    width: "270px",
  },

  inputBox: {
    height: 50,
    width: "500px",
    paddingBottom: "50px",
  },

  errorText: {
    display: "block",
    textAlign: "left",
    color: "red",
    textOverflow: "hidden",
  },

  innerContainer: {
    paddingLeft: "100px",
  },

  signinButton: {
    width: 500,
    height: "50px",
    backgroundColor: "green",
  },

  footer: {
    display: "flex",
  },

  googleContainer: {
    paddingLeft: "100px",
  },

  appleImageContainer: {
    paddingTop: "1px",
  },

  googleButton: {
    borderRadius: "0px",
    paddingLeft: "5px",
  },

  orDivider: {
    paddingLeft: "80px",
    paddingBottom: "20px",
  },

  signupLinkContainer: {
    paddingLeft: "250px",
  },

  buttonContainer: {
    paddingLeft: "100px",
  },

  header: {
    display: "flex",
  },

  LanguageToggle: {
    paddingTop: "15px",
  },

  welcomeText: {
    width: "400px",
  },
};
