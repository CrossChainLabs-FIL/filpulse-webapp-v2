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

// components
import FilterByProject from '../FilterByProject';
import FilterByContributor from '../FilterByContributor';

// assets
import triunghi from '../../assets/triunghi.svg';
import info from '../../assets/info.svg';


// ----------------------------------------------------------------------


export default function ContributorHead({ paramsCallback }) {

    const [isDescCommits, setIsDescCommits] = useState(true);
    const [isDescPrs, setIsDescPrs] = useState(true);
    const [isDescIssues, setIsDescIssues] = useState(true);

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
            <TableRow
                sx={{
                    height: '4rem',
                }}
            >

                <TableCell
                    align="left"
                    component="th"
                    scope="row"
                    padding="none"
                    sx={{
                        width: '20rem',
                        padding: 0,
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
                                marginLeft: '3.8rem',
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
                    sx={{
                        width: '16rem'
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
                    sx={{
                        width: '15rem'
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
                    sx={{
                        width: '20rem'
                    }}
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
