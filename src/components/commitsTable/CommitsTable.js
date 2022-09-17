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
    Link
} from '@mui/material';

// components
import SearchNotFound from '../SearchNotFound';
import TableEmpty from '../TableEmpty';
import CommitsHead from './CommitsHead';


const useStyles = makeStyles(() => ({
    table: {
        maxHeight: "40em",
    },
}));

export default function CommitsTable({
    filterName,
    isSearchEmpty,
    data,
    searchData,
    handleSortChange
}) {

    const classes = useStyles();

    const isUserNotFound = searchData.length === 0;

    const tableEmpty = data.length === 0;

    const showData = isSearchEmpty ? data : searchData;

    return (
        <>
            <TableContainer
                sx={{
                    minWidth: 800,
                }}
                // component={Paper}
                className={classes.table}
            >
                <Table stickyHeader>

                    <CommitsHead data={data} handleSortChange={handleSortChange} />

                    <TableBody>
                        {showData.map((row) => {
                            const { id,
                                showId,
                                projectTitle,
                                projectSubtitle,
                                projectLink,
                                personIcon,
                                personName,
                                personLink,
                                timeNumber,
                                timeText } = row;
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
                                                marginLeft: '2.5em',
                                                opacity: 0.72
                                            }}
                                        >
                                            {showId}
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
                                                        lineHeight: '1.1em',
                                                        marginTop: '0.45em'
                                                    }}
                                                >
                                                    {projectTitle}
                                                </Typography>
                                            }
                                            subheader={
                                                <Link target="_blank" rel="noopener" href={projectLink} >
                                                    {projectSubtitle}
                                                </Link>
                                            }
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
                                            <img
                                                src={personIcon}
                                                alt='avatar'
                                                style={{
                                                    marginRight: '1em'
                                                }}
                                            />
                                            <Typography variant="subtitle2" noWrap>
                                                <Link target="_blank" rel="noopener" href={personLink} >
                                                    {personName}
                                                </Link>
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
                                            {timeText}
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
        </>
    );
}