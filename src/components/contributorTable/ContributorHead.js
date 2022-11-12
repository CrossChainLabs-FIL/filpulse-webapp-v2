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
import TriunghiMenuContributorContributor from './headMenus/TriunghiMenuContributorContributor';
import TriunghiMenuContributorProject from './headMenus/TriunghiMenuContributorProject'

// assets
import triunghi from '../../assets/triunghi.svg';
import info from '../../assets/info.svg';


// ----------------------------------------------------------------------


const useStyles = makeStyles(() => ({
    triunghi: {
        marginLeft: '0.35em',
        marginTop: '0.15em'
    },
    rowHead: {
        height: '4em',
    },
    contributor: {
        width: '22em'
    },
    project: {
        width: '18em'
    },
    commits: {
        width: '15em'
    },
    pr: {
        width: '24em'
    }
}));



export default function ContributorHead({ paramsCallback }) {

    const [isDescCommits, setIsDescCommits] = useState(true);
    const [isDescPrs, setIsDescPrs] = useState(true);
    const [isDescIssues, setIsDescIssues] = useState(true);
    const classes = useStyles();

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
                                marginLeft: '3em'
                            }}
                        >
                            Contributor
                        </Typography>

                        <TriunghiMenuContributorContributor paramsCallback={paramsCallback} />
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

                        <TriunghiMenuContributorProject paramsCallback={paramsCallback} />
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
                        <Typography variant="h6" noWrap style={{ fontWeight: 450, opacity: 0.75 }}>
                            Commits
                        </Typography>

                        <IconButton
                            id="basic-button"
                            onClick={(e) => handleSort('contributions')}
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
                        style={{ marginTop: '1.2em' }}
                    >
                        <Tooltip
                            title='info'
                            arrow
                            style={{
                                marginRight: '0.35em'
                            }}
                        >
                            <img src={info} alt='info' />
                        </Tooltip>

                        <Typography
                            variant="h6"
                            noWrap
                            style={{
                                fontWeight: 450,
                                opacity: 0.75,
                                fontSize: 15
                            }}
                        >
                            PRs
                        </Typography>

                        <IconButton
                            id="basic-button"
                            onClick={(e) => handleSort('open_prs')}
                            style={{ padding: 0 }}
                        >
                            <img src={triunghi} alt='triunghi' className={classes.triunghi} />
                        </IconButton>
                    </Stack>
                    <Typography
                        variant="subtitle2"
                        noWrap
                        style={{
                            fontWeight: 450,
                            opacity: 0.75,
                            marginTop: 0,
                            fontSize: 12,
                            marginLeft: '1.8em'
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
                        style={{ marginTop: '1.2em' }}
                    >
                        <Tooltip
                            title='info'
                            arrow
                            style={{
                                marginRight: '0.35em'
                            }}
                        >
                            <img src={info} alt='info' />
                        </Tooltip>

                        <Typography
                            variant="h6"
                            noWrap
                            style={{
                                fontWeight: 450,
                                opacity: 0.75,
                                fontSize: 15
                            }}
                        >
                            Issues
                        </Typography>

                        <IconButton
                            id="basic-button"
                            onClick={(e) => handleSort('open_issues')}
                            style={{ padding: 0 }}
                        >
                            <img src={triunghi} alt='triunghi' className={classes.triunghi} />
                        </IconButton>
                    </Stack>
                    <Typography
                        variant="subtitle2"
                        noWrap
                        style={{
                            fontWeight: 450,
                            opacity: 0.75,
                            marginTop: 0,
                            fontSize: 12,
                            marginLeft: '1.8em'
                        }}
                    >
                        open - closed
                    </Typography>
                </TableCell>

            </TableRow>
        </TableHead>
    );
}
