'use client';
import { useState } from 'react';
import { Box, Button, Grid, TextField, IconButton, ListItem, ListItemText, List } from '@mui/material';
import { Email as EmailIcon, Visibility, VisibilityOff } from '@mui/icons-material';

const ChangePass = () => {
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [isCodeValid, setIsCodeValid] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleVerificationCodeChange = (value: string) => {
        setVerificationCode(value);
        setIsCodeValid(value === '123456');
    };

    const handlePasswordChange = () => {
        if (newPassword !== confirmNewPassword) {
            alert("Mật khẩu mới và xác nhận mật khẩu không khớp!");
        } else {
            console.log("Đổi mật khẩu thành công");
        }
    };

    const handleSendVerificationCode = () => {
        console.log("Mã xác minh đã được gửi đến email: " + email);
    };

    const renderPasswordField = (
        label: string,
        value: string,
        setter: React.Dispatch<React.SetStateAction<string>>,
        show: boolean,
        toggleShow: React.Dispatch<React.SetStateAction<boolean>>
    ) => (
        <Box sx={{ mb: 3 }}>
            <TextField
                label={label}
                variant="outlined"
                fullWidth
                type={show ? "text" : "password"}
                value={value}
                onChange={(e) => setter(e.target.value)}
                InputProps={{
                    endAdornment: (
                        <IconButton onClick={() => toggleShow((prev) => !prev)}>
                            {show ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    ),
                }}
            />
        </Box>
    );


    return (
        <Box sx={{ width: '100%', p: 0 }}>
            <Grid container spacing={4}>
                <Grid item md={6} xs={12} textAlign="center">
                    {renderPasswordField("Nhập mật khẩu cũ", oldPassword, setOldPassword, showOldPassword, setShowOldPassword)}
                    {renderPasswordField("Nhập mật khẩu mới", newPassword, setNewPassword, showNewPassword, setShowNewPassword)}
                    {renderPasswordField("Nhập lại mật khẩu mới", confirmNewPassword, setConfirmNewPassword, showConfirmPassword, setShowConfirmPassword)}

                    <TextField
                        label="Nhập email"
                        variant="outlined"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        InputProps={{ endAdornment: <EmailIcon style={{ color: 'rgba(26, 40, 90, 0.8)' }} /> }}
                        sx={{ mb: 3 }}
                    />
                    <Grid container spacing={3} alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
                        <Grid item md={8} xs={12}>
                            <TextField
                                label="Nhập mã xác minh"
                                variant="outlined"
                                fullWidth
                                value={verificationCode}
                                onChange={(e) => handleVerificationCodeChange(e.target.value)}
                            />
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <Button className='btn btn-product2' onClick={handleSendVerificationCode} disabled={!email}>
                                Gửi mã
                            </Button>
                        </Grid>
                    </Grid>
                    <Button
                        className='btn btn-product'
                        onClick={handlePasswordChange}
                        disabled={newPassword !== confirmNewPassword || !isCodeValid}
                    >
                        Đổi mật khẩu
                    </Button>
                </Grid>

                <Grid item md={6} xs={12} textAlign="start">
                    <Box sx={{ p: 0, color: '#101010' }}>
                        <h3 style={{ color: 'rgba(26, 40, 90, 1)' }}>Lưu ý khi đổi mật khẩu:</h3>
                        <List>
                            {[
                                "Mật khẩu mới phải có ít nhất 8 ký tự.",
                                "Mật khẩu mới phải chứa cả chữ cái và số.",
                                "Mật khẩu không được giống với mật khẩu cũ.",
                                "Đảm bảo rằng mã xác minh đã được gửi đến email của bạn.",
                                "Không đặt mật khẩu quá dễ đoán như ngày sinh, số điện thoại,...",
                                "Liên hệ 0123456789 để được hỗ trợ."
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
