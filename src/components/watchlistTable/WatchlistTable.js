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
    Tooltip
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
                        {showData.map((row) => {
                            const { id,
                                showId,
                                projectTitle,
                                projectSubtitle,
                                projectAuthor,
                                projectLink,
                                participantIcons,
                                participantName,
                                participantLink,
                                merged,
                                commentsTotal,
                                commentsUnseen,
                                timeText,
                                timeNumber } = row;
                            return (
                                <TableRow
                                    hover
                                    key={id}
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
                                                href={projectLink}
                                                color="inherit"
                                            >
                                                {showId}
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
                                                    {projectTitle}
                                                </Typography>
                                            }
                                            subheader={
                                                <>                                                                {projectSubtitle}
                                                    < Link
                                                        target="_blank"
                                                        rel="noopener"
                                                        href={projectLink}
                                                        color="inherit"
                                                    >
                                                        {projectAuthor}
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
                                        {participantIcons.map((avatar, index) => {
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
                                                        title={participantName[index]}
                                                        placement="bottom-end"
                                                        arrow
                                                        key={index}
                                                    >
                                                        <Link
                                                            target="_blank"
                                                            rel="noopener"
                                                            href={participantLink[index]}
                                                        >
                                                            <img key={avatar} src={avatar} alt="avatar" />
                                                        </Link>
                                                    </Tooltip>
                                                );
                                            }
                                        })}
                                    </TableCell>

                                    <TableCell
                                        align="left"
                                        component="th"
                                        scope="row"
                                        padding="none"
                                    >

                                        {merged === 0 && (<img src={PRClosed} alt="prclosed" />)}
                                        {merged === 1 && (<img src={PROpen} alt="propen" />)}
                                        {merged === 2 && (<img src={IssuesOpen} alt="issuesopen" />)}
                                        {merged === 3 && (<img src={IssuesClosed} alt="issuesclosed" />)}
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
                                                    badgeContent={commentsUnseen}
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
                                                    {commentsTotal}
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
                                            {timeText}
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