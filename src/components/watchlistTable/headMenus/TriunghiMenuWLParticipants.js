import React, { useState, useCallback, useEffect } from 'react';

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
import { Client } from '../../../utils/client';

// assets
import triunghi from '../../../assets/triunghi.svg';
import x from '../../../assets/x.svg';
import clearFilter from '../../../assets/clearFilter.svg';

import bara from '../../../assets/bara.svg';

const client = new Client();


const useStyles = makeStyles(() => ({
    triunghi: {
        marginLeft: '0.25rem',
        marginTop: '0.15rem'
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



export default function TriunghiMenuWLParticipants({ paramsCallback }) {
    const [filterName, setFilterName] = useState('');
    const [search, setSearch] = useState('');
    const [data, setData] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [state, setState] = useState({
        loading: true
    });
    const [isSorted, setIsSorted] = useState(false);
    const open = Boolean(anchorEl);

    const fetchData = useCallback(async () => {
        console.log('fetchData');
        try {
            let response;
            const user = JSON.parse(localStorage.getItem("user"));
            const client = new Client();

            let params;

            if (filterName) {
                params.search = filterName;
            }

            if (user?.token) {
                response = await client.post_with_token('tab_watchlist/filter/participants', params, user.token);
                setData(response.list);
                setState({ loading: false });
            }

        } catch (error) {
            console.log(error);
        }
    }, [filterName]);

    useEffect(() => {
        setState({ loading: true });
        fetchData();
    }, [filterName]);


    const handleClick = (event) => {
        fetchData();
        setFilterName('');
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    function handleFilterClose(participant) {
        handleClose();
        setIsSorted(true);
        paramsCallback({ participant: participant });
    }

    const handleFilterByName = (event) => {
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
                        paramsCallback({ participant: undefined });
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
                                Filter by participants
                            </Box>
                            <IconButton onClick={handleClose} style={{ marginLeft: 'auto' }}>
                                <img src={x} alt='x' className={classes.x} />
                            </IconButton>
                        </Stack>
                        <Divider />
                        <SearchStyle
                            value={filterName}
                            onChange={(e) => handleFilterByName(e)}
                            placeholder="Filter participants"
                        />
                        <Divider />
                    </Box >
                    <Paper className={classes.paper}>
                        <List className={classes.list} disablePadding={true}>
                            {data?.map((row) => {
                                const { dev_name,
                                    avatar_url
                                } = row;
                                return (
                                    <React.Fragment key={dev_name}>
                                        <MenuItem
                                            style={{ backgroundColor: '#FFFFFF', }}
                                            onClick={() => handleFilterClose(dev_name)}
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
                                            <ListItemText primary={dev_name} />
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
