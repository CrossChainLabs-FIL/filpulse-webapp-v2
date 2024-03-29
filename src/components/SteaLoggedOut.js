import React, { useState } from 'react';

import {
    Typography,
    Dialog,
    DialogContent,
    Grid,
    Button,
    DialogTitle,
    IconButton,
    Avatar
} from '@mui/material';


// components

// assets
import GithubLogo from '../assets/GithubLogo.svg';
import steaGol from '../assets/steaGol.svg';



export default function SteaLoggedOut({ stateLogin }) {

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
                                    setDataError({ ...dataError, errorMessage: "" });
                                }}
                            >
                                Sign in with GitHub
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
    )
}
