import '@/app/_styles/globals.css';

import 'bootstrap-icons/font/bootstrap-icons.css';
import 'boxicons/css/boxicons.min.css';
import 'font-awesome/css/font-awesome.min.css';

import React, { useRef } from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';
import Link from 'next/link';

import { Stack } from '@mui/system';

interface VerifyPasswordProps {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

const VerifyPassword = ({ title, subtitle, subtext }: VerifyPasswordProps) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    // Kiểm tra xem ký tự nhập vào có phải là số hay không
    if (value && !/^[0-9]$/.test(value)) {
      event.target.value = ''; // Nếu không phải số, làm trống ô
      return;
    }

    // Viết liên tục
    if (value) {
      const nextInput = inputRefs.current[index + 1];
      if (nextInput) {
        nextInput.focus();
      }
    }
    
    // Xóa liên tục
    if (!value && index > 0) {
      const prevInput = inputRefs.current[index - 1];
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    // Nếu nhấn phím Backspace
    if (event.key === 'Backspace') {
      // Kiểm tra ô hiện tại
      const currentInput = inputRefs.current[index];

      // Nếu ô hiện tại trống
      if (currentInput && !currentInput.value) {
        // Chuyển về ô trước
        const prevInput = inputRefs.current[index - 1];
        if (prevInput) {
          prevInput.focus();
          prevInput.value = ''; // Xóa giá trị của ô trước
        }
      } else {
        // Nếu ô hiện tại không trống, xóa ký tự
        currentInput.value = '';
      }
    }
  };

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Box>
        <Stack mb={3}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="code"
            mb="5px"
          >
            Nhập mã xác minh
          </Typography>

          <Stack direction="row" spacing={2}>
            {Array.from({ length: 6 }).map((_, index) => (
              <TextField
                key={index}
                id={`code-${index}`}
                type="text"
                variant="outlined"
                inputProps={{
                  maxLength: 1,
                  style: { textAlign: 'center' },
                }}
                inputRef={el => (inputRefs.current[index] = el)}
                onChange={(e) => handleChange(index, e)}
                onKeyDown={(e) => handleKeyDown(index, e)} // Thêm xử lý cho sự kiện key down
                sx={{
                  width: '50px',
                  '& .MuiOutlinedInput': {
                    borderColor: '#cda45e',
                  },
                  '&:focus-within .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#cda45e',
                  },
                }}
              />
            ))}
          </Stack>
        </Stack>

        <Button
          className="btn-success"
          variant="contained"
          size="large"
          fullWidth
          component={Link}
          href="#"
          style={{
            color: '#fff',
          }}
        >
          Xác nhận
        </Button>
      </Box>
      {subtitle}
    </>
  );
};

export default VerifyPassword;
