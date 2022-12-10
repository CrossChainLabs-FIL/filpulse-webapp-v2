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
    Grid,
    Avatar
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
import { pixelToRem, fontSizes } from '../utils/font';


const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
    height: '2.5rem',
    width: '15.625rem',
    marginBottom: '0.313rem',
    fontSize: pixelToRem(15),
    /*[theme.breakpoints.down('xl')]: {
        height: 35,
        width: 200,
    }*/
}));


const useStyles = makeStyles(() => ({
    table: {
        maxHeight: '40rem',
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
        fontWeight: 500,
        fontSize: pixelToRem(16),
        marginRight: '1rem',
        color: "#000000",
        '&.Mui-selected': {
            color: '#000000',
        },
        // height: '3rem'
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
        setValue(0);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setSearch('');
    };


    const handleSearch = (event) => {
        setSearch(event.target.value);
    }

    const tabValueToName = (value) => {
        let result = ' ';
        switch (value) {
            case 0:
                result = 'PRs';
                break;
            case 1:
                result = 'Issues';
                break;
            case 2:
                result = 'Releases';
                break;
            case 3:
                result = 'Commits';
                break;
            case 4:
                result = 'Contributors';
                break;
            case 5:
                result = 'Watchlist';
                break;
        }
        return result;
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
                    sx={{
                        marginLeft: '3.7rem',
                        height: '3.5rem',
                        marginTop: '1.2rem'
                    }}
                >
                    <StyledTab label='PRs' classes={{ root: classes.prTab }} />
                    <StyledTab label='Issues' classes={{ root: classes.issuesTab }} />
                    <StyledTab label='Releases' classes={{ root: classes.releasesTab }} />
                    <StyledTab label='Commits' classes={{ root: classes.commitsTab }} />
                    <StyledTab label='Contributors' classes={{ root: classes.contributorsTab }} />
                    <StyledTab
                        icon={
                            <img
                                src={steaPlin}
                                alt="steaPlin"
                                sx={{
                                    height: '1rem',
                                    marginBottom: '0.3rem'
                                }}
                            />
                        }
                        iconPosition='start'
                        onClick={stateLogin.isLoggedIn ? '' : handleClickOpen}
                        label='Watchlist'
                        classes={{ root: classes.watchlistTab }}
                    />

                </StyledTabs>
                {/* <img src={steaPlin} alt="steaPlin" className={classes.stea} /> */}
                <>

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
                                        href={`https://github.com/login/oauth/authorize?scope=user&client_id=${client_id}&redirect_uri=${redirect_uri}`}
                                        onClick={() => {
                                            setDataError({ ...dataError, errorMessage: "" });
                                        }}
                                        sx={{
                                            backgroundColor: 'transparent',
                                            color: '#000000',
                                            width: '18rem',
                                            '&:hover': {
                                                backgroundColor: 'transparent',
                                                color: '#000000',
                                            },
                                        }}
                                    >
                                        Sign in with GitHub
                                    </Button>
                                </Grid>
                            </Grid>
                        </DialogContent>
                    </Dialog>
                </>
                <SearchStyle
                    sx={{
                        marginLeft: "auto",
                        marginTop: 'auto',
                        marginBottom: '0.25rem',
                        marginRight: '1rem'
                    }}
                    value={search}
                    onChange={(e) => handleSearch(e)}
                    placeholder={"Search by " + tabValueToName(value)}
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
            {value === 5 && stateLogin.isLoggedIn && (<WatchlistTable search={search} />)}

        </Paper >
    );
}