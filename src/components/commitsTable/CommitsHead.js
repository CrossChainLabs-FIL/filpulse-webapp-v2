// material
import {
    Typography,
    TableRow,
    TableCell,
    TableHead,
    Stack,
    IconButton
} from '@mui/material';

import { makeStyles } from '@mui/styles';

// components
import TriunghiMenuCommitsCommit from './headMenus/TriunghiMenuCommitsCommit';
import TriunghiMenuCommitsContributor from './headMenus/TriunghiMenuCommitsContributor';
import TriunghiMenuCommitsHash from './headMenus/TriunghiMenuCommitsHash';

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



export default function CommitsHead({
    data,
    handleSortChange
}) {

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
                        width: '12em'
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
                                marginLeft: '2em'
                            }}
                        >
                            Hash
                        </Typography>

                        <TriunghiMenuCommitsHash data={data} />
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
                            Commit
                        </Typography>

                        <TriunghiMenuCommitsCommit data={data} />
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
                            Contributor
                        </Typography>

                        <TriunghiMenuCommitsContributor data={data} />
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
        </TableHead>
    );
}
