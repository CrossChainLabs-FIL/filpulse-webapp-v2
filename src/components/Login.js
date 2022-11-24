import React from 'react';
import { useState } from 'react';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { styled } from '@mui/material/styles';
import {
    Stack,
    Button,
    Tab,
    Tabs,
    IconButton,
    TextField,
    Dialog,
    DialogContent,
    Typography,
    MenuItem
} from '@mui/material';


import account from "../assets/account.svg";
import x from "../assets/x.svg";



const StyledTabs = styled((props) => (
    <Tabs
        {...props}
        TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
    />
))({

    '& .MuiTabs-indicator': {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    '& .MuiTabs-indicatorSpan': {
        maxWidth: 45,
        width: '100%',
        backgroundColor: '#0DBB52',
    },
});



const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
        textTransform: 'none',
        fontWeight: 750,
        fontSize: theme.typography.pxToRem(20),
        marginRight: theme.spacing(3),
        color: "#000000",
        '&.Mui-selected': {
            color: '#000000',
        },
        // '&.Mui-focusVisible': {
        //     backgroundColor: 'rgba(100, 95, 228, 0.32)',
        // },
    }),
);



export default function Login() {
    const [open, setOpen] = React.useState(false);

    const [forgot, setForgot] = useState(false);

    const [value, setValue] = useState(0);

    const questions = [
        "What city were you born in ?",
        "What is your oldest sibling’s middle name ?",
        "What was the first concert you attended ?",
        "What was the make and model of your first car ?",
        "In what city or town did your parents meet ?",
        "What is the name of your favorite pet ?",
        "What is your mother's maiden name ?",
        "What was your favorite food as a child ?",
        "Where did you meet your spouse ?",
        "What year was your father (or mother) born ?"
    ];

    const [questionL, setQuestionL] = useState("What city were you born in ?");
    const [questionS, setQuestionS] = useState("What city were you born in ?");

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setForgot(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setForgot(false);
    };

    const handleForgot = () => {
        setForgot(true);
    };

    const handleChangeQuestionL = (event) => {
        setQuestionL(event.target.value);
    };

    const handleChangeQuestionS = (event) => {
        setQuestionS(event.target.value);
    };

    return (
        <div style={{ marginLeft: 'auto' }}>
            <IconButton variant="outlined" onClick={handleClickOpen}>
                <img src={account} alt="account" />
            </IconButton>
            <Dialog open={open} onClose={handleClose} >
                <DialogContent
                    style={{
                        backgroundColor: "#FFFFFF",
                        height: '43rem',
                        width: '30rem'
                    }}
                >
                    <Stack>
                        <img
                            src={x}
                            alt="x"
                            onClick={handleClose}
                            style={{
                                height: '1rem',
                                width: '1rem',
                                marginLeft: 'auto',
                                marginBottom: '2.5rem'
                            }}
                        />
                        <StyledTabs
                            value={value}
                            onChange={handleChange}
                            style={{
                                marginLeft: '6.5rem',
                                marginBottom: '1rem'
                            }}
                        >
                            <StyledTab label='Login' />
                            <StyledTab label='Sign Up' />
                        </StyledTabs>

                        {value === 0 && forgot === false && (
                            <>
                                <TextField
                                    id="username"
                                    label="Username"
                                    fullWidth
                                    style={{
                                        marginTop: '5rem',
                                        width: '15rem',
                                        marginLeft: '5.5rem'
                                    }}
                                />
                                <Typography
                                    style={{
                                        marginLeft: '15rem',
                                        marginTop: '1rem',
                                        opacity: 0.72
                                    }}
                                    onClick={handleForgot}
                                    variant='subtitle2'
                                >
                                    Forgot password?
                                </Typography>
                                <TextField
                                    id="password"
                                    label="password"
                                    fullWidth
                                    style={{
                                        marginBottom: '5rem',
                                        width: '15rem',
                                        marginLeft: '5.5rem'
                                    }}
                                />
                            </>
                        )}

                        {value === 0 && forgot === true && (
                            <>
                                <Typography
                                    style={{
                                        marginLeft: '4rem',
                                        marginTop: '0.25rem',
                                        fontWeight: 650
                                    }}
                                    onClick={handleForgot}
                                    variant='h5'
                                >
                                    Forgot password?
                                </Typography>
                                <TextField
                                    id="username"
                                    label="Username"
                                    fullWidth
                                    style={{
                                        width: '15rem',
                                        marginLeft: '5.5rem'
                                    }}
                                />
                                <TextField
                                    id="question"
                                    label="Secret question"
                                    select
                                    fullWidth
                                    value={questionL}
                                    onChange={handleChangeQuestionL}
                                    style={{
                                        marginTop: '2rem',
                                        width: '15rem',
                                        marginLeft: '5.5rem'
                                    }}
                                >
                                    {questions.map((question) => (
                                        <MenuItem
                                            key={question}
                                            value={question}
                                            style={{ backgroundColor: "#FFFFFF" }}
                                        >
                                            {question}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    id="answer"
                                    label="Answer"
                                    fullWidth
                                    style={{
                                        marginTop: '2rem',
                                        width: '15rem',
                                        marginLeft: '5.5rem'
                                    }}
                                />
                                <TextField
                                    id="newPassword"
                                    label="New password"
                                    fullWidth
                                    style={{
                                        marginTop: '2rem',
                                        width: '15rem',
                                        marginLeft: '5.5rem'
                                    }}
                                />
                                <TextField
                                    id="reNewPassword"
                                    label="Re-type new password"
                                    fullWidth
                                    style={{
                                        marginTop: '2rem',
                                        width: '15rem',
                                        marginLeft: '5.5rem'
                                    }}
                                />
                            </>
                        )}

                        {value === 1 && (
                            <>
                                <TextField
                                    id="username"
                                    label="Username"
                                    fullWidth
                                    style={{
                                        width: '15rem',
                                        marginLeft: '5.5rem',
                                    }}
                                />
                                <TextField
                                    id="newPassword"
                                    label="New password"
                                    fullWidth
                                    style={{
                                        marginTop: '2rem',
                                        width: '15rem',
                                        marginLeft: '5.5rem'
                                    }}
                                />
                                <TextField
                                    id="reNewPassword"
                                    label="Re-type new password"
                                    fullWidth
                                    style={{
                                        marginTop: '2rem',
                                        width: '15rem',
                                        marginLeft: '5.5rem'
                                    }}
                                />
                                <TextField
                                    id="question"
                                    select
                                    label="Secret question"
                                    fullWidth
                                    value={questionS}
                                    onChange={handleChangeQuestionS}
                                    style={{
                                        marginTop: '2rem',
                                        width: '15rem',
                                        marginLeft: '5.5rem'
                                    }}
                                >
                                    {questions.map((question) => (
                                        <MenuItem
                                            key={question}
                                            value={question}
                                            style={{ backgroundColor: "#FFFFFF" }}
                                        >
                                            {question}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    id="answer"
                                    label="Answer"
                                    fullWidth
                                    style={{
                                        marginTop: '2rem',
                                        width: '15rem',
                                        marginLeft: '5.5rem'
                                    }}
                                />
                            </>
                        )}

                    </Stack>

                    {value === 0 && forgot === false && (
                        <Button
                            onClick={handleClose}
                            variant="contained"
                            style={{
                                marginLeft: '7rem',
                                height: '3rem',
                                width: '15rem',
                                marginTop: '7rem'
                            }}
                        >
                            Log in
                        </Button>
                    )}

                    {value === 0 && forgot === true && (
                        <Button
                            onClick={handleClose}
                            variant="contained"
                            style={{
                                marginLeft: '7rem',
                                height: '3rem',
                                width: '15rem',
                                marginTop: '2rem'
                            }}
                        >
                            Change password
                        </Button>
                    )}

                    {value === 1 && (
                        <Button
                            onClick={handleClose}
                            variant="contained"
                            style={{
                                marginLeft: '7rem',
                                height: '3rem',
                                width: '15rem',
                                marginTop: '2rem'
                            }}
                        >
                            Create account
                        </Button>
                    )}

                </DialogContent>

            </Dialog>
        </div>
    );
}
