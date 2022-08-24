// @mui
import { makeStyles } from '@mui/styles';

import {
    Box,
    Checkbox,
    CardHeader,
    Table,
    TableRow,
    TableBody,
    TableCell,
    Typography,
    TableContainer,
    Paper,
    Stack
} from '@mui/material';

// components
import SearchNotFound from './SearchNotFound';
import TableEmpty from './TableEmpty';
import PRHead from './PRHead';

// assets
import steaPlin from '../assets/steaPlin.svg';
import steaGol from '../assets/steaGol.svg';


const useStyles = makeStyles(() => ({
    table: {
        maxHeight: "40em",
    },
    mergedBox: {
        width: '6em',
        height: '1.5em',
        borderRadius: 5,
        backgroundColor: '#CFD2F5'
    },
    openBox: {
        width: '4em',
        height: '1.5em',
        borderRadius: 5,
        backgroundColor: '#E0F3E0'
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
        <>
            <TableContainer
                sx={{
                    minWidth: 800,
                }}
                // component={Paper}
                className={classes.table}
            >
                <Table stickyHeader>

                    <PRHead />

                    <TableBody>
                        {showData.map((row) => {
                            const { id,
                                showId,
                                project,
                                person,
                                merged,
                                time } = row;
                            return (
                                <TableRow
                                    hover
                                    key={id}
                                    tabIndex={-1}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            icon={<img src={steaGol} alt='steaGol' />}
                                            checkedIcon={<img src={steaPlin} alt='steaPlin' />}
                                        />
                                    </TableCell>

                                    <TableCell
                                        align="left"
                                        component="th"
                                        scope="row"
                                        padding="none"
                                        style={{
                                            height: '5em',
                                            paddingLeft: 0,
                                        }}
                                    >
                                        <Typography variant="subtitle2" noWrap>
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
                                                        lineHeight: '1em',
                                                        marginTop: '0.45em'
                                                    }}
                                                >
                                                    {project.title}
                                                </Typography>
                                            }
                                            subheader={project.subtitle}
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
                                        align="center"
                                        component="th"
                                        scope="row"
                                        padding="none"
                                    >

                                        {merged ?
                                            (
                                                <Box className={classes.mergedBox}>
                                                    <Typography variant="subtitle2" noWrap color='#434991'>
                                                        Merged
                                                    </Typography>
                                                </Box>
                                            ) :
                                            (
                                                <Box className={classes.openBox}>
                                                    <Typography variant="subtitle2" noWrap color='#2B840E'>
                                                        Open
                                                    </Typography>
                                                </Box>
                                            )
                                        }
                                    </TableCell>

                                    <TableCell
                                        align="left"
                                        component="th"
                                        scope="row"
                                        padding="none"
                                    >
                                        <Typography variant="subtitle2" noWrap>
                                            {time}
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