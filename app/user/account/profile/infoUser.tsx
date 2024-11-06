'use client';
import { useState } from 'react';
import Image from 'next/image';
import { FaMinus } from 'react-icons/fa';
import { TextField, Button, Grid, IconButton, Box } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';

interface InputFieldParams {
    label: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    defaultValue?: string;
    sx?: React.CSSProperties;
}
const InputField = ({ label, value, onChange, sx, ...props }: InputFieldParams) => (
    <TextField
        label={label}
        variant="outlined"
        fullWidth
        value={value}
        onChange={onChange}
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
            mb: 3,
            ...sx,
        }}
        {...props}
    />
);

const InfoUser = () => {
    const [addresses, setAddresses] = useState(["tp HCM"]);

    const addAddressField = () => {
        if (addresses.length < 3) {
            setAddresses([...addresses, ""]);
        }
    };

    const removeAddressField = (index) => {
        const updatedAddresses = addresses.filter((_, i) => i !== index);
        setAddresses(updatedAddresses);
    };

    const handleAddressChange = (index, value) => {
        const updatedAddresses = [...addresses];
        updatedAddresses[index] = value;
        setAddresses(updatedAddresses);
    };

    return (
        <Box sx={{ width: '100%', p: 3 }}>
            <Grid container spacing={3} className="border shadow p-3">
                <Grid item md={4} xs={12} textAlign="center">
                    <Box sx={{ mb: 2 }}>
                        <Image
                            src="/img/chefs/chefs-1.jpg"
                            alt="Avatar"
                            className="img-fluid rounded-circle"
                            width={250}
                            height={250}
                        />
                    </Box>
                    <Button className="btn btn-product" startIcon={<EditIcon />} sx={{ textTransform: 'none' }}>
                        Thay đổi
                    </Button>
                </Grid>
                <Grid item md={8} xs={12}>
                    <form>
                        <InputField label="Họ và tên" defaultValue="Nguyễn Văn A" />
                        <InputField label="Email" defaultValue="nguyenvana@example.com" />
                        <InputField label="Số điện thoại" />
                        {addresses.map((address, index) => (
                            <Box key={index} sx={{ position: 'relative' }}>
                                <InputField
                                    label={`Địa chỉ ${index + 1}`}
                                    value={address}
                                    onChange={(e) => handleAddressChange(index, e.target.value)}
                                />
                                {index > 0 && (
                                    <IconButton
                                        onClick={() => removeAddressField(index)}
                                        sx={{
                                            position: 'absolute',
                                            top: '35%',
                                            right: '5px',
                                            transform: 'translateY(-50%)',
                                        }}
                                    >
                                        <FaMinus />
                                    </IconButton>
                                )}
                            </Box>
                        ))}
                        {addresses.length < 3 && (
                            <Button
                                variant="outlined"
                                sx={{ display: 'block', marginLeft: 'auto', mb: 2 }}
                                className="btn-product2"
                                onClick={addAddressField}
                            >
                                Thêm địa chỉ
                            </Button>
                        )}
                        <Button className="btn btn-product" fullWidth sx={{ mt: 2 }}>
                            Lưu thay đổi
                        </Button>
                    </form>
                </Grid>
            </Grid>
        </Box>
    );
};

export default InfoUser;
