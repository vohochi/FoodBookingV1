import * as React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store'; // Ensure you have declared AppDispatch
import { forgotPasswordUser } from '@/store/slice/authSlice';
import toast from 'react-hot-toast';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import { useForm } from 'react-hook-form';

interface ForgotPasswordProps {
  open: boolean;
  handleClose: () => void;
}

interface FormData {
  email: string;
}

export default function ForgotPassword({
  open,
  handleClose,
}: ForgotPasswordProps) {
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      await dispatch(forgotPasswordUser({ email: data.email })).unwrap();
      toast.success('Đã gửi email đặt lại mật khẩu');
      handleClose();
    } catch (error) {
      toast.error('Không gửi lại email đặt lại');
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Quên mật khẩu</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        {' '}
        {/* Chỉ định form ở đây */}
        <DialogContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            width: '100%',
          }}
        >
          <DialogContentText>
            Nhập địa chỉ email của tài khoản của bạn và chúng tôi sẽ gửi cho bạn
            một Liên kết để đặt lại mật khẩu của bạn.
          </DialogContentText>
          <OutlinedInput
            autoFocus
            margin="dense"
            id="email"
            placeholder="Email address"
            type="email"
            fullWidth
            {...register('email', {
              required: 'Vui lòng nhập địa chỉ email.',

              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Vui lòng nhập địa chỉ email hợp lệ.',
              },
            })}
            error={!!errors.email}
          />
          {errors.email && (
            <FormHelperText error>{errors.email.message}</FormHelperText>
          )}
        </DialogContent>
        <DialogActions sx={{ pb: 3, px: 3 }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" type="submit">
            Continue
          </Button>
        </DialogActions>
      </form>{' '}
      {/* Kết thúc form ở đây */}
    </Dialog>
  );
}
