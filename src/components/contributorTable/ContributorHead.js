// material
import { Typography, TableRow, TableCell, TableHead, Stack } from '@mui/material';

import { makeStyles } from '@mui/styles';

// assets
import triunghi from '../../assets/triunghi.svg';


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



export default function ContributorHead() {

    const classes = useStyles();

    return (
        <TableHead>
            <TableRow className={classes.rowHead}>

                <TableCell
                    align="left"
                    component="th"
                    scope="row"
                    padding="none"
                    style={{
                        width: '22em'
                    }}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                    >
                        <Typography
                            variant="h6"
                            noWrap
                            style={{
                                fontWeight: 450,
                                opacity: 0.75,
                                marginLeft: '3em'
                            }}
                        >
                            Contributor
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
                        <Typography variant="h6" noWrap style={{ fontWeight: 450, opacity: 0.75 }}>
                            Project
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
                        <Typography variant="h6" noWrap style={{ fontWeight: 450, opacity: 0.75 }}>
                            Commits
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
                        style={{ marginTop: '1.2em' }}
                    >
                        <Typography
                            variant="h6"
                            noWrap
                            style={{
                                fontWeight: 450,
                                opacity: 0.75,
                                fontSize: 15
                            }}
                        >
                            PRs
                        </Typography>
                        <img src={triunghi} alt='triunghi' className={classes.triunghi} />
                    </Stack>
                    <Typography
                        variant="subtitle2"
                        noWrap
                        style={{
                            fontWeight: 450,
                            opacity: 0.75,
                            marginTop: 0,
                            fontSize: 12
                        }}
                    >
                        merged / open
                    </Typography>
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
                        style={{ marginTop: '1.2em' }}
                    >
                        <Typography
                            variant="h6"
                            noWrap
                            style={{
                                fontWeight: 450,
                                opacity: 0.75,
                                fontSize: 15
                            }}
                        >
                            Issues
                        </Typography>
                        <img src={triunghi} alt='triunghi' className={classes.triunghi} />
                    </Stack>
                    <Typography
                        variant="subtitle2"
                        noWrap
                        style={{
                            fontWeight: 450,
                            opacity: 0.75,
                            marginTop: 0,
                            fontSize: 12
                        }}
                    >
                        open/closed
                    </Typography>
                </TableCell>

            </TableRow>
        </TableHead>
    );
}
