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
import SearchNotFound from '../SearchNotFound';
import TableEmpty from '../TableEmpty';
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

export default function ContributorsTable({
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

                    <ContributorHead data={data} handleSortChange={handleSortChange} />

                    <TableBody>
                        {showData.map((row) => {
                            const { id,
                                personIcon,
                                personName,
                                project,
                                commits,
                                prMin,
                                prMax,
                                issuesMin,
                                issuesMax
                            } = row;
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
                                            style={{ marginLeft: '4em' }}
                                        >
                                            <img
                                                src={personIcon}
                                                alt='avatar'
                                                style={{
                                                    marginRight: '1em'
                                                }}
                                            />
                                            <Typography variant="subtitle2" noWrap>
                                                {personName}
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
                                            sx={{ width: '12em' }}
                                        >
                                            <Typography variant="subtitle2" noWrap>
                                                {prMin}
                                            </Typography>
                                            <Typography
                                                variant="subtitle2"
                                                noWrap
                                                sx={{ marginLeft: "auto" }}
                                            >
                                                {prMax}
                                            </Typography>
                                        </Stack>
                                        <Box sx={{ width: '100%' }}>
                                            <LinearProgress
                                                sx={{
                                                    width: "12em",
                                                    height: '0.4em',
                                                    borderRadius: 5,
                                                }}
                                                variant='determinate'
                                                value={(prMin * 100) / prMax}
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
                                            sx={{ width: '12em' }}
                                        >
                                            <Typography variant="subtitle2" noWrap>
                                                {issuesMin}
                                            </Typography>
                                            <Typography
                                                variant="subtitle2"
                                                noWrap
                                                sx={{ marginLeft: "auto" }}
                                            >
                                                {issuesMax}
                                            </Typography>
                                        </Stack>
                                        <Box sx={{ width: '100%' }} >
                                            <LinearProgress
                                                sx={{
                                                    width: "12em",
                                                    height: '0.4em',
                                                    borderRadius: 5,

                                                }}
                                                variant='determinate'
                                                value={(issuesMin * 100) / issuesMax}
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
        </>
    );
}