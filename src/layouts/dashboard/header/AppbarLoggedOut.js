import React, { useContext, useState, useEffect, } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../../App";

import { styled } from '@mui/material/styles';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Dialog,
    DialogContent,
    DialogTitle,
    Button,
    Grid,
    Avatar
} from '@mui/material';

import { pixelToRem } from '../../../utils/font';

import { createStyles, makeStyles } from "@material-ui/core/styles";
import logo from "../../../logo.svg";
import GithubLogo from "../../../assets/GithubLogo.svg";
import account from "../../../assets/account.svg";


import { Client } from '../../../utils/client';

const client = new Client();


const BG_COLOR = '#ffffff';

const HEIGHT = 92;

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
    minHeight: HEIGHT,
    padding: theme.spacing(0, 5)
}));

const TextTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.primary,
    fontSize: pixelToRem(32),
    fontWeight: theme.typography.h3.fontWeight,
    lineHeight: theme.typography.h3.lineHeight,
}));

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            flexGrow: 1
        },
        title: {
            flexGrow: 1,
            textAlign: "center"
        },
        toolbarMargin: {
            ...theme.mixins.toolbar,
            marginBottom: '2rem',
        },
    })
);


export default function AppbarLoggedOut() {
    const { stateLogin, dispatch } = useContext(AuthContext);

    const classes = useStyles();

    const [data, setData] = useState({ errorMessage: "", isLoading: false });

    const { client_id, redirect_uri } = stateLogin;

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
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
    }, [stateLogin, dispatch, data]);

    if (stateLogin.isLoggedIn) {
        return <Navigate to="/" replace />;
    }


    return (
        <React.Fragment>
            <AppBar
                className="appbarShadow"
                sx={{
                    // boxShadow: 1,
                    bgcolor: BG_COLOR
                }}
            >
                <ToolbarStyle
                    disableGutters
                    sx={{
                        marginRight: 'auto',
                        marginLeft: 'auto',
                        width: { xl: '97rem', lg: '76rem' }
                    }}
                >
                    <img
                        src={logo}
                        alt="logo"
                        style={{
                            width: '2.5rem',
                            marginRight: '0.5rem',
                        }}
                    />
                    <TextTypography>FilPulse</TextTypography>
                    <span>{data.errorMessage}</span>
                    {data.isLoading ? (
                        <div>
                            loading
                        </div>
                    ) : (
                        <div
                            style={{
                                marginLeft: 'auto',
                                marginTop: '0.4rem',
                            }}
                        >
                            <IconButton variant="outlined" onClick={handleClickOpen}>
                                <img src={account} alt="account" />
                            </IconButton>
                            <Dialog open={open} onClose={handleClose} >
                                <DialogTitle
                                    style={{
                                        backgroundColor: "#EEF4F5",
                                    }}
                                >
                                    {"Get your own watchlist"}
                                </DialogTitle>
                                <DialogContent
                                    style={{
                                        backgroundColor: "#FFFFFF",
                                        height: '16rem',
                                        width: '26rem'
                                    }}
                                >
                                    <Grid
                                        container
                                        direction="column"
                                        justifyContent="center"
                                        alignItems="center"
                                    >
                                        <Grid item>
                                            <Typography
                                                sx={{
                                                    marginTop: '3.5rem',
                                                    marginBottom: '2.5rem',
                                                    marginLeft: '2.7rem',
                                                    marginRight: '2.7rem'
                                                }}
                                            >
                                                Sign in to keep track of your preferred development activities.
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Button
                                                variant="contained"
                                                startIcon={<Avatar src={GithubLogo} alt='GithubLogo' />}
                                                sx={{
                                                    backgroundColor: 'transparent',
                                                    color: '#000000',
                                                    width: '18rem',
                                                    '&:hover': {
                                                        backgroundColor: 'transparent',
                                                        color: '#000000',
                                                    },
                                                }}
                                                href={`https://github.com/login/oauth/authorize?scope=user&client_id=${client_id}&redirect_uri=${redirect_uri}`}
                                                onClick={() => {
                                                    setData({ ...data, errorMessage: "" });
                                                }}
                                            >
                                                Sign in with GitHub
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </DialogContent>

                            </Dialog>

                        </div>
                    )}
                </ToolbarStyle>
            </AppBar>
            <div className={classes.toolbarMargin} />
        </React.Fragment>
    );
}
