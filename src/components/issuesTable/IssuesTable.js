import { faker } from '@faker-js/faker';
// @mui
import { makeStyles } from '@mui/styles';

import { Client } from '../../utils/client';


import {
    Box,
    Stack,
    Checkbox,
    CardHeader,
    Table,
    TableRow,
    TableBody,
    TableCell,
    Typography,
    TableContainer,
    Link,
    Tooltip
} from '@mui/material';


// components
import SearchNotFound from '../SearchNotFound';
import TableEmpty from '../TableEmpty';
import IssuesHead from './IssuesHead';

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
    projectElipsis: {
        maxWidth: "25em",
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        lineHeight: '1em',
        marginTop: '0.45em'
    },
    stea: {
        marginLeft: "0.15em"
    }
}));

export default function IssuesTable({
    filterName,
    isSearchEmpty,
    data,
    state,
    handleMenuFilter,
    // searchData,
    handleSortChange,
    clearFilter,
    globalFilter
}) {

    const classes = useStyles();

    const isUserNotFound = data.length === 0 && !isSearchEmpty;

    const tableEmpty = data.length === 0 && isSearchEmpty;

    const client = new Client();

    const user = JSON.parse(localStorage.getItem("user"));

    // const showData = isSearchEmpty ? data : searchData;

    const starOnChange = (e) => {
        let data = {
            issue_number: e.target.id,
            follow: e.target.checked,
        }

        console.log(data);

        client.post_with_token('issues/follow', data, user.token);
    }

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

                    <IssuesHead
                        data={data}
                        handleSortChange={handleSortChange}
                        handleMenuFilter={handleMenuFilter}
                        clearFilterFunction={clearFilter}
                        globalFilter={globalFilter}
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
                                const {
                                    assignees,
                                    avatar_url,
                                    dev_name,
                                    html_url,
                                    issue_number,
                                    issue_state,
                                    organisation,
                                    repo,
                                    title,
                                    updated_at } = row;
                                return (
                                    <TableRow
                                        hover
                                        key={id}
                                        tabIndex={-1}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                id={issue_number}
                                                icon={<img src={steaGol} alt='steaGol' />}
                                                checkedIcon={<img src={steaPlin} alt='steaPlin' />}
                                                onChange={(e) => starOnChange(e)}
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
                                                >
                                                    {`#${issue_number}`}
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

                                            {assignees ? JSON.parse(assignees).map((item, index) => {
                                                // if (index >= 3) {
                                                //     return (
                                                //         <span key={index}>...</span>
                                                //     );
                                                // }
                                                if (index < 3) {
                                                    return (
                                                        <Tooltip
                                                            key={index}
                                                            title={item[0]}
                                                            placement="bottom-end"
                                                            arrow
                                                        >
                                                            <Link
                                                                target="_blank"
                                                                rel="noopener"
                                                                href={"https://github.com/" + item[0]}
                                                            >
                                                                <Box
                                                                    component="img"
                                                                    src={item[1]}
                                                                    sx={{ width: 30, height: 30, borderRadius: 1.5 }}
                                                                    style={{
                                                                        marginRight: '1em'
                                                                    }}
                                                                />
                                                            </Link>
                                                        </Tooltip>
                                                    );
                                                }
                                            }) : ''
                                            }
                                        </TableCell>

                                        <TableCell
                                            align="left"
                                            component="th"
                                            scope="row"
                                            padding="none"
                                        >

                                            {issue_state === 'closed' ?
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