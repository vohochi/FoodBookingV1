'use client';
import {
  Button,
  DialogContentText,
  Grid,
  List,
  ListItem,
  Rating,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import 'swiper/swiper-bundle.css';
import RelatedFood from './RelatedFood';
import GoToCartButton from './GoToCartButton';
import { formatPrice } from '@/utils/priceVN';
import { useDispatch } from 'react-redux';
import { Menu } from '@/types/Menu';
import BtnFavorite from './BtnFavourite';
import { FaStar } from 'react-icons/fa6';
// import RatingForm from './UserRating';
import { addToCart } from '@/store/slice/cartSlice';
import SnackbarNotification from './SnackbarAlert';
import {
  fetchMenuReviews,
  MenuReviewsResponse,
} from '@/store/slice/orderSlice';
import PaginationUser from './PaginationUser';
import { AppDispatch } from '@/store';
import { addToWishlist } from '@/store/slice/whishList';

export default function FoodDetailPage({ food }: { food: Menu }) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    'success' | 'error' | 'info' | 'warning'
  >('success');

  const [reviews, setReviews] = useState<MenuReviewsResponse['reviews'] | null>(
    null
  );
  // const [rating, setRating] = useState<number | null>(null);
  // const [comment, setComment] = useState<string>('');

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState({ quantity: 1 });
  const [selectedSize, setSelectedSize] = useState('M');
  const [des, ingredients] = food?.description
    ? food.description.split(' - ').map((part) => part.trim())
    : ['Đang cập nhật...', 'Đang cập nhật....'];

  const [price, setPrice] = useState(
    food.variant && food.variant.length > 0 ? food.variant[0].price : food.price
  );
  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    const selectedVariant = food.variant?.find((v) => v.size === size);
    setPrice(selectedVariant?.price || food.price);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'quantity') {
      const quantity = parseInt(value, 10);
      if (quantity > 0) {
        setFormData({ ...formData, [name]: quantity });
      }
    }
  };
  const handleAddToWishlist = (food: Menu) => {
    try {
      const item = {
        ...food,
        quantity: formData.quantity !== null ? formData.quantity : 1,
        selectedSize,
        price,
      };

      dispatch(addToWishlist(item)); // Add to wishlist instead of cart

      setSnackbarOpen(false);
      setTimeout(() => {
        setSnackbarMessage(`${food.name} đã được thêm vào wishlist!`);
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      }, 0);
    } catch {
      setSnackbarOpen(false);
      setTimeout(() => {
        setSnackbarMessage('Đã xảy ra lỗi khi thêm vào wishlist!');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }, 0);
    }
  };
  const handleAddToCart = () => {
    try {
      const item = {
        ...food,
        quantity: formData.quantity !== null ? formData.quantity : 1,
        selectedSize,
        price,
      };

      dispatch(addToCart(item));
      setSnackbarOpen(false);
      setTimeout(() => {
        setSnackbarMessage(`${food.name} đã được thêm vào giỏ hàng!`);
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      }, 0);
    } catch {
      setSnackbarOpen(false);
      setTimeout(() => {
        setSnackbarMessage('Đã xảy ra lỗi khi thêm vào giỏ hàng!');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }, 0);
    }
  };

  const handleFetchReviews = useCallback(
    async (menu_id: string, page: number) => {
      try {
        const response = await dispatch(
          fetchMenuReviews({ menu_id, page })
        ).unwrap();

        setReviews(response.reviews || []);
        setCurrentPage(response.reviews.current_page);
        setTotalPages(response.reviews.total_pages);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setReviews(null);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (food._id) {
      const menuId = food._id;
      if (menuId) {
        handleFetchReviews(menuId, 1);
      } else {
        console.error('Menu ID is undefined');
      }
    }
  }, [food, handleFetchReviews]);

  // const handlePostComment = async () => {
  //   if (!rating || !comment.trim()) {
  //     setTimeout(() => {
  //       setSnackbarMessage(`Vui lòng chọn số sao và nội dung bạn muốn đánh giá`);
  //       setSnackbarSeverity('warning');
  //       setSnackbarOpen(true);
  //     }, 0);
  //     return;
  //   }

  //   const menuId = typeof food._id === 'string' ? food._id : '';

  //   const reviewData = {
  //     order_id,
  //     menu_id: menuId,
  //     rating,
  //     comment,
  //   };

  //   console.log('rv', reviewData);

  //   try {
  //     await dispatch(addReview(reviewData)).unwrap();
  //     setSnackbarMessage(`Gửi đánh giá thành công`);
  //     setSnackbarSeverity('success');
  //     setSnackbarOpen(true);
  //     setRating(null);
  //     setComment('');
  //     handleFetchReviews(menuId, currentPage);
  //   } catch (error) {
  //     console.error("Lỗi khi gửi đánh giá:", error);
  //     setSnackbarMessage(`${error}`);
  //     setSnackbarSeverity('error');
  //     setSnackbarOpen(true);
  //   }
  // };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    const menuId = typeof food._id === 'string' ? food._id : food._id;
    if (menuId) {
      handleFetchReviews(menuId, value);
    } else {
      console.error('Menu ID không hợp lệ.');
    }
  };

  if (!food) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <GoToCartButton />
      <section className="about">
        <div className="container">
          <div className="section-title content">
            <h2>Chi tiết</h2>
            <p>{food.name}</p>
          </div>
          <div className="row">
            <div className="col-sm-12 col-lg-4">
              <div className="about-img">
                <Image
                  src={
                    food?.img
                      ? food.img.toString()
                      : `${process.env.NEXT_PUBLIC_DOMAIN_BACKEND}/images/default.jpg`
                  }
                  alt={food.name}
                  layout="responsive"
                  className="mx-auto bg-transparent"
                  width={400}
                  height={400}
                  objectFit="cover"
                  style={{ borderRadius: '8px', width: '100%', height: 'auto' }}
                />
              </div>
            </div>
            <div className="col-sm-12 col-lg-8 px-8 content">
              <h3>{des}</h3>
              <ul>
                <li>
                  <i className="bi bi-check-circle" /> Thành phần :{' '}
                  {ingredients}
                </li>
                <li>
                  <i className="bi bi-check-circle" /> Không chất phụ gia, không
                  chất tạo màu
                </li>
                <li>
                  <i className="bi bi-check-circle" /> Giao hàng miễn phí trong
                  phạm vi 5 km
                </li>
              </ul>
              <div className="">
                {/* Render stars */}
                {[...Array(food?.star)].map((_, index) => (
                  <FaStar
                    key={index}
                    style={{
                      color: '#f0e68c',
                      fontSize: '20px',
                      marginBottom: '10px',
                    }}
                  />
                ))}
              </div>
              <DialogContentText>
                <h3
                  style={{
                    color: '#1a285a',
                    fontSize: '30px',
                    marginBottom: '15px',
                  }}
                >
                  {food.variant &&
                    Array.isArray(food.variant) &&
                    food.variant.length > 0 ? (
                    <>
                      {formatPrice(price!)} VNĐ
                      <div style={{ marginBottom: '20px' }}>
                        {food.variant.map((option) => (
                          <Button
                            key={option.size}
                            variant={
                              selectedSize === option.size
                                ? 'contained'
                                : 'outlined'
                            }
                            onClick={() => handleSizeChange(option.size)}
                            sx={{
                              marginRight: '10px',
                              color:
                                selectedSize === option.size
                                  ? '#fff'
                                  : '#1a285a',
                              backgroundColor:
                                selectedSize === option.size
                                  ? '#1a285a'
                                  : 'transparent',
                              borderColor: '#1a285a',
                              '&:hover': {
                                backgroundColor:
                                  selectedSize === option.size
                                    ? '#1a285a'
                                    : 'transparent',
                                borderColor: '#1a285a',
                              },
                              '&.Mui-focusVisible': {
                                borderColor: '#1a285a',
                              },
                            }}
                          >
                            {option.size}
                          </Button>
                        ))}
                      </div>
                    </>
                  ) : (
                    `${formatPrice(food.price!)} VNĐ`
                  )}
                </h3>
              </DialogContentText>
              <div className="row">
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    margin: '20px 0px',
                    border: '1px solid #1a285a',
                    maxWidth: 'fit-content',
                    borderRadius: '50px',
                  }}
                  className="col-9"
                >
                  <div
                    className="btn-custom-plusminus"
                    onClick={() => {
                      const newQuantity = Math.max(1, formData.quantity - 1);
                      setFormData({ ...formData, quantity: newQuantity });
                    }}
                  >
                    <i className="fa fa-minus"></i>
                  </div>
                  <TextField
                    margin="dense"
                    name="quantity"
                    type="number"
                    onChange={handleChange}
                    value={formData.quantity}
                    InputProps={{
                      inputProps: {
                        style: { textAlign: 'center' },
                        readOnly: true,
                      },
                      sx: {
                        height: '30px',
                      },
                    }}
                    style={{
                      width: '80px',
                      textAlign: 'center',
                      borderLeft: '1px solid rgba(26, 40, 90, 0.5)',
                      borderRight: '1px solid  rgba(26, 40, 90, 0.5)',
                    }}
                    sx={{
                      '& input[type=number]': {
                        MozAppearance: 'textfield',
                        color: '#1a285a',
                      },
                      '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button':
                      {
                        WebkitAppearance: 'none',
                        margin: 0,
                      },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          border: 'none',
                        },
                        '&:hover fieldset': {
                          border: 'none',
                        },
                        '&.Mui-focused fieldset': {
                          border: 'none',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: '#1a285a',
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#1a285a',
                      },
                    }}
                  />
                  <div
                    className="text-center btn-custom-plusminus"
                    onClick={() => {
                      const newQuantity = formData.quantity + 1;
                      setFormData({ ...formData, quantity: newQuantity });
                    }}
                  >
                    <i className="fa fa-plus"></i>
                  </div>
                </div>
                <div
                  className="col-3"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    margin: '20px 0px',
                    maxWidth: 'fit-content',
                  }}
                >
                  <BtnFavorite food={food} onClick={handleAddToWishlist} />
                </div>
              </div>
              {formData.quantity > food.quantity && (
                <p style={{ color: 'red', marginTop: '5px' }}>
                  Số lượng vượt quá giới hạn. Vui lòng giảm số lượng.
                </p>
              )}
              <div
                className="row"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  margin: '20px 0px',
                  borderRadius: '50px',
                }}
              >
                <button
                  type="submit"
                  className="btn btn-custom col-12"
                  onClick={() => handleAddToCart()}
                  disabled={formData.quantity > food.quantity}
                  style={{
                    opacity: formData.quantity > food.quantity ? 0.6 : 1,
                    pointerEvents: formData.quantity > food.quantity ? 'none' : 'auto',
                  }}
                >
                  Thêm vào giỏ hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="about">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {reviews && (
                <>
                  <List>
                    {Array.isArray(reviews) &&
                      reviews.map((review, index) => (
                        <ListItem
                          key={index}
                          sx={{
                            backgroundColor: 'rgba(128, 128, 128, 0.1)',
                            borderRadius: '8px',
                            padding: '16px',
                            width: 'fit-content',
                            marginBottom: '8px',
                          }}
                        >
                          <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12}>
                              <Typography
                                variant="body1"
                                fontWeight="bold"
                                sx={{ color: '#1a285a' }}
                              >
                                {review.user.fullname}
                              </Typography>

                              <Rating
                                name={`rating-${index}`}
                                value={review.rating}
                                readOnly
                                size="small"
                              />
                              <Typography
                                variant="body2"
                                color="textSecondary"
                                sx={{ marginTop: '8px' }}
                              >
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
            </div>
            {/* <div className='col-12'>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
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
                <Grid item xs={12} sm={8} sx={{ position: 'relative' }}>
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
                          <IconButton onClick={handlePostComment} sx={{ color: '#1a285a' }}>
                            <FaPaperPlane />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </div> */}
          </div>
        </div>
      </section>
      <RelatedFood
        category={
          typeof food.category === 'object' && '_id' in food.category
            ? food.category._id
            : food.category
        }
      />{' '}
      <SnackbarNotification
        snackbarOpen={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        snackbarOnclose={() => setSnackbarOpen(false)}
      />
    </>
  );
}
