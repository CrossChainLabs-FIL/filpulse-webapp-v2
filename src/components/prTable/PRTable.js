import { faker } from '@faker-js/faker';
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
    Link,
    Stack
} from '@mui/material';

// components
import SearchNotFound from '../SearchNotFound';
import TableEmpty from '../TableEmpty';
import PRHead from './PRHead';

// assets
import steaPlin from '../../assets/steaPlin.svg';
import steaGol from '../../assets/steaGol.svg';
import closedBox from '../../assets/ClosedBox.svg';
import openBox from '../../assets/OpenBox.svg';

import { fToNow } from '../../utils/format';


const useStyles = makeStyles(() => ({
    table: {
        maxHeight: "40em",
    },
    stea: {
        marginLeft: "0.15em"
    },
    projectElipsis: {
        maxWidth: "25em",
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        lineHeight: '1em',
        marginTop: '0.45em'
    },
}));

export default function PRTable({
    filterName,
    isSearchEmpty,
    data,
    state,
    handleMenuFilter,
    // searchData,
    handleSortChange
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

                    <PRHead data={data} handleSortChange={handleSortChange} handleMenuFilter={handleMenuFilter} />

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
                                const { pr_number,
                                    title,
                                    repo,
                                    organisation,
                                    html_url,
                                    pr_state,
                                    avatar_url,
                                    dev_name,
                                    updated_at } = row;
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
                                                className={classes.stea}
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
                                                <Link
                                                    target="_blank"
                                                    rel="noopener"
                                                    href={html_url}
                                                    color="inherit"
                                                    underline="none"
                                                >
                                                    {pr_number}
                                                </Link>
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
                                                        className={classes.projectElipsis}
                                                    >
                                                        {title}
                                                    </Typography>
                                                }
                                                subheader={
                                                    <Link
                                                        target="_blank"
                                                        rel="noopener"
                                                        href={"https://github.com/" + organisation + "/" + repo}
                                                        color="inherit"
                                                    >
                                                        {organisation + '/' + repo}
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
                                                        underline="none"
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

                                            {pr_state === 'closed' ?
                                                (
                                                    <img
                                                        src={closedBox}
                                                        alt="closed"
                                                    />
                                                ) :
                                                (
                                                    <img
                                                        src={openBox}
                                                        alt="closed"
                                                    />
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
                                                {fToNow(updated_at)}
                                                {/* {updated_at} */}
                                            </Typography>
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