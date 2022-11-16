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
import TriunghiMenuWLStatus from './headMenus/TriunghiMenuWLStatus';
import TriunghiMenuWLName from './headMenus/TriunghiMenuWLName';
import TriunghiMenuWLParticipants from './headMenus/TriunghiMenuWLParticipants';

// assets
import triunghi from '../../assets/triunghi.svg';
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
    const [isDescNumber, setIsDescNumber] = useState(true);
    const [isDescName, setIsDescName] = useState(true);
    const [isDescComments, setIsDescComments] = useState(true);
    const [isDescUpdatedAt, setIsDescUpdatedAt] = useState(true);
    const classes = useStyles();

    const handleSortNumber = () => {
        paramsCallback({ sortBy: 'number', sortType: isDescNumber ? 'asc' : 'desc' });
        setIsDescNumber(!isDescNumber);
        setIsDescName(true);
        setIsDescComments(true);
        setIsDescUpdatedAt(true);
    }

    const handleSortName = () => {
        paramsCallback({ sortBy: 'title', sortType: isDescName ? 'asc' : 'desc' });
        setIsDescNumber(true);
        setIsDescName(!isDescName);
        setIsDescComments(true);
        setIsDescUpdatedAt(true);
    }

    const handleSortComments = () => {
        paramsCallback({ sortBy: 'comments', sortType: isDescComments ? 'asc' : 'desc' });
        setIsDescNumber(true);
        setIsDescName(true);
        setIsDescComments(!isDescComments);
        setIsDescUpdatedAt(true);
    }

    const handleSortUpdatedAt = () => {
        paramsCallback({ sortBy: 'updated_at', sortType: isDescUpdatedAt ? 'asc' : 'desc' });
        setIsDescNumber(true);
        setIsDescName(true);
        setIsDescComments(true);
        setIsDescUpdatedAt(!isDescUpdatedAt);
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
                            noWrap
                            style={{
                                marginLeft: '1.3em',
                                fontWeight: 500,
                                fontSize: 16
                            }}
                        >
                            #
                        </Typography>

                        <IconButton
                            id="basic-button"
                            onClick={handleSortNumber}
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
                        <Typography noWrap style={{ fontWeight: 500, fontSize: 16 }}>
                            Name
                        </Typography>

                        <IconButton
                            id="basic-button"
                            onClick={handleSortName}
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
                        <Typography noWrap style={{ fontWeight: 500, fontSize: 16 }}>
                            Participants
                        </Typography>

                        <TriunghiMenuWLParticipants paramsCallback={paramsCallback} />

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
                        <Typography noWrap style={{ fontWeight: 500, fontSize: 16 }}>
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

                        <Typography noWrap style={{ fontWeight: 500, fontSize: 16 }}>
                            Comments
                        </Typography>

                        <IconButton
                            id="basic-button"
                            onClick={handleSortComments}
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
                        <Typography noWrap style={{ fontWeight: 500, fontSize: 16 }}>
                            Last Updated
                        </Typography>

                        <IconButton
                            id="basic-button"
                            onClick={handleSortUpdatedAt}
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
