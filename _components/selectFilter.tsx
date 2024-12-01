'use client';
import { setSortOrder } from "@/store/slice/filterSlice";
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useDispatch } from 'react-redux';

const SelectFilter = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
    const dispatch = useDispatch();

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

    // Hàm xử lý khi người dùng chọn giá trị sắp xếp
    const handleSortChange = (event: SelectChangeEvent) => {
        const sortValue = event.target.value;

        if (sortValue === 'price_desc') {
            dispatch(setSortOrder('price_desc'));
        } else if (sortValue === 'price_asc') {
            dispatch(setSortOrder('price_asc'));
        } else {
            // Bỏ chọn
            dispatch(setSortOrder(undefined));
        }
    };

    return (
        <Box sx={containerStyles}>
            <FormControl sx={formControlStyles}>
                <InputLabel id="select-label" style={{ color: 'rgba(26, 40, 90, 0.7)' }}>Sắp xếp theo</InputLabel>
                <Select
                    labelId="select-label"
                    defaultValue=""
                    label="Sắp xếp theo"
                    onChange={handleSortChange}
                >
                    <MenuItem value="">
                        <em>Bỏ chọn</em>
                    </MenuItem>
                    <MenuItem value="price_desc">Giá cao nhất</MenuItem>
                    <MenuItem value="price_asc">Giá thấp nhất</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};

export default SelectFilter;
