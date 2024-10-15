import '@/app/_styles/globals.css';

import 'bootstrap-icons/font/bootstrap-icons.css';
import 'boxicons/css/boxicons.min.css';
import 'font-awesome/css/font-awesome.min.css';

import React from 'react';
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox
} from '@mui/material';
import Link from 'next/link';
import CustomTextField from '@/_components/forms/theme-elements/CustomTextField';

interface loginType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

const AuthLogin = ({ title, subtitle, subtext }: loginType) => (
  <>
    {title ? (
      <Typography >
        {title}
      </Typography>
    ) : null}

    {subtext}

    <Stack>
      <Box>
        <Typography
          variant="subtitle1"
          fontWeight={600}
          component="label"
          htmlFor="email"
          mb="5px"
        >
          Email
        </Typography>
        <CustomTextField
          type="email"
          variant="outlined"
          fullWidth
          InputProps={{
            sx: {
              '&.Mui-focused fieldset': {
                borderColor: '#cda45e !important',
              },
            },
          }}
        />
      </Box>
      <Box mt="25px">
        <Typography
          variant="subtitle1"
          fontWeight={600}
          component="label"
          htmlFor="password"
          mb="5px"
        >
          Mật khẩu
        </Typography>
        <CustomTextField
          type="password"
          variant="outlined"
          fullWidth
          InputProps={{
            sx: {
              '&.Mui-focused fieldset': {
                borderColor: '#cda45e !important',
              },
            },
          }}
        />
      </Box>
      <Stack
        justifyContent="space-between"
        direction="row"
        alignItems="center"
        my={2}
      >
        <FormGroup>
          <FormControlLabel
            control={<Checkbox
              defaultChecked
              sx={{
                '&.Mui-checked': {
                  color: '#cda45e',
                },
                '& .MuiSvgIcon-root': {
                  fontSize: 28,
                  borderRadius: '4px',
                },
              }} />}
            label="Ghi nhớ thiết bị này"
          />
        </FormGroup>
        <Typography
          component={Link}
          href="/"
          fontWeight="500"
          sx={{
            textDecoration: 'none',
          }}
        >
          Quên mật khẩu ?
        </Typography>
      </Stack>
    </Stack>
    <Box>
      <Button
        className='btn-success'
        fullWidth
        component={Link}
        href="/"
        type="submit"
        style={{
          color: '#fff',
        }}
      >
        Đăng nhập
      </Button>
    </Box>
    {subtitle}
  </>
);

export default AuthLogin;