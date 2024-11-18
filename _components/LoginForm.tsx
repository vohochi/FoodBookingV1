'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import ForgotPassword from '@/_components/ForgotPassword';
// import { SitemarkIcon } from '@/layout/shared-theme/CustomIcons';
import AppTheme from '@/layout/shared-theme/AppTheme';
import ColorModeSelect from '@/layout/shared-theme/ColorModeSelect';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { loginUser } from '@/store/slice/authSlice';
import { signFacebook, signGoogle } from '@/_lib/actions';
import GoogleSignButton from '@/_components/GoogleSignButtom';
import FacebookSignButton from '@/_components/FacebookButtom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// Styled components
const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...(theme.palette.mode === 'dark'
    ? {
        boxShadow:
          'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
      }
    : {}),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...(theme.palette.mode === 'dark'
      ? {
          backgroundImage:
            'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
        }
      : {}),
  },
}));

export default function SignIn() {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false); // State to manage password visibility

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (emailError || passwordError) {
      return;
    }
    const data = new FormData(event.currentTarget);
    const userData = {
      email: data.get('email') as string,
      password: data.get('password') as string,
    };

    try {
      const response = await dispatch(loginUser(userData) as any);
      console.log(response);

      if (response.payload.token) {
        toast.success('Đăng nhập thành công!');
        router.push('/user');
      } else {
        // Hiển thị lỗi trên cả hai trường input
        setEmailError(true);
        setEmailErrorMessage('Vui lòng thử lại');
        setPasswordError(true);
        setPasswordErrorMessage('Vui tlòng thử lại');
        toast.error('Email hoặc mật khẩu của bạn không chính xác');
      }
    } catch (error) {
      console.error('Error during login:', error);
      // Hiển thị lỗi trên cả hai trường input
      setEmailError(true);
      setEmailErrorMessage('Email hoặc mật khẩu không chính xác');
      setPasswordError(true);
      setPasswordErrorMessage('Email hoặc mật khẩu không chính xác');
      toast.error('Đăng nhập thất bại. Vui lòng thử lại sau.');
    }
  };

  const validateInputs = () => {
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Vui lòng nhập địa chỉ email hợp lệ.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Mật khẩu phải dài ít nhất 6 ký tự.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        <ColorModeSelect
          sx={{ position: 'fixed', top: '1rem', right: '1rem' }}
        />
        <Card variant="outlined">
          {/* <SitemarkIcon /> */}
          <Typography
            component="h1"
            variant="h4"
            sx={{
              width: '100%',
              fontSize: 'clamp(2rem, 10vw, 2.15rem)',
              textAlign: 'center',
            }}
          >
            Đăng nhập
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={emailError ? 'error' : 'primary'}
                sx={{ ariaLabel: 'email' }}
              />
            </FormControl>
            <FormControl>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <FormLabel htmlFor="password">Mật khẩu</FormLabel>
                <Link
                  component="button"
                  type="button"
                  onClick={handleClickOpen}
                  variant="body2"
                  sx={{ alignSelf: 'baseline' }}
                >
                  Quên mật khẩu?
                </Link>
              </Box>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••"
                type={showPassword ? 'text' : 'password'} // Toggle between text and password
                id="password"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={passwordError ? 'error' : 'primary'}
                InputProps={{
                  endAdornment: (
                    <div
                      style={{ cursor: 'pointer' }}
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}{' '}
                      {/* Show or hide icon */}
                    </div>
                  ),
                }}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Ghi nhớ tôi"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Đăng nhập
            </Button>
            <Typography sx={{ textAlign: 'center' }}>
              Bạn chưa có tài khoản?{' '}
              <span>
                <Link
                  href="/auth/register"
                  variant="body2"
                  sx={{ alignSelf: 'center' }}
                >
                  Đăng ký
                </Link>
              </span>
            </Typography>
          </Box>
          <Divider>hoặc</Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <form action={signGoogle}>
              <GoogleSignButton />
            </form>
            <form action={signFacebook}>
              <FacebookSignButton />
            </form>
          </Box>
        </Card>
        <ForgotPassword open={open} handleClose={handleClose} />
      </SignInContainer>
    </AppTheme>
  );
}
