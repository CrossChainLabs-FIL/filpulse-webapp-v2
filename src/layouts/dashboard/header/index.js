import React, { useContext, useState, useEffect, } from "react";
import { AuthContext } from "../../../App";

import { alpha, styled } from '@mui/material/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { createStyles, makeStyles } from "@material-ui/core/styles";
import logo from "../../../logo.svg";
import exit from "../../../assets/exit.svg";
import account from "../../../assets/account.svg";

// import Login from "../../../components/Login"

import { Client } from '../../../utils/client';

const client = new Client();


const BG_COLOR = '#ffffff';

const HEIGHT = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)',
  backgroundColor: alpha(theme.palette.background, 0.72),
  width: `calc(100%}px)`
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: HEIGHT,
  padding: theme.spacing(0, 5)
}));

const TextTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: theme.typography.h3.fontSize,
  fontWeight: theme.typography.h3.fontWeight,
  lineHeight: theme.typography.h3.lineHeight,
}));

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1,
      textAlign: "center"
    },
    logo: {
      maxWidth: 40,
      marginRight: '10px',
      marginLeft: '9.5em'
    }
  })
);


export default function DashboardNavbar() {
  const { state, dispatch } = useContext(AuthContext);

  const classes = useStyles();

  const accountInfo = () => {
    const { avatar_url, name, public_repos, followers, following } = state.user;
    return (
      <div style={{ marginLeft: 'auto' }}>
        <img src={avatar_url} alt="Avatar" style={{ height: '2em' }} />
        <div>{name}</div>
      </div>
    )
  }

  const [data, setData] = useState({ errorMessage: "", isLoading: false });

  const { client_id, redirect_uri } = state;

  useEffect(() => {
    console.log(state.isLoggedIn);
    if (!state.isLoggedIn) {
      // After requesting Github access, Github redirects back to your app with a code parameter
      const url = window.location.href;
      const hasCode = url.includes("?code=");

      // If Github API returns the code parameter
      if (hasCode) {
        const newUrl = url.split("?code=");
        window.history.pushState({}, null, newUrl[0]);
        setData({ ...data, isLoading: true });

        const requestData = {
          code: newUrl[1]
        };


        client.post('authenticate', requestData).then(response => {
          console.log(response);
          dispatch({
            type: "LOGIN",
            payload: { user: response, isLoggedIn: true }
          });
        })
          .catch(error => {
            setData({
              isLoading: false,
              errorMessage: "Sorry! Login failed"
            });
          });
      }
    }
  }, [state, dispatch, data]);





  const handleLogout = () => {
    dispatch({
      type: "LOGOUT"
    });
  }

  return (
    <AppBar sx={{ boxShadow: 0, bgcolor: BG_COLOR }}>
      <ToolbarStyle disableGutters>
        <img src={logo} alt="" className={classes.logo} />
        <TextTypography>FilPulse</TextTypography>
        {state.isLoggedIn ? accountInfo() : ''}
        {data.isLoading ? (
          <div>
            loading
          </div>
        ) : (
          <div style={{ marginLeft: 'auto' }}>
            {
              // Link to request GitHub access
            }
            <a
              className="login-link"
              href={`https://github.com/login/oauth/authorize?scope=user&client_id=${client_id}&redirect_uri=${redirect_uri}`}
              onClick={() => {
                setData({ ...data, errorMessage: "" });
              }}
            >
              <img src={account} alt="account" />
            </a>
          </div>
        )}
        <IconButton style={{ marginRight: '6.75em' }} onClick={() => handleLogout()}>
          <img src={exit} alt="exit" />
        </IconButton >
      </ToolbarStyle>
    </AppBar>
  );
}
