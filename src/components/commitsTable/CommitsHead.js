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
import TriunghiMenuCommitsProject from './headMenus/TriunghiMenuCommitsProject';
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
    commit: {
        width: '38em'
    },
    project: {
        width: '20em'
    },
    contributor: {
        width: '18em'
    },
}));



export default function CommitsHead({
    data,
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

                        {/* <TriunghiMenuCommitsHash data={data} /> */}
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
                    className={classes.commit}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                    >
                        <Typography variant="h6" noWrap style={{ fontWeight: 450, opacity: 0.75 }}>
                            Commit
                        </Typography>

                        {/* <TriunghiMenuCommitsCommit handleMenuFilter={handleMenuFilter} /> */}
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

                        <TriunghiMenuCommitsProject
                            handleMenuFilter={handleMenuFilter}
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
                    className={classes.contributor}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                    >
                        <Typography variant="h6" noWrap style={{ fontWeight: 450, opacity: 0.75 }}>
                            Contributor
                        </Typography>

                        <TriunghiMenuCommitsContributor
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
