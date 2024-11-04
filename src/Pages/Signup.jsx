//React
import React, { useState, useEffect, useRef } from 'react';

//Mui
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ToggleButton } from '@mui/material';
import { ToggleButtonGroup } from '@mui/material';

//React-Router
import { Link, useNavigate } from 'react-router-dom';

//React-Redux
import { useDispatch, useSelector } from 'react-redux';

//Store
import { signup } from 'Store/UserSlice';
import { setlanguage } from 'Store/UserSlice';

//Assets
import leaf from 'Assets/Images/leaf.png';
import apple from 'Assets/Images/apple.png';

//React-GoogleButton
import GoogleButton from 'react-google-button';

//Utils
import { validateEmail } from 'Utils/validateEmail';
import { validatePassword } from 'Utils/validatePassword';

//Locales
import i18n from 'Locales/i18n';

//React-i18n
import { useTranslation } from 'react-i18next';
import { changeLanguage } from 'i18next';

export const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emailRef = useRef(null);
  const nameRef = useRef(null);
  const passwordRef = useRef(null);

  const { t } = useTranslation();

  const [name, setname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setnameError] = useState('');

  const language = useSelector(state => state.user.language);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);
  const handleEmailChange = e => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(validateEmail(value) ? '' : t('InvalidEmailError'));
  };

  const handlenameChange = e => {
    const value = e.target.value;
    setname(value);
    setnameError(value ? '' : t('EmptyNameError'));
  };

  const handlePasswordChange = e => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(validatePassword(value) ? '' : t('InvalidPasswordError'));
  };

  const handleSubmit = e => {
    e.preventDefault();
    let valid = true;
    if (!name) {
      setnameError(t('EmptyNameError'));
      valid = false;
    }

    if (!email) {
      setEmailError(t('EmptyEmailError'));
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError(t('InvalidEmailError'));
      valid = false;
    }

    if (!password) {
      setPasswordError(t('EmptyPasswordError'));
      valid = false;
    } else if (!validatePassword(password)) {
      setPasswordError(t('InvalidPasswordError'));
      valid = false;
    }

    if (valid) {
      dispatch(signup({ name, email, password }));
      navigate('/signin');
    }
  };

  const handlelanguage = (event, newlanguage) => {
    if (newlanguage === 'en') {
      i18n.changeLanguage('en');
    } else if (newlanguage === 'fr') {
      i18n.changeLanguage('fr');
    }
    dispatch(setlanguage(newlanguage));
  };
  const handlekey = (e, RefUp, RefDown) => {
    switch (e.key) {
      case 'ArrowUp':
        RefUp.current.focus();
        break;
      case 'ArrowDown':
        RefDown.current.focus();
        break;
      default:
        break;
    }
  };
  const handlelanguagekey = e => {
    if (e.key === 'ArrowRight') {
      changeLanguage('fr');
    } else if (e.key === 'ArrowLeft') {
      changeLanguage('en');
    }
    handlekey(e, null, nameRef);
  };

  return (
    <div role="form" style={styles.container}>
      <div style={styles.innercontainer}>
        <form onSubmit={handleSubmit}>
          <div style={styles.header}>
            <div style={styles.languageSection}>
              <div style={styles.welcomeText}>
                <h1 style={styles.title}>{t('started')}</h1>
              </div>
              <div style={styles.LanguageToggle}>
                <ToggleButtonGroup
                  color="primary"
                  value={language}
                  exclusive
                  onChange={handlelanguage}
                  aria-label="LanguageToggle"
                  tabIndex={0}
                  onKeyDown={e => {
                    handlelanguagekey(e);
                  }}
                >
                  <ToggleButton value="en">English</ToggleButton>
                  <ToggleButton value="fr">French</ToggleButton>
                </ToggleButtonGroup>
              </div>
            </div>
            <Box sx={styles.inputBox}>
              <TextField
                fullWidth
                label={t('name')}
                aria-label="name"
                value={name}
                onChange={handlenameChange}
                tabIndex={0}
                inputRef={nameRef}
                onKeyDown={e => {
                  handlekey(e, nameRef, emailRef);
                }}
              />
              <span aria-label="nameerror" style={styles.errorText}>
                {nameError}
              </span>
            </Box>

            <Box sx={styles.inputBox}>
              <TextField
                fullWidth
                label={t('email')}
                aria-label="email"
                value={email}
                onChange={handleEmailChange}
                inputRef={emailRef}
                tabIndex={0}
                onKeyDown={e => {
                  handlekey(e, nameRef, passwordRef);
                }}
              />
              <span aria-label="emailerror" style={styles.errorText}>
                {emailError}
              </span>
            </Box>
            <Box sx={styles.inputBox}>
              <TextField
                fullWidth
                label={t('password')}
                aria-label="password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                inputRef={passwordRef}
                onKeyDown={e => {
                  handlekey(e, emailRef, passwordRef);
                }}
              />
              <span aria-label="passworderror" style={styles.errorText}>
                {passwordError}
              </span>
            </Box>
          </div>

          <div style={styles.buttonContainer}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              role="signupButton"
              sx={styles.signupButton}
            >
              {t('signup')}
            </Button>
            <p style={styles.dividerText}>
              ____________________{t('or')}_________________________
            </p>
          </div>
          <div style={styles.footer}>
            <div style={styles.googleContainer}>
              <GoogleButton
                style={styles.googleButton}
                onClick={() => {
                  console.log('Google button clicked');
                }}
              />
            </div>
            <div style={styles.appleImageContainer}>
              <a href="/">
                <img src={apple} alt="logo" style={styles.appleImage} />
              </a>
            </div>
          </div>
          <p style={styles.signinLink}>
            {t('noaccount')}
            <Link to="/signin"> {t('signin')}</Link>
          </p>
          <div>
            <img src={leaf} alt="logo" style={styles.leafImage} />
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '610px ',
  },

  innercontainer: {
    flex: '2',
    justifyContent: 'center',
    height: '700px',
    width: '1300px',
    paddingTop: '40px',
  },

  header: {
    paddingLeft: '100px',
  },

  title: {
    paddingBottom: '10px',
    fontFamily: 'Calibri',
    width: '325px',
    fontSize: '36px',
  },
  inputBox: {
    height: 50,
    width: 500,
    maxWidth: '100%',
    paddingBottom: '50px',
  },

  errorText: {
    display: 'block',
    textAlign: 'left',
    color: 'red',
    textOverflow: 'hidden',
  },

  buttonContainer: {
    paddingLeft: '100px',
  },

  signupButton: {
    width: 500,
    height: '50px',
    backgroundColor: 'green',
  },

  dividerText: {
    paddingLeft: '80px',
    paddingBottom: '20px',
  },

  footer: {
    display: 'flex',
  },

  googleContainer: {
    paddingLeft: '100px',
  },

  googleButton: {
    paddingLeft: '5px',
  },

  appleImageContainer: {
    paddingTop: '1px',
  },

  appleImage: {
    height: '49px',
    paddingLeft: '15px',
    width: '270px',
  },

  signinLink: {
    paddingLeft: '250px',
  },

  leafImage: {
    height: '95%',
    width: '50%',
    position: 'absolute',
    top: '0%',
    left: '50%',
    overflow: 'hidden',
  },

  languageSection: {
    display: 'flex',
  },

  LanguageToggle: {
    paddingTop: '20px',
  },
};
