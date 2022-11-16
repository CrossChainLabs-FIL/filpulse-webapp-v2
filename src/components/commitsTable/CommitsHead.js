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



export default function CommitsHead({ paramsCallback }) {
    const [isDescHash, setIsDescHash] = useState(true);
    const [isDescCommit, setIsDescCommit] = useState(true);
    const [isDescUpdatedAt, setIsDescUpdatedAt] = useState(true);
    const classes = useStyles();

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
                    style={{
                        width: '12em'
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
                                marginLeft: '2em',
                                fontSize: 16
                            }}
                        >
                            Hash
                        </Typography>

                        <IconButton
                            id="basic-button"
                            onClick={handleSortHash}
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
                        <Typography noWrap style={{ fontWeight: 500, fontSize: 16 }}>
                            Commit
                        </Typography>

                        <IconButton
                            id="basic-button"
                            onClick={handleSortCommit}
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
                        <Typography noWrap style={{ fontWeight: 500, fontSize: 16 }}>
                            Last Updated
                        </Typography>

                        <IconButton
                            id="basic-button"
                            onClick={handleSortUpdatedAt}
                            style={{ padding: 0 }}
                        >
                            <img src={triunghi} alt='triunghi' className={classes.triunghi} />
                        </IconButton>
                    </Stack>
                </TableCell>

            </TableRow>
        </TableHead >
    );
}
