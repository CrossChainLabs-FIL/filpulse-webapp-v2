import React, { useState, useEffect, useCallback, useRef, useLayoutEffect } from 'react';
import { faker } from '@faker-js/faker';
// @mui
import { makeStyles } from '@mui/styles';

import { Client } from '../../utils/client';

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
    Link,
    CircularProgress
} from '@mui/material';


// components
import SearchNotFound from '../SearchNotFound';
import TableEmpty from '../TableEmpty';
import ContributorHead from './ContributorHead';


const useStyles = makeStyles(() => ({
    table: {
        maxHeight: '40rem',
    },
    colorPrimary: {
        backgroundColor: '#F6ECD0',
    },
    barColorPrimary: {
        backgroundColor: '#FFB803',
    },
    projectElipsis: {
        maxWidth: '10rem',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
}));

export default function ContributorsTable({ search }) {

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

            response = await client.get('tab_contributors', params);

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

                    <ContributorHead paramsCallback={paramsCallback} />
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
                                    prValue = ((Number(open_prs) * 100) / (Number(closed_prs) + Number(open_prs)));
                                }

                                let issueValue;
                                if (Number(closed_issues) === 0) {
                                    issueValue = 0;
                                }
                                else {
                                    issueValue = (Number(open_issues) * 100) / (Number(closed_issues) + Number(open_issues));
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
                                            style={{
                                                height: '5rem',
                                                padding: 0,
                                                paddingLeft: '2rem'
                                            }}
                                        >
                                            <Stack
                                                direction="row"
                                                alignItems="center"
                                                style={{ marginLeft: '4rem' }}
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
                                                sx={{ width: '12rem', marginLeft: '1.5rem' }}
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
                                            <Box sx={{ width: '100%', marginLeft: '1.5rem' }}>
                                                <LinearProgress
                                                    sx={{
                                                        width: '12rem',
                                                        height: '0.4rem',
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
                                                sx={{ width: '12rem', marginLeft: '1.5rem' }}
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
                                            <Box sx={{ width: '100%', marginLeft: '1.5rem' }} >
                                                <LinearProgress
                                                    sx={{
                                                        width: '12rem',
                                                        height: '0.4rem',
                                                        borderRadius: 5,
                                                        marginRight: '0rem'
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