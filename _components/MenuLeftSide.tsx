'use client';
import {
    TextField,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Box,
    Radio,
    RadioGroup,
    FormControlLabel,
    useMediaQuery,
    useTheme
} from '@mui/material';
import Image from 'next/image';
import { FaSearch } from 'react-icons/fa';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm, setCategory, setPriceRange, PriceRange } from '@/store/slice/filterSlice';
import { useEffect, useMemo, useState } from 'react';
import { getCategories } from '@/_lib/categories';
import { Category } from '@/types/Category';
import { Quantity } from '@/types/Menu';
import { RootState } from '@/store';
const BannerMenuSideBar = [
    { BannerId: 1, imageUrl: '/img/BannerNew/1.png' },
    { BannerId: 2, imageUrl: '/img/BannerNew/2.png' },
    { BannerId: 3, imageUrl: '/img/BannerNew/3.png' },
];
const priceRanges = [
    { id: 1, label: 'Tất cả', value: ["all"] },
    { id: 2, label: '0 - 50,000', value: [1, 50000] },
    { id: 3, label: '50,000 - 100,000', value: [50000, 100000] },
    { id: 4, label: '100,000 - 150,000', value: [100000, 150000] },
    { id: 5, label: '150,000 - 200,000', value: [150000, 200000] },
    { id: 6, label: '200,000 - 250,000', value: [200000, 250000] },
    { id: 7, label: 'Từ 250.000', value: [250000, 99999999999999] },
]
const MenuLeftSidebar = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
    const dispatch = useDispatch();
    const { category } = useSelector((state: RootState) => state.filter);
    const [categories, setCategories] = useState<Category[]>([]);
    const [quantities, setQuantities] = useState<Quantity[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await getCategories();
            setCategories(response);
            const counts = response.map(category => ({
                _id: category._id,
                totalMenuItems: category.totalMenuItems
            }));
            setQuantities(counts);
        };
        fetchCategories();
    }, []);

    console.log('Categories:', categories);
    console.log('Quantities:', quantities);
    const memoizedCategories = useMemo(() => categories, [categories]);
    // Style for the cards
    const cardStyle = {
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        borderRadius: '8px',
        marginBottom: '1rem',
        backgroundColor: 'white'
    };
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchTerm(event.target.value));
    };

    const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedCategoryId = event.target.value;
        dispatch(setCategory(selectedCategoryId));
    };


    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.split('-').map((val) => {
            const num = Number(val);
            return isNaN(num) ? "all" : num;
        }) as PriceRange;

        dispatch(setPriceRange(value));
    };

    // Custom radio style
    const customRadioStyle = {
        '&.MuiRadio-root': {
            '&.Mui-checked': {
                color: '#1a285a',
            },
            '& .MuiSvgIcon-root': {
                fontSize: '1.2rem',
            },
        },
    };

    // Custom form control label style
    const formControlLabelStyle = {
        margin: 0,
        width: '100%',
        '& .MuiFormControlLabel-label': {
            fontSize: '0.9rem',
        },
    };

    // Custom box container style for each radio option
    const radioBoxStyle = {
        '&:has(.Mui-checked)': {
            backgroundColor: 'rgba(26, 40, 90, 0.1)',
            '& .MuiFormControlLabel-label': {
                color: '#1a285a',
            },
        },
        '&:hover': {
            backgroundColor: 'rgba(26, 40, 90, 0.04)',
        },
        padding: '8px 16px',
        marginBottom: '4px',
        borderRadius: '4px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: 'pointer',
    };

    return (
        <Box className="menu-container">
            {/* Search Bar */}
            <Box sx={cardStyle} className="p-3">
                <Box sx={{ position: 'relative' }}>
                    <TextField
                        fullWidth
                        placeholder="Tìm kiếm..."
                        variant="outlined"
                        onChange={handleSearchChange}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: 'gray' },
                                '&:hover fieldset': { borderColor: 'rgba(26, 40, 90, 0.7)' },
                                '&.Mui-focused fieldset': { borderColor: 'rgba(26, 40, 90, 0.7)' },
                            },
                        }}
                    />
                    <FaSearch style={{
                        position: 'absolute',
                        right: '1rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        pointerEvents: 'none',
                        color: 'rgba(26, 40, 90, 0.7)'
                    }} />
                </Box>
            </Box>

            {/* Categories Section */}
            <Accordion
                defaultExpanded={!isMobile}
                sx={cardStyle}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{ '& .MuiAccordionSummary-content': { margin: '1rem 0' } }}
                >
                    <Typography variant="h6">Danh mục</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <RadioGroup name="categories" value={category || ''} onChange={handleCategoryChange}>
                        <Box
                            sx={radioBoxStyle}
                        >
                            <FormControlLabel
                                value={""}
                                control={<Radio sx={customRadioStyle} />}
                                label={"Tất cả"}
                                sx={formControlLabelStyle}
                            />
                        </Box>
                        {memoizedCategories.map((category) => (
                            <Box
                                key={category._id}
                                sx={radioBoxStyle}
                            >
                                <FormControlLabel
                                    value={category._id}
                                    control={<Radio sx={customRadioStyle} />}
                                    label={category.name}
                                    sx={formControlLabelStyle}
                                />
                                <Typography>
                                    ({Array.isArray(quantities) ? quantities.find(q => q._id === category._id)?.totalMenuItems || 0 : 0})
                                </Typography>
                            </Box>
                        ))}
                    </RadioGroup>
                </AccordionDetails>
            </Accordion>

            {/* Price Section */}
            <Accordion
                defaultExpanded={!isMobile}
                sx={cardStyle}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{ '& .MuiAccordionSummary-content': { margin: '1rem 0' } }}
                >
                    <Typography variant="h6">Giá</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <RadioGroup name="prices" onChange={handlePriceChange}>
                        {priceRanges.map((priceRange) => (
                            <Box
                                key={priceRange.id}
                                sx={radioBoxStyle}
                            >
                                <FormControlLabel
                                    value={priceRange.value.join('-')}
                                    control={<Radio sx={customRadioStyle} />}
                                    label={priceRange.label}
                                    sx={formControlLabelStyle}
                                />
                                {priceRange.value[0] !== "all" && (
                                    <Typography>VNĐ</Typography>
                                )}

                            </Box>
                        ))}
                    </RadioGroup>
                </AccordionDetails>
            </Accordion>

            {/* Banner Section */}
            <Box className="menu-container" sx={{ width: '100%' }}> 
                <Accordion
                    defaultExpanded={!isMobile}
                    sx={{ ...cardStyle, width: '100%' }} 
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        sx={{ '& .MuiAccordionSummary-content': { margin: '1rem 0' } }}
                    >
                        <Typography variant="h6">Hot hot hot</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {BannerMenuSideBar.map((banner) => (
                            <Box
                                key={banner.BannerId}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    mb: 3,
                                    width: '100%' 
                                }}
                            >
                                <Box sx={{ width: '100%', overflow: 'hidden', borderRadius: '8px' }}>
                                    <Image
                                        src={banner.imageUrl}
                                        width={200}
                                        height={0} 
                                        style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                                        layout="responsive"
                                        objectFit="cover"
                                        className="img-fluid"
                                        alt="img"
                                    />
                                </Box>
                            </Box>
                        ))}
                    </AccordionDetails>
                </Accordion>
            </Box>



        </Box>
    );
};

export default MenuLeftSidebar;