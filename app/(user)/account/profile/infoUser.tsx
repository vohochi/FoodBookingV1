import { useEffect, useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { TextField, Button, Grid, IconButton, Box, Tab, Tabs } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import { InputProps as MuiInputProps } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { removeUserAddress, updateUserAddress, updateUserProfile } from '@/_lib/profile';
import { setProfile } from '@/store/slice/profileSlice';
import Image from 'next/image';
// import { Address } from '@/types/User';
import { Address } from '@/store/slice/profileSlice';
import SnackbarNotification from '@/_components/SnackbarAlert';

// Validation helper functions
const validateFullName = (name: string) => {
    const nameRegex = /^[a-zA-ZÀ-ỹ\s]{2,}$/;
    return name.trim().split(/\s+/).length >= 2 && nameRegex.test(name);
};

const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^\+?(\(?\d{3}\)?[-\s.]?\d{3}[-\s.]?\d{4,6})$/;
    return phoneRegex.test(phone);
};

const validateAddress = (address: string) => {
    return address.length >= 10;
};

// Input Field Component
interface InputFieldParams {
    label: string;
    name: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    defaultValue?: string;
    sx?: React.CSSProperties;
    error?: boolean;
    helperText?: string;
    InputProps?: MuiInputProps;
}

const InputField = ({ label, value, onChange, sx, error, helperText, ...props }: InputFieldParams) => (
    <TextField
        label={label}
        variant="outlined"
        fullWidth
        value={value}
        onChange={onChange}
        error={error}
        helperText={helperText}
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
    const dispatch = useDispatch();

    // Initial state from Redux
    const avatarInitial = useSelector((state: RootState) => state.profile.avatar);
    const fullnameInitial = useSelector((state: RootState) => state.profile.fullname);
    const emailInitial = useSelector((state: RootState) => state.profile.email);
    const addressInitial = useSelector((state: RootState) => state.profile.address);
    const profile = useSelector((state: RootState) => state.profile);

    // State hooks
    const [avatar, setAvatar] = useState<File | string>(avatarInitial);
    const [fullname, setFullname] = useState(fullnameInitial);
    const [email, setEmail] = useState(emailInitial);
    const [address, setAddress] = useState<Address[]>(Array.isArray(addressInitial) ? addressInitial : []);

    const [activeTabInfo, setActiveTabInfo] = useState(0);
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('success');

    useEffect(() => {
        if (avatarInitial) {
            setAvatar(avatarInitial);
        }
        if (fullnameInitial) {
            setFullname(fullnameInitial);
        }
        if (emailInitial) {
            setEmail(emailInitial);
        }
        if (Array.isArray(addressInitial)) {
            setAddress(addressInitial);
        } else {
            setAddress([]);
        }
    }, [avatarInitial, fullnameInitial, emailInitial, addressInitial]);

    // Avatar change handler
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setAvatar(file);
        }
    };

    // Add new address field
    const addOrderField = () => {
        if (address.length < 3) {
            const newAddress = {
                address: '',
                phone: '',
                receiver: ''
            };
            setAddress([...address, newAddress]);
            setActiveTabInfo(address.length);
        }
    };

    // Remove address field
    const removeOrderField = async (index: number) => {
        try {
            const addressToRemove = address[index];

            if (address.length > 0 && addressToRemove) {
                if (addressToRemove._id) {
                    await removeUserAddress(addressToRemove._id);
                }

                const updatedOrders = address.filter((_, i) => i !== index);
                setAddress(updatedOrders);

                if (activeTabInfo >= updatedOrders.length) {
                    setActiveTabInfo(updatedOrders.length - 1);
                }

                dispatch(setProfile({
                    ...profile,
                    address: updatedOrders
                }));
            }
        } catch (error) {
            console.error('Error removing address:', error);
        }
    };

    // Handle individual address field changes
    const handleOrderChange = (index: number, field: keyof typeof address[0], value: string) => {
        const updatedOrders = address.map((order, i) => {
            if (i === index) {
                return { ...order, [field]: value };
            }
            return order;
        });
        setAddress(updatedOrders);
    };

    // Comprehensive form validation
    const validate = () => {
        const errors: { [key: string]: string } = {};

        // Validate Full Name
        if (!fullname) {
            errors.fullname = 'Họ và tên không được để trống.';
        } else if (!validateFullName(fullname)) {
            errors.fullname = 'Họ và tên phải bao gồm cả họ và tên và không chứa ký tự đặc biệt.';
        }

        // Validate Email
        if (!email) {
            errors.email = 'Email không được để trống.';
        } else if (!validateEmail(email)) {
            errors.email = 'Định dạng email không hợp lệ.';
        }

        // Validate Address
        if (address.length === 0) {
            errors.address = 'Vui lòng thêm ít nhất một địa chỉ.';
        }

        address.forEach((order, index) => {
            if (!order.receiver) {
                errors[`receiver${index}`] = `Người nhận ${index + 1} không được để trống.`;
            } else if (!validateFullName(order.receiver)) {
                errors[`receiver${index}`] = `Người nhận ${index + 1} không hợp lệ. Phải bao gồm cả họ và tên và không chứa ký tự đặc biệt.`;
            }

            if (!order.phone) {
                errors[`phone${index}`] = `Số điện thoại ${index + 1} không được để trống.`;
            } else if (!validatePhoneNumber(order.phone)) {
                errors[`phone${index}`] = `Số điện thoại ${index + 1} không hợp lệ. Phải bắt đầu bằng 0 và có 10-11 chữ số.`;
            }

            if (!order.address) {
                errors[`address${index}`] = `Địa chỉ ${index + 1} không được để trống.`;
            } else if (!validateAddress(order.address)) {
                errors[`address${index}`] = `Địa chỉ ${index + 1} phải chi tiết hơn (ít nhất 10 ký tự).`;
            }
        });

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Profile update handler
    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) {
            return;
        }
        try {
            if (address.length === 0) {
                throw new Error('Vui lòng thêm ít nhất một địa chỉ.');
            }

            const updatedProfile = {
                fullname,
                email,
                avatar,
                address: profile.address,
                role: profile.role,
                isVerified: profile.isVerified,
            };

            const addressList = address.map(addr => ({
                _id: addr._id,
                receiver: addr.receiver,
                phone: addr.phone,
                address: addr.address
            }));

            const [profileResponse, addressResponse] = await Promise.all([
                updateUserProfile(updatedProfile),
                updateUserAddress(addressList)
            ]);

            if (profileResponse.message === 'Profile updated successfully') {
                const updatedUserProfile = {
                    ...updatedProfile,
                    address: addressResponse.addresses || addressList,
                };
                dispatch(setProfile(updatedUserProfile));
                setTimeout(() => {
                    setSnackbarMessage(`Đã cập nhật hồ sơ`);
                    setSnackbarSeverity('success');
                    setSnackbarOpen(true);
                }, 0);
                console.log('Profile and address updated successfully');
            }

        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    // Render component
    return (
        <Box sx={{ width: '100%', p: 6 }} className='border shadow'>
            <form onSubmit={handleUpdateProfile}>
                <Grid container>
                    {/* Avatar Section */}
                    <Grid item md={4} xs={12} gap={3} textAlign="center">
                        <Box
                            sx={{
                                position: 'relative',
                                display: 'inline-block',
                                '&:hover .icon-change-img': { display: 'block' },
                                '&:hover img': { opacity: 0.6 },
                                mb: 3
                            }}
                            className="img-info"
                        >
                            <Image
                                src={avatar ? (typeof avatar === 'string' ? avatar : URL.createObjectURL(avatar)) : `${process.env.NEXT_PUBLIC_DOMAIN_BACKEND}/images/default.png`}
                                alt="Avatar"
                                className="img-fluid"
                                width={250}
                                height={250}
                                style={{
                                    borderRadius: '5px',
                                    maxHeight: '150px',
                                    objectFit: 'cover',
                                    transition: 'opacity 0.3s ease',
                                }}
                            />
                            <IconButton
                                onClick={() => document.getElementById('avatar-input')?.click()}
                                sx={{
                                    position: 'absolute',
                                    width: '50px',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                    color: 'white',
                                    display: 'none',
                                    '&:hover': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                    },
                                }}
                                className="icon-change-img"
                            >
                                <EditIcon />
                            </IconButton>
                            <input
                                type="file"
                                id="avatar-input"
                                accept="image/*"
                                hidden
                                onChange={handleAvatarChange}
                            />
                        </Box>
                    </Grid>

                    {/* Personal Info Section */}
                    <Grid item md={8} xs={12}>
                        <InputField
                            label="Họ và tên"
                            name="fullname"
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                            error={!!formErrors.fullname}
                            helperText={formErrors.fullname}
                        />
                        <InputField
                            label="Email"
                            name='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>

                    {/* Address Section */}
                    <Grid item md={12} xs={12} sx={{ mt: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                            <Tabs
                                value={activeTabInfo}
                                onChange={(e, newValue) => setActiveTabInfo(newValue)}
                                aria-label="Thông tin nhận đơn"
                                variant="scrollable"
                                scrollButtons="auto"
                                sx={{
                                    mb: 3,
                                }}
                                TabIndicatorProps={{
                                    style: {
                                        backgroundColor: '#1a285a',
                                    },
                                }}
                            >
                                {Array.isArray(address) && address.map((_, index) => (
                                    <Tab
                                        key={index}
                                        sx={{
                                            marginLeft: 2,
                                            padding: 0,
                                            '&.Mui-selected': {
                                                color: '#1a285a',
                                            },
                                        }}
                                        label={
                                            <Box sx={{ display: 'flex', alignItems: 'center' }} >
                                                {`Thông tin nhận đơn ${index + 1}`}
                                                <IconButton onClick={() => removeOrderField(index)} sx={{ ml: 1 }}>
                                                    <FaMinus fontSize="small" />
                                                </IconButton>
                                            </Box>
                                        }
                                    />
                                ))}
                            </Tabs>

                            <Button onClick={addOrderField} className='btn btn-product2' disabled={address.length === 3}>
                                {address.length === 0 ? 'Thêm địa chỉ nhận hàng' : <FaPlus />}
                            </Button>
                        </Box>
                        {address.map((order, index) => (
                            <Box key={index} sx={{ display: index === activeTabInfo ? 'block' : 'none' }}>
                                <InputField
                                    label={`Người nhận ${index + 1}`}
                                    name="receiver"
                                    value={order.receiver}
                                    onChange={(e) => handleOrderChange(index, 'receiver', e.target.value)}
                                    error={!!formErrors[`receiver${index}`]}
                                    helperText={formErrors[`receiver${index}`]}
                                />
                                <InputField
                                    label={`Số điện thoại ${index + 1}`}
                                    name="phone"
                                    value={order.phone}
                                    onChange={(e) => handleOrderChange(index, 'phone', e.target.value)}
                                    error={!!formErrors[`phone${index}`]}
                                    helperText={formErrors[`phone${index}`]}
                                />
                                <InputField
                                    label={`Địa chỉ ${index + 1}`}
                                    name="address"
                                    value={order.address}
                                    onChange={(e) => handleOrderChange(index, 'address', e.target.value)}
                                    error={!!formErrors[`address${index}`]}
                                    helperText={formErrors[`address${index}`]}
                                />
                            </Box>
                        ))}
                    </Grid>

                    <Grid item md={12} xs={12} sx={{ mt: 4 }}>
                        <Button className='btn btn-product' type="submit" variant="contained" color="primary" fullWidth sx={{ py: 1 }}>
                            Lưu thông tin
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <SnackbarNotification
                snackbarOpen={snackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}
                snackbarOnclose={() => setSnackbarOpen(false)}
            />
        </Box>
    );
};

export default InfoUser;
