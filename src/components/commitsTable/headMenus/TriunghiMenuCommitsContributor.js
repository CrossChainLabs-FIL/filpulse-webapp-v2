import React, { useState, useEffect } from 'react';

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


const client = new Client();


const useStyles = makeStyles(() => ({
    triunghi: {
        marginLeft: '0.25em',
        marginTop: '0.15em'
    },
    titleBox: {
        backgroundColor: '#FFFFFF',
        marginBottom: "0.45em"
    },
    filterText: {
        marginTop: "0.5em",
        marginLeft: '0.5em',
        height: '1.75em',
    },
    list: {
        height: 'max-content',
    },
    menu: {
        marginTop: '1.5em',
    },
    x: {
        height: "0.6em"
    },
    mainBox: {
        maxHeight: '100%',
        backgroundColor: '#FFFFFF',
        padding: 0,
    },
    paper: {
        maxHeight: '25em',
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



export default function TriunghiMenuCommitsContributor({ data }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [state, setState] = useState({
        loading: true, commits_data: []
    });

    const classes = useStyles();

    // useEffect(() => {
    //     let interval = setInterval(() => {
    //         client.get('tab_commits/filter/contributor').then((commits_data) => {
    //             setState({
    //                 loading: false,
    //                 commits_data: commits_data,
    //             });
    //         });
    //     }, 15 * 60 * 1000);
    //     client.get('tab_commits/filter/contributor').then((commits_data) => {
    //         setState({
    //             loading: false,
    //             commits_data: commits_data,
    //         });
    //     });

    //     return function cleanup() {
    //         console.log('interval cleanup');
    //         clearInterval(interval);
    //     };

    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [setState]);

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
                <img src={triunghi} alt='triunghi' className={classes.triunghi} />
            </IconButton>
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
                <Box className={classes.mainBox}>
                    <Box className={classes.titleBox}>
                        <Stack
                            direction="row"
                            alignItems="center"
                        >
                            <Box className={classes.filterText}>
                                Filter by author
                            </Box>
                            <IconButton onClick={handleClose} style={{ marginLeft: 'auto' }}>
                                <img src={x} alt='x' className={classes.x} />
                            </IconButton>
                        </Stack>
                        <Divider />
                        <SearchStyle
                            // value={filterName}
                            // onChange={(e) => handleFilterByName(e)}
                            placeholder="Filter user"
                        />
                        <Divider />
                    </Box >
                    <Paper className={classes.paper}>
                        <List className={classes.list} disablePadding={true}>
                            {data.map((row) => {
                                const { contributor
                                } = row;
                                return (
                                    <React.Fragment key={contributor}>
                                        <MenuItem
                                            style={{ backgroundColor: '#FFFFFF', }}
                                            onClick={handleClose}
                                        >
                                            {/* <Avatar
                                                src={personIcon}
                                                alt='avatar'
                                                sx={{
                                                    width: 30,
                                                    height: 30,
                                                    marginLeft: "1.75em",
                                                    marginRight: "0.5em"
                                                }}
                                            /> */}
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
