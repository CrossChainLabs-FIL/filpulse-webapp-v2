import { useState } from 'react';
// material
import {
    Typography,
    TableRow,
    TableCell,
    TableHead,
    Stack,
    IconButton
} from '@mui/material';

// components
import TriunghiMenuReleasesStatus from './headMenus/TriunghiMenuReleasesStatus';
import FilterByProject from '../FilterByProject';
import FilterByContributor from '../FilterByContributor';

// assets
import triunghi from '../../assets/triunghi.svg';

// ----------------------------------------------------------------------




export default function ReleasesHead({ paramsCallback }) {
    const [isDescNumber, setIsDescNumber] = useState(true);
    const [isDescName, setIsDescName] = useState(true);
    const [isDescUpdatedAt, setIsDescUpdatedAt] = useState(true);

    const styleNumber = {
        transform: !isDescNumber ? 'rotate(180deg)' : '',
        transition: 'transform 150ms ease', // smooth transition
    }
    const styleName = {
        transform: !isDescName ? 'rotate(180deg)' : '',
        transition: 'transform 150ms ease', // smooth transition
    }
    const styleTime = {
        transform: !isDescUpdatedAt ? 'rotate(180deg)' : '',
        transition: 'transform 150ms ease', // smooth transition
    }

    const handleSortNumber = () => {
        paramsCallback({ sortBy: 'id', sortType: isDescNumber ? 'asc' : 'desc' });
        setIsDescNumber(!isDescNumber);
        setIsDescName(true);
        setIsDescUpdatedAt(true);
    }

    const handleSortName = () => {
        paramsCallback({ sortBy: 'name', sortType: isDescName ? 'asc' : 'desc' });
        setIsDescNumber(true);
        setIsDescName(!isDescName);
        setIsDescUpdatedAt(true);
    }

    const handleSortUpdatedAt = () => {
        paramsCallback({ sortBy: 'updated_at', sortType: isDescUpdatedAt ? 'asc' : 'desc' });
        setIsDescNumber(true);
        setIsDescName(true);
        setIsDescUpdatedAt(!isDescUpdatedAt);
    }

    return (
        <TableHead>
            <TableRow
                sx={{
                    height: '4rem',
                }}
            >

                <TableCell
                    align="left"
                    component="th"
                    scope="row"
                    padding="none"
                    sx={{
                        width: '15rem',
                        padding: 0,
                        // paddingLeft: '5.35rem',
                    }}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                    >
                        <Typography
                            noWrap
                            sx={{
                                fontWeight: 500,
                                fontSize: 16,
                                marginRight: '0.35rem',
                                marginLeft: '3.9rem',
                            }}
                        >
                            #
                        </Typography>

                        <IconButton
                            id="basic-button"
                            onClick={handleSortNumber}
                            sx={{
                                padding: 0,
                                marginTop: '0.15rem'
                            }}
                        >
                            <img
                                src={triunghi}
                                alt='triunghi'
                                style={styleNumber}
                            />
                        </IconButton>
                    </Stack>
                </TableCell>

                <TableCell
                    align="left"
                    component="th"
                    scope="row"
                    padding="none"
                    sx={{
                        width: '15rem'
                    }}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                    >
                        <Typography noWrap sx={{ fontWeight: 500, fontSize: 16, marginRight: '0.35rem', }}>
                            Release
                        </Typography>

                        <IconButton
                            id="basic-button"
                            onClick={handleSortName}
                            sx={{
                                padding: 0,
                                marginTop: '0.15rem'
                            }}
                        >
                            <img
                                src={triunghi}
                                alt='triunghi'
                                style={styleName}
                            />
                        </IconButton>
                    </Stack>
                </TableCell>

                <TableCell
                    align="left"
                    component="th"
                    scope="row"
                    padding="none"
                    sx={{
                        width: '18rem'
                    }}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                    >
                        <Typography noWrap sx={{ fontWeight: 500, fontSize: 16 }}>
                            Project
                        </Typography>

                        <FilterByProject endpoint={'tab_releases/filter/project'} paramsCallback={paramsCallback} />
                    </Stack>
                </TableCell>

                <TableCell
                    align="left"
                    component="th"
                    scope="row"
                    padding="none"
                    sx={{
                        width: '18rem'
                    }}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                    >
                        <Typography noWrap sx={{ fontWeight: 500, fontSize: 16 }}>
                            Author
                        </Typography>

                        <FilterByContributor
                            endpoint={'tab_releases/filter/contributor'}
                            paramsCallback={paramsCallback}
                            name={'Filter by author'}
                        />
                    </Stack>
                </TableCell>

                <TableCell
                    align="left"
                    component="th"
                    scope="row"
                    padding="none"
                    sx={{
                        width: '14rem'
                    }}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                    >
                        <Typography noWrap sx={{ fontWeight: 500, fontSize: 16 }}>
                            Status
                        </Typography>

                        <TriunghiMenuReleasesStatus paramsCallback={paramsCallback} />
                    </Stack>
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
                        <Typography noWrap sx={{ fontWeight: 500, fontSize: 16, marginRight: '0.35rem', }}>
                            Last Updated
                        </Typography>

                        <IconButton
                            id="basic-button"
                            onClick={handleSortUpdatedAt}
                            sx={{
                                padding: 0,
                                marginTop: '0.15rem'
                            }}
                        >
                            <img
                                src={triunghi}
                                alt='triunghi'
                                style={styleTime}
                            />
                        </IconButton>
                    </Stack>
                </TableCell>

            </TableRow>
        </TableHead>
    );
}
