import { Paper, Typography } from '@mui/material';

// ----------------------------------------------------------------------


export default function TableEmpty({ ...other }) {
    return (
        <Paper
            {...other}
            sx={{
                marginLeft: { xl: '10rem', lg: '7rem' }
            }}
        >
            <Typography
                gutterBottom
                align="center"
                variant="subtitle1"
            >
                Table Empty
            </Typography>
        </Paper>
    );
}
