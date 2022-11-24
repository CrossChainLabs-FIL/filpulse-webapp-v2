// material
import { Typography, TableRow, TableCell, TableHead } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';

import { makeStyles } from '@mui/styles';


// ----------------------------------------------------------------------


const useStyles = makeStyles(() => ({

}));



export default function UserListHead() {
  // const createSortHandler = (property) => (event) => {
  //   onRequestSort(event, property);
  // };

  const classes = useStyles();

  return (
    <TableHead>
      <TableRow>
        <TableCell
          align="left"
          component="th"
          scope="row"
          padding="none"
          className={classes.id}
        >
          <Typography variant="h6" noWrap style={{ marginLeft: '0.75rem', fontWeight: 1200 }}>
            #
          </Typography>
        </TableCell>

        <TableCell
          align="left"
          component="th"
          scope="row"
          padding="none"
          className={classes.name}
        >
          <Typography variant="h6" noWrap style={{ marginLeft: '0.15rem', fontWeight: 1200 }}>
            Name
          </Typography>
        </TableCell>

        <TableCell
          align="right"
          component="th"
          scope="row"
          padding="none"
        >
          <Typography variant="h6" noWrap style={{ fontWeight: 1200 }}>
            Price
          </Typography>
        </TableCell>

        <TableCell
          align="right"
          component="th"
          scope="row"
          padding="none"
          className={classes.mCap}
        >
          <Typography variant="h6" noWrap style={{ fontWeight: 1200 }}>
            Market Cap
          </Typography>
        </TableCell>

        <TableCell
          align="right"
          component="th"
          scope="row"
          padding="none"
          className={classes.volume}
        >
          <Typography variant="h6" noWrap style={{ fontWeight: 1200 }}>
            Volume(24h)
          </Typography>
        </TableCell>

        <TableCell
          align="right"
          component="th"
          scope="row"
          padding="none"
          className={classes.activity}
        >
          <Typography variant="h6" noWrap style={{ fontWeight: 1200 }}>
            Activity(GitHub)
          </Typography>
        </TableCell>

        <TableCell
          align="left"
          component="th"
          scope="row"
          padding="none"
          className={classes.infoCell}
        >
          <Tooltip title='cul'>
            <InfoOutlinedIcon sx={{ color: '#31BEEB' }} className={classes.infoIcon} />
          </Tooltip>
        </TableCell>

        <TableCell
          align="right"
          component="th"
          scope="row"
          padding="none"
          className={classes.maturity}
        >
          <Typography variant="h6" noWrap style={{ fontWeight: 1200 }}>
            Maturity
          </Typography>
        </TableCell>

        <TableCell
          align="left"
          component="th"
          scope="row"
          padding="none"
          className={classes.infoCell}
        >
          <Tooltip title='cul'>
            <InfoOutlinedIcon sx={{ color: '#31BEEB' }} className={classes.infoIcon} />
          </Tooltip>
        </TableCell>

        <TableCell
          align="right"
          component="th"
          scope="row"
          padding="none"
          className={classes.trust}
        >
          <Typography variant="h6" noWrap style={{ fontWeight: 1200 }}>
            Trust Index%
          </Typography>
        </TableCell>

        <TableCell
          align="left"
          component="th"
          scope="row"
          padding="none"
          className={classes.infoCell}
        >
          <Tooltip title='cul'>
            <InfoOutlinedIcon sx={{ color: '#31BEEB' }} className={classes.infoIcon} />
          </Tooltip>
        </TableCell>

      </TableRow>
    </TableHead>
  );
}
