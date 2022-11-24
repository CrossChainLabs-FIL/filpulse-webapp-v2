import { useState } from 'react';

// material
import {
    Box,
    Stack,
    IconButton,
    Menu,
    List,
    MenuItem,
    Paper,
    Divider
} from '@mui/material';

import { makeStyles } from '@mui/styles';


// assets
import x from '../../../assets/x.svg';
import preRelease from '../../../assets/preRelease.svg';
import latest from '../../../assets/latest.svg';
import released from '../../../assets/released.svg';
import clearFilter from '../../../assets/clearFilter.svg';
import bara from '../../../assets/bara.svg';

const useStyles = makeStyles(() => ({
    triunghi: {
        marginLeft: '0.25rem',
    },
    titleBox: {
        backgroundColor: '#FFFFFF',
        marginBottom: '0.45rem',
        width: '13rem'
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
    },
}));



export default function TriunghiMenuReleasesStatus({ paramsCallback }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [isSorted, setIsSorted] = useState(false);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    function handleFilterClose(status) {
        handleClose();
        setIsSorted(true);
        paramsCallback({ status: status });
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
                        paramsCallback({ status: undefined });
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
                <Box className={classes.mainBox}>
                    <Box className={classes.titleBox}>
                        <Stack
                            direction="row"
                            alignItems="center"
                        >
                            <Box className={classes.filterText}>
                                Filter by status
                            </Box>
                            <IconButton onClick={handleClose} style={{ marginLeft: 'auto' }}>
                                <img src={x} alt='x' className={classes.x} />
                            </IconButton>
                        </Stack>
                        <Divider />
                    </Box >
                    <Paper className={classes.paper}>
                        <List className={classes.list} disablePadding={true}>
                            <MenuItem
                                style={{ backgroundColor: '#FFFFFF', }}
                                onClick={() => handleFilterClose('Pre-release')}
                            >
                                <img
                                    src={preRelease}
                                    alt="preRelease"
                                />
                            </MenuItem>
                            <Divider />
                            <MenuItem
                                style={{ backgroundColor: '#FFFFFF', }}
                                onClick={() => handleFilterClose('Released')}
                            >
                                <img
                                    src={released}
                                    alt="released"
                                />
                            </MenuItem>
                            <Divider />
                            <MenuItem
                                style={{ backgroundColor: '#FFFFFF', }}
                                onClick={() => handleFilterClose('Latest')}
                            >
                                <img
                                    src={latest}
                                    alt="latest"
                                />
                            </MenuItem>
                            <Divider />
                        </List>
                    </Paper>
                </Box>
            </Menu>
        </>
    )
}
