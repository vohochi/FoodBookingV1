'use client';

import toast from 'react-hot-toast';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import AppTheme from '@/layout/shared-theme/AppTheme';
import { useDispatch } from 'react-redux';
import { registerUserSlice } from '@/store/slice/authSlice';
import { IUser } from '@/types/User';
import OTPVerificationModal from '@/_components/OTPVerificationModal';
export { GET, POST } from '@/_lib/auth';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import InputAdornment from '@mui/material/InputAdornment';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 130dvh)',
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
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function SignUp(props: { disableCustomTheme?: boolean }) {
  const [isOTPModalOpen, setIsOTPModalOpen] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [isVerifying, setIsVerifying] = React.useState(false);

  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');
  const [confirmPasswordError, setConfirmPasswordError] = React.useState(false);
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
    React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const dispatch = useDispatch();

  const validateInputs = () => {
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;
    const confirmPassword = document.getElementById(
      'confirmPassword'
    ) as HTMLInputElement;
    const name = document.getElementById('name') as HTMLInputElement;

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

    if (
      password.value &&
      confirmPassword.value &&
      password.value !== confirmPassword.value
    ) {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorMessage(
        'Mật khẩu và xác nhận mật khẩu không khớp.'
      );
      isValid = false;
    } else {
      setConfirmPasswordError(false);
      setConfirmPasswordErrorMessage('');
    }

    if (!name.value || name.value.length < 1) {
      setNameError(true);
      setNameErrorMessage('Tên được yêu cầu. ');
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage('');
    }

    return isValid;
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev: boolean) => !prev);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword((prev: boolean) => !prev);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (nameError || emailError || passwordError || confirmPasswordError) {
      return;
    }
    const data = new FormData(event.currentTarget);
    const userData: IUser = {
      fullname: data.get('name') as string,
      email: data.get('email') as string,
      password: data.get('password') as string,
    };

    console.log(userData);

    try {
      const response = await dispatch(registerUserSlice(userData) as any);

      if (response.payload.message === 'Email already exists') {
        setEmailError(true);
        setEmailErrorMessage('Email này đã được đăng ký');
        toast.error('Email này đã được đăng ký');
      } else {
        toast.success(
          'Email này đã được đăng ký thành công, vui lòng kiểm tra email để xác thực'
        );
        setEmail(userData.email!);
        setIsVerifying(true);
        setIsOTPModalOpen(true);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      toast.error('Đăng ký thất bại. Vui lòng thử lại sau.');
    }
  };

  const handleCloseOTPModal = () => {
    setIsOTPModalOpen(false);
    // Không set setIsVerifying(false) ở đây
  };

  const handleVerificationComplete = () => {
    setIsVerifying(false);
    // Có thể thêm logic khác ở đây, ví dụ như chuyển hướng người dùng
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Link href="/user" sx={{ position: 'fixed', top: '1rem', right: '1rem' }}>
        Quay trở lại trang chủ
      </Link>
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{
              width: '100%',
              fontSize: 'clamp(2rem, 10vw, 2.15rem)',
              textAlign: 'center',
            }}
          >
            Đăng ký{' '}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="name">Họ & tên</FormLabel>
              <TextField
                autoComplete="name"
                name="name"
                required
                fullWidth
                id="name"
                placeholder="Jon Snow"
                error={nameError}
                helperText={nameErrorMessage}
                color={nameError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                required
                fullWidth
                id="email"
                placeholder="your@email.com"
                name="email"
                autoComplete="email"
                variant="outlined"
                error={emailError}
                helperText={emailErrorMessage}
                color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="password">Mật khẩu</FormLabel>
              <TextField
                required
                fullWidth
                name="password"
                placeholder="••••••"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="new-password"
                variant="outlined"
                error={passwordError}
                helperText={passwordErrorMessage}
                color={passwordError ? 'error' : 'primary'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <div
                        style={{ cursor: 'pointer' }}
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </div>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="confirmPassword">Xác nhận mật khẩu</FormLabel>
              <TextField
                required
                fullWidth
                name="confirmPassword"
                placeholder="••••••"
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                autoComplete="new-password"
                variant="outlined"
                error={confirmPasswordError}
                helperText={confirmPasswordErrorMessage}
                color={confirmPasswordError ? 'error' : 'primary'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <div
                        aria-label="toggle confirm password visibility"
                        onClick={handleClickShowConfirmPassword}
                        style={{ cursor: 'pointer' }}
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </div>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="Tôi muốn nhận cập nhật qua email."
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Đăng ký
            </Button>
            <Typography sx={{ textAlign: 'center' }}>
              Đã có một tài khoản? {''}{' '}
              <span>
                <Link
                  href="/auth/login"
                  variant="body2"
                  sx={{ alignSelf: 'center' }}
                >
                  Đăng nhập
                </Link>
              </span>
            </Typography>
          </Box>
          <Divider>
            <Typography sx={{ color: 'text.secondary' }}>or</Typography>
          </Divider>

          {isVerifying && (
            <>
              <Typography color="warning.main" sx={{ mt: 2 }}>
                Bạn chưa hoàn tất xác thực tài khoản. Vui lòng xác thực để tiếp
                tục.
              </Typography>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => setIsOTPModalOpen(true)}
                sx={{ mt: 2 }}
              >
                Quay lại xác thực tài khoản
              </Button>
            </>
          )}
        </Card>
      </SignUpContainer>
      <OTPVerificationModal
        open={isOTPModalOpen}
        onClose={handleCloseOTPModal}
        email={email}
        onVerificationComplete={handleVerificationComplete}
      />
    </AppTheme>
  );
}
