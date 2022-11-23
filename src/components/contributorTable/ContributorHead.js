import { useState } from 'react';
// material
import {
    Typography,
    TableRow,
    TableCell,
    TableHead,
    Stack,
    IconButton,
    Tooltip
} from '@mui/material';

import { makeStyles } from '@mui/styles';

// components
import FilterByProject from '../FilterByProject';
import FilterByContributor from '../FilterByContributor';

// assets
import triunghi from '../../assets/triunghi.svg';
import info from '../../assets/info.svg';


// ----------------------------------------------------------------------


const useStyles = makeStyles(() => ({
    triunghi: {
        marginLeft: '0.35rem',
        marginTop: '0.15rem'
    },
    rowHead: {
        height: '4rem',
    },
    contributor: {
        width: '20rem'
    },
    project: {
        width: '16rem'
    },
    commits: {
        width: '15rem'
    },
    pr: {
        width: '20rem'
    }
}));



export default function ContributorHead({ paramsCallback }) {

    const [isDescCommits, setIsDescCommits] = useState(true);
    const [isDescPrs, setIsDescPrs] = useState(true);
    const [isDescIssues, setIsDescIssues] = useState(true);
    const classes = useStyles();

    const styleCommits = {
        transform: !isDescCommits ? 'rotate(180deg)' : '',
        transition: 'transform 150ms ease', // smooth transition
    }
    const stylePrs = {
        transform: !isDescPrs ? 'rotate(180deg)' : '',
        transition: 'transform 150ms ease', // smooth transition
    }
    const styleIssues = {
        transform: !isDescIssues ? 'rotate(180deg)' : '',
        transition: 'transform 150ms ease', // smooth transition
    }

    const handleSort = (type) => {
        switch (type) {
            case 'contributions':
                paramsCallback({ sortBy: type, sortType: isDescCommits ? 'asc' : 'desc' });
                setIsDescCommits(!isDescCommits);
                setIsDescPrs(true);
                setIsDescIssues(true);
                break;
            case 'open_prs':
                paramsCallback({ sortBy: type, sortType: isDescPrs ? 'asc' : 'desc' });
                setIsDescCommits(true);
                setIsDescPrs(!isDescPrs);
                setIsDescIssues(true);
                break;
            case 'open_issues':
                paramsCallback({ sortBy: type, sortType: isDescIssues ? 'asc' : 'desc' });
                setIsDescCommits(true);
                setIsDescPrs(true);
                setIsDescIssues(!isDescIssues);
                break;
            default: console.log('error'); break;
        }
    }

    return (
        <TableHead>
            <TableRow className={classes.rowHead}>

                <TableCell
                    align="left"
                    component="th"
                    scope="row"
                    padding="none"
                    className={classes.contributor}
                    sx={{
                        padding: 0,
                        paddingLeft: '2.2rem'
                    }}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                    >
                        <Typography
                            noWrap
                            sx={{
                                fontWeight: 500,
                                marginLeft: '3rem',
                                fontSize: 16
                            }}
                        >
                            Contributor
                        </Typography>

                        <FilterByContributor endpoint={'tab_contributors/filter/contributor'} paramsCallback={paramsCallback} />
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
                        <Typography
                            noWrap
                            sx={{
                                fontWeight: 500,
                                fontSize: 16
                            }}
                        >
                            Project
                        </Typography>

                        <FilterByProject endpoint={'tab_contributors/filter/project'} paramsCallback={paramsCallback} />
                    </Stack>
                </TableCell>

                <TableCell
                    align="left"
                    component="th"
                    scope="row"
                    padding="none"
                    className={classes.commits}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                    >
                        <Typography
                            noWrap
                            sx={{
                                fontWeight: 500,
                                fontSize: 16,
                                marginRight: '0.35rem',
                            }}
                        >
                            Commits
                        </Typography>

                        <IconButton
                            id="basic-button"
                            onClick={(e) => handleSort('contributions')}
                            sx={{
                                padding: 0,
                                marginTop: '0.15rem'
                            }}
                        >
                            <img
                                src={triunghi}
                                alt='triunghi'
                                style={styleCommits}
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
                        sx={{ marginTop: '1.2rem' }}
                    >
                        <Tooltip
                            title='info'
                            arrow
                            sx={{
                                marginRight: '0.35rem'
                            }}
                        >
                            <img src={info} alt='info' />
                        </Tooltip>

                        <Typography
                            noWrap
                            sx={{
                                fontWeight: 500,
                                fontSize: 16,
                                marginRight: '0.35rem',
                            }}
                        >
                            PRs
                        </Typography>

                        <IconButton
                            id="basic-button"
                            onClick={(e) => handleSort('open_prs')}
                            sx={{
                                padding: 0,
                                marginTop: '0.15rem'
                            }}
                        >
                            <img
                                src={triunghi}
                                alt='triunghi'
                                style={stylePrs}
                            />
                        </IconButton>
                    </Stack>
                    <Typography
                        noWrap
                        sx={{
                            fontWeight: 450,
                            opacity: 0.75,
                            marginTop: 0,
                            fontSize: 12,
                            marginLeft: '1rem'
                        }}
                    >
                        open - closed
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
                        sx={{ marginTop: '1.2rem' }}
                    >
                        <Tooltip
                            title='info'
                            arrow
                            sx={{
                                marginRight: '0.35rem'
                            }}
                        >
                            <img src={info} alt='info' />
                        </Tooltip>

                        <Typography
                            noWrap
                            sx={{
                                fontWeight: 500,
                                fontSize: 16,
                                marginRight: '0.35rem',
                            }}
                        >
                            Issues
                        </Typography>

                        <IconButton
                            id="basic-button"
                            onClick={(e) => handleSort('open_issues')}
                            sx={{
                                padding: 0,
                                marginTop: '0.15rem'
                            }}
                        >
                            <img
                                src={triunghi}
                                alt='triunghi'
                                style={styleIssues}
                            />
                        </IconButton>
                    </Stack>
                    <Typography
                        noWrap
                        sx={{
                            fontWeight: 450,
                            opacity: 0.75,
                            marginTop: 0,
                            fontSize: 12,
                            marginLeft: '1rem'
                        }}
                    >
                        open - closed
                    </Typography>
                </TableCell>

            </TableRow>
        </TableHead>
    );
}
