// @mui
import { makeStyles } from '@mui/styles';

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

export default function WatchlistTable({
    filterName,
    isSearchEmpty,
    data,
    searchData,
    handleSortChange,
    clearFilter
}) {

    const classes = useStyles();

    const isUserNotFound = searchData.length === 0;

    const tableEmpty = data.length === 0;

    const showData = isSearchEmpty ? data : searchData;

    console.log(data);

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

                    <WatchlistHead
                        data={data}
                        handleSortChange={handleSortChange}
                        clearFilterFunction={clearFilter}
                    />



                    <TableBody>
                        {showData.map((row, idx) => {
                            const {
                                number,
                                title,
                                html_url,
                                dev_name,
                                is_pr,
                                state,
                                participants,
                                commentsTotal,
                                commentsUnseen,
                                created_at,
                                updated_at,
                                projectLink,
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
                                                        href={projectLink}
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
                                                            href={"https://github.com/" + avatar_url}
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
                                        }): ''}
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
                                            href={projectLink}
                                            color="inherit"
                                            underline='none'
                                        >
                                            <Stack
                                                direction="row"
                                                alignItems="center"
                                                style={{
                                                    marginLeft: '2.1em'
                                                }}
                                            >
                                                <Badge
                                                    badgeContent={commentsUnseen ? commentsUnseen: 1}
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
                                                    {commentsTotal ? commentsTotal : 100}
                                                </Typography>
                                            </Stack>
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

                    {isUserNotFound && !tableEmpty && !isSearchEmpty && (
                        <TableBody>
                            <TableRow>
                                <TableCell align="center" colSpan={11} sx={{ py: 3 }}>
                                    <SearchNotFound searchQuery={filterName} />
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