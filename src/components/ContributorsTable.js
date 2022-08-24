// @mui
import { makeStyles } from '@mui/styles';

import {
    Box,
    LinearProgress,
    Stack,
    Table,
    TableRow,
    TableBody,
    TableCell,
    Typography,
    TableContainer,
    Paper
} from '@mui/material';


// components
import Scrollbar from './Scrollbar';
import SearchNotFound from './SearchNotFound';
import TableEmpty from './TableEmpty';
import ContributorHead from './ContributorHead';


const useStyles = makeStyles(() => ({
    table: {
        maxHeight: "40em",
    },
    colorPrimary: {
        backgroundColor: '#F6ECD0',
    },
    barColorPrimary: {
        backgroundColor: '#FFB803',
    }
}));

export default function WatchlistTable({
    filterName,
    isSearchEmpty,
    data,
    searchData
}) {

    const classes = useStyles();

    const isUserNotFound = searchData.length === 0;

    const tableEmpty = data.length === 0;

    const showData = isSearchEmpty ? data : searchData;

    return (
        <Scrollbar>
            <TableContainer
                sx={{
                    minWidth: 800,
                }}
                component={Paper}
                className={classes.table}
            >
                <Table stickyHeader>

                    <ContributorHead />

                    <TableBody>
                        {showData.map((row) => {
                            const { id,
                                person,
                                project,
                                commits,
                                pr,
                                issues } = row;
                            return (
                                <TableRow
                                    hover
                                    key={id}
                                    tabIndex={-1}
                                >
                                    <TableCell
                                        align="left"
                                        component="th"
                                        scope="row"
                                        padding="none"
                                        style={{ height: '5em' }}
                                    >
                                        <Stack
                                            direction="row"
                                            alignItems="center"
                                        >
                                            <img
                                                src={person.icon}
                                                alt='avatar'
                                                style={{
                                                    marginRight: '1em'
                                                }}
                                            />
                                            <Typography variant="subtitle2" noWrap>
                                                {person.name}
                                            </Typography>
                                        </Stack>
                                    </TableCell>


                                    <TableCell
                                        align="left"
                                        component="th"
                                        scope="row"
                                        padding="none"
                                    >
                                        <Typography variant="subtitle2" noWrap>
                                            {project}
                                        </Typography>
                                    </TableCell>

                                    <TableCell
                                        align="left"
                                        component="th"
                                        scope="row"
                                        padding="none"
                                    >
                                        <Typography variant="subtitle2" noWrap>
                                            {commits}
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
                                            sx={{ width: '17em' }}
                                        >
                                            <Typography variant="subtitle2" noWrap>
                                                {pr.min}
                                            </Typography>
                                            <Typography
                                                variant="subtitle2"
                                                noWrap
                                                sx={{ marginLeft: "auto" }}
                                            >
                                                {pr.max}
                                            </Typography>
                                        </Stack>
                                        <Box sx={{ width: '100%' }}>
                                            <LinearProgress
                                                sx={{
                                                    width: "17em"
                                                }}
                                                variant='determinate'
                                                value={(pr.min * 100) / pr.max}
                                            />
                                        </Box>
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
                                            sx={{ width: '17em' }}
                                        >
                                            <Typography variant="subtitle2" noWrap>
                                                {issues.min}
                                            </Typography>
                                            <Typography
                                                variant="subtitle2"
                                                noWrap
                                                sx={{ marginLeft: "auto" }}
                                            >
                                                {issues.max}
                                            </Typography>
                                        </Stack>
                                        <Box sx={{ width: '100%' }} >
                                            <LinearProgress
                                                sx={{
                                                    width: "17em"
                                                }}
                                                variant='determinate'
                                                value={(issues.min * 100) / issues.max}
                                                classes={{
                                                    colorPrimary: classes.colorPrimary,
                                                    barColorPrimary: classes.barColorPrimary
                                                }}
                                            />
                                        </Box>
                                    </TableCell>

                                </TableRow>
                            );
                        })}
                    </TableBody>

                    {isUserNotFound && !tableEmpty && !isSearchEmpty && (
                        <TableBody>
                            <TableRow>
                                <TableCell align="center" colSpan={11} sx={{ py: 3 }}>
                                    <SearchNotFound searchQuery={filterName} />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    )}

                    {tableEmpty && (
                        <TableBody>
                            <TableRow>
                                <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                                    <TableEmpty />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    )}
                </Table>
            </TableContainer>
        </Scrollbar>
    );
}