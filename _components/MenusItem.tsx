'use client';

import Image from 'next/image';
import { useState, useCallback, ChangeEvent, FormEvent } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  Grid,
  Box
} from '@mui/material';
import { Dish } from '@/types/Dishes'; // Import interface Dish
import Link from 'next/link';

interface MenusItemProps {
  food: Dish; // Nhận thông tin món ăn qua props
}

const MenusItem = ({ food }: MenusItemProps) => {
  const [open, setOpen] = useState(false); // State để quản lý trạng thái modal
  const [isFavorite, setIsFavorite] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    quantity: 1,
  });

  // Hàm mở modal
  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, []);

  // Hàm đóng modal
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  // Hàm xử lý thay đổi dữ liệu biểu mẫu
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Validate quantity để tránh số âm hoặc zero
    if (name === 'quantity' && +value <= 0) {
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  // Hàm xử lý gửi biểu mẫu
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData); // Xử lý dữ liệu gửi ở đây
    handleClose(); // Đóng modal sau khi gửi
  };

  return (
    <div className="col-lg-6 menu-item filter-starters">
      <Link href={`/user/menus/${food._id}`}>
        <div>
          <Image
            width={70}
            height={70}
            src={`http://localhost:3002/images/${food.image}`}
            className="menu-img"
            alt={food.name}
            layout="fixed"
          />

          <div className="menu-content">
            <a href="#">{food.name}</a>
            <span>${food.price}</span>
          </div>
        </div>{' '}
      </Link>
      <div className="menu-ingredients row">
        <span className="col-10">{food.description}</span>
        <span className="book-a-table-btn col-2 m-0" onClick={handleClickOpen}>
          order
        </span>
      </div>

      {/* Modal từ MUI */}
      {/* Modal từ MUI */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogContent>
          <DialogTitle className="section-title">
            <p>{food.name}</p>
          </DialogTitle>

          <Grid container spacing={2} className="container">
            <Grid item xs={12} sm={5}>
              <Image
                src={`http://localhost:3002/images/${food.image}`}
                alt={food.name}
                width={400}
                height={400}
                objectFit="cover"
                style={{
                  borderRadius: '8px',
                  width: '100%',
                  height: 'auto',
                }}
              />
            </Grid>

            <Grid item xs={12} sm={7}>
              {/* Sử dụng Box để tạo flex column layout */}
              <Box display="flex" flexDirection="column" height="100%">
                <DialogContentText>
                  <strong>Một chút mô tả</strong>
                </DialogContentText>
                <DialogContentText style={{ marginBottom: '20px' }}>
                  {food.description}
                </DialogContentText>

                {/* Form nhập thông tin */}
                <form onSubmit={handleSubmit} style={{ flexGrow: 1 }}>
                  <DialogContentText>
                    <strong>Nhập số lượng bạn muốn order</strong>
                  </DialogContentText>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button
                      className="btn btn-success"
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, quantity: Math.max(1, formData.quantity - 1) })
                      }
                    >
                      <i className="fa fa-minus"></i>
                    </button>

                    <TextField
                      margin="dense"
                      name="quantity"
                      label="Số lượng"
                      type="number"
                      variant="outlined"
                      value={formData.quantity}
                      onChange={handleChange}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: 'center' },
                        },
                      }}
                      style={{
                        width: '100px',
                        textAlign: 'center',
                      }}
                      sx={{
                        '& input[type=number]': {
                          MozAppearance: 'textfield',
                        },
                        '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                          WebkitAppearance: 'none',
                          margin: 0,
                        },
                      }}
                    />

                    <button
                      className="btn btn-success"
                      type="button"
                      onClick={() => setFormData({ ...formData, quantity: formData.quantity + 1 })}
                    >
                      <i className="fa fa-plus"></i>
                    </button>
                  </div>
                  <div style={{ flexGrow: 1 }}></div>
                  <DialogActions style={{ justifyContent: 'start', marginTop: '20px' }}>
                    <Button type="submit" className="btn-success" variant="contained">
                      Thêm vào giỏ hàng
                    </Button>
                    <div
                      className="rounded-circle border p-2"
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer',
                        transition: 'transform 1s ease',
                      }}

                    >
                      <i
                        className={`fa fa-heart ${isFavorite ? 'favorite' : ''}`}
                        style={{
                          fontSize: '24px',
                          color: isFavorite ? 'red' : 'gray',
                        }}
                        onClick={toggleFavorite}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.2)')}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                      ></i>
                    </div>

                  </DialogActions>
                </form>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MenusItem;
