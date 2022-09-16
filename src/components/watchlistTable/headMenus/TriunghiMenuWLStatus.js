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
    Typography,
    Divider
} from '@mui/material';

import { makeStyles } from '@mui/styles';


// assets
import triunghi from '../../../assets/triunghi.svg';
import x from '../../../assets/x.svg';


const useStyles = makeStyles(() => ({
    triunghi: {
        marginLeft: '0.25em',
        marginTop: '0.15em'
    },
    titleBox: {
        marginBottom: '0.25em',
        backgroundColor: '#FFFFFF',
        marginBottom: "0.5em",
        width: "13em"
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
    },
    mergedBox: {
        width: '6em',
        height: '1.5em',
        borderRadius: 5,
        backgroundColor: '#CFD2F5'
    },
    openBox: {
        width: '4em',
        height: '1.5em',
        borderRadius: 5,
        backgroundColor: '#E0F3E0'
    }
}));



export default function TriunghiMenuWLStatus({ data }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


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
                                onClick={handleClose}
                            >
                                <Box className={classes.mergedBox}>
                                    <Typography variant="subtitle2" noWrap color='#434991'>
                                        Merged
                                    </Typography>
                                </Box>
                            </MenuItem>
                            <Divider />
                            <MenuItem
                                style={{ backgroundColor: '#FFFFFF', }}
                                onClick={handleClose}
                            >
                                <Box className={classes.openBox}>
                                    <Typography variant="subtitle2" noWrap color='#2B840E'>
                                        Open
                                    </Typography>
                                </Box>
                            </MenuItem>
                            <Divider />
                        </List>
                    </Paper>
                </Box>
            </Menu>
        </>
    )
}
