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

const categories = [
    { id: 1, name: 'Tất cả', productCount: 80, imageUrl: 'http://localhost:3002/images/anh4.png' },
    { id: 2, name: 'Món Khai Vị', productCount: 12, imageUrl: 'http://localhost:3002/images/anh1.png' },
    { id: 3, name: 'Món Chính', productCount: 8, imageUrl: 'http://localhost:3002/images/anh2.png' },
    { id: 4, name: 'Món Tráng Miệng', productCount: 5, imageUrl: 'http://localhost:3002/images/anh3.png' },
];

const features = [
    { id: 1, name: 'Tất cả', price: "tất cả", imageUrl: 'http://localhost:3002/images/anh4.png' },
    { id: 2, name: 'Cơm nè', price: "1000 - 2000", imageUrl: 'http://localhost:3002/images/anh4.png' },
    { id: 3, name: 'Mì nè', price: "1000 - 2000", imageUrl: 'http://localhost:3002/images/anh1.png' },
    { id: 4, name: 'Cá chiên', price: "1000 - 2000", imageUrl: 'http://localhost:3002/images/anh2.png' },
];

const MenuLeftSidebar = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

    // Style for the cards
    const cardStyle = {
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        borderRadius: '8px',
        marginBottom: '1rem',
        backgroundColor: 'white'
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
                    <RadioGroup name="categories">
                        {categories.map((category) => (
                            <Box
                                key={category.id}
                                sx={radioBoxStyle}
                            >
                                <FormControlLabel
                                    value={category.id.toString()}
                                    control={<Radio sx={customRadioStyle} />}
                                    label={category.name}
                                    sx={formControlLabelStyle}
                                />
                                <Typography>({category.productCount})</Typography>
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
                    <RadioGroup name="prices">
                        {features.map((feature) => (
                            <Box
                                key={feature.id}
                                sx={radioBoxStyle}
                            >
                                <FormControlLabel
                                    value={feature.id.toString()}
                                    control={<Radio sx={customRadioStyle} />}
                                    label={feature.price}
                                    sx={formControlLabelStyle}
                                />
                                <Typography>VNĐ</Typography>
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