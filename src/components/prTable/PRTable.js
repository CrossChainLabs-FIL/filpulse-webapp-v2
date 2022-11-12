import React, { useState, useEffect } from 'react';
import { faker } from '@faker-js/faker';
// @mui
import { makeStyles } from '@mui/styles';

import { Client } from '../../utils/client';

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
    Stack,
    CircularProgress
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
        maxWidth: "32em",
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
    //data,
    //state,
    handleMenuFilter,
    handleSortChange,
    clearFilter,
    globalFilter
}) {

    const classes = useStyles();

    const [data, setData] = useState([]);
    const [state, setState] = useState({
        loading: true
    });

    const [followEvent, setFollowEvent] = useState(false);

    const isUserNotFound = data.length === 0 && !isSearchEmpty;
    const tableEmpty = data.length === 0 && isSearchEmpty;

    

    const fetchData = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const client = new Client();

            let params = {
                repo: 'venus',
                organisation: 'filecoin-project',
                status: 'closed',
                sortBy: 'updated_at',
                sortType: 'asc',
            }

            let response;

            if (user?.token) {
                response = await client.post_with_token('tab_prs', params, user.token);
            } else {
                response = await client.get('tab_prs', params);
            }
;
            setData(response.list);
            setState({
                loading: false,
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        console.log('useEffect');
        console.log(followEvent);
        fetchData();
        setFollowEvent(false);
    }, [followEvent]);



    // Similar to componentDidMount and componentDidUpdate:
    /*useEffect(() => {
      // Update the document title using the browser API
      //fetchData();
      console.log(follow);
      //setFollow(null);
    });*/
    

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
        client.post_with_token('follow', params, user.token).then((pr_data) => {
            setFollowEvent(true);
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

                    <PRHead
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
                                const { number,
                                    title,
                                    repo,
                                    organisation,
                                    html_url,
                                    state,
                                    avatar_url,
                                    dev_name,
                                    follow,
                                    updated_at } = row;

                                return (
                                    <TableRow
                                        hover
                                        key={id}
                                        tabIndex={-1}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                id={index}
                                                checked={follow}
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
                                                    underline="none"
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