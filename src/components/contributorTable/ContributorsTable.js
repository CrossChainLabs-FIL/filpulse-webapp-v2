import { faker } from '@faker-js/faker';
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
    Link
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
    },
    projectElipsis: {
        maxWidth: "10em",
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        lineHeight: '1em',
        marginTop: '0.45em'
    },
}));

export default function ContributorsTable({
    filterName,
    isSearchEmpty,
    data,
    state,
    handleMenuFilter,
    // searchData,
    handleSortChange,
    clearFilter
}) {

    const classes = useStyles();

    const isUserNotFound = data.length === 0 && !isSearchEmpty;

    const tableEmpty = data.length === 0 && isSearchEmpty;

    // const showData = isSearchEmpty ? data : searchData;

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

                    <ContributorHead
                        handleSortChange={handleSortChange}
                        handleMenuFilter={handleMenuFilter}
                        clearFilterFunction={clearFilter}
                    />
                    {state.loading && (
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <Typography>loading</Typography>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    )}
                    {!state.loading && (
                        <TableBody>
                            {data.map((row) => {
                                const id = faker.datatype.uuid();
                                const { dev_name,
                                    avatar_url,
                                    repo,
                                    organisation,
                                    contributions,
                                    open_issues,
                                    closed_issues,
                                    open_prs,
                                    closed_prs
                                } = row;

                                let prValue;
                                if (Number(closed_prs) === 0) {
                                    prValue = 0;
                                }
                                else {
                                    prValue = ((Number(open_prs) * 100) / Number(closed_prs));
                                }

                                let issueValue;
                                if (Number(closed_issues) === 0) {
                                    issueValue = 0;
                                }
                                else {
                                    issueValue = (Number(open_issues) * 100) / Number(closed_issues);
                                }

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
                                                <Box
                                                    component="img"
                                                    src={avatar_url}
                                                    sx={{ width: 30, height: 30, borderRadius: 1.5 }}
                                                    style={{
                                                        marginRight: '1em'
                                                    }}
                                                />
                                                <Typography variant="subtitle2" noWrap>
                                                    <Link
                                                        target="_blank"
                                                        rel="noopener"
                                                        href={"https://github.com/" + dev_name}
                                                        color="inherit"
                                                    >
                                                        {dev_name}
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
                                            <Typography
                                                variant="subtitle2"
                                                noWrap
                                                className={classes.projectElipsis}
                                            >
                                                <Link
                                                    target="_blank"
                                                    rel="noopener"
                                                    href={"https://github.com/" + organisation + "/" + repo}
                                                    color="inherit"
                                                >
                                                    {organisation + '/' + repo}
                                                </Link>
                                            </Typography>
                                        </TableCell>

                                        <TableCell
                                            align="left"
                                            component="th"
                                            scope="row"
                                            padding="none"
                                        >
                                            <Typography variant="subtitle2" noWrap>
                                                {contributions?.substring(0, 7)}
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
                                                sx={{ width: '12em', marginLeft: '1.5em' }}
                                            >
                                                <Typography variant="subtitle2" noWrap>
                                                    {open_prs}
                                                </Typography>
                                                <Typography
                                                    variant="subtitle2"
                                                    noWrap
                                                    sx={{ marginLeft: "auto" }}
                                                >
                                                    {closed_prs}
                                                </Typography>
                                            </Stack>
                                            <Box sx={{ width: '100%', marginLeft: '1.5em' }}>
                                                <LinearProgress
                                                    sx={{
                                                        width: "12em",
                                                        height: '0.4em',
                                                        borderRadius: 5,
                                                    }}
                                                    variant='determinate'
                                                    value={prValue}
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
                                                sx={{ width: '12em', marginLeft: '1.5em' }}
                                            >
                                                <Typography variant="subtitle2" noWrap>
                                                    {open_issues}
                                                </Typography>
                                                <Typography
                                                    variant="subtitle2"
                                                    noWrap
                                                    sx={{ marginLeft: "auto" }}
                                                >
                                                    {closed_issues}
                                                </Typography>
                                            </Stack>
                                            <Box sx={{ width: '100%', marginLeft: '1.5em' }} >
                                                <LinearProgress
                                                    sx={{
                                                        width: "12em",
                                                        height: '0.4em',
                                                        borderRadius: 5,
                                                        marginRight: '0em'
                                                    }}
                                                    variant='determinate'
                                                    value={issueValue}
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
                    )}


                    {isUserNotFound && !tableEmpty && !isSearchEmpty && !state.loading && (
                        <TableBody>
                            <TableRow>
                                <TableCell align="center" colSpan={11} sx={{ py: 3 }}>
                                    <SearchNotFound searchQuery={filterName} />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    )}

                    {tableEmpty && !state.loading && (
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