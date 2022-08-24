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



export default function CommitsHead() {

    const classes = useStyles();

    return (
        <TableHead>
            <TableRow className={classes.rowHead}>

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
                            Hash
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
                            Commit
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
                            Author
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
