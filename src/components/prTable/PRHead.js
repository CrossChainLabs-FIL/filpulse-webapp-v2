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
import TriunghiMenuPrStatus from './headMenus/TriunghiMenuPrStatus';
import FilterByProject from '../FilterByProject';
import FilterByContributor from '../FilterByContributor';

// assets
import triunghi from '../../assets/triunghi.svg';


// ----------------------------------------------------------------------


export default function PRHead({ paramsCallback }) {
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
        paramsCallback({ sortBy: 'number', sortType: isDescNumber ? 'asc' : 'desc' });
        setIsDescNumber(!isDescNumber);
        setIsDescName(true);
        setIsDescUpdatedAt(true);
    }

    const handleSortName = () => {
        paramsCallback({ sortBy: 'title', sortType: isDescName ? 'asc' : 'desc' });
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
                    sx={{
                        width: { xl: '5.35rem', lg: '4rem' }
                    }}
                />

                <TableCell
                    align="left"
                    component="th"
                    scope="row"
                    padding="none"
                    sx={{
                        width: { xl: '5.5rem', lg: '4rem' },
                    }}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                    >
                        <Typography noWrap style={{ fontWeight: 500, fontSize: 16, marginRight: '0.35rem', }}>
                            #
                        </Typography>

                        <IconButton
                            id="basic-button"
                            onClick={handleSortNumber}
                            style={{
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
                        width: { xl: '26rem', lg: '20rem' }
                    }}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                    >
                        <Typography noWrap style={{ fontWeight: 500, fontSize: 16, marginRight: '0.35rem', }}>
                            PR
                        </Typography>

                        <IconButton
                            id="basic-button"
                            onClick={handleSortName}
                            style={{
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
                        width: { xl: '18rem', lg: '12rem' }
                    }}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                    >
                        <Typography noWrap style={{ fontWeight: 500, fontSize: 16 }}>
                            Project
                        </Typography>

                        <FilterByProject endpoint={'tab_prs/filter/project'} paramsCallback={paramsCallback} />
                    </Stack>
                </TableCell>

                <TableCell
                    align="left"
                    component="th"
                    scope="row"
                    padding="none"
                    sx={{
                        width: { xl: '15rem', lg: '10rem' }
                    }}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                    >
                        <Typography noWrap style={{ fontWeight: 500, fontSize: 16 }}>
                            Contributor
                        </Typography>

                        <FilterByContributor endpoint={'tab_prs/filter/contributor'} paramsCallback={paramsCallback} />

                    </Stack>
                </TableCell>

                <TableCell
                    align="left"
                    component="th"
                    scope="row"
                    padding="none"
                    sx={{
                        width: { xl: '10rem', lg: '8rem' },
                        padding: 0
                    }}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                    >
                        <Typography noWrap style={{ fontWeight: 500, fontSize: 16 }}>
                            Status
                        </Typography>

                        <TriunghiMenuPrStatus paramsCallback={paramsCallback} />
                    </Stack>
                </TableCell>


                <TableCell
                    align="left"
                    component="th"
                    scope="row"
                    padding="none"
                    sx={{
                        padding: 0,
                    }}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                        sx={{ padding: 0 }}
                    >
                        <Typography noWrap style={{ fontWeight: 500, fontSize: 16, marginRight: '0.35rem' }}>
                            Last Updated
                        </Typography>

                        <IconButton
                            id="basic-button"
                            onClick={handleSortUpdatedAt}
                            style={{
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
