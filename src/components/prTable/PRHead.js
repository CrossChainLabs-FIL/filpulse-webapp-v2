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
import TriunghiMenuPrContributor from './headMenus/TriunghiMenuPrContributor';
import TriunghiMenuPrId from './headMenus/TriunghiMenuPrId';
import TriunghiMenuPrPr from './headMenus/TriunghiMenuPrPr';
import TriunghiMenuPrStatus from './headMenus/TriunghiMenuPrStatus';

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
        width: '5.5em'
    },
    pr: {
        width: '34em'
    },
    project: {
        width: '18em'
    },
    contributor: {
        width: '15em'
    },
    status: {
        width: '10em'
    }
}));



export default function PRHead({
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
                        <Typography variant="h6" noWrap style={{ fontWeight: 450, opacity: 0.75 }}>
                            #
                        </Typography>

                        {/* <TriunghiMenuPrId data={data} /> */}
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
                    className={classes.pr}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                    >
                        <Typography variant="h6" noWrap style={{ fontWeight: 450, opacity: 0.75 }}>
                            PR
                        </Typography>

                        {/* <TriunghiMenuPrPr handleMenuFilter={handleMenuFilter} /> */}
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

                        {/* <TriunghiMenuPrPr handleMenuFilter={handleMenuFilter} /> */}
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
                    className={classes.contributor}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                    >
                        <Typography variant="h6" noWrap style={{ fontWeight: 450, opacity: 0.75 }}>
                            Contributor
                        </Typography>

                        <TriunghiMenuPrContributor
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
                    className={classes.status}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                    >
                        <Typography variant="h6" noWrap style={{ fontWeight: 450, opacity: 0.75 }}>
                            Status
                        </Typography>

                        <TriunghiMenuPrStatus
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
