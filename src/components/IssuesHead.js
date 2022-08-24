import { useState, useEffect } from 'react';

// material
import {
    Box,
    Typography,
    TableRow,
    TableCell,
    TableHead,
    Stack,
    IconButton,
    Menu,
    List,
    OutlinedInput,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Paper,
} from '@mui/material';

import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';


// assets
import triunghi from '../assets/triunghi.svg';
import x from '../assets/x.svg';

// ----------------------------------------------------------------------


const useStyles = makeStyles(() => ({
    triunghi: {
        marginLeft: '0.35em',
        marginTop: '0.15em'
    },
    rowHead: {
        height: '4em',
    },
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
    height: 40,
    width: 250,
    marginBottom: 5,
    fontSize: 15,
    [theme.breakpoints.down('xl')]: {
        height: 30,
        width: 200,
    }
}));



export default function IssuesHead({ data }) {

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
        <TableHead>
            <TableRow className={classes.rowHead}>

                <TableCell />

                <TableCell
                    align="left"
                    component="th"
                    scope="row"
                    padding="none"
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                    >
                        <Typography variant="h6" noWrap style={{ marginLeft: '1.3em', }}>
                            #
                        </Typography>
                        <img src={triunghi} alt='triunghi' className={classes.triunghi} />
                    </Stack>
                </TableCell>

                <TableCell
                    align="left"
                    component="th"
                    scope="row"
                    padding="none"
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                    >
                        <Typography variant="h6" noWrap >
                            Issue
                        </Typography>
                        <img src={triunghi} alt='triunghi' className={classes.triunghi} />
                    </Stack>
                </TableCell>

                <TableCell
                    align="left"
                    component="th"
                    scope="row"
                    padding="none"
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                    >
                        <Typography variant="h6" noWrap >
                            Author
                        </Typography>

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
                            style={{
                                marginTop: '1.5em'
                            }}
                        >
                            <Box style={{ maxHeight: '20em', backgroundColor: '#FFFFFF', padding: 0 }}>
                                <Box style={{ backgroundColor: '#FFFFFF' }}>
                                    <Stack
                                        direction="row"
                                        alignItems="center"
                                    >
                                        <Box>
                                            Filter by author
                                        </Box>
                                        <IconButton onClick={handleClose} style={{ marginLeft: 'auto' }}>
                                            <img src={x} alt='x' />
                                        </IconButton>
                                    </Stack>
                                    <SearchStyle
                                        style={{
                                            marginBottom: 0,
                                        }}
                                        // value={filterName}
                                        // onChange={(e) => handleFilterByName(e)}
                                        placeholder="Filter users"
                                    />
                                </Box >
                                <Paper style={{ maxHeight: '16.3em', overflow: 'auto' }}>
                                    <List sx={{ height: 'max-content' }}>
                                        {data.map((row) => {
                                            const { id,
                                                person,
                                            } = row;
                                            return (
                                                <ListItem key={id} style={{ backgroundColor: '#FFFFFF' }}>
                                                    <ListItemAvatar>
                                                        <img src={person.icon} alt='avatar' />
                                                    </ListItemAvatar>
                                                    <ListItemText primary={person.name} />
                                                </ListItem>
                                            );
                                        })}
                                    </List>
                                </Paper>
                            </Box>
                        </Menu>
                    </Stack>
                </TableCell>

                <TableCell
                    align="left"
                    component="th"
                    scope="row"
                    padding="none"
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                    >
                        <Typography variant="h6" noWrap >
                            Assignee
                        </Typography>
                        <img src={triunghi} alt='triunghi' className={classes.triunghi} />
                    </Stack>
                </TableCell>

                <TableCell
                    align="left"
                    component="th"
                    scope="row"
                    padding="none"
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                    >
                        <Typography variant="h6" noWrap >
                            Status
                        </Typography>
                        <img src={triunghi} alt='triunghi' className={classes.triunghi} />
                    </Stack>
                </TableCell>

                <TableCell
                    align="left"
                    component="th"
                    scope="row"
                    padding="none"
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                    >
                        <Typography variant="h6" noWrap >
                            Last Updated
                        </Typography>
                        <img src={triunghi} alt='triunghi' className={classes.triunghi} />
                    </Stack>
                </TableCell>

            </TableRow>
        </TableHead>
    );
}
