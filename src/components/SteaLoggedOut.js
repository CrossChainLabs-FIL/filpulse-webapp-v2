import React, { useState } from 'react';

import { makeStyles } from '@mui/styles';

import {
    Typography,
    Dialog,
    DialogContent,
    Grid,
    Button,
    DialogTitle,
    IconButton
} from '@mui/material';


// components

// assets
import GithubLogo from '../assets/GithubLogo.svg';
import steaGol from '../assets/steaGol.svg';

const useStyles = makeStyles((theme) => ({

}));

export default function SteaLoggedOut({ stateLogin }) {
    const classes = useStyles();

    const [dataError, setDataError] = useState({ errorMessage: "" });
    const [open, setOpen] = useState(false);
    const { client_id, redirect_uri } = stateLogin;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <IconButton variant="outlined" onClick={handleClickOpen} disableRipple>
                <img src={steaGol} alt="steaGol" />
            </IconButton>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle
                    sx={{
                        backgroundColor: "#EEF4F5",
                    }}
                >
                    {"Get your own watchlist"}
                </DialogTitle>
                <DialogContent
                    sx={{
                        backgroundColor: "#FFFFFF",
                        height: '18rem',
                        width: '30rem'
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
                                    marginBottom: '3rem',
                                    marginLeft: '3rem'
                                }}
                            >
                                Track the ecosystem development. View your preferred activities. Do it all with our easy to use platform.
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                startIcon={<img src={GithubLogo} alt='GithubLogo' />}
                                sx={{
                                    backgroundColor: 'transparent',
                                    color: '#000000',
                                    width: '23rem',
                                    '&:hover': {
                                        backgroundColor: 'transparent',
                                        color: '#000000',
                                    },
                                }}
                                href={`https://github.com/login/oauth/authorize?scope=user&client_id=${client_id}&redirect_uri=${redirect_uri}`}
                                onClick={() => {
                                    setDataError({ ...dataError, errorMessage: "" });
                                }}
                            >
                                Sign in with Github
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
    )
}
