import '@/app/_styles/globals.css';

import 'bootstrap-icons/font/bootstrap-icons.css';
import 'boxicons/css/boxicons.min.css';
import 'font-awesome/css/font-awesome.min.css';

import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import Link from 'next/link';

import CustomTextField from '@/_components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';

interface registerType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

const AuthRegister = ({ title, subtitle, subtext }: registerType) => (
  <>
    {title ? (
      <Typography fontWeight="700" variant="h2" mb={1}>
        {title}
      </Typography>
    ) : null}

    {subtext}

    <Box>
      <Stack mb={3}>
        <Typography
          variant="subtitle1"
          fontWeight={600}
          component="label"
          htmlFor="email"
          mb="5px"
        >
          Email
        </Typography>
        <CustomTextField id="email" type='email' variant="outlined" fullWidth InputProps={{
          sx: {
            '&.Mui-focused fieldset': {
              borderColor: '#cda45e !important',
            },
          },
        }} />

        <Typography
          variant="subtitle1"
          fontWeight={600}
          component="label"
          htmlFor="password"
          mb="5px"
          mt="25px"
        >
          Mật khẩu
        </Typography>
        <CustomTextField id="password" type='pasword' variant="outlined" fullWidth InputProps={{
          sx: {
            '&.Mui-focused fieldset': {
              borderColor: '#cda45e !important',
            },
          },
        }} />

        <Typography
          variant="subtitle1"
          fontWeight={600}
          component="label"
          htmlFor="re-password"
          mb="5px"
          mt="25px"
        >
          Password
        </Typography>
        <CustomTextField id="re-password" type='password' variant="outlined" fullWidth InputProps={{
          sx: {
            '&.Mui-focused fieldset': {
              borderColor: '#cda45e !important',
            },
          },
        }} />
      </Stack>
      <Button
        className="btn-success"
        variant="contained"
        size="large"
        fullWidth
        component={Link}
        href="/authentication/login"
        style={{
          color: '#fff',
        }}
      >
        Đăng ký
      </Button>
    </Box>
    {subtitle}
  </>
);

export default AuthRegister;
