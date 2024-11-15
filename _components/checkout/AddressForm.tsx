import * as React from 'react';

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid2';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/system';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function AddressForm() {
  const fullnameInitial = useSelector((state: RootState) => state.profile.fullname);
  const emailInitial = useSelector((state: RootState) => state.profile.email);
  const phoneInitial = useSelector((state: RootState) => state.profile.phone);

  const [fullname, setFullname] = useState(fullnameInitial);
  const [email, setEmail] = useState(emailInitial);
  const [phone, setPhone] = useState(phoneInitial);

  useEffect(() => {
    if (fullnameInitial) {
      setFullname(fullnameInitial);
    }
    if (emailInitial) {
      setEmail(emailInitial);
    }
    if (phoneInitial) {
      setPhone(phoneInitial);
    }
  }, [ fullnameInitial, emailInitial, phoneInitial]);
  return (
    <Grid container spacing={3}>
      <FormGrid size={{ xs: 12, md: 12 }}>
        <FormLabel htmlFor="first-name" required>
          Tên người dùng
        </FormLabel>
        <OutlinedInput
          id="first-name"
          name="fullname"
          type="name"
          placeholder={fullname}
          autoComplete="full name"
          required
          size="small"
        />
      </FormGrid>

      <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="address1" required>
          Address line 1
        </FormLabel>
        <OutlinedInput
          id="address1"
          name="address1"
          type="address1"
          placeholder="Street name and number"
          autoComplete="shipping address-line1"
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="address2">Address line 2</FormLabel>
        <OutlinedInput
          id="address2"
          name="address2"
          type="address2"
          placeholder="Apartment, suite, unit, etc. (optional)"
          autoComplete="shipping address-line2"
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="email" required>
          Email
        </FormLabel>
        <TextField
          id="email"
          name="email"
          type="email"
          value={email}
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="phone" required>
          Điện thoại
        </FormLabel>
        <OutlinedInput
          id="phone"
          name="phone"
          type="phone"
          value={phone}
          autoComplete="State"
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="zip" required>
          Zip / Postal code
        </FormLabel>
        <OutlinedInput
          id="zip"
          name="zip"
          type="zip"
          placeholder="12345"
          autoComplete="shipping postal-code"
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="country" required>
          Country
        </FormLabel>
        <OutlinedInput
          id="country"
          name="country"
          type="country"
          placeholder="United States"
          autoComplete="shipping country"
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 12 }}>
        <FormControlLabel
          control={<Checkbox name="saveAddress" value="yes" />}
          label="Use this address for payment details"
        />
      </FormGrid>
    </Grid>
  );
}
