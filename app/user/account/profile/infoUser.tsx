import { useEffect, useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { TextField, Button, Grid, IconButton, Box, Tab, Tabs } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { removeUserAddress, updateUserAddress, updateUserProfile } from '@/_lib/profile';
import { setProfile } from '@/store/slice/profileSlice';
import Image from 'next/image';
import { Address } from '@/types/User';

interface InputFieldParams {
    label: string;
    name: string;
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
    const dispatch = useDispatch();

    const avatarInitial = useSelector((state: RootState) => state.profile.avatar);
    const fullnameInitial = useSelector((state: RootState) => state.profile.fullname);
    const emailInitial = useSelector((state: RootState) => state.profile.email);
    const addressInitial = useSelector((state: RootState) => state.profile.address);

    const [avatar, setAvatar] = useState<File | string>(avatarInitial);
    const [fullname, setFullname] = useState(fullnameInitial);
    const [email, setEmail] = useState(emailInitial);
    const [address, setAddress] = useState<Address[]>(Array.isArray(addressInitial) ? addressInitial : []);
    const [activeTabInfo, setActiveTabInfo] = useState(0);
    console.log('avt: ', avatar);

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

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setAvatar(file);
        }
    };

    const addOrderField = () => {
        if (address.length < 3) {
            const newAddress = { address: '', phone: '', receiver: '' };
            setAddress([...address, newAddress]);
            setActiveTabInfo(address.length);
        }
    };


    const removeOrderField = async (index: number) => {
        try {
            const addressToRemove = address[index];

            if (address.length > 1 && addressToRemove) {
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

    const handleOrderChange = (index: number, field: keyof typeof address[0], value: string) => {
        const updatedOrders = address.map((order, i) => {
            if (i === index) {
                return { ...order, [field]: value };
            }
            return order;
        });
        setAddress(updatedOrders);
    };


    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (address.length === 0) {
                throw new Error('Vui lòng thêm ít nhất một địa chỉ.');
            }

            const updatedProfile = {
                fullname,
                email,
                avatar,
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
                console.log('Profile and address updated successfully');
            }

        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };


    return (
        <Box sx={{ width: '100%', p: 6 }} className='border shadow'>
            <form onSubmit={handleUpdateProfile}>
                <Grid container className="">
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
                                src={avatar ? avatar : `${process.env.NEXT_PUBLIC_DOMAIN_BACKEND}/images/default.png`}
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


                    <Grid item md={8} xs={12}>
                        <InputField label="Họ và tên" name="fullname" value={fullname} onChange={(e) => setFullname(e.target.value)} />
                        <InputField label="Email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} readonly />
                    </Grid>

                    <Grid item md={12} xs={12} sx={{ mt: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                            <Tabs
                                value={activeTabInfo}
                                onChange={(e, newValue) => setActiveTabInfo(newValue)}
                                aria-label="Thông tin nhận đơn"
                                variant="scrollable"
                                scrollButtons="auto"
                                sx={{ mb: 3 }}
                            >
                                {Array.isArray(address) && address.map((_, index) => (
                                    <Tab
                                        key={index}
                                        sx={{ marginLeft: 2, padding: 0 }}
                                        label={
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                                <FaPlus />
                            </Button>
                        </Box>

                        {address.map((order, index) => (
                            <Box key={index} sx={{ display: index === activeTabInfo ? 'block' : 'none' }}>
                                <InputField
                                    label={`Người nhận ${index + 1}`}
                                    name="receiver"
                                    value={order.receiver}
                                    onChange={(e) => handleOrderChange(index, 'receiver', e.target.value)}
                                />
                                <InputField
                                    label={`Số điện thoại ${index + 1}`}
                                    name="phone"
                                    value={order.phone}
                                    onChange={(e) => handleOrderChange(index, 'phone', e.target.value)}
                                />
                                <InputField
                                    label={`Địa chỉ ${index + 1}`}
                                    name="address"
                                    value={order.address}
                                    onChange={(e) => handleOrderChange(index, 'address', e.target.value)}
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
        </Box>
    );
};

export default InfoUser;
