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
                        height: '43em',
                        width: '30em'
                    }}
                >
                    <Stack>
                        <img
                            src={x}
                            alt="x"
                            onClick={handleClose}
                            style={{
                                height: '1em',
                                width: '1em',
                                marginLeft: 'auto',
                                marginBottom: '2.5em'
                            }}
                        />
                        <StyledTabs
                            value={value}
                            onChange={handleChange}
                            style={{
                                marginLeft: '6.5em',
                                marginBottom: '1em'
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
                                        marginTop: '5em',
                                        width: '15em',
                                        marginLeft: '5.5em'
                                    }}
                                />
                                <Typography
                                    style={{
                                        marginLeft: "15em",
                                        marginTop: '1em',
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
                                        marginBottom: '5em',
                                        width: '15em',
                                        marginLeft: '5.5em'
                                    }}
                                />
                            </>
                        )}

                        {value === 0 && forgot === true && (
                            <>
                                <Typography
                                    style={{
                                        marginLeft: "4em",
                                        marginTop: '0.25em',
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
                                        width: '15em',
                                        marginLeft: '5.5em'
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
                                        marginTop: '2em',
                                        width: '15em',
                                        marginLeft: '5.5em'
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
                                        marginTop: '2em',
                                        width: '15em',
                                        marginLeft: '5.5em'
                                    }}
                                />
                                <TextField
                                    id="newPassword"
                                    label="New password"
                                    fullWidth
                                    style={{
                                        marginTop: '2em',
                                        width: '15em',
                                        marginLeft: '5.5em'
                                    }}
                                />
                                <TextField
                                    id="reNewPassword"
                                    label="Re-type new password"
                                    fullWidth
                                    style={{
                                        marginTop: '2em',
                                        width: '15em',
                                        marginLeft: '5.5em'
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
                                        width: '15em',
                                        marginLeft: '5.5em',
                                    }}
                                />
                                <TextField
                                    id="newPassword"
                                    label="New password"
                                    fullWidth
                                    style={{
                                        marginTop: '2em',
                                        width: '15em',
                                        marginLeft: '5.5em'
                                    }}
                                />
                                <TextField
                                    id="reNewPassword"
                                    label="Re-type new password"
                                    fullWidth
                                    style={{
                                        marginTop: '2em',
                                        width: '15em',
                                        marginLeft: '5.5em'
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
                                        marginTop: '2em',
                                        width: '15em',
                                        marginLeft: '5.5em'
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
                                        marginTop: '2em',
                                        width: '15em',
                                        marginLeft: '5.5em'
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
                                marginLeft: '7em',
                                height: '3em',
                                width: '15em',
                                marginTop: '7em'
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
                                marginLeft: '7em',
                                height: '3em',
                                width: '15em',
                                marginTop: '2em'
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
                                marginLeft: '7em',
                                height: '3em',
                                width: '15em',
                                marginTop: '2em'
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
