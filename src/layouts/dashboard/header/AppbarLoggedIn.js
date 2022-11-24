import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../../App";

import { styled } from '@mui/material/styles';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Avatar,
    Menu,
    Button,
    Box
} from '@mui/material';

import { pixelToRem, fontSizes } from '../../../utils/font';

import { createStyles, makeStyles } from "@material-ui/core/styles";
import logo from "../../../logo.svg";
import exit from "../../../assets/exit.svg";
import triunghi from "../../../assets/triunghi.svg";

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
        logo: {
            maxWidth: 40,
            marginRight: '0.5rem',

        },
        toolbarMargin: {
            ...theme.mixins.toolbar,
            marginBottom: '2rem',
        },
    })
);


export default function AppbarLoggedIn() {
    const { stateLogin, dispatch } = useContext(AuthContext);

    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    if (!stateLogin.isLoggedIn) {
        return <Navigate to="/login" replace />;
    }


    const accountInfo = () => {
        const { avatar_url } = stateLogin.user;
        return (
            <Avatar
                style={{
                    marginLeft: 'auto',
                    display: "flex",
                    flexDirection: 'row'
                }}
                src={avatar_url}
                alt="Avatar"
            />
        )
    }

    const handleLogout = () => {
        dispatch({
            type: "LOGOUT"
        });
    }

    return (
        <React.Fragment>
            <AppBar
                className="appbarShadow"
                sx={{
                    // boxShadow: 0.5,
                    bgcolor: BG_COLOR
                }}>
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
                        className={classes.logo}
                    />
                    <TextTypography>FilPulse</TextTypography>
                    {accountInfo()}
                    <IconButton
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <img src={triunghi} alt="triunghi" />
                    </IconButton >
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                        transformOrigin={{ vertical: "top", horizontal: "right" }}
                        MenuListProps={{
                            style: {
                                backgroundColor: "#fff",
                                padding: '0px',
                            }
                        }}
                    >
                        <Button
                            variant="contained"
                            startIcon={<img src={exit} alt='exit' />}
                            sx={{
                                backgroundColor: 'transparent',
                                color: '#000000',
                                width: '12rem',
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                    color: '#000000',
                                },
                            }}
                            onClick={() => handleLogout()}
                        >
                            Sign out
                        </Button>
                    </Menu>
                </ToolbarStyle>
            </AppBar>
            <div className={classes.toolbarMargin} />
        </React.Fragment >
    );
}
