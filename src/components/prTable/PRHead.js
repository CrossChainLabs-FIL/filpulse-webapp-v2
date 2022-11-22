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
import TriunghiMenuPrStatus from './headMenus/TriunghiMenuPrStatus';
import FilterByProject from '../FilterByProject';

// assets
import triunghi from '../../assets/triunghi.svg';


// ----------------------------------------------------------------------


const useStyles = makeStyles((theme) => ({
    triunghi: {
        marginLeft: '0.35rem',
        marginTop: '0.15rem'
    },
    rowHead: {
        height: '4rem',
    },
    checkbox: {
        width: '5.35rem',
    },
    id: {
        width: '5.5rem',
    },
    pr: {
        width: '26rem'
    },
    project: {
        width: '18rem'
    },
    contributor: {
        width: '15rem'
    },
    status: {
        width: '10rem',
        padding: 0
    },
}));



export default function PRHead({ paramsCallback }) {
    const [isDescNumber, setIsDescNumber] = useState(true);
    const [isDescName, setIsDescName] = useState(true);
    const [isDescUpdatedAt, setIsDescUpdatedAt] = useState(true);
    const classes = useStyles();

    const styleNumber = {
        transform: !isDescNumber ? 'rotate(180deg)' : '',
        transition: 'transform 150ms ease', // smooth transition
    }
    const styleName = {
        transform: !isDescName ? 'rotate(180deg)' : '',
        transition: 'transform 150ms ease', // smooth transition
    }
    const styleTime = {
        transform: !isDescUpdatedAt ? 'rotate(180deg)' : '',
        transition: 'transform 150ms ease', // smooth transition
    }

    const handleSortNumber = () => {
        paramsCallback({ sortBy: 'number', sortType: isDescNumber ? 'asc' : 'desc' });
        setIsDescNumber(!isDescNumber);
        setIsDescName(true);
        setIsDescUpdatedAt(true);
    }

    const handleSortName = () => {
        paramsCallback({ sortBy: 'title', sortType: isDescName ? 'asc' : 'desc' });
        setIsDescNumber(true);
        setIsDescName(!isDescName);
        setIsDescUpdatedAt(true);
    }

    const handleSortUpdatedAt = () => {
        paramsCallback({ sortBy: 'updated_at', sortType: isDescUpdatedAt ? 'asc' : 'desc' });
        setIsDescNumber(true);
        setIsDescName(true);
        setIsDescUpdatedAt(!isDescUpdatedAt);
    }

    return (
        <TableHead>
            <TableRow className={classes.rowHead}>

                <TableCell className={classes.checkbox} />

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
                        <Typography noWrap style={{ fontWeight: 500, fontSize: 16, marginRight: '0.35rem', }}>
                            #
                        </Typography>

                        <IconButton
                            id="basic-button"
                            onClick={handleSortNumber}
                            style={{
                                padding: 0,
                                marginTop: '0.15rem'
                            }}
                        >
                            <img
                                src={triunghi}
                                alt='triunghi'
                                style={styleNumber}
                            />
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
                        <Typography noWrap style={{ fontWeight: 500, fontSize: 16, marginRight: '0.35rem', }}>
                            PR
                        </Typography>

                        <IconButton
                            id="basic-button"
                            onClick={handleSortName}
                            style={{
                                padding: 0,
                                marginTop: '0.15rem'
                            }}
                        >
                            <img
                                src={triunghi}
                                alt='triunghi'
                                style={styleName}
                            />
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
                        <Typography noWrap style={{ fontWeight: 500, fontSize: 16 }}>
                            Project
                        </Typography>

                        <FilterByProject endpoint={'tab_prs/filter/project'} paramsCallback={paramsCallback} />
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
                        <Typography noWrap style={{ fontWeight: 500, fontSize: 16 }}>
                            Contributor
                        </Typography>

                        <TriunghiMenuPrContributor paramsCallback={paramsCallback} />

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

                        <TriunghiMenuPrStatus paramsCallback={paramsCallback} />
                    </Stack>
                </TableCell>


                <TableCell
                    align="left"
                    component="th"
                    scope="row"
                    padding="none"
                    style={{
                        padding: 0,
                    }}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                        style={{ padding: 0 }}
                    >
                        <Typography noWrap style={{ fontWeight: 500, fontSize: 16, marginRight: '0.35rem' }}>
                            Last Updated
                        </Typography>

                        <IconButton
                            id="basic-button"
                            onClick={handleSortUpdatedAt}
                            style={{
                                padding: 0,
                                marginTop: '0.15rem'
                            }}
                        >
                            <img
                                src={triunghi}
                                alt='triunghi'
                                style={styleTime}
                            />
                        </IconButton>
                    </Stack>
                </TableCell>

            </TableRow>
        </TableHead>
    );
}
