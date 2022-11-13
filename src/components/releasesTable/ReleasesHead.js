import { useState } from 'react';
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
import TriunghiMenuReleasesAuthor from './headMenus/TriunghiMenuReleasesAuthor';
import TriunghiMenuReleasesProject from './headMenus/TriunghiMenuReleasesProject';
import TriunghiMenuReleasesStatus from './headMenus/TriunghiMenuReleasesStatus'

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
    id: {
        width: '15em',
    },
    release: {
        width: '18em'
    },
    project: {
        width: '20em'
    },
    author: {
        width: '20em'
    },
    status: {
        width: '16em'
    }
}));




export default function ReleasesHead({ paramsCallback }) {

    const [isDesc, setIsDesc] = useState(true);
    const classes = useStyles();

    const handleLastUpdatedSort = () => {
        paramsCallback({ sortBy: 'updated_at', sortType: isDesc ? 'asc' : 'desc' });
        setIsDesc(!isDesc);
    }

    return (
        <TableHead>
            <TableRow className={classes.rowHead}>

                <TableCell
                    align="left"
                    component="th"
                    scope="row"
                    padding="none"
                    style={{
                        padding: 0,
                        paddingLeft: '4.5em'
                    }}
                    className={classes.id}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                    >
                        <Typography variant="h6" noWrap style={{ fontWeight: 450, opacity: 0.75 }}>
                            #
                        </Typography>

                        <IconButton
                            id="basic-button"
                            // onClick={(e) => handleSortChange()}
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
                    className={classes.release}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                    >
                        <Typography variant="h6" noWrap style={{ fontWeight: 450, opacity: 0.75 }}>
                            Release
                        </Typography>

                        <IconButton
                            id="basic-button"
                            // onClick={(e) => handleSortChange()}
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
                    className={classes.project}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                    >
                        <Typography variant="h6" noWrap style={{ fontWeight: 450, opacity: 0.75 }}>
                            Project
                        </Typography>

                        <TriunghiMenuReleasesProject paramsCallback={paramsCallback} />
                    </Stack>
                </TableCell>

                <TableCell
                    align="left"
                    component="th"
                    scope="row"
                    padding="none"
                    className={classes.author}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                    >
                        <Typography variant="h6" noWrap style={{ fontWeight: 450, opacity: 0.75 }}>
                            Author
                        </Typography>

                        <TriunghiMenuReleasesAuthor paramsCallback={paramsCallback} />
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

                        <TriunghiMenuReleasesStatus paramsCallback={paramsCallback} />
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
                            onClick={handleLastUpdatedSort}
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
