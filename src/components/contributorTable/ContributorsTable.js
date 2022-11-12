import React, { useState, useEffect } from 'react';
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

export default function ContributorsTable({ search }) {

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
            const client = new Client();

            params.search = search;

            response = await client.get('tab_contributors', params);
  
            setData(response.list);
            setState({ loading: false });
            setIsUserNotFound(response.list.length === 0 && search);
            setTableEmpty(response.list.length === 0 && !search);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
        setFollowEvent(false);
    }, [params, followEvent, search]);

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


                    {isUserNotFound && !tableEmpty && !search && !state.loading && (
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