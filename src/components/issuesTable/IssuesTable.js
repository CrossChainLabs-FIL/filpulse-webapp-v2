import React, { useState, useEffect, useCallback, useContext, useRef, useLayoutEffect } from 'react';
import { faker } from '@faker-js/faker';
// @mui
import { makeStyles } from '@mui/styles';

import { Client } from '../../utils/client';

import {
    Box,
    Stack,
    Checkbox,
    Table,
    TableRow,
    TableBody,
    TableCell,
    Typography,
    TableContainer,
    Link,
    Tooltip,
    CircularProgress
} from '@mui/material';


// components
import SearchNotFound from '../SearchNotFound';
import TableEmpty from '../TableEmpty';
import IssuesHead from './IssuesHead';
import SteaLoggedOut from '../SteaLoggedOut';
import { AuthContext } from "../../App";

// assets
import steaPlin from '../../assets/steaPlin.svg';
import steaGol from '../../assets/steaGol.svg';
import closedBox from '../../assets/ClosedBox.svg';
import openBox from '../../assets/OpenBox.svg';

import { fToNow } from '../../utils/format';


const useStyles = makeStyles(() => ({
    table: {
        maxHeight: '40rem',
    },
    stea: {
        marginBottom: '0.2rem'
    }
}));

export default function IssuesTable({ search }) {
    const classes = useStyles();

    const [data, setData] = useState([]);
    const [state, setState] = useState({ loading: true });
    const [params, setParams] = useState({});
    const [update, setUpdate] = useState(false);
    const [fetch, setFetch] = useState(true);
    const [isUserNotFound, setIsUserNotFound] = useState(false);
    const [tableEmpty, setTableEmpty] = useState(false);
    const { stateLogin, dispatch } = useContext(AuthContext);
    const tableEl = useRef();
    const [distanceBottom, setDistanceBottom] = useState(0);
    const [lastOffset, setLastOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [pendingFollowMap, setPendingFollowMap] = useState(new Map());

    const updatePendingFollowMap = (number, repo, organisation, follow) => {
        const keyObj = {
            number: number,
            repo: repo,
            organisation: organisation,
        };

        setPendingFollowMap(pendingFollowMap.set(keyObj, follow));
    }

    const deleteFromPendingFollowMap = (number, repo, organisation) => {
        const keyObj = {
            number: number,
            repo: repo,
            organisation: organisation,
        };

        if (pendingFollowMap.has(keyObj)) {
            setPendingFollowMap(pendingFollowMap.delete(keyObj));
        }
    }

    const getFromPendingFollowMap = (number, repo, organisation) => {
        let result = undefined;

        const keyObj = {
            number: number,
            repo: repo,
            organisation: organisation,
        };

        if (pendingFollowMap.has(keyObj)) {
            result = pendingFollowMap.get(keyObj);
        }

        return result;
    }

    const fetchData = useCallback(async () => {
        try {
            let response;
            const user = JSON.parse(localStorage.getItem("user"));
            const client = new Client();

            if (!search) {
                params.search = undefined;
            }
            else if (params.search != search) {
                params.search = search;
                params.offset = 0;

                setLastOffset(0);
                setDistanceBottom(0);
                setHasMore(true);
                setState({ loading: true });
            }

            if (user?.token) {
                response = await client.post_with_token('tab_issues', params, user.token);
            } else {
                response = await client.get('tab_issues', params);
            }

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
            setFetch(false);
            setIsUserNotFound(response.list.length === 0 && search);
            setTableEmpty(response.list.length === 0 && !search);

        } catch (error) {
            dispatch({
                type: "LOGOUT"
            });
            setUpdate(true);
            setFetch(true);
        }
    }, [params, search]);

    useEffect(() => {
        if (fetch || search) {
            fetchData();
        }
        setUpdate(false);
    }, [update, fetch, params, search, fetchData]);

    const starOnChange = (e) => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (user?.token) {
            let index = e.target.id;
            let params = {
                number: data[index].number,
                repo: data[index].repo,
                organisation: data[index].organisation,
                follow: e.target.checked,
            }

            data[index] = { ...data[index], follow: e.target.checked };

            updatePendingFollowMap(params.number, params.repo, params.organisation, params.follow);

            setUpdate(true);

            const client = new Client();
            client.post_with_token('follow', params, user.token).then((result) => {
                deleteFromPendingFollowMap(params.number, params.repo, params.organisation);
                if (result?.success !== true) {
                    setFetch(true);
                }
            });
        }
    }

    const paramsCallback = (new_params) => {
        setState({ loading: true });
        setData([]);
        setFetch(true);
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

            setFetch(true);
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

                    <IssuesHead paramsCallback={paramsCallback} />

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
                            {data.map((row, index) => {
                                const id = faker.datatype.uuid();
                                const {
                                    assignees,
                                    avatar_url,
                                    dev_name,
                                    html_url,
                                    number,
                                    state,
                                    organisation,
                                    repo,
                                    title,
                                    follow,
                                    updated_at } = row;
                                return (
                                    <TableRow
                                        hover
                                        key={id}
                                        tabIndex={-1}
                                    >
                                        <TableCell
                                            component="th"
                                            padding="checkbox"
                                        >
                                            {stateLogin.isLoggedIn && (
                                                <Checkbox
                                                    id={index}
                                                    repo={repo}
                                                    checked={getFromPendingFollowMap(number, repo, organisation) ? getFromPendingFollowMap(number, repo, organisation) : follow}
                                                    icon={<img src={steaGol} alt='steaGol' />}
                                                    checkedIcon={<img src={steaPlin} alt='steaPlin' />}
                                                    onChange={(e) => starOnChange(e)}
                                                    className={classes.stea}
                                                />
                                            )}
                                            {!stateLogin.isLoggedIn && (
                                                <SteaLoggedOut stateLogin={stateLogin} />
                                            )}
                                        </TableCell>

                                        <TableCell
                                            align="left"
                                            component="th"
                                            scope="row"
                                            padding="none"
                                            sx={{
                                                height: '5rem',
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
                                                    {`#${number}`}
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
                                                sx={{
                                                    maxWidth: { xl: '18rem', lg: '10rem' },
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                }}
                                            >
                                                <Link
                                                    target="_blank"
                                                    rel="noopener"
                                                    href={html_url}
                                                    color="inherit"
                                                    underline="none"
                                                >
                                                    {title.indexOf('\n') > 0 ? title?.substring(0, title.indexOf('\n')) : title}
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
                                                sx={{
                                                    maxWidth: { xl: '18rem', lg: '10rem' },
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                }}
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

                                            {assignees ? JSON.parse(assignees).map((item, index) => {
                                                const dev_name = item[0];
                                                const avatar_url = item[1];
                                                if (index === 3) {
                                                    return (
                                                        <span key={index}>...</span>
                                                    );
                                                }
                                                if (index < 3) {
                                                    return (
                                                        <Tooltip
                                                            key={index}
                                                            title={dev_name}
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
                                                                    src={avatar_url}
                                                                    sx={{ width: 30, height: 30, borderRadius: 1.5 }}
                                                                    style={{
                                                                        marginRight: '1rem'
                                                                    }}
                                                                />
                                                            </Link>
                                                        </Tooltip>
                                                    );
                                                }
                                                else {
                                                    return (<></>)
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

                                            {state === 'closed' ?
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