import { Paper, Typography } from '@mui/material';

// ----------------------------------------------------------------------


export default function TableEmpty({ ...other }) {
    return (
        <Paper {...other}>
            <Typography gutterBottom align="center" variant="subtitle1">
                Table Empty
            </Typography>
        </Paper>
    );
}
