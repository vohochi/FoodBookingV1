'use client';
import { Grid, Box, Card, Typography, Stack } from '@mui/material';
import Link from 'next/link';
import PageContainer from '@/_components/container/PageContainer';
import Logo from '@/layout/shared/logo/Logo';
import VerifyPassword from '../auth/VerifyPassword';

const ForgotPassword2 = () => (
  <PageContainer title="forgotPassword" description="this is forgotPassword page">
    <Box
      sx={{
        position: 'relative',
        '&:before': {
          content: '""',
          background: 'url(/img/about-bg.jpg) no-repeat fixed',
          backgroundSize: '110% 110%',
          animation: 'gradient 15s ease infinite',
          position: 'absolute',
          height: '100%',
          width: '100%',
          opacity: '0.3',
        },
      }}
    >
      <Grid
        container
        spacing={0}
        justifyContent="center"
        sx={{ height: '100vh' }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          lg={4}
          xl={3}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Card
            elevation={9}
            sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '500px' }}
          >
            <Box display="flex" alignItems="center" justifyContent="center">
              <Logo />
            </Box>
            <VerifyPassword
              subtext={
                <Typography
                  variant="subtitle1"
                  textAlign="center"
                  color="textSecondary"
                  mb={1}
                >
                  Nhập mã xác nhập đã gửi về mail
                </Typography>
              }
              subtitle={
                <Stack
                  direction="row"
                  justifyContent="center"
                  spacing={1}
                  mt={3}
                >
                  <Typography
                    color="textSecondary"
                    fontWeight="400"
                  >
                    Chưa nhập được mã?
                  </Typography>
                  <Typography
                    component={Link}
                    href="#"
                    fontWeight="500"
                    sx={{
                      textDecoration: 'none',
                      color: 'primary',
                    }}
                  >
                    Gửi lại
                  </Typography>
                </Stack>
              }
            />
          </Card>
        </Grid>
      </Grid>
    </Box>
  </PageContainer>
);

export default ForgotPassword2;
