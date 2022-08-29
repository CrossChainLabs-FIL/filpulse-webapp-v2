import { useState } from 'react';

// material
import {
    Box,
    Stack,
    IconButton,
    Menu,
    List,
    OutlinedInput,
    ListItem,
    ListItemText,
    Paper,
} from '@mui/material';

import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';


// assets
import triunghi from '../../../assets/triunghi.svg';
import x from '../../../assets/x.svg';


const useStyles = makeStyles(() => ({
    triunghi: {
        marginLeft: '0.35em',
        marginTop: '0.15em'
    },
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
    height: 40,
    width: 250,
    marginBottom: 5,
    fontSize: 15,
    [theme.breakpoints.down('xl')]: {
        height: 30,
        width: 200,
    }
}));



export default function TriunghiMenuCommitsCommit({ data }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const classes = useStyles();

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
                <img src={triunghi} alt='triunghi' className={classes.triunghi} />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                style={{
                    marginTop: '1.5em'
                }}
            >
                <Box style={{ maxHeight: '20em', backgroundColor: '#FFFFFF', padding: 0 }}>
                    <Box style={{ backgroundColor: '#FFFFFF' }}>
                        <Stack
                            direction="row"
                            alignItems="center"
                        >
                            <Box>
                                Filter by description
                            </Box>
                            <IconButton onClick={handleClose} style={{ marginLeft: 'auto' }}>
                                <img src={x} alt='x' />
                            </IconButton>
                        </Stack>
                        <SearchStyle
                            style={{
                                marginBottom: 0,
                            }}
                            // value={filterName}
                            // onChange={(e) => handleFilterByName(e)}
                            placeholder="Filter commit"
                        />
                    </Box >
                    <Paper style={{ maxHeight: '16.3em', overflow: 'auto' }}>
                        <List sx={{ height: 'max-content' }}>
                            {data.map((row) => {
                                const { id,
                                    projectTitle,
                                    projectSubtitle
                                } = row;
                                return (
                                    <ListItem key={id} style={{ backgroundColor: '#FFFFFF' }}>
                                        <ListItemText primary={projectTitle} secondary={projectSubtitle} />
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Paper>
                </Box>
            </Menu>
        </>
    )
}
