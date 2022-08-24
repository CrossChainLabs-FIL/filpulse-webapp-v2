// material
import { Typography, TableRow, TableCell, TableHead, Stack } from '@mui/material';

import { makeStyles } from '@mui/styles';


// assets
import triunghi from '../assets/triunghi.svg';



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



export default function WatchlistHead() {

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
                        <Typography variant="h6" noWrap style={{ marginLeft: '1.3em' }}>
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
                            Name
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
                        <Typography variant="h6" noWrap>
                            Participants
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
                            Comments
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
