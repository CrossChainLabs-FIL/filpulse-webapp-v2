import { filter } from 'lodash';
import React, { useState, useEffect, useContext } from 'react';

// @mui
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';

import {
    Stack,
    Paper,
    Tabs,
    Tab,
    OutlinedInput,
    InputAdornment,
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
    Typography
} from '@mui/material';


// components
import Iconify from './Iconify';
import WatchlistTable from './watchlistTable/WatchlistTable';
import PRTable from './prTable/PRTable';
import CommitsTable from './commitsTable/CommitsTable';
import IssuesTable from './issuesTable/IssuesTable';
import ReleasesTable from './releasesTable/ReleasesTable';
import ContributorsTable from './contributorTable/ContributorsTable';
import { AuthContext } from "../App";


import { Client } from '../utils/client';


// mock
import WATCHLISTDATA from '../_mock/watchlistData';
import PRDATA from '../_mock/PRData';
import ISSUESDATA from '../_mock/issuesData';
import COMMITSDATA from '../_mock/commitsData';
import CONTRIBUTORSDATA from '../_mock/contributorsData';

// assets
import steaPlin from '../assets/steaPlin.svg';
import GithubLogo from '../assets/GithubLogo.svg';

const client = new Client();


function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}


const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
    height: 40,
    width: 250,
    marginBottom: 5,
    fontSize: 15,
    [theme.breakpoints.down('xl')]: {
        height: 35,
        width: 200,
    }
}));




const useStyles = makeStyles(() => ({
    table: {
        maxHeight: "40em",
    },
    stea: {
        // height: '1.2em',
        paddingBottom: '0.3em'
    },
    watchlistTab: {
        height: '3em',
        minHeight: '3em',
        minWidth: '8em',
        width: '8em',
        marginRight: '3em',
        marginTop: '1em',
        paddingBottom: 0
    },
    prTab: {
        height: '3em',
        minHeight: '3em',
        minWidth: '3em',
        width: '3em',
        marginRight: '3em',
        marginTop: '1em',
        paddingBottom: 0
    },
    issuesTab: {
        height: '3em',
        minHeight: '3em',
        minWidth: '4em',
        width: '4em',
        marginRight: '3em',
        marginTop: '1em',
        paddingBottom: 0
    },
    releasesTab: {
        height: '3em',
        minHeight: '3em',
        minWidth: '3em',
        width: '5em',
        marginRight: '3em',
        marginTop: '1em',
        paddingBottom: 0
    },
    commitsTab: {
        height: '3em',
        minHeight: '3em',
        minWidth: '4.5em',
        width: '4.5em',
        marginRight: '3em',
        marginTop: '1em',
        paddingBottom: 0
    },
    contributorsTab: {
        height: '3em',
        minHeight: '3em',
        minWidth: '7em',
        width: '7em',
        marginTop: '1em',
        paddingBottom: 0
    },
    button: {
        backgroundColor: 'transparent',
        color: '#000000',
        '&:hover': {
            backgroundColor: 'transparent',
            color: '#000000',
        },
    }
}));

const StyledTabs = styled((props) => (
    <Tabs
        {...props}
        TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
    />
))({
    '& .MuiTabs-indicator': {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    '& .MuiTabs-indicatorSpan': {
        maxWidth: 90,
        width: '100%',
        backgroundColor: '#0DBB52',
    },
});



const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
        textTransform: 'none',
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: theme.typography.pxToRem(15),
        marginRight: theme.spacing(3),
        color: "#000000",
        '&.Mui-selected': {
            color: '#000000',
        },
        // '&.Mui-focusVisible': {
        //     backgroundColor: 'rgba(100, 95, 228, 0.32)',
        // },
    }),
);

