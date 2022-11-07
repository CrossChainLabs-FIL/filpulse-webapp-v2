import React, { useContext, useState, useEffect, } from "react";
import { Navigate } from "react-router-dom";
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
        },
        toolbarMargin: {
            ...theme.mixins.toolbar,
            marginBottom: "2em",
            [theme.breakpoints.down('md')]: {
                marginBottom: "2em"
            },
            [theme.breakpoints.down('sm')]: {
                marginBottom: "1.5em"
            }
        },
    })
);


export default function AppbarLoggedIn() {
    const { state, dispatch } = useContext(AuthContext);

    const classes = useStyles();

    if (!state.isLoggedIn) {
        return <Navigate to="/login" replace />;
    }


    const accountInfo = () => {
        const { avatar_url, login } = state.user;
        return (
            <div
                style={{
                    marginLeft: 'auto',
                    display: "flex",
                    flexDirection: 'row'
                }}
            >
                <img src={avatar_url} alt="Avatar" style={{ height: '2em', marginRight: '0.5em' }} />
                <TextTypography>{login}</TextTypography>
            </div >
        )
    }

    const handleLogout = () => {
        dispatch({
            type: "LOGOUT"
        });
    }

    return (
        <React.Fragment>
            <AppBar sx={{ boxShadow: 0, bgcolor: BG_COLOR }}>
                <ToolbarStyle disableGutters>
                    <img src={logo} alt="" className={classes.logo} />
                    <TextTypography>FilPulse</TextTypography>
                    {accountInfo()}
                    <IconButton>
                        <img src={account} alt="account" />
                    </IconButton >
                    <IconButton style={{ marginRight: '6.75em' }} onClick={() => handleLogout()}>
                        <img src={exit} alt="exit" />
                    </IconButton >
                </ToolbarStyle>
            </AppBar>
            <div className={classes.toolbarMargin} />
        </React.Fragment>
    );
}
