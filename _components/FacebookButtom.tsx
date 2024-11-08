import { useFormStatus } from 'react-dom';
import Button from '@mui/material/Button';
import { FacebookIcon } from '@/layout/shared-theme/CustomIcons';
const FacebookSignButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      fullWidth
      variant="outlined"
      type="submit"
      disabled={pending}
      startIcon={<FacebookIcon />}
    >
      {pending ? 'Đang xử lý...' : 'Đăng nhập bằng Google'}
    </Button>
  );
};

export default FacebookSignButton;
