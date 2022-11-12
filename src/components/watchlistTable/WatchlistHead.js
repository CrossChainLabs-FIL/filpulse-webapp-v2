import { useState } from 'react';
// material
import {
    Typography,
    TableRow,
    TableCell,
    TableHead,
    Stack,
    IconButton,
    Tooltip
} from '@mui/material';

import { makeStyles } from '@mui/styles';

// components
import TriunghiMenuWLId from './headMenus/TriunghiMenuWLId';
import TriunghiMenuWLStatus from './headMenus/TriunghiMenuWLStatus';
import TriunghiMenuWLName from './headMenus/TriunghiMenuWLName';
import TriunghiMenuWLParticipants from './headMenus/TriunghiMenuWLParticipants';

// assets
import triunghi from '../../assets/triunghi.svg';
import clearFilter from '../../assets/clearFilter.svg';
import info from '../../assets/info.svg';


// ----------------------------------------------------------------------


const useStyles = makeStyles(() => ({
    triunghi: {
        marginLeft: '0.35em',
        marginTop: '0.15em'
    },
    rowHead: {
        height: '4em',
    },
    id: {
        width: '8em'
    },
    name: {
        width: '35em'
    },
    participant: {
        width: '13em'
    },
    status: {
        width: '13em'
    },
    comments: {
        width: '14em'
    }
}));



export default function WatchlistHead({ paramsCallback }) {
    const [isDesc, setIsDesc] = useState(true);
    const [isDescComments, setIsDescComments] = useState(true);
    const classes = useStyles();

    const handleLastUpdatedSort = () => {
        paramsCallback({ sortBy: 'updated_at', sortType: isDesc ? 'asc' : 'desc' });
        setIsDesc(!isDesc);
    }

    const handleCommentsSort = () => {
        console.log(handleCommentsSort);
        paramsCallback({ sortBy: 'comments', sortType: isDescComments ? 'asc' : 'desc' });
        setIsDescComments(!isDescComments);
    }

    return (
        <TableHead>
            <TableRow className={classes.rowHead}>

                <TableCell />

                <TableCell
                    align="left"
                    component="th"
                    scope="row"
                    padding="none"
                    className={classes.id}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                    >
                        <Typography
                            variant="h6"
                            noWrap
                            style={{
                                marginLeft: '1.3em',
                                fontWeight: 450,
                                opacity: 0.75
                            }}
                        >
                            #
                        </Typography>

                        <IconButton
                            id="basic-button"
                            onClick={(e) => handleLastUpdatedSort}
                            style={{ padding: 0 }}
                        >
                            <img src={triunghi} alt='triunghi' className={classes.triunghi} />
                        </IconButton>
                    </Stack>
                </TableCell>

                <TableCell
                    align="left"
                    component="th"
                    scope="row"
                    padding="none"
                    className={classes.name}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                    >
                        <Typography variant="h6" noWrap style={{ fontWeight: 450, opacity: 0.75 }}>
                            Name
                        </Typography>

                        <IconButton
                            id="basic-button"
                            onClick={(e) => handleLastUpdatedSort}
                            style={{ padding: 0 }}
                        >
                            <img src={triunghi} alt='triunghi' className={classes.triunghi} />
                        </IconButton>
                    </Stack>
                </TableCell>

                <TableCell
                    align="left"
                    component="th"
                    scope="row"
                    padding="none"
                    className={classes.participant}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                    >
                        <Typography variant="h6" noWrap style={{ fontWeight: 450, opacity: 0.75 }}>
                            Participants
                        </Typography>

                    </Stack>
                </TableCell>

                <TableCell
                    align="left"
                    component="th"
                    scope="row"
                    padding="none"
                    className={classes.status}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                    >
                        <Typography variant="h6" noWrap style={{ fontWeight: 450, opacity: 0.75 }}>
                            Status
                        </Typography>

                        <TriunghiMenuWLStatus paramsCallback={paramsCallback} />
                    </Stack>
                </TableCell>

                <TableCell
                    align="left"
                    component="th"
                    scope="row"
                    padding="none"
                    className={classes.comments}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                    >
                        <Tooltip
                            title='info'
                            arrow
                            style={{
                                marginRight: '0.35em'
                            }}
                        >
                            <img src={info} alt='info' />
                        </Tooltip>

                        <Typography variant="h6" noWrap style={{ fontWeight: 450, opacity: 0.75 }}>
                            Comments
                        </Typography>

                        <IconButton
                            id="basic-button"
                            onClick={(e) => handleCommentsSort}
                            style={{ padding: 0 }}
                        >
                            <img src={triunghi} alt='triunghi' className={classes.triunghi} />
                        </IconButton>
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
                        <Typography variant="h6" noWrap style={{ fontWeight: 450, opacity: 0.75 }}>
                            Last Updated
                        </Typography>

                        <IconButton
                            id="basic-button"
                            onClick={(e) => handleLastUpdatedSort}
                            style={{ padding: 0 }}
                        >
                            <img src={triunghi} alt='triunghi' className={classes.triunghi} />
                        </IconButton>
                    </Stack>
                </TableCell>

            </TableRow>
        </TableHead >
    );
}
