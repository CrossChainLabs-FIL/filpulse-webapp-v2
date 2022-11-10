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
import clearFilter from '../../assets/clearFilter.svg';
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



export default function ContributorHead({
    handleSortChange,
    handleMenuFilter,
    clearFilterFunction,
    globalFilter
}) {

    const classes = useStyles();

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

                        <TriunghiMenuContributorContributor
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
                    className={classes.project}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                    >
                        <Typography variant="h6" noWrap style={{ fontWeight: 450, opacity: 0.75 }}>
                            Project
                        </Typography>

                        <TriunghiMenuContributorProject
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
                            onClick={(e) => handleSortChange("commits", 'asc')}
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
                            onClick={(e) => handleSortChange("prMin", 'asc')}
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
                        open - merged
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
                            onClick={(e) => handleSortChange("issuesMin", 'asc')}
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
