import React, { useState, useEffect, useCallback, useRef, useLayoutEffect, useContext } from 'react';
// @mui
import { makeStyles } from '@mui/styles';

import { Client } from '../../utils/client';

import {
    Checkbox,
    CardHeader,
    Table,
    TableRow,
    TableBody,
    TableCell,
    Typography,
    TableContainer,
    Link,
    Badge,
    Stack,
    Tooltip,
    Box,
    CircularProgress,
    IconButton
} from '@mui/material';

// components
import SearchNotFound from '../SearchNotFound';
import TableEmpty from '../TableEmpty';
import WatchlistHead from './WatchlistHead';
import SessionExpired from '../SessionExpired';
import { AuthContext } from "../../App";

// assets
import steaPlin from '../../assets/steaPlin.svg';
import steaGol from '../../assets/steaGol.svg';
import comment from '../../assets/comment.svg';
import PRClosed from '../../assets/PRClosed.svg';
import PROpen from '../../assets/PROpen.svg';
import IssuesOpen from '../../assets/IssuesOpen.svg';
import IssuesClosed from '../../assets/IssuesClosed.svg';

import { fToNow } from '../../utils/format';


const useStyles = makeStyles(() => ({
    table: {
        maxHeight: '40rem',
    },
    customBadge: {
        backgroundColor: "#F05B47",
        color: "white"
    },
    stea: {
        marginLeft: '0.15rem'
    },
}));

