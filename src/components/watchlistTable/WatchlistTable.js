import React, { useState, useEffect } from 'react';
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
    Box
} from '@mui/material';

// components
import SearchNotFound from '../SearchNotFound';
import TableEmpty from '../TableEmpty';
import WatchlistHead from './WatchlistHead';

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
        maxHeight: "40em",
    },
    customBadge: {
        backgroundColor: "#F05B47",
        color: "white"
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

export default function WatchlistTable({ search }) {
    const classes = useStyles();
    const [data, setData] = useState([]);
    const [state, setState] = useState({ loading: true });
    const [params, setParams] = useState({});
    const [followEvent, setFollowEvent] = useState(false);
    const [isUserNotFound, setIsUserNotFound] = useState(false);
    const [tableEmpty, setTableEmpty] = useState(false);

    const fetchData = async () => {
        try {
            let response;
            const user = JSON.parse(localStorage.getItem("user"));
            const client = new Client();

            params.search = search;

            if (user?.token) {
                response = await client.post_with_token('tab_watchlist', params, user.token);
                setData(response.list);
                setState({ loading: false });
                setIsUserNotFound(response.list.length === 0 && search);
                setTableEmpty(response.list.length === 0 && !search);
            } 

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
        setFollowEvent(false);
    }, [params, followEvent, search]);


    const starOnChange = (e) => {
        const user = JSON.parse(localStorage.getItem("user"));

        let index = e.target.id;
        let params = {
            number: data[index].number,
            repo: data[index].repo,
            organisation: data[index].organisation,
            follow: e.target.checked,
        }

        const client = new Client();
        client.post_with_token('follow', params, user.token).then(() => {
            setFollowEvent(true);
        });
    }

    const paramsCallback = (new_params) => {
        setParams({
            ...params,
            ...new_params,
        });
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

                    <WatchlistHead paramsCallback={paramsCallback} />

                    <TableBody>
                        {data.map((row, idx) => {
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
                            if (state == 'open') {
                                merged++;
                            }
                            return (
                                <TableRow
                                    hover
                                    key={idx}
                                    tabIndex={-1}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            icon={<img src={steaGol} alt='steaGol' />}
                                            checkedIcon={<img src={steaPlin} alt='steaPlin' />}
                                            checked={true}
                                            className={classes.stea}
                                        />
                                    </TableCell>

                                    <TableCell
                                        align="left"
                                        component="th"
                                        scope="row"
                                        padding="none"
                                        style={{ height: '6em' }}
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
                                            let dev_name = item[0];
                                            let avatar_url = item[1];
                                            let overflow = false;
                                            if (index >= 3 && overflow === false) {
                                                overflow = true;
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
                                                                sx={{ width: 30, height: 30, borderRadius: 1.5 }}
                                                                style={{
                                                                    marginRight: '1em'
                                                                }}
                                                            />
                                                        </Link>
                                                    </Tooltip>
                                                );
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
                                                <Stack
                                                    direction="row"
                                                    alignItems="center"
                                                    style={{
                                                        marginLeft: '2.1em'
                                                    }}
                                                >
                                                    <Badge badgeContent={Number(new_comments)}
                                                        // color='primary'
                                                        anchorOrigin={{
                                                            vertical: 'top',
                                                            horizontal: 'left',
                                                        }}
                                                        classes={{ badge: classes.customBadge }}
                                                        style={{
                                                            marginLeft: '0.25em',
                                                            marginRight: '0.25em',
                                                        }}
                                                    >
                                                        <img src={comment} alt='comment' />
                                                    </Badge>
                                                    <Typography variant="subtitle2" noWrap >
                                                        {comments ? comments : ''}
                                                    </Typography>
                                                </Stack>) : ''}

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

                    {isUserNotFound && !tableEmpty && !search && (
                        <TableBody>
                            <TableRow>
                                <TableCell align="center" colSpan={11} sx={{ py: 3 }}>
                                    <SearchNotFound searchQuery={search} />
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