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
    InputAdornment
} from '@mui/material';


// components
import Iconify from './Iconify';
import WatchlistTable from './watchlistTable/WatchlistTable';
import PRTable from './prTable/PRTable';
import CommitsTable from './commitsTable/CommitsTable';
import IssuesTable from './issuesTable/IssuesTable';
import ContributorsTable from './contributorTable/ContributorsTable';


// mock
import WATCHLISTDATA from '../_mock/watchlistData';
import PRDATA from '../_mock/PRData';
import ISSUESDATA from '../_mock/issuesData';
import COMMITSDATA from '../_mock/commitsData';
import CONTRIBUTORSDATA from '../_mock/contributorsData';

// assets
import steaPlin from '../assets/steaPlin.svg';


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

    const [order, setOrder] = useState('asc');

    const [orderBy, setOrderBy] = useState('showId');

    const [isSorted, setIsSorted] = useState(false);

    const [searchData, setSearchData] = useState([]);

    const [data, setData] = useState([]);

    const [value, setValue] = useState(0);

    const [filterName, setFilterName] = useState('');

    const [isSearchEmpty, setIsSearchEmpty] = useState(true);

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
        applySortFilter(WATCHLISTDATA, getComparator(order, orderBy), filterName);
        setIsSearchEmpty(true);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        // setSelected([]);
        setFilterName('');
        setIsSearchEmpty(true);
        // handleTop();
        switch (newValue) {
            case 0:
                setOrderBy('showId');
                setOrder('asc');
                applySortFilter(WATCHLISTDATA, getComparator(order, "showId"), '');
                break;
            case 1:
                setOrderBy('showId');
                setOrder('asc');
                applySortFilter(PRDATA, getComparator(order, "showId"), '');
                break;
            case 2:
                setOrderBy('showId');
                setOrder('asc');
                applySortFilter(ISSUESDATA, getComparator(order, "showId"), '');
                break;
            case 3:
                setOrderBy('showId');
                setOrder('asc');
                applySortFilter(COMMITSDATA, getComparator(order, "showId"), '');
                break;
            case 4:
                setOrderBy('personName');
                setOrder('asc');
                applySortFilter(CONTRIBUTORSDATA, getComparator(order, 'personName'), '');
                break;
            default: console.log(newValue); break;
        }
    };

    const handleSortChange = (orderByNew, orderNew) => {
        if (isSorted) {
            switch (value) {
                case 0:
                    setOrderBy('showId');
                    setOrder('asc');
                    applySortFilter(WATCHLISTDATA, getComparator(order, "showId"), '');
                    break;
                case 1:
                    setOrderBy('showId');
                    setOrder('asc');
                    applySortFilter(PRDATA, getComparator(order, "showId"), '');
                    break;
                case 2:
                    setOrderBy('showId');
                    setOrder('asc');
                    applySortFilter(ISSUESDATA, getComparator(order, "showId"), '');
                    break;
                case 3:
                    setOrderBy('showId');
                    setOrder('asc');
                    applySortFilter(COMMITSDATA, getComparator(order, "showId"), '');
                    break;
                case 4:
                    setOrderBy('personName');
                    setOrder('asc');
                    applySortFilter(CONTRIBUTORSDATA, getComparator(order, 'personName'), '');
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
                    applySortFilter(WATCHLISTDATA, getComparator(orderNew, orderByNew), '');
                    break;
                case 1:
                    setOrderBy(orderByNew);
                    setOrder(orderNew);
                    applySortFilter(PRDATA, getComparator(orderNew, orderByNew), '');
                    break;
                case 2:
                    setOrderBy(orderByNew);
                    setOrder(orderNew);
                    applySortFilter(ISSUESDATA, getComparator(orderNew, orderByNew), '');
                    break;
                case 3:
                    setOrderBy(orderByNew);
                    setOrder(orderNew);
                    applySortFilter(COMMITSDATA, getComparator(orderNew, orderByNew), '');
                    break;
                case 4:
                    setOrderBy(orderByNew);
                    setOrder(orderNew);
                    applySortFilter(CONTRIBUTORSDATA, getComparator(orderNew, orderByNew), '');
                    break;
                default: console.log(value); break;
            }
            setIsSorted(true);
        }
    }

    const handleFilterByName = (event) => {
        applySortFilter(data, getComparator(order, orderBy), event.target.value);
        if (event.target.value) {
            setIsSearchEmpty(false);
        }
        else {
            setIsSearchEmpty(true);
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
                        marginLeft: "1.15em",
                        marginTop: 'auto'
                    }}
                >
                    <StyledTab
                        icon={<img src={steaPlin} alt="steaPlin" className={classes.stea} />}
                        iconPosition='start'
                        label='Watchlist'
                        classes={{ root: classes.watchlistTab }}
                    />
                    <StyledTab label='PRs' classes={{ root: classes.prTab }} />
                    <StyledTab label='Issues' classes={{ root: classes.issuesTab }} />
                    <StyledTab label='Commits' classes={{ root: classes.commitsTab }} />
                    <StyledTab label='Contributors' classes={{ root: classes.contributorsTab }} />
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
                <WatchlistTable
                    filterName={filterName}
                    isSearchEmpty={isSearchEmpty}
                    data={data}
                    searchData={searchData}
                    handleSortChange={handleSortChange}
                />
            )}

            {value === 1 && (
                <PRTable
                    filterName={filterName}
                    isSearchEmpty={isSearchEmpty}
                    data={data}
                    searchData={searchData}
                    handleSortChange={handleSortChange}
                />
            )}

            {value === 2 && (
                <IssuesTable
                    filterName={filterName}
                    isSearchEmpty={isSearchEmpty}
                    data={data}
                    searchData={searchData}
                    handleSortChange={handleSortChange}
                />
            )}

            {value === 3 &&
                <CommitsTable
                    filterName={filterName}
                    isSearchEmpty={isSearchEmpty}
                    data={data}
                    searchData={searchData}
                    handleSortChange={handleSortChange}
                />
            }

            {value === 4 &&
                <ContributorsTable
                    filterName={filterName}
                    isSearchEmpty={isSearchEmpty}
                    data={data}
                    searchData={searchData}
                    handleSortChange={handleSortChange}
                />
            }

        </Paper>
    );
}