export default function WatchlistTable({ search }) {
    const classes = useStyles();
    const [data, setData] = useState([]);
    const [state, setState] = useState({ loading: true });
    const [params, setParams] = useState({});
    const [fetch, setFetch] = useState(false);
    const [isUserNotFound, setIsUserNotFound] = useState(false);
    const [tableEmpty, setTableEmpty] = useState(false);
    const tableEl = useRef();
    const [distanceBottom, setDistanceBottom] = useState(0);
    const [lastOffset, setLastOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const { stateLogin, dispatch } = useContext(AuthContext);
    const [open, setOpen] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            let response;
            const user = JSON.parse(localStorage.getItem("user"));
            const client = new Client();

            if (!search) {
                params.search = undefined;
            }
            else if (params.search !== search) {
                params.search = search;
                params.offset = 0;

                setLastOffset(0);
                setDistanceBottom(0);
                setHasMore(true);
                setState({ loading: true });
            }

            if (user?.token) {
                response = await client.post_with_token('tab_watchlist', params, user.token);

                if (response.list?.length < 20) {
                    setHasMore(false);
                }

                if (params?.offset > lastOffset) {
                    setData([...data, ...response.list]);
                    setLastOffset(params?.offset);
                } else if (lastOffset === 0) {
                    setData(response.list);
                }

                setState({ loading: false });
                setIsUserNotFound(response.list.length === 0 && search);
                setTableEmpty(response.list.length === 0 && !search);
            }

            setFetch(false);

        } catch (error) {
            dispatch({
                type: "LOGOUT"
            });
            setFetch(true);
        }
    }, [params, search]);

    useEffect(() => {
        fetchData();
    }, [params, fetch, search, fetchData]);


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

            setState({ loading: true });

            const client = new Client();
            client.post_with_token('follow', params, user.token).then(() => {
                setFetch(true);
            });
        }
    }

    const viewComments = (index) => {
        if (parseInt(data[index].new_comments) > 0) {
            const user = JSON.parse(localStorage.getItem("user"));

            let params = {
                number: data[index].number,
                repo: data[index].repo,
                organisation: data[index].organisation,
            }

            const client = new Client();
            client.post_with_token('view_comments', params, user.token).then(() => {
                setFetch(true);
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
            <SessionExpired stateLogin={stateLogin} open={open} setOpen={setOpen} />
            <TableContainer
                sx={{
                    minWidth: 800,
                }}
                className={classes.table}
                ref={tableEl}
            >
                <Table stickyHeader>

                    <WatchlistHead paramsCallback={paramsCallback} />

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
                                const {
                                    number,
                                    title,
                                    html_url,
                                    dev_name,
                                    is_pr,
                                    state,
                                    participants,
                                    comments,
                                    new_comments,
                                    created_at,
                                    updated_at,
                                } = row;
                                let merged = 0;

                                if (!is_pr) {
                                    merged = 2;
                                }
                                if (state === 'open') {
                                    merged++;
                                }
                                return (
                                    <TableRow
                                        hover
                                        key={index}
                                        tabIndex={-1}
                                    >
                                        <TableCell
                                            component="th"
                                            padding="checkbox"
                                        >
                                            <Checkbox
                                                id={index}
                                                icon={<img src={steaGol} alt='steaGol' />}
                                                checkedIcon={<img src={steaPlin} alt='steaPlin' />}
                                                checked={true}
                                                onClick={(e) => starOnChange(e)}
                                                className={classes.stea}
                                            />
                                        </TableCell>

                                        <TableCell
                                            align="left"
                                            component="th"
                                            scope="row"
                                            padding="none"
                                            sx={{ height: '6rem' }}
                                        >
                                            <Typography
                                                variant="subtitle2"
                                                noWrap
                                            >
                                                <Link
                                                    target="_blank"
                                                    rel="noopener"
                                                    href={html_url}
                                                    color="inherit"
                                                    underline='none'
                                                >
                                                    {number}
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
                                                        sx={{
                                                            lineHeight: '1rem',
                                                            marginTop: '0.45rem',
                                                            maxWidth: '12rem',
                                                            whiteSpace: 'nowrap',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                        }}
                                                    >
                                                        {title.indexOf('\n') > 0 ? title?.substring(0, title.indexOf('\n')) : title}
                                                    </Typography>
                                                }
                                                subheader={
                                                    <>   {"opened " + fToNow(created_at) + " by "}
                                                        < Link
                                                            target="_blank"
                                                            rel="noopener"
                                                            href={"https://github.com/" + dev_name}
                                                            color="inherit"
                                                        >
                                                            {dev_name}
                                                        </Link>
                                                    </>
                                                }
                                            />

                                        </TableCell>

                                        <TableCell
                                            align="left"
                                            component="th"
                                            scope="row"
                                            padding="none"
                                        >
                                            {participants ? JSON.parse(participants).map((item, index) => {
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
                                                            title={dev_name}
                                                            placement="bottom-end"
                                                            arrow
                                                            key={index}
                                                        >
                                                            <Link
                                                                target="_blank"
                                                                rel="noopener"
                                                                href={"https://github.com/" + dev_name}
                                                            >
                                                                <Box
                                                                    component="img"
                                                                    src={avatar_url}
                                                                    sx={{
                                                                        width: 30,
                                                                        height: 30,
                                                                        borderRadius: 1.5,
                                                                        marginRight: '1rem'
                                                                    }}
                                                                />
                                                            </Link>
                                                        </Tooltip>
                                                    );
                                                }
                                                else {
                                                    return (<></>);
                                                }
                                            }) : ''}
                                        </TableCell>

                                        <TableCell
                                            align="left"
                                            component="th"
                                            scope="row"
                                            padding="none"
                                        >

                                            {merged === 0 && (<img src={PRClosed} alt="prclosed" />)}
                                            {merged === 1 && (<img src={PROpen} alt="propen" />)}
                                            {merged === 2 && (<img src={IssuesClosed} alt="issuesclosed" />)}
                                            {merged === 3 && (<img src={IssuesOpen} alt="issuesopen" />)}
                                        </TableCell>

                                        <TableCell
                                            align="left"
                                            component="th"
                                            scope="row"
                                            padding="none"
                                        >
                                            < Link
                                                target="_blank"
                                                rel="noopener"
                                                color="inherit"
                                                underline='none'
                                            >

                                                {comments ? (
                                                    <IconButton
                                                        id={index}
                                                        onClick={() => viewComments(index)}
                                                        sx={{
                                                            padding: 0,
                                                            marginLeft: '1.1rem'
                                                        }}
                                                        disableRipple
                                                    >
                                                        <Link
                                                            target="_blank"
                                                            rel="noopener"
                                                            href={html_url}
                                                            color="inherit"
                                                            underline='none'
                                                        >
                                                            <Stack
                                                                direction="row"
                                                                alignItems="center"
                                                            >
                                                                <Badge badgeContent={Number(new_comments)}
                                                                    anchorOrigin={{
                                                                        vertical: 'top',
                                                                        horizontal: 'left',
                                                                    }}
                                                                    classes={{ badge: classes.customBadge }}
                                                                    sx={{
                                                                        marginLeft: '0.25rem',
                                                                        marginRight: '0.25rem',
                                                                    }}
                                                                >
                                                                    <img src={comment} alt='comment' />
                                                                </Badge>
                                                                <Typography variant="subtitle2" noWrap >
                                                                    {comments ? comments : ''}
                                                                </Typography>
                                                            </Stack>
                                                        </Link>
                                                    </IconButton>) : ''}

                                            </Link>
                                        </TableCell>

                                        <TableCell
                                            align="left"
                                            component="th"
                                            scope="row"
                                            padding="none"
                                        >
                                            <Typography variant="subtitle2" noWrap>
                                                {fToNow(updated_at)}
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