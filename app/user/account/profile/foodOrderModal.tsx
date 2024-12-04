import React, { useState, useEffect, useCallback } from 'react';
import {
    Dialog, DialogContent, DialogTitle, Typography, Grid, Divider, TextField,
    Rating, List, ListItem, IconButton, InputAdornment,
    Stack
} from '@mui/material';
import { FaPaperPlane } from "react-icons/fa";
import { formatPrice } from '@/utils/priceVN';
import Image from 'next/image';
import { OrderDetail } from '@/types/Order';
import { addReview, fetchMenuReviews, MenuReviewsResponse } from '@/store/slice/orderSlice';
import { useDispatch } from 'react-redux';
import PaginationUser from '@/_components/PaginationUser';
import { AppDispatch } from '@/store';
import SnackbarNotification from '@/_components/SnackbarAlert';

interface ProductDetailModalProps {
    open: boolean;
    product: OrderDetail;
    order_id: string;
    onClose: () => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ open, product, order_id, onClose }) => {
    const [des, ingredients] = typeof product.menu_id === 'string' || !product.menu_id.description
        ? ["Đang cập nhật...", "Đang cập nhật..."]
        : product.menu_id.description.split(' - ').map(part => part.trim());


    const dispatch = useDispatch<AppDispatch>();

    const [rating, setRating] = useState<number | null>(null);
    const [comment, setComment] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [reviews, setReviews] = useState<MenuReviewsResponse["reviews"] | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('success');

    const handleFetchReviews = useCallback(async (menu_id: string, page: number) => {
        try {
            const response = await dispatch(fetchMenuReviews({ menu_id, page })).unwrap();

            setReviews(response.reviews || []);
            setCurrentPage(response.reviews.current_page);
            setTotalPages(response.reviews.total_pages);
        } catch (error) {
            console.error('Error fetching reviews:', error);
            setReviews(null);
        }
    }, [dispatch]);

    useEffect(() => {
        if (open && product.menu_id && typeof product.menu_id !== 'string') {
            const menuId = product.menu_id._id;
            
            if (menuId) {
                handleFetchReviews(menuId, 1);
            } else {
                console.error("Menu ID is undefined");
            }
        }
    }, [open, product, handleFetchReviews]);

    const handlePostComment = async () => {
        if (!rating || !comment.trim()) {
            setSnackbarMessage(`Vui lòng chọn số sao bạn muốn đánh giá`);
            setSnackbarSeverity('warning');
            setSnackbarOpen(true);
            return;
        }

        const menuId = typeof product.menu_id === 'string' ? product.menu_id : product.menu_id?._id;

        if (!menuId) {
            setLoading(false);
            return;
        }

        const reviewData = {
            order_id,
            menu_id: menuId,
            rating,
            comment,
        };

        try {
            await dispatch(addReview(reviewData)).unwrap();
            setSnackbarMessage(`Gửi đánh giá thành công`);
            setSnackbarSeverity('warning');
            setSnackbarOpen(true);
            setRating(null);
            setComment('');
            handleFetchReviews(menuId, currentPage);
        } catch (error) {
            console.error("Lỗi khi gửi đánh giá:", error);
            setSnackbarMessage(`${error}`);
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        const menuId = typeof product.menu_id === 'string' ? product.menu_id : product.menu_id?._id;
        if (menuId) {
            handleFetchReviews(menuId, value);
        } else {
            console.error("Menu ID không hợp lệ.");
        }
    };



    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle sx={{ background: '#1a285a', color: '#cda45e' }}>
                Chi tiết sản phẩm
            </DialogTitle>

            <DialogContent sx={{ padding: '16px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <div className="mx-auto">
                            <div className="img-hover-zoom">
                                <Image
                                    src={product.menu_id && typeof product.menu_id !== 'string' ?
                                        `${process.env.NEXT_PUBLIC_DOMAIN_BACKEND}/images/${product.menu_id.img}` :
                                        `${process.env.NEXT_PUBLIC_DOMAIN_BACKEND}/images/default.png`}
                                    alt={product.menu_id && typeof product.menu_id !== 'string' ? product.menu_id.name : 'Sản phẩm'}
                                    className="mx-auto bg-transparent"
                                    width={400}
                                    height={400}
                                    objectFit="contain"
                                    style={{
                                        borderRadius: '8px',
                                        width: '100%',
                                        height: 'auto',
                                    }}
                                />
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <Typography variant="h6" fontWeight="bold">
                            {product.menu_id && typeof product.menu_id !== 'string' ? product.menu_id.name : 'Sản phẩm'}
                        </Typography>

                        <Typography variant="body1" fontWeight="bold" sx={{ marginTop: '8px' }}>
                            Giá: {formatPrice(product.price)} VNĐ
                        </Typography>
                        <Typography variant="body1" fontWeight="bold">
                            Tổng: {formatPrice(product.price * product.quantity)} VNĐ
                        </Typography>

                        <Typography variant="body1" sx={{ marginTop: '8px' }}>
                            {des}
                        </Typography>
                        <Typography variant="body1" sx={{ marginTop: '8px' }}>
                            Thành phần: {ingredients}
                        </Typography>
                        <Divider sx={{ marginY: '16px' }} />
                    </Grid>

                    <Grid item xs={12}>
                        {reviews && (
                            <>
                                <List>
                                    {Array.isArray(reviews) && reviews.map((review, index) => (
                                        <ListItem
                                            key={index}
                                            sx={{
                                                backgroundColor: 'rgba(128, 128, 128, 0.1)',
                                                borderRadius: '8px',
                                                padding: '16px',
                                                width: 'fit-content',
                                                marginBottom: '8px'
                                            }}
                                        >
                                            <Grid container spacing={2} alignItems="center">
                                                <Grid item xs={12}>
                                                    <Typography variant="body1" fontWeight="bold">
                                                        {review.user.fullname}
                                                    </Typography>

                                                    <Rating
                                                        name={`rating-${index}`}
                                                        value={review.rating}
                                                        readOnly
                                                        size="small"
                                                    />
                                                    <Typography variant="body2" color="textSecondary" sx={{ marginTop: '8px' }}>
                                                        {review.comment}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </ListItem>
                                    ))}
                                </List>
                                {totalPages > 1 && (
                                    <div className="pagination align-items-center d-flex justify-content-center pt-4">
                                        <Stack spacing={2}>
                                            <PaginationUser
                                                totalPages={totalPages}
                                                currentPage={currentPage}
                                                onPageChange={handlePageChange}
                                            />
                                        </Stack>
                                    </div>
                                )}
                            </>
                        )}
                    </Grid>
                </Grid>
            </DialogContent >

            <DialogTitle sx={{ paddingBottom: '20px' }}>
                <Divider sx={{ marginY: '16px' }} />
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={3}>
                        <Typography variant="h6" fontWeight="bold">
                            Đánh giá sản phẩm
                        </Typography>
                        <Rating
                            name="product-rating"
                            value={rating}
                            onChange={(_, newValue) => setRating(newValue)}
                            precision={1}
                            size="large"
                        />
                    </Grid>
                    <Grid item xs={12} sm={9} sx={{ position: 'relative' }}>
                        <TextField
                            fullWidth
                            multiline
                            rows={2}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Viết bình luận của bạn..."
                            variant="outlined"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handlePostComment} sx={{ color: '#1a285a' }} disabled={loading}>
                                            <FaPaperPlane />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                </Grid>
            </DialogTitle>
            <SnackbarNotification
                snackbarOpen={snackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}
                snackbarOnclose={() => setSnackbarOpen(false)}
            />
        </Dialog >
    );
};

export default ProductDetailModal;
