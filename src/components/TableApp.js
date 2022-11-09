import { filter } from 'lodash';
import { useState, useEffect } from 'react';

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
} from '@mui/material';


// components
import Iconify from './Iconify';
import WatchlistTable from './watchlistTable/WatchlistTable';
import PRTable from './prTable/PRTable';
import CommitsTable from './commitsTable/CommitsTable';
import IssuesTable from './issuesTable/IssuesTable';
import ReleasesTable from './releasesTable/ReleasesTable';
import ContributorsTable from './contributorTable/ContributorsTable';


import { Client } from '../utils/client';


// mock
import WATCHLISTDATA from '../_mock/watchlistData';
import PRDATA from '../_mock/PRData';
import ISSUESDATA from '../_mock/issuesData';
import COMMITSDATA from '../_mock/commitsData';
import CONTRIBUTORSDATA from '../_mock/contributorsData';

// assets
import steaPlin from '../assets/steaPlin.svg';

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

    const [order, setOrder] = useState('desc');

    const [orderBy, setOrderBy] = useState('showId');

    const [isSorted, setIsSorted] = useState(false);

    const [searchData, setSearchData] = useState([]);

    const [data, setData] = useState([]);

    const [value, setValue] = useState(0);

    const [filterName, setFilterName] = useState('');

    const [isSearchEmpty, setIsSearchEmpty] = useState(true);

    const [filterLink, setFilterLink] = useState('');

    const [state, setState] = useState({
        loading: true, commits_data: [], contributors_data: [], pr_data: [], issues_data: [], releases_data: []
    });


    const classes = useStyles();

    function applySortFilter(array, comparator, query) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        if (query) {
            switch (value) {
                case 0:
                    setSearchData(filter(array, (_user) =>
                        _user.projectTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1));
                    break;
                case 1:
                    setSearchData(filter(array, (_user) =>
                        _user.projectTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1));
                    break;
                case 2:
                    setSearchData(filter(array, (_user) =>
                        _user.projectTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1));
                    break;
                case 3:
                    setSearchData(filter(array, (_user) =>
                        _user.projectTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1));
                    break;
                case 4:
                    setSearchData(filter(array, (_user) =>
                        _user.personName.toLowerCase().indexOf(query.toLowerCase()) !== -1));
                    break;
                default: break;
            }
            return;
        }
        setData(stabilizedThis.map((el) => el[0]));
    }


    useEffect(() => {
        // applySortFilter(WATCHLISTDATA, getComparator(order, orderBy), filterName);
        client.get('tab_prs').then((pr_data) => {
            setState({
                loading: false,
                pr_data: pr_data,
            });
            setOrderBy('showId');
            setOrder('desc');
            setData(pr_data.list);
        });

        setIsSearchEmpty(true);

        client.get('tab_commits').then((commits_data) => {
            setState({
                loading: false,
                commits_data: commits_data,
            });
        });
        client.get('tab_issues').then((issues_data) => {
            setState({
                loading: false,
                issues_data: issues_data,
            });
        });

        // let interval = setInterval(() => {
        //     client.get('tab_commits').then((commits_data) => {
        //         setState({
        //             loading: false,
        //             commits_data: commits_data,
        //         });
        //     });
        // }, 15 * 60 * 1000);
        // client.get('tab_commits').then((commits_data) => {
        //     setState({
        //         loading: false,
        //         commits_data: commits_data,
        //     });
        // });

        // return function cleanup() {
        //     console.log('interval cleanup');
        //     clearInterval(interval);
        // };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setState]);

    const handleChange = (event, newValue) => {
        setState({
            loading: true
        });
        setValue(newValue);
        // setSelected([]);
        setFilterName('');
        setIsSearchEmpty(true);
        setData([]);
        // handleTop();
        switch (newValue) {
            case 0:
                client.get('tab_prs').then((pr_data) => {
                    setState({
                        loading: false,
                        pr_data: pr_data,
                    });
                    setOrderBy('showId');
                    setOrder('desc');
                    setData(pr_data.list);
                });
                break;
            case 1:
                client.get('tab_issues').then((issues_data) => {
                    setState({
                        loading: false,
                        issues_data: issues_data,
                    });
                    setOrderBy('showId');
                    setOrder('desc');
                    setData(issues_data.list);
                });
                break;
            case 2:
                client.get('tab_releases').then((releases_data) => {
                    setState({
                        loading: false,
                        releases_data: releases_data,
                    });
                    setOrderBy('showId');
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
                    setOrderBy('showId');
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
                    setOrderBy('personName');
                    setOrder('asc');
                    setData(contributors_data.list);
                });
                break;
            case 5:
                setOrderBy('showId');
                setOrder('asc');
                applySortFilter(WATCHLISTDATA, getComparator(order, "showId"), '');
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
                        client.get('tab_prs').then((pr_data) => {
                            setState({
                                loading: false,
                                pr_data: pr_data,
                            });
                            setOrder('desc');
                            setFilterLink('');
                            setData(pr_data.list);
                        });
                    }
                    else {
                        client.get('tab_prs' + '?' + `sortBy=updated_at&sortType=asc`).then((pr_data) => {
                            setState({
                                loading: false,
                                pr_data: pr_data,
                            });
                            setOrder('asc');
                            setFilterLink('?' + `sortBy=updated_at&sortType=asc`);
                            setData(pr_data.list);
                        });
                    }
                }
                else {
                    if (order === 'asc') {
                        if (filterLink.match(`&sortBy=updated_at&sortType=asc`) === null) {
                            if (filterLink.match(`sortBy=updated_at&sortType=asc&`) === null) {
                                client.get('tab_prs').then((pr_data) => {
                                    setState({
                                        loading: false,
                                        pr_data: pr_data,
                                    });
                                    setOrder('desc');
                                    setFilterLink('');
                                    setData(pr_data.list);
                                });
                            } else {
                                client.get('tab_prs' + filterLink.replace(`sortBy=updated_at&sortType=asc&`, '')).then((pr_data) => {
                                    setState({
                                        loading: false,
                                        pr_data: pr_data,
                                    });
                                    setOrder('desc');
                                    setFilterLink(filterLink.replace(`sortBy=updated_at&sortType=asc&`, ''));
                                    setData(pr_data.list);
                                });
                            }
                        } else {
                            client.get('tab_prs' + filterLink.replace(`&sortBy=updated_at&sortType=asc`, '')).then((pr_data) => {
                                setState({
                                    loading: false,
                                    pr_data: pr_data,
                                });
                                setOrder('desc');
                                setFilterLink(filterLink.replace(`&sortBy=updated_at&sortType=asc`, ''));
                                setData(pr_data.list);
                            });
                        }
                    }
                    else {
                        client.get('tab_prs' + filterLink + `&sortBy=updated_at&sortType=asc`).then((pr_data) => {
                            setState({
                                loading: false,
                                pr_data: pr_data,
                            });
                            setOrder('asc');
                            setFilterLink(filterLink + `&sortBy=updated_at&sortType=asc`);
                            setData(pr_data.list);
                        });
                    }
                }
                break;
            case 1:
                if (order === 'asc') {
                    client.get(`tab_issues?sortBy=updated_at&sortType=desc`).then((issues_data) => {
                        setState({
                            loading: false,
                            issues_data: issues_data,
                        });
                        setData(issues_data.list);
                        setOrder('desc');
                    });
                }
                else {
                    client.get(`tab_issues?sortBy=updated_at&sortType=asc`).then((issues_data) => {
                        setState({
                            loading: false,
                            issues_data: issues_data,
                        });
                        setData(issues_data.list);
                        setOrder('asc');
                    });
                }
                break;
            case 2:
                if (order === 'asc') {
                    client.get(`tab_releases?sortBy=updated_at&sortType=desc`).then((issues_data) => {
                        setState({
                            loading: false,
                            issues_data: issues_data,
                        });
                        setData(issues_data.list);
                        setOrder('desc');
                    });
                }
                else {
                    client.get(`tab_releases?sortBy=updated_at&sortType=asc`).then((issues_data) => {
                        setState({
                            loading: false,
                            issues_data: issues_data,
                        });
                        setData(issues_data.list);
                        setOrder('asc');
                    });
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
                client.get(`tab_releases?${link_value}`).then((issues_data) => {
                    setState({
                        loading: false,
                        issues_data: issues_data,
                    });
                    setData(issues_data.list);
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
                setOrderBy('showId');
                setOrder('asc');
                applySortFilter(WATCHLISTDATA, getComparator(order, "showId"), '');
                return;
            default: console.log(value); break;
        }
    }

    const clearFilter = (toBeCleared, last) => {
        setData([]);
        setState({
            loading: true
        });
        switch (value) {
            case 0:
                if (filterLink.match('&' + toBeCleared + last) === null) {
                    if (filterLink.match(toBeCleared + last + '&') === null) {
                        client.get('tab_prs').then((pr_data) => {
                            setState({
                                loading: false,
                                pr_data: pr_data,
                            });
                            setFilterLink('');
                            setData(pr_data.list);
                        });
                    }
                    else {
                        client.get('tab_prs' + filterLink.replace(toBeCleared + last + '&', '')).then((pr_data) => {
                            setState({
                                loading: false,
                                pr_data: pr_data,
                            });
                            setFilterLink(filterLink.replace(toBeCleared + last + '&', ''));
                            setData(pr_data.list);
                        });
                    }
                } else {
                    client.get('tab_prs' + filterLink.replace('&' + toBeCleared + last, '')).then((pr_data) => {
                        setState({
                            loading: false,
                            pr_data: pr_data,
                        });
                        setFilterLink(filterLink.replace('&' + toBeCleared + last, ''));
                        setData(pr_data.list);
                    });
                }

                break;
            case 1:
                client.get('tab_issues').then((issues_data) => {
                    setState({
                        loading: false,
                        issues_data: issues_data,
                    });
                    setData(issues_data.list);
                    setFilterName("");
                });
                break;
            case 2:
                client.get('tab_releases').then((issues_data) => {
                    setState({
                        loading: false,
                        issues_data: issues_data,
                    });
                    setData(issues_data.list);
                    setFilterName("");
                });
                break;
            case 3:
                client.get(`tab_commits`).then((commits_data) => {
                    setState({
                        loading: false,
                        commits_data: commits_data,
                    });
                    setData(commits_data.list);
                    setFilterName("");
                });
                break;
            case 4:
                client.get('tab_contributors').then((contributors_data) => {
                    setState({
                        loading: false,
                        contributors_data: contributors_data,
                    });
                    setData(contributors_data.list);
                    setFilterName("");
                });
                break;
            case 5:
                setOrderBy('showId');
                setOrder('asc');
                applySortFilter(WATCHLISTDATA, getComparator(order, "showId"), '');
                setFilterName("");
                return;
            default: console.log(value); break;
        }
    }

    const globalFilter = (addonValue, filterType, last) => {
        setData([]);
        setState({
            loading: true
        });
        switch (value) {
            case 0:
                if (filterLink === '') {
                    client.get('tab_prs' + '?' + addonValue).then((pr_data) => {
                        setState({
                            loading: false,
                            pr_data: pr_data,
                        });
                        setFilterLink('?' + addonValue);
                        setData(pr_data.list);
                    });
                }
                else {
                    if (filterLink.match(filterType) === null) {
                        client.get('tab_prs' + filterLink + '&' + addonValue).then((pr_data) => {
                            setState({
                                loading: false,
                                pr_data: pr_data,
                            });
                            setFilterLink(filterLink + '&' + addonValue);
                            setData(pr_data.list);
                        });
                    } else if (last !== '') {
                        client.get('tab_prs' + filterLink.replace(filterType + last, addonValue)).then((pr_data) => {
                            setState({
                                loading: false,
                                pr_data: pr_data,
                            });
                            setFilterLink(filterLink.replace(filterType + last, addonValue));
                            setData(pr_data.list);
                        });
                    }
                }
                break;
            case 1:
                client.get('tab_issues').then((issues_data) => {
                    setState({
                        loading: false,
                        issues_data: issues_data,
                    });
                    setData(issues_data.list);
                    setFilterName("");
                });
                break;
            case 2:
                client.get('tab_releases').then((issues_data) => {
                    setState({
                        loading: false,
                        issues_data: issues_data,
                    });
                    setData(issues_data.list);
                    setFilterName("");
                });
                break;
            case 3:
                client.get(`tab_commits`).then((commits_data) => {
                    setState({
                        loading: false,
                        commits_data: commits_data,
                    });
                    setData(commits_data.list);
                    setFilterName("");
                });
                break;
            case 4:
                client.get('tab_contributors').then((contributors_data) => {
                    setState({
                        loading: false,
                        contributors_data: contributors_data,
                    });
                    setData(contributors_data.list);
                    setFilterName("");
                });
                break;
            case 5:
                setOrderBy('showId');
                setOrder('asc');
                applySortFilter(WATCHLISTDATA, getComparator(order, "showId"), '');
                setFilterName("");
                return;
            default: console.log(value); break;
        }
    }

    const handleSortChange = (orderByNew, orderNew) => {
        if (isSorted) {
            switch (value) {
                case 0:
                    setOrderBy('showId');
                    setOrder('asc');
                    applySortFilter(PRDATA, getComparator(order, "showId"), '');
                    break;
                case 1:
                    setOrderBy('showId');
                    setOrder('asc');
                    applySortFilter(ISSUESDATA, getComparator(order, "showId"), '');
                    break;
                case 2:
                    setOrderBy('showId');
                    setOrder('asc');
                    applySortFilter(COMMITSDATA, getComparator(order, "showId"), '');
                    break;
                case 3:
                    setOrderBy('personName');
                    setOrder('asc');
                    applySortFilter(CONTRIBUTORSDATA, getComparator(order, 'personName'), '');
                    break;
                case 4:
                    setOrderBy('showId');
                    setOrder('asc');
                    applySortFilter(WATCHLISTDATA, getComparator(order, "showId"), '');
                    break;
                default: console.log(value); break;
            }
            setIsSorted(false);
        }
        else {
            switch (value) {
                case 0:
                    setOrderBy(orderByNew);
                    setOrder(orderNew);
                    applySortFilter(PRDATA, getComparator(orderNew, orderByNew), '');
                    break;
                case 1:
                    setOrderBy(orderByNew);
                    setOrder(orderNew);
                    applySortFilter(ISSUESDATA, getComparator(orderNew, orderByNew), '');
                    break;
                case 2:
                    setOrderBy(orderByNew);
                    setOrder(orderNew);
                    applySortFilter(COMMITSDATA, getComparator(orderNew, orderByNew), '');
                    break;
                case 3:
                    setOrderBy(orderByNew);
                    setOrder(orderNew);
                    applySortFilter(CONTRIBUTORSDATA, getComparator(orderNew, orderByNew), '');
                    break;
                case 4:
                    setOrderBy(orderByNew);
                    setOrder(orderNew);
                    applySortFilter(WATCHLISTDATA, getComparator(orderNew, orderByNew), '');
                    break;
                default: console.log(value); break;
            }
            setIsSorted(true);
        }
    }

    const handleFilterByName = (event) => {
        setData([]);
        setState({
            loading: true
        });
        console.log(filterLink);
        if (event.target.value !== '') {
            setIsSearchEmpty(false);

            // console.log(event.target.value, ' ', filterName, ' ', aux);
            // globalFilter(`search=${event.target.value}`, aux);
            switch (value) {
                case 0:
                    if (filterLink === '') {
                        client.get('tab_prs' + '?' + `search=${event.target.value}`).then((pr_data) => {
                            setState({
                                loading: false,
                                pr_data: pr_data,
                            });
                            setFilterLink('?' + `search=${event.target.value}`);
                            setData(pr_data.list);
                        });
                    }
                    else {
                        if (!isSearchEmpty) {
                            client.get('tab_prs' + filterLink.replace(`search=${filterName}`, `search=${event.target.value}`)).then((pr_data) => {
                                setState({
                                    loading: false,
                                    pr_data: pr_data,
                                });
                                setFilterLink(filterLink.replace(`search=${filterName}`, `search=${event.target.value}`));
                                setData(pr_data.list);
                            });
                            break;
                        }
                        client.get('tab_prs' + filterLink + '&' + `search=${event.target.value}`).then((pr_data) => {
                            setState({
                                loading: false,
                                pr_data: pr_data,
                            });
                            setFilterLink(filterLink + '&' + `search=${event.target.value}`);
                            setData(pr_data.list);
                        });
                    }
                    break;
                case 1:
                    client.get(`tab_issues?search=${event.target.value}`).then((commits_data) => {
                        setState({
                            loading: false,
                            commits_data: commits_data,
                        });
                        setData(commits_data.list);
                    });
                    break;
                case 2:
                    client.get(`tab_releases?search=${event.target.value}`).then((commits_data) => {
                        setState({
                            loading: false,
                            commits_data: commits_data,
                        });
                        setData(commits_data.list);
                    });
                    break;
                case 3:
                    client.get(`tab_commits?search=${event.target.value}`).then((commits_data) => {
                        setState({
                            loading: false,
                            commits_data: commits_data,
                        });
                        setData(commits_data.list);
                    });
                    break;
                case 4:
                    client.get(`tab_contributors?search=${event.target.value}`).then((commits_data) => {
                        setState({
                            loading: false,
                            commits_data: commits_data,
                        });
                        setData(commits_data.list);
                    });
                    break;
                case 5:
                    break;
                default: console.log("def"); break;
            }

            // let commits_data = await client.get(`tab_commits?search=${event.target.value}`);
            // setState({
            //     loading: false,
            //     commits_data: commits_data,
            // });
            // setData(commits_data.list);

        }
        else {
            setIsSearchEmpty(true);
            let aux = filterLink;
            if (aux.match("&search=") !== null) {
                aux = aux.replace(`&search=${filterName}`, '');
            } else {
                aux = aux.replace(`?search=${filterName}`, '');
            }

            console.log(aux);
            // globalFilter('', aux);
            switch (value) {
                case 0:
                    console.log('checkGol', filterLink, filterName, isSearchEmpty);
                    client.get('tab_prs' + aux).then((pr_data) => {
                        setState({
                            loading: false,
                            pr_data: pr_data,
                        });
                        setFilterLink(aux);
                        setData(pr_data.list);

                    });
                    break;
                case 1:
                    client.get('tab_issues').then((commits_data) => {
                        setState({
                            loading: false,
                            commits_data: commits_data,
                        });
                        setData(commits_data.list);
                    });
                    break;
                case 2:
                    client.get('tab_releases').then((commits_data) => {
                        setState({
                            loading: false,
                            commits_data: commits_data,
                        });
                        setData(commits_data.list);
                    });
                    break;
                case 3:
                    client.get('tab_commits').then((commits_data) => {
                        setState({
                            loading: false,
                            commits_data: commits_data,
                        });
                        setData(commits_data.list);
                    });
                    break;
                case 4:
                    client.get('tab_contributors').then((commits_data) => {
                        setState({
                            loading: false,
                            commits_data: commits_data,
                        });
                        setData(commits_data.list);
                    });
                    break;
                case 5:
                    break;
                default: console.log("def"); break;
            }

            // let commits_data = await client.get(`tab_commits`);
            // setState({
            //     loading: false,
            //     commits_data: commits_data,
            // });
            // setData(commits_data.list);
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
                    <StyledTab
                        icon={<img src={steaPlin} alt="steaPlin" className={classes.stea} />}
                        iconPosition='start'
                        label='Watchlist'
                        classes={{ root: classes.watchlistTab }}
                    />
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
                    // searchData={searchData}
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
                    // searchData={searchData}
                    handleMenuFilter={handleMenuFilter}
                    handleSortChange={handleSort}
                    clearFilter={clearFilter}
                />
            )}

            {value === 2 && (
                <ReleasesTable
                    filterName={filterName}
                    isSearchEmpty={isSearchEmpty}
                    data={data}
                    state={state}
                    // searchData={searchData}
                    handleMenuFilter={handleMenuFilter}
                    handleSortChange={handleSort}
                    clearFilter={clearFilter}
                />
            )}

            {value === 3 &&
                <CommitsTable
                    filterName={filterName}
                    isSearchEmpty={isSearchEmpty}
                    data={data}
                    state={state}
                    // searchData={searchData}
                    handleMenuFilter={handleMenuFilter}
                    handleSortChange={handleSort}
                    clearFilter={clearFilter}
                />
            }

            {value === 4 &&
                <ContributorsTable
                    filterName={filterName}
                    isSearchEmpty={isSearchEmpty}
                    data={data}
                    state={state}
                    // searchData={searchData}
                    handleMenuFilter={handleMenuFilter}
                    handleSortChange={handleSortChange}
                    clearFilter={clearFilter}
                />
            }

            {value === 5 && (
                <WatchlistTable
                    filterName={filterName}
                    isSearchEmpty={isSearchEmpty}
                    data={data}
                    searchData={searchData}
                    handleSortChange={handleSortChange}
                    clearFilter={clearFilter}
                />
            )}

        </Paper>
    );
}