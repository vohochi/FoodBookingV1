import React from 'react';
import Button from '@mui/material/Button';
import { FacebookIcon } from '@/layout/shared-theme/CustomIcons';

interface FacebookSignButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const FacebookSignButton: React.FC<FacebookSignButtonProps> = ({ onClick }) => {
  return (
    <Button
      fullWidth
      variant="outlined"
      onClick={onClick}
      startIcon={<FacebookIcon />}
    >
      Đăng nhập bằng Facebook
    </Button>
  );
};

export default FacebookSignButton;
