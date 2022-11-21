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

// assets
import triunghi from '../../assets/triunghi.svg';


// ----------------------------------------------------------------------


const useStyles = makeStyles(() => ({
    triunghi: {
        marginLeft: '0.35rem',
        marginTop: '0.15rem'
    },
    rowHead: {
        height: '4rem',
    },
    hash: {
        width: '14rem'
    },
    commit: {
        width: '31rem'
    },
    project: {
        width: '20rem'
    },
    contributor: {
        width: '15rem'
    },
}));



export default function CommitsHead({ paramsCallback }) {
    const [isDescHash, setIsDescHash] = useState(true);
    const [isDescCommit, setIsDescCommit] = useState(true);
    const [isDescUpdatedAt, setIsDescUpdatedAt] = useState(true);
    const classes = useStyles();

    const styleHash = {
        transform: !isDescHash ? 'rotate(180deg)' : '',
        transition: 'transform 150ms ease', // smooth transition
    }
    const styleCommit = {
        transform: !isDescCommit ? 'rotate(180deg)' : '',
        transition: 'transform 150ms ease', // smooth transition
    }
    const styleTime = {
        transform: !isDescUpdatedAt ? 'rotate(180deg)' : '',
        transition: 'transform 150ms ease', // smooth transition
    }

    const handleSortHash = () => {
        paramsCallback({ sortBy: 'commit_hash', sortType: isDescHash ? 'asc' : 'desc' });
        setIsDescHash(!isDescHash);
        setIsDescCommit(true);
        setIsDescUpdatedAt(true);
    }

    const handleSortCommit = () => {
        paramsCallback({ sortBy: 'message', sortType: isDescCommit ? 'asc' : 'desc' });
        setIsDescHash(true);
        setIsDescCommit(!isDescCommit);
        setIsDescUpdatedAt(true);
    }

    const handleSortUpdatedAt = () => {
        paramsCallback({ sortBy: 'updated_at', sortType: isDescUpdatedAt ? 'asc' : 'desc' });
        setIsDescHash(true);
        setIsDescCommit(true);
        setIsDescUpdatedAt(!isDescUpdatedAt);
    }

    return (
        <TableHead>
            <TableRow className={classes.rowHead}>

                <TableCell
                    align="left"
                    component="th"
                    scope="row"
                    padding="none"
                    className={classes.hash}
                    style={{
                        padding: 0,
                        paddingLeft: '5.35rem'
                    }}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                    >
                        <Typography
                            noWrap
                            style={{
                                fontWeight: 500,
                                fontSize: 16,
                                marginRight: '0.35rem',
                            }}
                        >
                            Hash
                        </Typography>

                        <IconButton
                            id="basic-button"
                            onClick={handleSortHash}
                            style={{
                                padding: 0,
                                marginTop: '0.15rem'
                            }}
                        >
                            <img
                                src={triunghi}
                                alt='triunghi'
                                style={styleHash}
                            />
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
                        <Typography noWrap style={{ fontWeight: 500, fontSize: 16, marginRight: '0.35rem', }}>
                            Commit
                        </Typography>

                        <IconButton
                            id="basic-button"
                            onClick={handleSortCommit}
                            style={{
                                padding: 0,
                                marginTop: '0.15rem'
                            }}
                        >
                            <img
                                src={triunghi}
                                alt='triunghi'
                                style={styleCommit}
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

                        <TriunghiMenuCommitsProject paramsCallback={paramsCallback} />
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

                        <TriunghiMenuCommitsContributor paramsCallback={paramsCallback} />

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
                        <Typography noWrap style={{ fontWeight: 500, fontSize: 16, marginRight: '0.35rem', }}>
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
        </TableHead >
    );
}
