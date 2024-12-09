import React, { useState, useEffect } from 'react';
import { FormLabel, Grid, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField } from '@mui/material';
import { styled } from '@mui/system';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Address } from '@/types/User';

// Styled component
const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function AddressForm({
  onAddressUpdate = () => { },
  onValidationChange = () => { },
}: {
  onAddressUpdate: (data: Address) => void;
  onValidationChange?: (isValid: boolean) => void;
}) {

  const emailInitial = useSelector((state: RootState) => state.profile.email);
  const addressInitial = useSelector((state: RootState) => state.profile.address);

  const [addresses, setAddresses] = useState<Address[]>(
    Array.isArray(addressInitial) ? addressInitial : addressInitial ? [addressInitial] : []
  );
  const [selectedAddress, setSelectedAddress] = useState<string>('other');
  const [customAddress, setCustomAddress] = useState<Address>({
    receiver: '',
    phone: '',
    address: '',
  });
  const [touched, setTouched] = useState({
    receiver: false,
    phone: false,
    address: false,
  });

  // Validation states
  const [validationErrors, setValidationErrors] = useState({
    receiver: false,
    phone: false,
    address: false,
  });

  const validateReceiver = (value: string) => {
    return value.trim().split(/\s+/).length >= 2;
  };

  const validatePhone = (value: string) => {
    const phoneRegex = /^\+?(\(?\d{3}\)?[-\s.]?\d{3}[-\s.]?\d{4,6})$/;
    return phoneRegex.test(value);
  };

  const validateAddress = (value: string) => {
    return value.trim().length >= 10;
  };

  const handleBlur = (field: keyof typeof touched) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  useEffect(() => {
    if (addressInitial) {
      setAddresses(Array.isArray(addressInitial) ? addressInitial : [addressInitial]);
    }
  }, [addressInitial]);

  // Validation effect
  useEffect(() => {
    const errors = {
      receiver: !validateReceiver(customAddress.receiver || ''),
      phone: !validatePhone(customAddress.phone || ''),
      address: !validateAddress(customAddress.address || ''),
    };

    setValidationErrors(errors);

    // Check if all fields are valid
    const isValid = !Object.values(errors).some(error => error);
    onValidationChange(isValid);

    // Update address for parent component
    onAddressUpdate(customAddress);
  }, [customAddress, onAddressUpdate, onValidationChange]);

  const handleAddressChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setSelectedAddress(value);

    if (value !== 'other') {
      const selected = addresses.find((addr: Address) => addr._id === value);
      setCustomAddress(selected || { receiver: '', phone: '', address: '' });
    } else {
      setCustomAddress({ receiver: '', phone: '', address: '' });
    }
  };

  const renderAddressFields = () => (
    <>
      <FormGrid item xs={6}>
        <FormLabel htmlFor="custom-receiver" required>
          Tên người nhận
        </FormLabel>
        <TextField
          id="custom-receiver"
          name="receiver"
          value={customAddress.receiver}
          onChange={(e) =>
            setCustomAddress({ ...customAddress, receiver: e.target.value })
          }
          onBlur={() => handleBlur('receiver')}
          placeholder="Nguyễn Văn A"
          required
          size="small"
          error={touched.receiver && validationErrors.receiver}
          helperText={touched.receiver && validationErrors.receiver ? "Vui lòng nhập cả họ và tên đầy đủ" : ""}
        />
      </FormGrid>
      <FormGrid item xs={6}>
        <FormLabel htmlFor="custom-phone" required>
          Điện thoại
        </FormLabel>
        <TextField
          id="custom-phone"
          name="phone"
          value={customAddress.phone}
          onChange={(e) =>
            setCustomAddress({ ...customAddress, phone: e.target.value })
          }
          onBlur={() => handleBlur('phone')}
          placeholder="0123456789"
          required
          size="small"
          error={touched.phone && validationErrors.phone}
          helperText={touched.phone && validationErrors.phone ? "Vui lòng nhập số điện thoại hợp lệ (10 số)" : ""}
        />
      </FormGrid>
      <FormGrid item xs={12}>
        <FormLabel htmlFor="custom-address" required>
          Địa chỉ
        </FormLabel>
        <TextField
          id="custom-address"
          name="address"
          value={customAddress.address}
          onChange={(e) =>
            setCustomAddress({ ...customAddress, address: e.target.value })
          }
          onBlur={() => handleBlur('address')}
          placeholder="Tên đường và số nhà"
          required
          size="small"
          error={touched.address && validationErrors.address}
          helperText={touched.address && validationErrors.address ? "Vui lòng nhập địa chỉ chi tiết (ít nhất 10 ký tự)" : ""}
        />
      </FormGrid>
    </>
  );

  return (
    <Grid container spacing={2}>
      <FormGrid item xs={12}>
        <FormLabel htmlFor="email" required>
          Địa chỉ email người nhận
        </FormLabel>
        <OutlinedInput
          id="email"
          name="email"
          type="email"
          value={emailInitial}
          autoComplete="email"
          size="small"
          readOnly
        />
      </FormGrid>

      <FormGrid item xs={12}>
        <FormLabel htmlFor="address-select" required>
          Chọn địa chỉ nhận hàng
        </FormLabel>
        <Select
          id="address-select"
          value={selectedAddress}
          onChange={handleAddressChange}
          displayEmpty
          size="small"
        >
          <MenuItem value="" disabled>
            -- Chọn địa chỉ --
          </MenuItem>
          {addresses.map((addr) => (
            <MenuItem key={addr._id} value={addr._id}>
              {addr.receiver} - {addr.phone} - {addr.address}
            </MenuItem>
          ))}
          <MenuItem value="other">Địa chỉ khác</MenuItem>
        </Select>
      </FormGrid>

      {renderAddressFields()}
    </Grid>
  );
}