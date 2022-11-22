import React, { useState, useEffect, useCallback, useRef, useLayoutEffect } from 'react';
import { faker } from '@faker-js/faker';
// @mui
import { makeStyles } from '@mui/styles';

import { Client } from '../../utils/client';

import {
    Stack,
    Table,
    TableRow,
    TableBody,
    TableCell,
    Typography,
    TableContainer,
    Link,
    Box,
    CircularProgress
} from '@mui/material';

// components
import SearchNotFound from '../SearchNotFound';
import TableEmpty from '../TableEmpty';
import CommitsHead from './CommitsHead';

import { fToNow } from '../../utils/format';


const useStyles = makeStyles(() => ({
    table: {
        maxHeight: '40rem',
    },
    projectElipsis: {
        maxWidth: '32rem',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
}));

export default function CommitsTable({ search }) {

    const classes = useStyles();

    const [data, setData] = useState([]);
    const [state, setState] = useState({ loading: true });
    const [params, setParams] = useState({});
    const [isUserNotFound, setIsUserNotFound] = useState(false);
    const [tableEmpty, setTableEmpty] = useState(false);
    const tableEl = useRef();
    const [distanceBottom, setDistanceBottom] = useState(0);
    const [lastOffset, setLastOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const fetchData = useCallback(async () => {
        try {
            let response;
            const client = new Client();

            if (!search) {
                params.search = undefined;
            }
            else {
                params.search = search;
            }

            response = await client.get('tab_commits', params);

            if (response.list?.length < 20) {
                setHasMore(false);
            }

            if (params?.offset > lastOffset) {
                setData([...data, ...response.list]);
                setLastOffset(params?.offset);
            } else if (lastOffset == 0) {
                setData(response.list);
            }

            setState({ loading: false });
            setIsUserNotFound(response.list.length === 0 && search);
            setTableEmpty(response.list.length === 0 && !search);

        } catch (error) {
            console.log(error);
        }
    }, [params, search]);

    useEffect(() => {
        fetchData();
    }, [params, search, fetchData]);

    const paramsCallback = (new_params) => {
        setState({ loading: true });
        setData([]);
        new_params.offset = 0;
        setParams({
            ...params,
            ...new_params,
        });
        setDistanceBottom(0);
        setLastOffset(0);
        setHasMore(true);
    }

    const scrollListener = useCallback(() => {
        let bottom = tableEl.current.scrollHeight - tableEl.current.clientHeight

        setDistanceBottom(Math.round((bottom / 100) * 20))

        if (tableEl.current.scrollTop > bottom - distanceBottom && hasMore && !state.loading) {
            let new_params = {
                offset: lastOffset + 20,
            }

            setParams({
                ...params,
                ...new_params,
            });

        }
    }, [hasMore, state.loading, distanceBottom]);

    useLayoutEffect(() => {
        const tableRef = tableEl.current
        tableRef.addEventListener('scroll', scrollListener)
        return () => {
            tableRef.removeEventListener('scroll', scrollListener)
        }
    }, [scrollListener]);

    return (
        <>
            <TableContainer
                sx={{
                    minWidth: 800,
                }}
                className={classes.table}
                ref={tableEl}
            >
                <Table stickyHeader>

                    <CommitsHead paramsCallback={paramsCallback} />

                    {state.loading && (
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <Box sx={{ display: 'flex' }}>
                                        <CircularProgress />
                                    </Box>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    )}
                    {!state.loading && (
                        <TableBody>
                            {data.map((row) => {
                                const id = faker.datatype.uuid();
                                const { repo,
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
                                            style={{
                                                height: '5rem',
                                                padding: 0,
                                                paddingLeft: '5.25rem'
                                            }}
                                        >
                                            <Typography
                                                variant="subtitle2"
                                                noWrap
                                            >
                                                <Link
                                                    target="_blank"
                                                    rel="noopener"
                                                    href={"https://github.com/" + organisation + "/" + repo + "/commit/" + commit_hash}
                                                    color="inherit"
                                                    underline="none"
                                                >
                                                    {commit_hash?.substring(0, 7)}
                                                </Link>
                                            </Typography>
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
                                                {message?.substring(0, 50)}
                                            </Typography>
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
                                                color='#65898F'
                                            >
                                                <Link
                                                    target="_blank"
                                                    rel="noopener"
                                                    href={"https://github.com/" + organisation + "/" + repo}
                                                    color="inherit"
                                                    underline="none"
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
                                            <Stack
                                                direction="row"
                                                alignItems="center"
                                            >
                                                <Box
                                                    component="img"
                                                    src={avatar_url}
                                                    sx={{ width: 30, height: 30, borderRadius: 1.5 }}
                                                    style={{
                                                        marginRight: '1rem'
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
                                            <Typography variant="subtitle2" noWrap>
                                                {fToNow(commit_date)}
                                            </Typography>
                                        </TableCell>

                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    )}

                    {isUserNotFound && !tableEmpty && !state.loading && (
                        <TableBody>
                            <TableRow>
                                <TableCell align="center" colSpan={11} sx={{ py: 3 }}>
                                    <SearchNotFound searchQuery={search} />
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