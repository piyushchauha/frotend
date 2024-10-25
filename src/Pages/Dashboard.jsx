//React
import React from "react";

//React-Redux
import { useDispatch, useSelector } from "react-redux";
import { logout } from "Store/UserSlice";

//Mui
import { Grid2 } from "@mui/material";
import Button from "@mui/material/Button";

//React-Router
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const email = useSelector((state) => state.user.email);
  const password = useSelector((state) => state.user.password);

  const handle = (e) => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <Grid2 sx={styles.container}>
      <Grid2 sx={styles.subcontainer}>
        {email && <h1>Email: {email}</h1>}
        {password && <h1>Password: {password}</h1>}
        <Button
          type="submit"
          variant="contained"
          onClick={handle}
          size="large"
          sx={styles.logoutbutton}
        >
          logout
        </Button>
      </Grid2>
    </Grid2>
  );
};
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
  },
  subcontainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid grey",
    borderRadius: "6px",
    height: "400px",
    width: "600px",
  },
  logoutbutton: {
    width: 500,
    maxWidth: "100%",
    height: "50px",
    paddingBottom: "14px",
    backgroundColor: "green",
  },
};
