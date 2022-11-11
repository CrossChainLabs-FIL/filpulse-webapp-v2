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
        width: '9em',
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
        width: '15em'
    }
}));




export default function ReleasesHead({
    handleSortChange,
    handleMenuFilter,
    clearFilterFunction,
    globalFilter
}) {

    const [order, setOrder] = useState('desc');

    const classes = useStyles();

    return (
        <TableHead>
            <TableRow className={classes.rowHead}>

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

                        {/* <TriunghiMenuIssuesIssue handleMenuFilter={handleMenuFilter} /> */}
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

                        <TriunghiMenuReleasesProject
                            handleMenuFilter={handleMenuFilter}
                            clearFilterFunction={clearFilterFunction}
                            globalFilter={globalFilter}
                        />
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

                        <TriunghiMenuReleasesAuthor
                            handleMenuFilter={handleMenuFilter}
                            clearFilterFunction={clearFilterFunction}
                            globalFilter={globalFilter}
                        />
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

                        <TriunghiMenuReleasesStatus
                            globalFilter={globalFilter}
                            clearFilterFunction={clearFilterFunction}
                        />
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
                            onClick={(e) => {
                                if (order === 'asc') {
                                    setOrder('desc');
                                    clearFilterFunction('sortBy', 'updated_at', "sortType", 'asc');
                                }
                                else {
                                    setOrder('asc');
                                    globalFilter('sortBy=updated_at', 'sortBy=', '', "sortType=asc", 'sortType=', '');
                                }
                            }}
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
