import React, { useState } from 'react';

// material
import {
    Box,
    Stack,
    IconButton,
    Menu,
    List,
    OutlinedInput,
    MenuItem,
    ListItemText,
    Paper,
    Divider,
    Typography
} from '@mui/material';

import { styled } from '@mui/material/styles';

import { Client } from '../utils/client';


// assets
import x from '../assets/x.svg';
import clearFilter from '../assets/clearFilter.svg';
import bara from '../assets/bara.svg';

const client = new Client();



const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
    height: '2rem',
    width: '25rem',
    margin: 5,
    fontSize: 15,
    [theme.breakpoints.down('xl')]: {
        height: '2rem',
        width: '23rem',
    }
}));



export default function FilterByProject({ endpoint, paramsCallback }) {

    const [filterName, setFilterName] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [state, setState] = useState({
        loading: true
    });
    const [isSorted, setIsSorted] = useState(false);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        client.get(endpoint).then((project_data) => {
            setState({
                loading: false,
                project_data: project_data,
            });
        });
        setFilterName('');
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    function handleFilterClose(organisation, repo) {
        handleClose();
        setIsSorted(true);
        paramsCallback({ repo: repo, organisation: organisation });
    }

    const handleFilterByName = (event) => {
        if (event.target.value) {
            client.get(`${endpoint}?search=${event.target.value}`).then((project_data) => {
                setState({
                    loading: false,
                    project_data: project_data,
                });
            });
        }
        else {
            client.get(endpoint).then((project_data) => {
                setState({
                    loading: false,
                    project_data: project_data,
                });
            });
        }
        setFilterName(event.target.value);
    }

    return (
        <>
            <IconButton
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                style={{ padding: 0 }}
            >
                <img src={bara} alt='bara' style={{ marginLeft: '0.25rem', }} />
            </IconButton>
            {isSorted ?
                <IconButton
                    id="basic-button"
                    onClick={() => {
                        setIsSorted(false);
                        paramsCallback({ repo: undefined, organisation: undefined });
                    }}
                    style={{ padding: 0, marginLeft: '0.25rem' }}
                >
                    <img src={clearFilter} alt='clear' />
                </IconButton> : ''
            }
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                MenuListProps={{
                    style: {
                        backgroundColor: "#fff",
                        padding: '0px',
                    }
                }}
                sx={{
                    marginTop: '1.5rem',
                }}
            >
                <Box
                    sx={{
                        maxHeight: '100%',
                        backgroundColor: '#FFFFFF',
                        padding: 0
                    }}
                    aria-disabled>
                    <Box
                        sx={{
                            backgroundColor: '#FFFFFF',
                            marginBottom: '0.45rem'
                        }}
                        aria-disabled>
                        <Stack
                            direction="row"
                            alignItems="center"
                        >
                            <Box
                                sx={{
                                    marginTop: '0.5rem',
                                    marginLeft: '0.5rem',
                                    height: '1.75rem',
                                }}
                                aria-disabled
                            >
                                Filter by PR's project
                            </Box>
                            <IconButton onClick={handleClose} style={{ marginLeft: 'auto' }}>
                                <img src={x} alt='x' style={{ height: '0.6rem' }} />
                            </IconButton>
                        </Stack>
                        <Divider />
                        <SearchStyle
                            value={filterName}
                            onChange={(e) => handleFilterByName(e)}
                            placeholder="Filter project"
                            autoFocus
                        />
                        <Divider />
                    </Box >
                    <Paper
                        sx={{
                            maxHeight: '25rem',
                            overflow: 'auto',
                            padding: 0,
                        }}
                    >
                        <List sx={{ height: 'max-content', }} disablePadding={true}>
                            {state.project_data?.list.map((row) => {
                                const { repo,
                                    organisation
                                } = row;
                                return (
                                    <React.Fragment key={repo}>
                                        <MenuItem
                                            sx={{ backgroundColor: '#FFFFFF' }}
                                            onClick={() => handleFilterClose(organisation, repo)}
                                        >
                                            <ListItemText
                                                primary={
                                                    <Typography
                                                        noWrap
                                                        sx={{
                                                            maxWidth: '23rem',
                                                            whiteSpace: 'nowrap',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                        }}
                                                    >
                                                        {organisation + "/" + repo}
                                                    </Typography>
                                                }
                                            />
                                        </MenuItem>
                                        <Divider />
                                    </React.Fragment>
                                );
                            })}
                        </List>
                    </Paper>
                </Box>
            </Menu>
        </>
    )
}
