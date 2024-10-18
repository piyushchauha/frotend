//React
import React from "react";

//React-Redux
import { useDispatch, useSelector } from "react-redux";
import { logout } from "Features/UserSlice";

//Mui
import { Grid2 } from "@mui/material";
import Button from "@mui/material/Button";

//React-Router
import { useNavigate } from "react-router-dom";


export const Display1 = () => {
  const email = useSelector((state) => state.user.email);
  const password = useSelector((state) => state.user.password);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handle = (e) => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <Grid2
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh" }}
    >
      <Grid2
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{
          border: "1px solid grey",
          borderRadius: "6px",
          height: "400px",
          width: "600px",
        }}
      >
        {email && <h1>Email: {email}</h1>}
        {password && <h1>Password: {password}</h1>}
        <Button
          type="submit"
          variant="contained"
          onClick={handle}
          size="large"
          sx={{
            width: 500,
            maxWidth: "100%",
            height: "50px",
            paddingBottom: "14px",
            backgroundColor: "green",
          }}
        >
          logout
        </Button>
      </Grid2>
    </Grid2>
  );
};
