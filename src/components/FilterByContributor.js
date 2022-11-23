import React, { useState } from 'react';

// material
import {
    Box,
    Stack,
    IconButton,
    Menu,
    List,
    OutlinedInput,
    MenuItem,
    ListItemText,
    Avatar,
    Paper,
    Divider
} from '@mui/material';

import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';

import { Client } from '../utils/client';


// assets
import x from '../assets/x.svg';
import clearFilter from '../assets/clearFilter.svg';
import bara from '../assets/bara.svg';

const client = new Client();


const useStyles = makeStyles(() => ({
    triunghi: {
        marginLeft: '0.25rem',
    },
    titleBox: {
        backgroundColor: '#FFFFFF',
        marginBottom: '0.45rem'
    },
    filterText: {
        marginTop: '0.5rem',
        marginLeft: '0.5rem',
        height: '1.75rem',
    },
    list: {
        height: 'max-content',
    },
    menu: {
        marginTop: '1.5rem',
    },
    x: {
        height: '0.6rem'
    },
    mainBox: {
        maxHeight: '100%',
        backgroundColor: '#FFFFFF',
        padding: 0,
    },
    paper: {
        maxHeight: '25rem',
        overflow: 'auto',
        padding: 0,
    }
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
    height: 30,
    width: 400,
    margin: 5,
    fontSize: 15,
    [theme.breakpoints.down('xl')]: {
        height: 30,
        width: 200,
    }
}));



export default function FilterByContributor({ endpoint, paramsCallback, name }) {

    const [filterName, setFilterName] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [state, setState] = useState({
        loading: true
    });
    const [isSorted, setIsSorted] = useState(false);
    const open = Boolean(anchorEl);


    const handleClick = (event) => {
        client.get(endpoint).then((contributor_data) => {
            setState({
                loading: false,
                contributor_data: contributor_data,
            });
        });
        setFilterName('');
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    function handleFilterClose(contributor) {
        handleClose();
        setIsSorted(true);
        paramsCallback({ contributor: contributor });
    }

    const handleFilterByName = (event) => {
        if (event.target.value) {
            client.get(`${endpoint}?search=${event.target.value}`).then((contributor_data) => {
                setState({
                    loading: false,
                    contributor_data: contributor_data,
                });
            });
        }
        else {
            client.get(endpoint).then((contributor_data) => {
                setState({
                    loading: false,
                    contributor_data: contributor_data,
                });
            });
        }
        setFilterName(event.target.value);
    }

    const classes = useStyles();

    return (
        <>
            <IconButton
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                style={{ padding: 0 }}
            >
                <img src={bara} alt='bara' className={classes.triunghi} />
            </IconButton>
            {isSorted ?
                <IconButton
                    id="basic-button"
                    onClick={() => {
                        setIsSorted(false);
                        paramsCallback({ contributor: undefined });
                    }}
                    style={{ padding: 0, marginLeft: '0.25rem' }}
                >
                    <img src={clearFilter} alt='clear' />
                </IconButton> : ''
            }
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
                className={classes.menu}
            >
                <Box className={classes.mainBox} aria-disabled>
                    <Box className={classes.titleBox} aria-disabled>
                        <Stack
                            direction="row"
                            alignItems="center"
                        >
                            <Box className={classes.filterText} aria-disabled>
                               { name ? name : 'Filter by contributor' }
                            </Box>
                            <IconButton onClick={handleClose} style={{ marginLeft: 'auto' }}>
                                <img src={x} alt='x' className={classes.x} />
                            </IconButton>
                        </Stack>
                        <Divider />
                        <SearchStyle
                            value={filterName}
                            onChange={(e) => handleFilterByName(e)}
                            placeholder="Filter by contributor"
                        />
                        <Divider />
                    </Box >
                    <Paper className={classes.paper}>
                        <List className={classes.list} disablePadding={true}>
                            {state.contributor_data?.list.map((row) => {
                                const { contributor,
                                    avatar_url
                                } = row;
                                return (
                                    <React.Fragment key={contributor}>
                                        <MenuItem
                                            style={{ backgroundColor: '#FFFFFF', }}
                                            onClick={() => handleFilterClose(contributor)}
                                        >
                                            <Avatar
                                                src={avatar_url}
                                                alt='avatar'
                                                sx={{
                                                    width: 30,
                                                    height: 30,
                                                    marginLeft: '1.75rem',
                                                    marginRight: '0.5rem'
                                                }}
                                            />
                                            <ListItemText primary={contributor} />
                                        </MenuItem>
                                        <Divider />
                                    </React.Fragment>
                                );
                            })}
                        </List>
                    </Paper>
                </Box>
            </Menu>
        </>
    )
}