export default function TableApp() {
    const { stateLogin, dispatch } = useContext(AuthContext);

    const [dataError, setDataError] = useState({ errorMessage: "", isLoading: false });

    const { client_id, redirect_uri } = stateLogin;


    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const [order, setOrder] = useState('desc');

    const [data, setData] = useState([]);

    const [value, setValue] = useState(0);

    const [filterName, setFilterName] = useState('');

    const [isSearchEmpty, setIsSearchEmpty] = useState(true);

    const [filterLink, setFilterLink] = useState('');

    const user = JSON.parse(localStorage.getItem("user"));

    const [state, setState] = useState({
        loading: true, commits_data: [], contributors_data: [], pr_data: [], issues_data: [], releases_data: [], watchlist_data: []
    });


    const classes = useStyles();

    useEffect(() => {
        client.get('tab_prs').then((pr_data) => {
            setState({
                loading: false,
                pr_data: pr_data.list,
            });
            setOrder('desc');
            setData(pr_data.list);
        });

        setIsSearchEmpty(true);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setState]);

    const handleChange = (event, newValue) => {
        setState({
            loading: true
        });
        setValue(newValue);
        setFilterName('');
        setFilterLink('');
        setIsSearchEmpty(true);
        setData([]);

        const user = JSON.parse(localStorage.getItem("user"));

        switch (newValue) {
            case 0:
                if (user.token) {
                    client.post_with_token('tab_prs', { params: 0 }, user.token).then((pr_data) => {
                        setState({
                            loading: false,
                            pr_data: pr_data,
                        });
                        setOrder('desc');
                        setData(pr_data.list);
                    });
                } else {
                    client.get('tab_prs').then((pr_data) => {
                        setState({
                            loading: false,
                            pr_data: pr_data,
                        });
                        setOrder('desc');
                        setData(pr_data.list);
                    });
                }
                break;
            case 1:
                if (user.token) {
                    client.post_with_token('tab_issues', { params: 0 }, user.token).then((issues_data) => {
                        setState({
                            loading: false,
                            issues_data: issues_data,
                        });
                        setOrder('desc');
                        setData(issues_data.list);
                    });
                } else {
                    client.get('tab_issues').then((issues_data) => {
                        setState({
                            loading: false,
                            issues_data: issues_data,
                        });
                        setOrder('desc');
                        setData(issues_data.list);
                    });
                }
                break;
            case 2:
                client.get('tab_releases').then((releases_data) => {
                    setState({
                        loading: false,
                        releases_data: releases_data,
                    });
                    setOrder('desc');
                    setData(releases_data.list);
                });
                break;
            case 3:
                client.get('tab_commits').then((commits_data) => {
                    setState({
                        loading: false,
                        commits_data: commits_data,
                    });
                    setOrder('desc');
                    setData(commits_data.list);
                });
                break;
            case 4:
                client.get('tab_contributors').then((contributors_data) => {
                    setState({
                        loading: false,
                        contributors_data: contributors_data,
                    });
                    //setOrderBy('personName');
                    setOrder('asc');
                    setData(contributors_data.list);
                });
                break;
            case 5:
                if (user.token) {
                    client.post_with_token('tab_watchlist', { params: 0 }, user.token).then((watchlist_data) => {
                        setState({
                            loading: false,
                            watchlist_data: watchlist_data,
                        });
                        setData(watchlist_data.list);
                    });
                }
                break;
            default: console.log(newValue); break;
        }
    };

    const handleSort = () => {
        setData([]);
        setState({
            loading: true
        });
        switch (value) {
            case 0:
                if (filterLink === '') {
                    if (order === 'asc') {
                        setFilterLink('');
                        client.get('tab_prs').then((pr_data) => {
                            setState({
                                loading: false,
                                pr_data: pr_data,
                            });
                            setOrder('desc');
                            setData(pr_data.list);
                        });
                    }
                    else {
                        setFilterLink('?' + `sortBy=updated_at&sortType=asc`);
                        client.get('tab_prs' + '?' + `sortBy=updated_at&sortType=asc`).then((pr_data) => {
                            setState({
                                loading: false,
                                pr_data: pr_data,
                            });
                            setOrder('asc');
                            setData(pr_data.list);
                        });
                    }
                }
                else {
                    if (order === 'asc') {
                        if (filterLink.match(`&sortBy=updated_at&sortType=asc`) === null) {
                            if (filterLink.match(`sortBy=updated_at&sortType=asc&`) === null) {
                                setFilterLink('');
                                client.get('tab_prs').then((pr_data) => {
                                    setState({
                                        loading: false,
                                        pr_data: pr_data,
                                    });
                                    setOrder('desc');
                                    setData(pr_data.list);
                                });
                            } else {
                                setFilterLink(filterLink.replace(`sortBy=updated_at&sortType=asc&`, ''));
                                client.get('tab_prs' + filterLink.replace(`sortBy=updated_at&sortType=asc&`, '')).then((pr_data) => {
                                    setState({
                                        loading: false,
                                        pr_data: pr_data,
                                    });
                                    setOrder('desc');
                                    setData(pr_data.list);
                                });
                            }
                        } else {
                            setFilterLink(filterLink.replace(`&sortBy=updated_at&sortType=asc`, ''));
                            client.get('tab_prs' + filterLink.replace(`&sortBy=updated_at&sortType=asc`, '')).then((pr_data) => {
                                setState({
                                    loading: false,
                                    pr_data: pr_data,
                                });
                                setOrder('desc');
                                setData(pr_data.list);
                            });
                        }
                    }
                    else {
                        setFilterLink(filterLink + `&sortBy=updated_at&sortType=asc`);
                        client.get('tab_prs' + filterLink + `&sortBy=updated_at&sortType=asc`).then((pr_data) => {
                            setState({
                                loading: false,
                                pr_data: pr_data,
                            });
                            setOrder('asc');
                            setData(pr_data.list);
                        });
                    }
                }
                break;
            case 1:
                if (filterLink === '') {
                    if (order === 'asc') {
                        setFilterLink('');
                        client.get('tab_issues').then((issues_data) => {
                            setState({
                                loading: false,
                                issues_data: issues_data,
                            });
                            setOrder('desc');
                            setData(issues_data.list);
                        });
                    }
                    else {
                        setFilterLink('?' + `sortBy=updated_at&sortType=asc`);
                        client.get('tab_issues' + '?' + `sortBy=updated_at&sortType=asc`).then((issues_data) => {
                            setState({
                                loading: false,
                                issues_data: issues_data,
                            });
                            setOrder('asc');
                            setData(issues_data.list);
                        });
                    }
                }
                else {
                    if (order === 'asc') {
                        if (filterLink.match(`&sortBy=updated_at&sortType=asc`) === null) {
                            if (filterLink.match(`sortBy=updated_at&sortType=asc&`) === null) {
                                setFilterLink('');
                                client.get('tab_issues').then((issues_data) => {
                                    setState({
                                        loading: false,
                                        issues_data: issues_data,
                                    });
                                    setOrder('desc');
                                    setData(issues_data.list);
                                });
                            } else {
                                setFilterLink(filterLink.replace(`sortBy=updated_at&sortType=asc&`, ''));
                                client.get('tab_issues' + filterLink.replace(`sortBy=updated_at&sortType=asc&`, '')).then((issues_data) => {
                                    setState({
                                        loading: false,
                                        issues_data: issues_data,
                                    });
                                    setOrder('desc');
                                    setData(issues_data.list);
                                });
                            }
                        } else {
                            setFilterLink(filterLink.replace(`&sortBy=updated_at&sortType=asc`, ''));
                            client.get('tab_issues' + filterLink.replace(`&sortBy=updated_at&sortType=asc`, '')).then((issues_data) => {
                                setState({
                                    loading: false,
                                    issues_data: issues_data,
                                });
                                setOrder('desc');
                                setData(issues_data.list);
                            });
                        }
                    }
                    else {
                        setFilterLink(filterLink + `&sortBy=updated_at&sortType=asc`);
                        client.get('tab_issues' + filterLink + `&sortBy=updated_at&sortType=asc`).then((issues_data) => {
                            setState({
                                loading: false,
                                issues_data: issues_data,
                            });
                            setOrder('asc');
                            setData(issues_data.list);
                        });
                    }
                }
                break;
            case 2:
                if (filterLink === '') {
                    if (order === 'asc') {
                        setFilterLink('');
                        client.get('tab_releases').then((releases_data) => {
                            setState({
                                loading: false,
                                releases_data: releases_data,
                            });
                            setOrder('desc');
                            setData(releases_data.list);
                        });
                    }
                    else {
                        setFilterLink('?' + `sortBy=updated_at&sortType=asc`);
                        client.get('tab_releases' + '?' + `sortBy=updated_at&sortType=asc`).then((releases_data) => {
                            setState({
                                loading: false,
                                releases_data: releases_data,
                            });
                            setOrder('asc');
                            setData(releases_data.list);
                        });
                    }
                }
                else {
                    if (order === 'asc') {
                        if (filterLink.match(`&sortBy=updated_at&sortType=asc`) === null) {
                            if (filterLink.match(`sortBy=updated_at&sortType=asc&`) === null) {
                                setFilterLink('');
                                client.get('tab_releases').then((releases_data) => {
                                    setState({
                                        loading: false,
                                        releases_data: releases_data,
                                    });
                                    setOrder('desc');
                                    setData(releases_data.list);
                                });
                            } else {
                                setFilterLink(filterLink.replace(`sortBy=updated_at&sortType=asc&`, ''));
                                client.get('tab_releases' + filterLink.replace(`sortBy=updated_at&sortType=asc&`, '')).then((releases_data) => {
                                    setState({
                                        loading: false,
                                        releases_data: releases_data,
                                    });
                                    setOrder('desc');
                                    setData(releases_data.list);
                                });
                            }
                        } else {
                            setFilterLink(filterLink.replace(`&sortBy=updated_at&sortType=asc`, ''));
                            client.get('tab_releases' + filterLink.replace(`&sortBy=updated_at&sortType=asc`, '')).then((releases_data) => {
                                setState({
                                    loading: false,
                                    releases_data: releases_data,
                                });
                                setOrder('desc');
                                setData(releases_data.list);
                            });
                        }
                    }
                    else {
                        setFilterLink(filterLink + `&sortBy=updated_at&sortType=asc`);
                        client.get('tab_releases' + filterLink + `&sortBy=updated_at&sortType=asc`).then((releases_data) => {
                            setState({
                                loading: false,
                                releases_data: releases_data,
                            });
                            setOrder('asc');
                            setData(releases_data.list);
                        });
                    }
                }
                break;
            case 3:
                if (order === 'asc') {
                    client.get(`tab_commits?sortBy=commit_date&sortType=desc`).then((commits_data) => {
                        setState({
                            loading: false,
                            commits_data: commits_data,
                        });
                        setData(commits_data.list);
                        setOrder('desc');
                    });
                }
                else {
                    client.get(`tab_commits?sortBy=commit_date&sortType=asc`).then((commits_data) => {
                        setState({
                            loading: false,
                            commits_data: commits_data,
                        });
                        setData(commits_data.list);
                        setOrder('asc');
                    });
                }
                break;
            default: console.log(value); break;
        }
    }

    function handleMenuFilter(link_value) {
        setData([]);
        setState({
            loading: true
        });
        switch (value) {
            case 0:
                client.get(`tab_prs?${link_value}`).then((pr_data) => {
                    setState({
                        loading: false,
                        pr_data: pr_data,
                    });
                    setData(pr_data.list);
                    setFilterName("");
                });
                break;
            case 1:
                client.get(`tab_issues?${link_value}`).then((issues_data) => {
                    setState({
                        loading: false,
                        issues_data: issues_data,
                    });
                    setData(issues_data.list);
                    setFilterName("");
                });
                break;
            case 2:
                client.get(`tab_releases?${link_value}`).then((releases_data) => {
                    setState({
                        loading: false,
                        releases_data: releases_data,
                    });
                    setData(releases_data.list);
                    setFilterName("");
                });
                break;
            case 3:
                client.get(`tab_commits?${link_value}`).then((commits_data) => {
                    setState({
                        loading: false,
                        commits_data: commits_data,
                    });
                    setData(commits_data.list);
                    setFilterName("");
                });
                break;
            case 4:
                client.get(`tab_contributors?${link_value}`).then((contributors_data) => {
                    setState({
                        loading: false,
                        contributors_data: contributors_data,
                    });
                    setData(contributors_data.list);
                    setFilterName("");
                });
                break;
            case 5:
                const user = JSON.parse(localStorage.getItem("user"));
                client.post_with_token('tab_watchlist', { params: 0 }, user.token).then((watchlist_data) => {
                    setState({
                        loading: false,
                        watchlist_data: watchlist_data,
                    });
                    setData(watchlist_data.list);
                });
                break;
            default: console.log(value); break;
        }
    }

    const clearFilter = (toBeCleared, last, toBeCleared2, last2) => {
        setData([]);
        setState({
            loading: true
        });
        switch (value) {
            case 0:
                if (filterLink.match('&' + toBeCleared + last) === null) {
                    if (toBeCleared2 !== undefined) {
                        if (filterLink.match(toBeCleared2 + last2 + '&') === null) {
                            setFilterLink('');
                            client.get('tab_prs').then((pr_data) => {
                                setState({
                                    loading: false,
                                    pr_data: pr_data,
                                });
                                setData(pr_data.list);
                            });
                        }
                        else {
                            setFilterLink(filterLink.replace(toBeCleared + last + '&' + toBeCleared2 + last2 + '&', ''));
                            client.get('tab_prs' + filterLink.replace(toBeCleared + last + '&' + toBeCleared2 + last2 + '&', '')).then((pr_data) => {
                                setState({
                                    loading: false,
                                    pr_data: pr_data,
                                });
                                setData(pr_data.list);
                            });
                        }
                    }
                    else if (filterLink.match(toBeCleared + last + '&') === null) {
                        setFilterLink('');
                        client.get('tab_prs').then((pr_data) => {
                            setState({
                                loading: false,
                                pr_data: pr_data,
                            });
                            setData(pr_data.list);
                        });
                    }
                    else {
                        setFilterLink(filterLink.replace(toBeCleared + last + '&', ''));
                        client.get('tab_prs' + filterLink.replace(toBeCleared + last + '&', '')).then((pr_data) => {
                            setState({
                                loading: false,
                                pr_data: pr_data,
                            });
                            setData(pr_data.list);
                        });
                    }
                } else {
                    if (toBeCleared2 !== undefined) {
                        setFilterLink(filterLink.replace('&' + toBeCleared + last + '&' + toBeCleared2 + last2, ''));
                        client.get('tab_prs' + filterLink.replace('&' + toBeCleared + last + '&' + toBeCleared2 + last2, '')).then((pr_data) => {
                            setState({
                                loading: false,
                                pr_data: pr_data,
                            });
                            setData(pr_data.list);
                        });
                    } else {
                        setFilterLink(filterLink.replace('&' + toBeCleared + last, ''));
                        client.get('tab_prs' + filterLink.replace('&' + toBeCleared + last, '')).then((pr_data) => {
                            setState({
                                loading: false,
                                pr_data: pr_data,
                            });
                            setData(pr_data.list);
                        });
                    }
                }
                break;
            case 1:
                if (filterLink.match('&' + toBeCleared + last) === null) {
                    if (toBeCleared2 !== undefined) {
                        if (filterLink.match(toBeCleared2 + last2 + '&') === null) {
                            setFilterLink('');
                            client.get('tab_issues').then((issues_data) => {
                                setState({
                                    loading: false,
                                    issues_data: issues_data,
                                });
                                setData(issues_data.list);
                            });
                        }
                        else {
                            setFilterLink(filterLink.replace(toBeCleared + last + '&' + toBeCleared2 + last2 + '&', ''));
                            client.get('tab_issues' + filterLink.replace(toBeCleared + last + '&' + toBeCleared2 + last2 + '&', '')).then((issues_data) => {
                                setState({
                                    loading: false,
                                    issues_data: issues_data,
                                });
                                setData(issues_data.list);
                            });
                        }
                    }
                    else if (filterLink.match(toBeCleared + last + '&') === null) {
                        setFilterLink('');
                        client.get('tab_issues').then((issues_data) => {
                            setState({
                                loading: false,
                                issues_data: issues_data,
                            });
                            setData(issues_data.list);
                        });
                    }
                    else {
                        setFilterLink(filterLink.replace(toBeCleared + last + '&', ''));
                        client.get('tab_issues' + filterLink.replace(toBeCleared + last + '&', '')).then((issues_data) => {
                            setState({
                                loading: false,
                                issues_data: issues_data,
                            });
                            setData(issues_data.list);
                        });
                    }
                } else {
                    if (toBeCleared2 !== undefined) {
                        setFilterLink(filterLink.replace('&' + toBeCleared + last + '&' + toBeCleared2 + last2, ''));
                        client.get('tab_issues' + filterLink.replace('&' + toBeCleared + last + '&' + toBeCleared2 + last2, '')).then((issues_data) => {
                            setState({
                                loading: false,
                                issues_data: issues_data,
                            });
                            setData(issues_data.list);
                        });
                    } else {
                        setFilterLink(filterLink.replace('&' + toBeCleared + last, ''));
                        client.get('tab_issues' + filterLink.replace('&' + toBeCleared + last, '')).then((issues_data) => {
                            setState({
                                loading: false,
                                issues_data: issues_data,
                            });
                            setData(issues_data.list);
                        });
                    }
                }
                break;
            case 2:
                if (filterLink.match('&' + toBeCleared + last) === null) {
                    if (toBeCleared2 !== undefined) {
                        if (filterLink.match(toBeCleared2 + last2 + '&') === null) {
                            setFilterLink('');
                            client.get('tab_releases').then((releases_data) => {
                                setState({
                                    loading: false,
                                    releases_data: releases_data,
                                });
                                setData(releases_data.list);
                            });
                        }
                        else {
                            setFilterLink(filterLink.replace(toBeCleared + last + '&' + toBeCleared2 + last2 + '&', ''));
                            client.get('tab_releases' + filterLink.replace(toBeCleared + last + '&' + toBeCleared2 + last2 + '&', '')).then((releases_data) => {
                                setState({
                                    loading: false,
                                    releases_data: releases_data,
                                });
                                setData(releases_data.list);
                            });
                        }
                    }
                    else if (filterLink.match(toBeCleared + last + '&') === null) {
                        setFilterLink('');
                        client.get('tab_releases').then((releases_data) => {
                            setState({
                                loading: false,
                                releases_data: releases_data,
                            });
                            setData(releases_data.list);
                        });
                    }
                    else {
                        setFilterLink(filterLink.replace(toBeCleared + last + '&', ''));
                        client.get('tab_releases' + filterLink.replace(toBeCleared + last + '&', '')).then((releases_data) => {
                            setState({
                                loading: false,
                                releases_data: releases_data,
                            });
                            setData(releases_data.list);
                        });
                    }
                } else {
                    if (toBeCleared2 !== undefined) {
                        setFilterLink(filterLink.replace('&' + toBeCleared + last + '&' + toBeCleared2 + last2, ''));
                        client.get('tab_releases' + filterLink.replace('&' + toBeCleared + last + '&' + toBeCleared2 + last2, '')).then((releases_data) => {
                            setState({
                                loading: false,
                                releases_data: releases_data,
                            });
                            setData(releases_data.list);
                        });
                    } else {
                        setFilterLink(filterLink.replace('&' + toBeCleared + last, ''));
                        client.get('tab_releases' + filterLink.replace('&' + toBeCleared + last, '')).then((releases_data) => {
                            setState({
                                loading: false,
                                releases_data: releases_data,
                            });
                            setData(releases_data.list);
                        });
                    }
                }
                break;
            case 3:
                if (filterLink.match('&' + toBeCleared + last) === null) {
                    if (toBeCleared2 !== undefined) {
                        if (filterLink.match(toBeCleared2 + last2 + '&') === null) {
                            setFilterLink('');
                            client.get('tab_commits').then((commits_data) => {
                                setState({
                                    loading: false,
                                    commits_data: commits_data,
                                });
                                setData(commits_data.list);
                            });
                        }
                        else {
                            setFilterLink(filterLink.replace(toBeCleared + last + '&' + toBeCleared2 + last2 + '&', ''));
                            client.get('tab_commits' + filterLink.replace(toBeCleared + last + '&' + toBeCleared2 + last2 + '&', '')).then((commits_data) => {
                                setState({
                                    loading: false,
                                    commits_data: commits_data,
                                });
                                setData(commits_data.list);
                            });
                        }
                    }
                    else if (filterLink.match(toBeCleared + last + '&') === null) {
                        setFilterLink('');
                        client.get('tab_commits').then((commits_data) => {
                            setState({
                                loading: false,
                                commits_data: commits_data,
                            });
                            setData(commits_data.list);
                        });
                    }
                    else {
                        setFilterLink(filterLink.replace(toBeCleared + last + '&', ''));
                        client.get('tab_commits' + filterLink.replace(toBeCleared + last + '&', '')).then((commits_data) => {
                            setState({
                                loading: false,
                                commits_data: commits_data,
                            });
                            setData(commits_data.list);
                        });
                    }
                } else {
                    if (toBeCleared2 !== undefined) {
                        setFilterLink(filterLink.replace('&' + toBeCleared + last + '&' + toBeCleared2 + last2, ''));
                        client.get('tab_commits' + filterLink.replace('&' + toBeCleared + last + '&' + toBeCleared2 + last2, '')).then((commits_data) => {
                            setState({
                                loading: false,
                                commits_data: commits_data,
                            });
                            setData(commits_data.list);
                        });
                    } else {
                        setFilterLink(filterLink.replace('&' + toBeCleared + last, ''));
                        client.get('tab_commits' + filterLink.replace('&' + toBeCleared + last, '')).then((commits_data) => {
                            setState({
                                loading: false,
                                commits_data: commits_data,
                            });
                            setData(commits_data.list);
                        });
                    }
                }
                break;
            case 4:
                if (filterLink.match('&' + toBeCleared + last) === null) {
                    if (toBeCleared2 !== undefined) {
                        if (filterLink.match(toBeCleared2 + last2 + '&') === null) {
                            setFilterLink('');
                            client.get('tab_contributors').then((contributors_data) => {
                                setState({
                                    loading: false,
                                    contributors_data: contributors_data,
                                });
                                setData(contributors_data.list);
                            });
                        }
                        else {
                            setFilterLink(filterLink.replace(toBeCleared + last + '&' + toBeCleared2 + last2 + '&', ''));
                            client.get('tab_contributors' + filterLink.replace(toBeCleared + last + '&' + toBeCleared2 + last2 + '&', '')).then((contributors_data) => {
                                setState({
                                    loading: false,
                                    contributors_data: contributors_data,
                                });
                                setData(contributors_data.list);
                            });
                        }
                    }
                    else if (filterLink.match(toBeCleared + last + '&') === null) {
                        setFilterLink('');
                        client.get('tab_contributors').then((contributors_data) => {
                            setState({
                                loading: false,
                                contributors_data: contributors_data,
                            });
                            setData(contributors_data.list);
                        });
                    }
                    else {
                        setFilterLink(filterLink.replace(toBeCleared + last + '&', ''));
                        client.get('tab_contributors' + filterLink.replace(toBeCleared + last + '&', '')).then((contributors_data) => {
                            setState({
                                loading: false,
                                contributors_data: contributors_data,
                            });
                            setData(contributors_data.list);
                        });
                    }
                } else {
                    if (toBeCleared2 !== undefined) {
                        setFilterLink(filterLink.replace('&' + toBeCleared + last + '&' + toBeCleared2 + last2, ''));
                        client.get('tab_contributors' + filterLink.replace('&' + toBeCleared + last + '&' + toBeCleared2 + last2, '')).then((contributors_data) => {
                            setState({
                                loading: false,
                                contributors_data: contributors_data,
                            });
                            setData(contributors_data.list);
                        });
                    } else {
                        setFilterLink(filterLink.replace('&' + toBeCleared + last, ''));
                        client.get('tab_contributors' + filterLink.replace('&' + toBeCleared + last, '')).then((contributors_data) => {
                            setState({
                                loading: false,
                                contributors_data: contributors_data,
                            });
                            setData(contributors_data.list);
                        });
                    }
                }
                break;
            case 5:
                const user = JSON.parse(localStorage.getItem("user"));
                client.post_with_token('tab_watchlist', { params: 0 }, user.token).then((watchlist_data) => {
                    setState({
                        loading: false,
                        watchlist_data: watchlist_data,
                    });
                    setData(watchlist_data.list);
                });
                break;
            default: console.log(value); break;
        }
    }

    const globalFilter = (addonValue, filterType, last, addonValue2, filterType2, last2) => {
        setData([]);
        setState({
            loading: true
        });
        switch (value) {
            case 0:
                if (filterLink === '') {
                    if (addonValue2 !== undefined) {
                        setFilterLink('?' + addonValue + '&' + addonValue2);
                        client.get('tab_prs' + '?' + addonValue + '&' + addonValue2).then((pr_data) => {
                            setState({
                                loading: false,
                                pr_data: pr_data,
                            });
                            setData(pr_data.list);
                        });
                    } else {
                        setFilterLink('?' + addonValue);
                        client.get('tab_prs' + '?' + addonValue).then((pr_data) => {
                            setState({
                                loading: false,
                                pr_data: pr_data,
                            });
                            setData(pr_data.list);
                        });
                    }
                }
                else {
                    if (filterLink.match(filterType) === null) {
                        if (addonValue2 !== undefined) {
                            setFilterLink(filterLink + '&' + addonValue + '&' + addonValue2);
                            client.get('tab_prs' + filterLink + '&' + addonValue + '&' + addonValue2).then((pr_data) => {
                                setState({
                                    loading: false,
                                    pr_data: pr_data,
                                });
                                setData(pr_data.list);
                            });
                        } else {
                            setFilterLink(filterLink + '&' + addonValue);
                            client.get('tab_prs' + filterLink + '&' + addonValue).then((pr_data) => {
                                setState({
                                    loading: false,
                                    pr_data: pr_data,
                                });
                                setData(pr_data.list);
                            });
                        }
                    } else if (last2 !== undefined) {
                        let aux = filterLink;
                        aux = aux.replace(filterType + last, addonValue);
                        aux = aux.replace(filterType2 + last2, addonValue2);
                        // setFilterLink(filterLink.replace(filterType + last, addonValue));
                        // setFilterLink(filterLink.replace(filterType2 + last2, addonValue2));
                        setFilterLink(aux);
                        client.get('tab_prs' + aux).then((pr_data) => {
                            setState({
                                loading: false,
                                pr_data: pr_data,
                            });
                            setData(pr_data.list);
                        });
                    }
                    else if (last !== '') {
                        setFilterLink(filterLink.replace(filterType + last, addonValue));
                        client.get('tab_prs' + filterLink.replace(filterType + last, addonValue)).then((pr_data) => {
                            setState({
                                loading: false,
                                pr_data: pr_data,
                            });
                            setData(pr_data.list);
                        });
                    }
                }
                break;
            case 1:
                if (filterLink === '') {
                    if (addonValue2 !== undefined) {
                        setFilterLink('?' + addonValue + '&' + addonValue2);
                        client.get('tab_issues' + '?' + addonValue + '&' + addonValue2).then((issues_data) => {
                            setState({
                                loading: false,
                                issues_data: issues_data,
                            });
                            setData(issues_data.list);
                        });
                    } else {
                        setFilterLink('?' + addonValue);
                        client.get('tab_issues' + '?' + addonValue).then((issues_data) => {
                            setState({
                                loading: false,
                                issues_data: issues_data,
                            });
                            setData(issues_data.list);
                        });
                    }
                }
                else {
                    if (filterLink.match(filterType) === null) {
                        if (addonValue2 !== undefined) {
                            setFilterLink(filterLink + '&' + addonValue + '&' + addonValue2);
                            client.get('tab_issues' + filterLink + '&' + addonValue + '&' + addonValue2).then((issues_data) => {
                                setState({
                                    loading: false,
                                    issues_data: issues_data,
                                });
                                setData(issues_data.list);
                            });
                        } else {
                            setFilterLink(filterLink + '&' + addonValue);
                            client.get('tab_issues' + filterLink + '&' + addonValue).then((issues_data) => {
                                setState({
                                    loading: false,
                                    issues_data: issues_data,
                                });
                                setData(issues_data.list);
                            });
                        }
                    } else if (last2 !== undefined) {
                        let aux = filterLink;
                        aux = aux.replace(filterType + last, addonValue);
                        aux = aux.replace(filterType2 + last2, addonValue2);
                        // setFilterLink(filterLink.replace(filterType + last, addonValue));
                        // setFilterLink(filterLink.replace(filterType2 + last2, addonValue2));
                        setFilterLink(aux);
                        client.get('tab_issues' + aux).then((issues_data) => {
                            setState({
                                loading: false,
                                issues_data: issues_data,
                            });
                            setData(issues_data.list);
                        });
                    }
                    else if (last !== '') {
                        setFilterLink(filterLink.replace(filterType + last, addonValue));
                        client.get('tab_issues' + filterLink.replace(filterType + last, addonValue)).then((issues_data) => {
                            setState({
                                loading: false,
                                issues_data: issues_data,
                            });
                            setData(issues_data.list);
                        });
                    }
                }
                break;
            case 2:
                if (filterLink === '') {
                    if (addonValue2 !== undefined) {
                        setFilterLink('?' + addonValue + '&' + addonValue2);
                        client.get('tab_releases' + '?' + addonValue + '&' + addonValue2).then((releases_data) => {
                            setState({
                                loading: false,
                                releases_data: releases_data,
                            });
                            setData(releases_data.list);
                        });
                    } else {
                        setFilterLink('?' + addonValue);
                        client.get('tab_releases' + '?' + addonValue).then((releases_data) => {
                            setState({
                                loading: false,
                                releases_data: releases_data,
                            });
                            setData(releases_data.list);
                        });
                    }
                }
                else {
                    if (filterLink.match(filterType) === null) {
                        if (addonValue2 !== undefined) {
                            setFilterLink(filterLink + '&' + addonValue + '&' + addonValue2);
                            client.get('tab_releases' + filterLink + '&' + addonValue + '&' + addonValue2).then((releases_data) => {
                                setState({
                                    loading: false,
                                    releases_data: releases_data,
                                });
                                setData(releases_data.list);
                            });
                        } else {
                            setFilterLink(filterLink + '&' + addonValue);
                            client.get('tab_releases' + filterLink + '&' + addonValue).then((releases_data) => {
                                setState({
                                    loading: false,
                                    releases_data: releases_data,
                                });
                                setData(releases_data.list);
                            });
                        }
                    } else if (last2 !== undefined) {
                        let aux = filterLink;
                        aux = aux.replace(filterType + last, addonValue);
                        aux = aux.replace(filterType2 + last2, addonValue2);
                        // setFilterLink(filterLink.replace(filterType + last, addonValue));
                        // setFilterLink(filterLink.replace(filterType2 + last2, addonValue2));
                        setFilterLink(aux);
                        client.get('tab_releases' + aux).then((releases_data) => {
                            setState({
                                loading: false,
                                releases_data: releases_data,
                            });
                            setData(releases_data.list);
                        });
                    }
                    else if (last !== '') {
                        setFilterLink(filterLink.replace(filterType + last, addonValue));
                        client.get('tab_releases' + filterLink.replace(filterType + last, addonValue)).then((releases_data) => {
                            setState({
                                loading: false,
                                releases_data: releases_data,
                            });
                            setData(releases_data.list);
                        });
                    }
                }
                break;
            case 3:
                if (filterLink === '') {
                    if (addonValue2 !== undefined) {
                        setFilterLink('?' + addonValue + '&' + addonValue2);
                        client.get('tab_commits' + '?' + addonValue + '&' + addonValue2).then((commits_data) => {
                            setState({
                                loading: false,
                                commits_data: commits_data,
                            });
                            setData(commits_data.list);
                        });
                    } else {
                        setFilterLink('?' + addonValue);
                        client.get('tab_commits' + '?' + addonValue).then((commits_data) => {
                            setState({
                                loading: false,
                                commits_data: commits_data,
                            });
                            setData(commits_data.list);
                        });
                    }
                }
                else {
                    if (filterLink.match(filterType) === null) {
                        if (addonValue2 !== undefined) {
                            setFilterLink(filterLink + '&' + addonValue + '&' + addonValue2);
                            client.get('tab_commits' + filterLink + '&' + addonValue + '&' + addonValue2).then((commits_data) => {
                                setState({
                                    loading: false,
                                    commits_data: commits_data,
                                });
                                setData(commits_data.list);
                            });
                        } else {
                            setFilterLink(filterLink + '&' + addonValue);
                            client.get('tab_commits' + filterLink + '&' + addonValue).then((commits_data) => {
                                setState({
                                    loading: false,
                                    commits_data: commits_data,
                                });
                                setData(commits_data.list);
                            });
                        }
                    } else if (last2 !== undefined) {
                        let aux = filterLink;
                        aux = aux.replace(filterType + last, addonValue);
                        aux = aux.replace(filterType2 + last2, addonValue2);
                        // setFilterLink(filterLink.replace(filterType + last, addonValue));
                        // setFilterLink(filterLink.replace(filterType2 + last2, addonValue2));
                        setFilterLink(aux);
                        client.get('tab_commits' + aux).then((commits_data) => {
                            setState({
                                loading: false,
                                commits_data: commits_data,
                            });
                            setData(commits_data.list);
                        });
                    }
                    else if (last !== '') {
                        setFilterLink(filterLink.replace(filterType + last, addonValue));
                        client.get('tab_commits' + filterLink.replace(filterType + last, addonValue)).then((commits_data) => {
                            setState({
                                loading: false,
                                commits_data: commits_data,
                            });
                            setData(commits_data.list);
                        });
                    }
                }
                break;
            case 4:
                if (filterLink === '') {
                    if (addonValue2 !== undefined) {
                        setFilterLink('?' + addonValue + '&' + addonValue2);
                        client.get('tab_contributors' + '?' + addonValue + '&' + addonValue2).then((contributors_data) => {
                            setState({
                                loading: false,
                                contributors_data: contributors_data,
                            });
                            setData(contributors_data.list);
                        });
                    } else {
                        setFilterLink('?' + addonValue);
                        client.get('tab_contributors' + '?' + addonValue).then((contributors_data) => {
                            setState({
                                loading: false,
                                contributors_data: contributors_data,
                            });
                            setData(contributors_data.list);
                        });
                    }
                }
                else {
                    if (filterLink.match(filterType) === null) {
                        if (addonValue2 !== undefined) {
                            setFilterLink(filterLink + '&' + addonValue + '&' + addonValue2);
                            client.get('tab_contributors' + filterLink + '&' + addonValue + '&' + addonValue2).then((contributors_data) => {
                                setState({
                                    loading: false,
                                    contributors_data: contributors_data,
                                });
                                setData(contributors_data.list);
                            });
                        } else {
                            setFilterLink(filterLink + '&' + addonValue);
                            client.get('tab_contributors' + filterLink + '&' + addonValue).then((contributors_data) => {
                                setState({
                                    loading: false,
                                    contributors_data: contributors_data,
                                });
                                setData(contributors_data.list);
                            });
                        }
                    } else if (last2 !== undefined) {
                        let aux = filterLink;
                        aux = aux.replace(filterType + last, addonValue);
                        aux = aux.replace(filterType2 + last2, addonValue2);
                        // setFilterLink(filterLink.replace(filterType + last, addonValue));
                        // setFilterLink(filterLink.replace(filterType2 + last2, addonValue2));
                        setFilterLink(aux);
                        client.get('tab_contributors' + aux).then((contributors_data) => {
                            setState({
                                loading: false,
                                contributors_data: contributors_data,
                            });
                            setData(contributors_data.list);
                        });
                    }
                    else if (last !== '') {
                        setFilterLink(filterLink.replace(filterType + last, addonValue));
                        client.get('tab_contributors' + filterLink.replace(filterType + last, addonValue)).then((contributors_data) => {
                            setState({
                                loading: false,
                                contributors_data: contributors_data,
                            });
                            setData(contributors_data.list);
                        });
                    }
                }
                break;
            case 5:
                const user = JSON.parse(localStorage.getItem("user"));
                client.post_with_token('tab_watchlist', { params: 0 }, user.token).then((watchlist_data) => {
                    setState({
                        loading: false,
                        watchlist_data: watchlist_data,
                    });
                    setData(watchlist_data.list);
                });
                break;
            default: console.log(value); break;
        }
    }

    const handleFilterByName = (event) => {
        setData([]);
        setState({
            loading: true
        });
        if (event.target.value !== '') {
            setIsSearchEmpty(false);
            switch (value) {
                case 0:
                    if (filterLink === '') {
                        setFilterLink('?' + `search=${event.target.value}`);
                        client.get('tab_prs' + '?' + `search=${event.target.value}`).then((pr_data) => {
                            setState({
                                loading: false,
                                pr_data: pr_data,
                            });
                            setData(pr_data.list);
                        });
                    }
                    else {
                        if (!isSearchEmpty) {
                            setFilterLink(filterLink.replace(`search=${filterName}`, `search=${event.target.value}`));
                            client.get('tab_prs' + filterLink.replace(`search=${filterName}`, `search=${event.target.value}`)).then((pr_data) => {
                                setState({
                                    loading: false,
                                    pr_data: pr_data,
                                });
                                setData(pr_data.list);
                            });
                            break;
                        }
                        setFilterLink(filterLink + '&' + `search=${event.target.value}`);
                        client.get('tab_prs' + filterLink + '&' + `search=${event.target.value}`).then((pr_data) => {
                            setState({
                                loading: false,
                                pr_data: pr_data,
                            });
                            setData(pr_data.list);
                        });
                    }
                    break;
                case 1:
                    if (filterLink === '') {
                        setFilterLink('?' + `search=${event.target.value}`);
                        client.get('tab_issues' + '?' + `search=${event.target.value}`).then((issues_data) => {
                            setState({
                                loading: false,
                                issues_data: issues_data,
                            });
                            setData(issues_data.list);
                        });
                    }
                    else {
                        if (!isSearchEmpty) {
                            setFilterLink(filterLink.replace(`search=${filterName}`, `search=${event.target.value}`));
                            client.get('tab_issues' + filterLink.replace(`search=${filterName}`, `search=${event.target.value}`)).then((issues_data) => {
                                setState({
                                    loading: false,
                                    issues_data: issues_data,
                                });
                                setData(issues_data.list);
                            });
                            break;
                        }
                        setFilterLink(filterLink + '&' + `search=${event.target.value}`);
                        client.get('tab_issues' + filterLink + '&' + `search=${event.target.value}`).then((issues_data) => {
                            setState({
                                loading: false,
                                issues_data: issues_data,
                            });
                            setData(issues_data.list);
                        });
                    }
                    break;
                case 2:
                    if (filterLink === '') {
                        setFilterLink('?' + `search=${event.target.value}`);
                        client.get('tab_releases' + '?' + `search=${event.target.value}`).then((releases_data) => {
                            setState({
                                loading: false,
                                releases_data: releases_data,
                            });
                            setData(releases_data.list);
                        });
                    }
                    else {
                        if (!isSearchEmpty) {
                            setFilterLink(filterLink.replace(`search=${filterName}`, `search=${event.target.value}`));
                            client.get('tab_releases' + filterLink.replace(`search=${filterName}`, `search=${event.target.value}`)).then((releases_data) => {
                                setState({
                                    loading: false,
                                    releases_data: releases_data,
                                });
                                setData(releases_data.list);
                            });
                            break;
                        }
                        setFilterLink(filterLink + '&' + `search=${event.target.value}`);
                        client.get('tab_releases' + filterLink + '&' + `search=${event.target.value}`).then((releases_data) => {
                            setState({
                                loading: false,
                                releases_data: releases_data,
                            });
                            setData(releases_data.list);
                        });
                    }
                    break;
                case 3:
                    if (filterLink === '') {
                        setFilterLink('?' + `search=${event.target.value}`);
                        client.get('tab_commits' + '?' + `search=${event.target.value}`).then((commits_data) => {
                            setState({
                                loading: false,
                                commits_data: commits_data,
                            });
                            setData(commits_data.list);
                        });
                    }
                    else {
                        if (!isSearchEmpty) {
                            setFilterLink(filterLink.replace(`search=${filterName}`, `search=${event.target.value}`));
                            client.get('tab_commits' + filterLink.replace(`search=${filterName}`, `search=${event.target.value}`)).then((commits_data) => {
                                setState({
                                    loading: false,
                                    commits_data: commits_data,
                                });
                                setData(commits_data.list);
                            });
                            break;
                        }
                        setFilterLink(filterLink + '&' + `search=${event.target.value}`);
                        client.get('tab_commits' + filterLink + '&' + `search=${event.target.value}`).then((commits_data) => {
                            setState({
                                loading: false,
                                commits_data: commits_data,
                            });
                            setData(commits_data.list);
                        });
                    }
                    break;
                case 4:
                    if (filterLink === '') {
                        setFilterLink('?' + `search=${event.target.value}`);
                        client.get('tab_contributors' + '?' + `search=${event.target.value}`).then((contributors_data) => {
                            setState({
                                loading: false,
                                contributors_data: contributors_data,
                            });
                            setData(contributors_data.list);
                        });
                    }
                    else {
                        if (!isSearchEmpty) {
                            setFilterLink(filterLink.replace(`search=${filterName}`, `search=${event.target.value}`));
                            client.get('tab_contributors' + filterLink.replace(`search=${filterName}`, `search=${event.target.value}`)).then((contributors_data) => {
                                setState({
                                    loading: false,
                                    contributors_data: contributors_data,
                                });
                                setData(contributors_data.list);
                            });
                            break;
                        }
                        setFilterLink(filterLink + '&' + `search=${event.target.value}`);
                        client.get('tab_contributors' + filterLink + '&' + `search=${event.target.value}`).then((contributors_data) => {
                            setState({
                                loading: false,
                                contributors_data: contributors_data,
                            });
                            setData(contributors_data.list);
                        });
                    }
                    break;
                case 5:
                    const user = JSON.parse(localStorage.getItem("user"));
                    client.post_with_token('tab_watchlist', { params: 0 }, user.token).then((watchlist_data) => {
                        setState({
                            loading: false,
                            watchlist_data: watchlist_data,
                        });
                        setData(watchlist_data.list);
                    });
                    break;
                default: console.log("def"); break;
            }

        }
        else {
            setIsSearchEmpty(true);
            let aux = filterLink;
            if (aux.match("&search=") !== null) {
                aux = aux.replace(`&search=${filterName}`, '');
            } else {
                aux = aux.replace(`?search=${filterName}`, '');
            }
            switch (value) {
                case 0:
                    setFilterLink(aux);
                    client.get('tab_prs' + aux).then((pr_data) => {
                        setState({
                            loading: false,
                            pr_data: pr_data,
                        });
                        setData(pr_data.list);
                    });
                    break;
                case 1:
                    setFilterLink(aux);
                    client.get('tab_issues' + aux).then((issues_data) => {
                        setState({
                            loading: false,
                            issues_data: issues_data,
                        });
                        setData(issues_data.list);
                    });
                    break;
                case 2:
                    setFilterLink(aux);
                    client.get('tab_releases' + aux).then((releases_data) => {
                        setState({
                            loading: false,
                            releases_data: releases_data,
                        });
                        setData(releases_data.list);
                    });
                    break;
                case 3:
                    setFilterLink(aux);
                    client.get('tab_commits' + aux).then((commits_data) => {
                        setState({
                            loading: false,
                            commits_data: commits_data,
                        });
                        setData(commits_data.list);
                    });
                    break;
                case 4:
                    setFilterLink(aux);
                    client.get('tab_contributors' + aux).then((contributors_data) => {
                        setState({
                            loading: false,
                            contributors_data: contributors_data,
                        });
                        setData(contributors_data.list);
                    });
                    break;
                case 5:
                    const user = JSON.parse(localStorage.getItem("user"));
                    client.post_with_token('tab_watchlist', { params: 0 }, user.token).then((watchlist_data) => {
                        setState({
                            loading: false,
                            watchlist_data: watchlist_data,
                        });
                        setData(watchlist_data.list);
                    });
                    break;
                default: console.log("def"); break;
            }

        }
        setFilterName(event.target.value);
    };

    return (
        <Paper className="container">
            <Stack
                style={{ backgroundColor: '#FFFFFF', height: "5em", marginBottom: "2em" }}
                direction="row"
                alignItems="bottom"
                justifyContent="space-between"
            >
                <StyledTabs
                    value={value}
                    onChange={handleChange}
                    style={{
                        marginLeft: "4.5em",
                        marginTop: 'auto'
                    }}
                >
                    <StyledTab label='PRs' classes={{ root: classes.prTab }} />
                    <StyledTab label='Issues' classes={{ root: classes.issuesTab }} />
                    <StyledTab label='Releases' classes={{ root: classes.releasesTab }} />
                    <StyledTab label='Commits' classes={{ root: classes.commitsTab }} />
                    <StyledTab label='Contributors' classes={{ root: classes.contributorsTab }} />
                    {!stateLogin.isLoggedIn && (
                        <>
                            <StyledTab
                                icon={<img src={steaPlin} alt="steaPlin" className={classes.stea} />}
                                iconPosition='start'
                                label='Watchlist'
                                onClick={handleClickOpen}
                                classes={{ root: classes.watchlistTab }}
                            />
                            <Dialog open={open} onClose={handleClose} >
                                <DialogTitle
                                    style={{
                                        backgroundColor: "#EEF4F5",
                                    }}
                                >
                                    {"Get your own watchlist"}
                                </DialogTitle>
                                <DialogContent
                                    style={{
                                        backgroundColor: "#FFFFFF",
                                        height: '18em',
                                        width: '30em'
                                    }}
                                >
                                    <Typography
                                        style={{
                                            marginTop: '3.5em',
                                            marginBottom: '3em',
                                            marginLeft: '3em'
                                        }}
                                    >
                                        Track the ecosystem development. View your preferred activities. Do it all with our easy to use platform.
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        startIcon={<img src={GithubLogo} alt='GithubLogo' />}
                                        href={`https://github.com/login/oauth/authorize?scope=user&client_id=${client_id}&redirect_uri=${redirect_uri}`}
                                        onClick={() => {
                                            setDataError({ ...dataError, errorMessage: "" });
                                        }}
                                        sx={{
                                            backgroundColor: 'transparent',
                                            color: '#000000',
                                            width: '23em',
                                            marginLeft: '4em'
                                        }}
                                        className={classes.button}
                                    >
                                        Sign in with Github
                                    </Button>
                                </DialogContent>

                            </Dialog>
                        </>
                    )}
                    {stateLogin.isLoggedIn && (
                        <StyledTab
                            icon={<img src={steaPlin} alt="steaPlin" className={classes.stea} />}
                            iconPosition='start'
                            label='Watchlist'
                            classes={{ root: classes.watchlistTab }}
                        />
                    )}
                </StyledTabs>
                <SearchStyle
                    style={{
                        marginLeft: "auto",
                        marginTop: 'auto',
                        marginBottom: '0.25em',
                        marginRight: '1em'
                    }}
                    value={filterName}
                    onChange={(e) => handleFilterByName(e)}
                    placeholder="Search"
                    startAdornment={
                        <InputAdornment position="start">
                            <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                        </InputAdornment>
                    }
                />
            </Stack>



            {value === 0 && (
                <PRTable
                    filterName={filterName}
                    isSearchEmpty={isSearchEmpty}
                    data={data}
                    state={state}
                    handleMenuFilter={handleMenuFilter}
                    handleSortChange={handleSort}
                    clearFilter={clearFilter}
                    globalFilter={globalFilter}
                />
            )}

            {value === 1 && (
                <IssuesTable
                    filterName={filterName}
                    isSearchEmpty={isSearchEmpty}
                    data={data}
                    state={state}
                    handleMenuFilter={handleMenuFilter}
                    handleSortChange={handleSort}
                    clearFilter={clearFilter}
                    globalFilter={globalFilter}
                />
            )}

            {value === 2 && (
                <ReleasesTable
                    filterName={filterName}
                    isSearchEmpty={isSearchEmpty}
                    data={data}
                    state={state}
                    handleMenuFilter={handleMenuFilter}
                    handleSortChange={handleSort}
                    clearFilter={clearFilter}
                    globalFilter={globalFilter}
                />
            )}

            {value === 3 &&
                <CommitsTable
                    filterName={filterName}
                    isSearchEmpty={isSearchEmpty}
                    data={data}
                    state={state}
                    handleMenuFilter={handleMenuFilter}
                    handleSortChange={handleSort}
                    clearFilter={clearFilter}
                    globalFilter={globalFilter}
                />
            }

            {value === 4 &&
                <ContributorsTable
                    filterName={filterName}
                    isSearchEmpty={isSearchEmpty}
                    data={data}
                    state={state}
                    handleMenuFilter={handleMenuFilter}
                    handleSortChange={handleSort}
                    clearFilter={clearFilter}
                    globalFilter={globalFilter}
                />
            }

            {value === 5 && (
                <WatchlistTable
                    filterName={filterName}
                    isSearchEmpty={isSearchEmpty}
                    data={data}
                    handleSortChange={handleSort}
                    clearFilter={clearFilter}
                />
            )}

        </Paper>
    );
}