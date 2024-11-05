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
import Link from 'next/link';
import { FaSearch } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa6';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm, setCategory, setPriceRange, PriceRange } from '@/store/slice/filterSlice';
import { useEffect, useMemo, useState } from 'react';
import { getCategories } from '@/_lib/categories';
import { Category } from '@/types/Category';

const features = [
    { categoryId: 1, name: 'Tất cả', price: "tất cả", imageUrl: 'http://localhost:3002/images/anh4.png' },
    { categoryId: 2, name: 'Cơm nè', price: "1000 - 2000", imageUrl: 'http://localhost:3002/images/anh4.png' },
    { categoryId: 3, name: 'Mì nè', price: "1000 - 2000", imageUrl: 'http://localhost:3002/images/anh1.png' },
    { categoryId: 4, name: 'Cá chiên', price: "1000 - 2000", imageUrl: 'http://localhost:3002/images/anh2.png' },
];
const priceRanges = [
    { id: 1, label: 'Tất cả', value: ["all"] },
    { id: 2, label: '0 - 100,000', value: [1, 100000] },
    { id: 3, label: '100,000 - 200,000', value: [100000, 200000] },
    { id: 4, label: '200,000 - 300,000', value: [200000, 300000] },
    { id: 5, label: '300,000 - 400,000', value: [300000, 400000] },
]
const MenuLeftSidebar = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
    const dispatch = useDispatch();
    const { category } = useSelector((state) => state.filter);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await getCategories();
            setCategories(response);
        };
        fetchCategories();
    }, []);

    const memoizedCategories = useMemo(() => categories, [categories]);
console.log(memoizedCategories)
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
        console.log('category ID:', selectedCategoryId);
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
                        {/* <Box
                            sx={radioBoxStyle}
                        >
                            <FormControlLabel
                                value={"all"}
                                control={<Radio sx={customRadioStyle} />}
                                label={"Tất cả"}
                                sx={formControlLabelStyle}
                            />
                        </Box> */}
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
                                <Typography>({category.description})</Typography>
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

            {/* Featured Products Section */}
            <Accordion
                defaultExpanded={!isMobile}
                sx={cardStyle}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{ '& .MuiAccordionSummary-content': { margin: '1rem 0' } }}
                >
                    <Typography variant="h6">Sản phẩm nổi bật</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {features.map((food) => (
                        <Box
                            key={food.id}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                mb: 3
                            }}
                        >
                            <Box sx={{ width: 100, height: 100, mr: 2 }}>
                                <Image
                                    src={food.imageUrl}
                                    width={100}
                                    height={100}
                                    className="rounded"
                                    alt={food.name}
                                />
                            </Box>
                            <Box>
                                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                                    {food.name}
                                </Typography>
                                <Box sx={{ display: 'flex', mb: 1 }}>
                                    {[...Array(5)].map((_, index) => (
                                        <FaStar
                                            key={index}
                                            style={{ color: '#248F55', fontSize: '14px' }}
                                        />
                                    ))}
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography
                                        variant="h6"
                                        sx={{ fontWeight: 'bold', mr: 1 }}
                                    >
                                        2.99 $
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            color: 'error.main',
                                            textDecoration: 'line-through'
                                        }}
                                    >
                                        4.11 $
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    ))}
                    <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                        <Link
                            href={'#'}
                            className="book-a-table-btn border border-secondary px-4 py-3 rounded-pill w-100 text-center text-decoration-none"
                        >
                            Xem thêm
                        </Link>
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
};

export default MenuLeftSidebar;