// @mui
import { makeStyles } from '@mui/styles';

import {
    Stack,
    CardHeader,
    Table,
    TableRow,
    TableBody,
    TableCell,
    Typography,
    TableContainer,
    Paper,
    Box
} from '@mui/material';

// components
import Scrollbar from './Scrollbar';
import SearchNotFound from './SearchNotFound';
import TableEmpty from './TableEmpty';
import CommitsHead from './CommitsHead';
import { fToNow } from '../utils/format';

const useStyles = makeStyles(() => ({
    table: {
        maxHeight: "40em",
    },
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

                    <CommitsHead />

                    <TableBody>
                        {showData.map((row) => {
                            const { id,
                                repo,
                                organisation,
                                message,
                                commit_hash,
                                avatar_url,
                                dev_name,
                                commit_date } = row;
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
                                        <Typography
                                            variant="subtitle2"
                                            noWrap
                                            style={{
                                                marginLeft: '1.1em',
                                                opacity: 0.72
                                            }}
                                        >
                                            <a target="_blank" href={"https://github.com/" + organisation + "/" + repo + "/commit/" + commit_hash}>{commit_hash?.substring(0,7)}</a>
                                        </Typography>
                                    </TableCell>

                                    <TableCell
                                        align="left"
                                        component="th"
                                        scope="row"
                                        padding="none"
                                    >
                                        <CardHeader
                                            style={{ background: "transparent" }}
                                            sx={{
                                                boxShadow: 0,
                                                padding: 0,
                                            }}
                                            title={
                                                <Typography
                                                    variant="subtitle2"
                                                    noWrap
                                                    style={{
                                                        lineHeight: '1em',
                                                        marginTop: '0.45em'
                                                    }}
                                                >
                                                    {message?.substring(0,50)}
                                                </Typography>
                                            }
                                            subheader={organisation + '/' + repo}
                                        />

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
                                        <Box component="img" src={avatar_url} sx={{ width: 30, height: 30, borderRadius: 1.5 }} />
                                            <Typography variant="subtitle2" noWrap>
                                                <a target="_blank" href={"https://github.com/" + dev_name}>{dev_name}</a>
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
                                           {fToNow(commit_date)}
                                        </Typography>
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