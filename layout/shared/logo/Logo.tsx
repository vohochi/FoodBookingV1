import Link from 'next/link';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DashboardIcon from '@mui/icons-material/Dashboard';

const LinkStyled = styled(Link)(({ theme }) => ({
  height: '70px',
  padding: theme.spacing(1),
  width: '250px',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textDecoration: 'none',
  borderRadius: theme.shape.borderRadius,
  transition: 'all 0.3s ease-in-out',
}));

const Logo = () => {
  return (
    <LinkStyled href="/admin">
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <DashboardIcon
          color="primary"
          sx={{
            fontSize: 30,
            transition: 'color 0.3s ease-in-out',
          }}
        />
        <Typography
          variant="h6"
          color="primary"
          sx={{
            fontWeight: 700,
            transition: 'color 0.3s ease-in-out',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          Bảng Điều Khiển Admin
        </Typography>
      </Box>
    </LinkStyled>
  );
};

export default Logo;
