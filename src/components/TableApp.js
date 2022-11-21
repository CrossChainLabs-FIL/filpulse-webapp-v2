import React, { useState, useContext } from 'react';

// @mui
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';

import {
    Stack,
    Paper,
    Tabs,
    Tab,
    OutlinedInput,
    InputAdornment,
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
    Typography,
    Grid
} from '@mui/material';

// components
import Iconify from './Iconify';
import WatchlistTable from './watchlistTable/WatchlistTable';
import PRTable from './prTable/PRTable';
import CommitsTable from './commitsTable/CommitsTable';
import IssuesTable from './issuesTable/IssuesTable';
import ReleasesTable from './releasesTable/ReleasesTable';
import ContributorsTable from './contributorTable/ContributorsTable';
import { AuthContext } from "../App";

// assets
import steaPlin from '../assets/steaPlin.svg';
import GithubLogo from '../assets/GithubLogo.svg';



const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
    height: 40,
    width: 250,
    marginBottom: 5,
    fontSize: 15,
    [theme.breakpoints.down('xl')]: {
        height: 35,
        width: 200,
    }
}));




const useStyles = makeStyles((theme) => ({
    table: {
        maxHeight: '40rem',
    },
    stea: {
        paddingBottom: '0.3rem'
    },
    watchlistButton: {
        marginLeft: '0.2rem',
        marginTop: '2.35rem',
        paddingBottom: 0,
        color: '#000000',
        textTransform: 'none',
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: theme.typography.pxToRem(16),
        '&:hover': {
            backgroundColor: 'transparent',
            color: '#000000',
        },
    },
    watchlistTab: {
        height: '3rem',
        minHeight: '3rem',
        minWidth: '8rem',
        width: '8rem',
        marginRight: '3rem',
        marginTop: '1rem',
        marginBottom: '0.2rem',
        paddingBottom: 0,
    },
    prTab: {
        height: '3rem',
        minHeight: '3rem',
        minWidth: '3rem',
        width: '3rem',
        marginRight: '3rem',
        marginTop: '1rem',
        paddingBottom: 0
    },
    issuesTab: {
        height: '3rem',
        minHeight: '3rem',
        minWidth: '4rem',
        width: '4rem',
        marginRight: '3rem',
        marginTop: '1rem',
        paddingBottom: 0
    },
    releasesTab: {
        height: '3rem',
        minHeight: '3rem',
        minWidth: '3rem',
        width: '5rem',
        marginRight: '3rem',
        marginTop: '1rem',
        paddingBottom: 0
    },
    commitsTab: {
        height: '3rem',
        minHeight: '3rem',
        minWidth: '4.5rem',
        width: '4.5rem',
        marginRight: '3rem',
        marginTop: '1rem',
        paddingBottom: 0
    },
    contributorsTab: {
        height: '3rem',
        minHeight: '3rem',
        minWidth: '7rem',
        width: '7rem',
        marginTop: '1rem',
        paddingBottom: 0
    },
    button: {
        backgroundColor: 'transparent',
        color: '#000000',
        width: '23rem',
        '&:hover': {
            backgroundColor: 'transparent',
            color: '#000000',
        },
    },
}));

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
        maxWidth: 90,
        width: '100%',
        backgroundColor: '#0DBB52',
    },
});



const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
        textTransform: 'none',
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: theme.typography.pxToRem(16),
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

export default function TableApp() {

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [value, setValue] = useState(0);
    const { stateLogin, dispatch } = useContext(AuthContext);
    const [dataError, setDataError] = useState({ errorMessage: "" });
    const { client_id, redirect_uri } = stateLogin;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setSearch('');
    };


    const handleSearch = (event) => {
        setSearch(event.target.value);
    }

    return (
        <Paper className="container">
            <Stack
                style={{ backgroundColor: '#FFFFFF', height: '5rem', marginBottom: '2rem' }}
                direction="row"
                alignItems="bottom"
                justifyContent="space-between"
            >
                <StyledTabs
                    value={value}
                    onChange={handleChange}
                    style={{
                        marginLeft: '4.5rem',
                        marginTop: 'auto'
                    }}
                >
                    <StyledTab label='PRs' classes={{ root: classes.prTab }} />
                    <StyledTab label='Issues' classes={{ root: classes.issuesTab }} />
                    <StyledTab label='Releases' classes={{ root: classes.releasesTab }} />
                    <StyledTab label='Commits' classes={{ root: classes.commitsTab }} />
                    <StyledTab label='Contributors' classes={{ root: classes.contributorsTab }} />
                    {stateLogin.isLoggedIn && (
                        <StyledTab
                            icon={<img src={steaPlin} alt="steaPlin" className={classes.stea} />}
                            iconPosition='start'
                            label='Watchlist'
                            classes={{ root: classes.watchlistTab }}
                        />
                    )}
                </StyledTabs>
                {!stateLogin.isLoggedIn && (
                    <>
                        <Button
                            startIcon={<img src={steaPlin} alt="steaPlin" className={classes.stea} />}
                            onClick={handleClickOpen}
                            className={classes.watchlistButton}
                            disableRipple
                        >
                            Watchlist
                        </Button>
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
                                            style={{
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
                                            href={`https://github.com/login/oauth/authorize?scope=user&client_id=${client_id}&redirect_uri=${redirect_uri}`}
                                            onClick={() => {
                                                setDataError({ ...dataError, errorMessage: "" });
                                            }}
                                            className={classes.button}
                                        >
                                            Sign in with Github
                                        </Button>
                                    </Grid>
                                </Grid>
                            </DialogContent>
                        </Dialog>
                    </>
                )}
                <SearchStyle
                    style={{
                        marginLeft: "auto",
                        marginTop: 'auto',
                        marginBottom: '0.25rem',
                        marginRight: '1rem'
                    }}
                    value={search}
                    onChange={(e) => handleSearch(e)}
                    placeholder="Search"
                    startAdornment={
                        <InputAdornment position="start">
                            <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                        </InputAdornment>
                    }
                />
            </Stack>

            {value === 0 && (<PRTable search={search} />)}
            {value === 1 && (<IssuesTable search={search} />)}
            {value === 2 && (<ReleasesTable search={search} />)}
            {value === 3 && <CommitsTable search={search} />}
            {value === 4 && <ContributorsTable search={search} />}
            {value === 5 && (<WatchlistTable search={search} />)}

        </Paper >
    );
}