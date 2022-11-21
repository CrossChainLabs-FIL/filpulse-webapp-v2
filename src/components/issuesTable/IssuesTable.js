import React, { useState, useEffect, useCallback, useContext } from 'react';
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
    projectElipsis: {
        maxWidth: '25rem',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
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

    const fetchData = useCallback(async () => {
        try {
            let response;
            const user = JSON.parse(localStorage.getItem("user"));
            const client = new Client();

            if (!search) {
                params.search = undefined;
            }
            else {
                params.search = search;
            }

            if (user?.token) {
                response = await client.post_with_token('tab_issues', params, user.token);
            } else {
                response = await client.get('tab_issues', params);
            }

            setData(response.list);
            setState({ loading: false });
            setFetch(false);
            setIsUserNotFound(response.list.length === 0 && search);
            setTableEmpty(response.list.length === 0 && !search);

        } catch (error) {
            console.log(error);
        }
    }, [params, search]);

    useEffect(() => {
        if (fetch) {
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

            setUpdate(true);

            const client = new Client();
            client.post_with_token('follow', params, user.token).then((result) => {
                if (result?.success !== true) {
                    setFetch(true);
                }
            });
        }
    }

    const paramsCallback = (new_params) => {
        setFetch(true);
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
                                                    checked={follow}
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
                                            style={{
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
                                                className={classes.projectElipsis}
                                            >
                                                {title}
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