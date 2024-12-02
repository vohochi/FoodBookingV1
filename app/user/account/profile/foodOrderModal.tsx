import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Grid,
  Divider,
  TextField,
  Rating,
  List,
  ListItem,
  ListItemText,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { FaPaperPlane } from 'react-icons/fa';
import { TiStarFullOutline } from 'react-icons/ti';
import { formatPrice } from '@/utils/priceVN';
import Image from 'next/image';
import { OrderDetail } from '@/types/Order';

interface ProductDetailModalProps {
  open: boolean;
  product: OrderDetail;
  onClose: () => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  open,
  product,
  onClose,
}) => {
  const [des, ingredients] = product.menu_id.description
    ? product.menu_id.description.split(' - ').map((part) => part.trim())
    : ['Đang cập nhật...', 'Đang cập nhật...'];

  const [rating, setRating] = useState<number | null>(null); // Lưu trữ giá trị đánh giá
  const [comment, setComment] = useState<string>(''); // Lưu trữ bình luận
  const [comments, setComments] = useState<string[]>([]); // Lưu trữ danh sách bình luận

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const handleSubmitComment = () => {
    if (comment.trim()) {
      setComments([...comments, comment]);
      setComment(''); // Xóa nội dung bình luận sau khi gửi
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ background: '#1a285a', color: '#cda45e' }}>
        Chi tiết sản phẩm
      </DialogTitle>

      <DialogContent sx={{ padding: '16px' }}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <div className="mx-auto">
              <div className="img-hover-zoom">
                <Image
                  src={
                    product.menu_id.img
                      ? `${process.env.NEXT_PUBLIC_DOMAIN_BACKEND}/images/${product.menu_id.img}`
                      : `${process.env.NEXT_PUBLIC_DOMAIN_BACKEND}/images/default.png`
                  }
                  alt={product.menu_id.name}
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
              {product.menu_id.name}
            </Typography>

            <Grid container spacing={1}>
              {[...Array(5)].map((_, index) => (
                <Grid item key={index}>
                  <Typography variant="body1" color="#cde45a">
                    <TiStarFullOutline />
                  </Typography>
                </Grid>
              ))}
            </Grid>

            {product.menu_id.variant && product.menu_id.variant?.length > 0 && (
              <Typography
                variant="body1"
                color="textSecondary"
                sx={{ marginTop: '8px' }}
              >
                Kích thước: {product.variant_size}
              </Typography>
            )}
            <Typography
              variant="body1"
              fontWeight="bold"
              sx={{ marginTop: '8px' }}
            >
              Số lượng: {product.quantity}
            </Typography>
            <Typography variant="body1" fontWeight="bold">
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
            <Typography
              variant="h6"
              sx={{ marginTop: '16px' }}
              fontWeight="bold"
            >
              Các bình luận
            </Typography>
            <List>
              {comments.map((cmt, index) => (
                <ListItem key={index}>
                  <ListItemText primary={cmt} />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </DialogContent>

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
              precision={0.5}
              size="large"
            />
          </Grid>
          <Grid item xs={12} sm={9} sx={{ position: 'relative' }}>
            <TextField
              fullWidth
              multiline
              rows={2}
              value={comment}
              onChange={handleCommentChange}
              placeholder="Viết bình luận của bạn..."
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleSubmitComment}
                      sx={{ color: '#cda45e' }}
                    >
                      <FaPaperPlane />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </DialogTitle>
    </Dialog>
  );
};

export default ProductDetailModal;
