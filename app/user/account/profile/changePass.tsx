import React, { useState } from 'react';
import { Box, Button, TextField, IconButton, Grid, ListItem, List, ListItemText } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { changePassword } from '@/store/slice/authSlice';
import { AppDispatch } from '@/store';
import SnackbarNotification from '@/_components/SnackbarAlert';

interface ValidationErrors {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
    verificationCode: string;
}
interface ChangePasswordResponse {
    message: string;
    success?: boolean;
}


const ChangePass = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [verificationCode, setVerificationCode] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState<'success' | 'error'>('success');
    const [loading, setLoading] = useState(false);

    const [errors, setErrors] = useState<ValidationErrors>({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
        verificationCode: ''
    });

    const validateForm = (): boolean => {
        const newErrors: ValidationErrors = {
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: '',
            verificationCode: ''
        };

        let isValid = true;

        // Validate old password
        if (!oldPassword) {
            newErrors.oldPassword = 'Vui lòng nhập mật khẩu hiện tại';
            isValid = false;
        } else if (oldPassword.length < 6) {
            newErrors.oldPassword = 'Mật khẩu phải có ít nhất 6 ký tự';
            isValid = false;
        }

        // Validate new password
        if (!newPassword) {
            newErrors.newPassword = 'Vui lòng nhập mật khẩu mới';
            isValid = false;
        } else if (newPassword.length < 6) {
            newErrors.newPassword = 'Mật khẩu mới phải có ít nhất 6 ký tự';
            isValid = false;
        } else if (newPassword == oldPassword) {
            newErrors.newPassword = 'Mật khẩu mới không được giống với mật khẩu cũ';
            isValid = false;
        }

        if (!confirmNewPassword) {
            newErrors.confirmNewPassword = 'Vui lòng xác nhận mật khẩu mới';
            isValid = false;
        } else if (confirmNewPassword !== newPassword) {
            newErrors.confirmNewPassword = 'Mật khẩu xác nhận không khớp';
            isValid = false;
        }

        if (isCodeSent && (!verificationCode || verificationCode.length !== 6)) {
            newErrors.verificationCode = 'Mã xác minh phải có 6 số';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handlePasswordChange = async () => {
        if (!validateForm()) {
            return;
        }
        setLoading(true);
        try {
            const response = await dispatch(changePassword({
                currentPassword: oldPassword,
                newPassword: newPassword,
                confirmPassword: confirmNewPassword,
                verificationCode: verificationCode
            }));

            if (response.meta.requestStatus === 'fulfilled') {
                const data = response.payload as ChangePasswordResponse;
                if (data.message === 'Current password is incorrect') {
                    setIsCodeSent(false);
                    setMessage('Mật khẩu cũ không chính xác');
                    setSeverity('error');
                } else if (data.message === 'Invalid verification code') {
                    setIsCodeSent(true);
                    setMessage('Mã xác minh không chính xác! Vui lòng thử lại');
                    setSeverity('error');
                } else if (data.message === 'Verification code has been sent to your email') {
                    setIsCodeSent(true);
                    setMessage('Mã xác minh đã được gửi đến email của bạn');
                    setSeverity('success');
                } else if (data.message === 'Change password successfully !') {
                    setMessage('Đổi mật khẩu thành công!');
                    setSeverity('success');
                    setOldPassword('');
                    setNewPassword('');
                    setConfirmNewPassword('');
                    setVerificationCode('');
                    setIsCodeSent(false);
                }
            } else {
                const error = response.payload as ChangePasswordResponse;
                setMessage(error?.message || 'Đã xảy ra lỗi. Vui lòng thử lại');
                setSeverity('error');
            }
        } catch (error) {
            const errorMessage = (error as Error).message || 'Đã xảy ra lỗi. Vui lòng thử lại';
            setMessage(errorMessage);
            setSeverity('error');
        } finally {
            setLoading(false);
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const renderPasswordField = (
        label: string,
        name: string,
        value: string,
        setter: React.Dispatch<React.SetStateAction<string>>,
        show: boolean,
        toggleShow: React.Dispatch<React.SetStateAction<boolean>>,
        error: string
    ) => (
        <Box sx={{ mb: 3 }}>
            <TextField
                error={!!error}
                helperText={error}
                label={label}
                name={name}
                variant="outlined"
                fullWidth
                type={show ? "text" : "password"}
                value={value}
                onChange={(e) => setter(e.target.value)}
                disabled={loading}
                InputLabelProps={{
                    sx: {
                        color: error ? 'error.main' : '#1a285a',
                        '&.Mui-focused': {
                            color: error ? 'error.main' : '#1a285a',
                        },
                    },
                }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: error ? 'error.main' : '#1a285a',
                        },
                        '&:hover fieldset': {
                            borderColor: error ? 'error.main' : '#1a285a',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: error ? 'error.main' : '#1a285a',
                        },
                    },
                }}
                InputProps={{
                    endAdornment: (
                        <IconButton onClick={() => toggleShow((prev) => !prev)} disabled={loading}>
                            {show ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    ),
                }}
            />
        </Box>
    );

    return (
        <Box sx={{ width: '100%', p: 0 }}>
            <SnackbarNotification
                snackbarOpen={openSnackbar}
                message={message}
                severity={severity}
                snackbarOnclose={handleCloseSnackbar}
            />
            <Grid container spacing={4}>
                <Grid item md={6} xs={12} textAlign="center">
                    {renderPasswordField(
                        "Nhập mật khẩu cũ",
                        "currentPassword",
                        oldPassword,
                        setOldPassword,
                        showOldPassword,
                        setShowOldPassword,
                        errors.oldPassword
                    )}
                    {renderPasswordField(
                        "Nhập mật khẩu mới",
                        "newPassword",
                        newPassword,
                        setNewPassword,
                        showNewPassword,
                        setShowNewPassword,
                        errors.newPassword
                    )}
                    {renderPasswordField(
                        "Nhập lại mật khẩu mới",
                        "reNewPassword",
                        confirmNewPassword,
                        setConfirmNewPassword,
                        showConfirmPassword,
                        setShowConfirmPassword,
                        errors.confirmNewPassword
                    )}

                    {isCodeSent && (
                        <Grid container spacing={3} alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
                            <Grid item xs={12}>
                                <TextField
                                    error={!!errors.verificationCode}
                                    helperText={errors.verificationCode}
                                    label="Nhập mã xác minh"
                                    name="verificationCode"
                                    variant="outlined"
                                    fullWidth
                                    value={verificationCode}
                                    onChange={(e) => setVerificationCode(e.target.value)}
                                    disabled={loading}
                                    InputLabelProps={{
                                        sx: {
                                            color: errors.verificationCode ? 'error.main' : '#1a285a',
                                            '&.Mui-focused': {
                                                color: errors.verificationCode ? 'error.main' : '#1a285a',
                                            },
                                        },
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: errors.verificationCode ? 'error.main' : '#1a285a',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: errors.verificationCode ? 'error.main' : '#1a285a',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: errors.verificationCode ? 'error.main' : '#1a285a',
                                            },
                                        },
                                    }}
                                />
                            </Grid>
                        </Grid>
                    )}

                    <Button
                        className='btn btn-product'
                        onClick={handlePasswordChange}
                        disabled={loading}
                    >
                        {isCodeSent ? 'Xác nhận đổi mật khẩu' : 'Gửi mã xác minh'}
                    </Button>
                </Grid>

                <Grid item md={6} xs={12} textAlign="start">
                    <Box sx={{ p: 0, color: '#101010' }}>
                        <h3 style={{ color: 'rgba(26, 40, 90, 1)' }}>Lưu ý khi đổi mật khẩu:</h3>
                        <List>
                            {[
                                "Mật khẩu mới phải có ít nhất 6 ký tự.",
                                "Mật khẩu mới nên chứa cả chữ cái và số.",
                                "Mật khẩu không được giống với mật khẩu cũ.",
                                "Đảm bảo rằng mã xác minh đã được gửi đến email của bạn.",
                                "Không đặt mật khẩu quá dễ đoán như ngày sinh, số điện thoại,...",
                                "Liên hệ 0899 924 244 để được hỗ trợ."
                            ].map((note, index) => (
                                <ListItem key={index}>
                                    <ListItemText primary={note} />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ChangePass;