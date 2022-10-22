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



export default function WatchlistHead({
    data,
    handleSortChange,
    clearFilterFunction
}) {

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

                        <TriunghiMenuWLId data={data} />
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

                        <TriunghiMenuWLName data={data} />
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

                        <TriunghiMenuWLParticipants data={data} />

                        <IconButton
                            id="basic-button"
                            onClick={clearFilterFunction}
                            style={{ padding: 0, marginLeft: '0.25em' }}
                        >
                            <img src={clearFilter} alt='clear' />
                        </IconButton>
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

                        <TriunghiMenuWLStatus data={data} />
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
                            onClick={(e) => handleSortChange("commentsTotal", 'asc')}
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
                            onClick={(e) => handleSortChange("timeNumber", 'asc')}
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
