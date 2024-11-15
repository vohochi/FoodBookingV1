'use client'
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useTheme } from "@mui/material/styles"; 
import useMediaQuery from '@mui/material/useMediaQuery';

const SelectFilter = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

    const containerStyles = {
        position: isMobile ? 'static' : 'absolute',
        top: isMobile ? 'auto' : '-70px',
        right: isMobile ? 'auto' : '11px',
        width: isMobile ? '100%' : 'auto',
        marginBottom: isMobile ? '16px' : 0,
    };

    const formControlStyles = {
        width: isMobile ? '100%' : '200px',
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'gray'
            },
            '&:hover fieldset': {
                borderColor: 'rgba(26, 40, 90, 0.7)'
            },
            '&.Mui-focused fieldset': {
                borderColor: 'rgba(26, 40, 90, 0.7)'
            },
        },
    };

    return (
        <Box sx={containerStyles}>
            <FormControl sx={formControlStyles}>
                <InputLabel id="select-label"  style={{ color: 'rgba(26, 40, 90, 0.7)' }}>Sắp xếp theo</InputLabel>
                <Select
                    labelId="select-label"
                    defaultValue=""
                    label="Sắp xếp theo"
                >
                    <MenuItem value="">
                        <em>Bỏ chọn</em>
                    </MenuItem>
                    <MenuItem value={1}>Giá cao nhất</MenuItem>
                    <MenuItem value={2}>Giá thấp nhất</MenuItem>
                    <MenuItem value={3}>Đánh giá</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};

export default SelectFilter;
