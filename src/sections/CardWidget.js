import PropTypes from 'prop-types';
import { useTheme, styled } from '@mui/material/styles';
import { Box, Card, Typography } from '@mui/material';
import palette from '../theme/palette';
import { pixelToRem, fontSizes } from '../utils/font';

CardWidget.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

const RootStyle = styled(Card)(({ theme }) => ({
  textAlign: 'center',
  backgroundColor: palette.card,
  marginBottom: '2rem'
}));

export default function CardWidget({ name, value }) {
  const theme = useTheme();

  return (
    <RootStyle className='boxShadowContainer'  >
      <Card
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 3,
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            align="center"
            sx={{
              fontWeight: 700,
              lineHeight: 1.5,
              fontSize: pixelToRem(24),
            }}
          >
            {value}
          </Typography>
          <Typography align="center" variant="h6">{name}</Typography>
        </Box>
      </Card>
    </RootStyle>
  );
}
