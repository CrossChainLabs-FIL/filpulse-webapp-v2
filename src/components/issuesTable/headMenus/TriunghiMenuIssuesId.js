import { useState } from 'react';

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
    Paper,
    Divider
} from '@mui/material';

import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';


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
        marginBottom: "0.5em"
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
        padding: 0
    },
    paper: {
        maxHeight: '20em',
        overflow: 'auto',
        padding: 0,
    }
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
    height: 30,
    width: 300,
    margin: 5,
    fontSize: 15,
    [theme.breakpoints.down('xl')]: {
        height: 30,
        width: 200,
    }
}));



export default function TriunghiMenuIssuesId({ data }) {
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
                                Filter by ID
                            </Box>
                            <IconButton onClick={handleClose} style={{ marginLeft: 'auto' }}>
                                <img src={x} alt='x' className={classes.x} />
                            </IconButton>
                        </Stack>
                        <Divider />
                        <SearchStyle
                            // value={filterName}
                            // onChange={(e) => handleFilterByName(e)}
                            placeholder="Filter ID"
                        />
                        <Divider />
                    </Box >
                    <Paper className={classes.paper}>
                        <List className={classes.list} disablePadding={true}>
                            {data.map((row) => {
                                const { id,
                                    showId,
                                } = row;
                                return (
                                    <>
                                        <MenuItem
                                            key={id}
                                            style={{ backgroundColor: '#FFFFFF' }}
                                            onClick={handleClose}
                                        >
                                            <ListItemText primary={showId} />
                                        </MenuItem>
                                        <Divider />
                                    </>
                                );
                            })}
                        </List>
                    </Paper>
                </Box>
            </Menu>
        </>
    )
}
