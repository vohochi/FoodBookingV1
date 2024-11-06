'use client';
import { useState, useEffect } from 'react';
import { Box, Button, Grid, TextField, Modal, Typography, Link } from '@mui/material';
import { Email as EmailIcon } from '@mui/icons-material';

const ChangePass = () => {
    const [email, setEmail] = useState('');
    const [timer, setTimer] = useState(60); // Bộ đếm thời gian (giây)
    const [isTimeExpired, setIsTimeExpired] = useState(false);
    const [verificationCode, setVerificationCode] = useState(Array(6).fill(''));
    const [isCodeValid, setIsCodeValid] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const handleSendEmail = () => {
        console.log('Gửi email');
        setIsTimeExpired(false);
        setTimer(90);
    };

    useEffect(() => {
        if (timer === 0) {
            setIsTimeExpired(true);
            return;
        }

        if (!isTimeExpired) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [timer, isTimeExpired]);

    const handleVerificationCodeChange = (index: number, value: string) => {
        const updatedCode = [...verificationCode];
        updatedCode[index] = value;
        setVerificationCode(updatedCode);

        if (updatedCode.join('') === '123456') {
            setIsCodeValid(true);
        } else {
            setIsCodeValid(false);
        }
    };

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

    return (
        <Box sx={{ width: '100%', p: 3 }}>
            <Grid container spacing={3} className="border p-3 center">
                <Grid item md={6} xs={12} textAlign="center">
                    <Box sx={{ mb: 3 }}>
                        <TextField
                            label="Nhập email"
                            variant="outlined"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            InputProps={{
                                endAdornment: <EmailIcon />
                            }}
                            InputLabelProps={{
                                sx: {
                                    color: '#1a285a',
                                    '&.Mui-focused': {
                                        color: '#1a285a',
                                    },
                                },
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#1a285a',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#1a285a',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#1a285a',
                                    },
                                },
                            }}
                        />
                    </Box>

                    <Grid container spacing={3} alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
                        <Grid item>
                            <Box className="text-dark">
                                {!isTimeExpired ? (
                                    <Typography variant="body2">
                                        Thời gian còn lại: {timer}s
                                    </Typography>
                                ) : (
                                    <Typography variant="body2" color="error">
                                        Mã hết hiệu lực!
                                    </Typography>
                                )}
                                {isTimeExpired && (
                                    <Typography variant="body2" color="danger" onClick={handleSendEmail}>
                                        Gửi lại email
                                    </Typography>
                                )}
                            </Box>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                className='btn btn-product'
                                onClick={handleSendEmail}
                            >
                                Gửi email
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} sx={{ mb: 3 }}>
                        {verificationCode.map((code, index) => (
                            <Grid item key={index} xs={2}>
                                <TextField
                                    variant="outlined"
                                    value={code}
                                    onChange={(e) => handleVerificationCodeChange(index, e.target.value)}
                                    inputProps={{ maxLength: 1, style: { textAlign: 'center' } }}
                                    fullWidth
                                    InputLabelProps={{
                                        sx: {
                                            color: '#1a285a',
                                            '&.Mui-focused': {
                                                color: '#1a285a',
                                            },
                                        },
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: 'rgba(26, 40, 90, 0.5)',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#1a285a',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#1a285a',
                                            },
                                        }
                                    }}
                                />
                            </Grid>
                        ))}
                    </Grid>

                    <Button
                        variant="contained"
                        className='btn btn-product'
                        onClick={handleOpenModal}
                        disabled={!isCodeValid}
                    >
                        Đổi mật khẩu
                    </Button>
                </Grid>
            </Grid>

            {/* Modal đổi mật khẩu */}
            <Modal open={modalOpen} onClose={handleCloseModal}>
                <Box
                    sx={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'white',
                        p: 3,
                        borderRadius: 2,
                        boxShadow: 3,
                        width: 400,
                    }}
                >
                    <Typography variant="h6" sx={{ mb: 2 }} className='text-dark'>
                        Đổi mật khẩu
                    </Typography>
                    <TextField
                        label="Mật khẩu cũ"
                        type="password"
                        variant="outlined"
                        fullWidth
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        InputLabelProps={{
                            sx: {
                                color: '#1a285a',
                                '&.Mui-focused': {
                                    color: '#1a285a',
                                },
                            },
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'rgba(26, 40, 90, 0.5)',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#1a285a',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#1a285a',
                                },
                            },
                            mb: 2
                        }}
                    />
                    <TextField
                        label="Mật khẩu mới"
                        type="password"
                        variant="outlined"
                        fullWidth
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        InputLabelProps={{
                            sx: {
                                color: '#1a285a',
                                '&.Mui-focused': {
                                    color: '#1a285a',
                                },
                            },
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'rgba(26, 40, 90, 0.5)',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#1a285a',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#1a285a',
                                },
                            },
                            mb: 2
                        }}
                    />
                    <TextField
                        label="Nhập lại mật khẩu mới"
                        type="password"
                        variant="outlined"
                        fullWidth
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        InputLabelProps={{
                            sx: {
                                color: '#1a285a',
                                '&.Mui-focused': {
                                    color: '#1a285a',
                                },
                            },
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'rgba(26, 40, 90, 0.5)',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#1a285a',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#1a285a',
                                },
                            },
                            mb: 2
                        }}
                    />
                    <Button
                        variant="contained"
                        className='btn btn-product'
                        fullWidth
                        onClick={handleCloseModal}
                        disabled={newPassword !== confirmNewPassword}
                    >
                        Đổi mật khẩu
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
};

export default ChangePass;
