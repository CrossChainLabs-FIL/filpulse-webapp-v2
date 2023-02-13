import React, { useState } from 'react'

import {
    Typography,
    Dialog,
    DialogContent,
    Grid,
    Button,
    DialogTitle,
    Avatar
} from '@mui/material';

// components

// assets
import GithubLogo from '../assets/GithubLogo.svg';

export default function SessionExpired({ stateLogin, open, setOpen }) {

    const [dataError, setDataError] = useState({ errorMessage: "" });
    const { client_id, redirect_uri } = stateLogin;

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle
                    sx={{
                        backgroundColor: "#EEF4F5",
                    }}
                >
                    {"Session expired"}
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
                                Your sign-in session has expired, please sign in again.
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
