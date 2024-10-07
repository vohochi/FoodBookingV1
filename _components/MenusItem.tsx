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
} from '@mui/material';
import { Dish } from '@/types/Dishes'; // Import interface Dish
import Link from 'next/link';

interface MenusItemProps {
  food: Dish; // Nhận thông tin món ăn qua props
}

const MenusItem = ({ food }: MenusItemProps) => {
  const [open, setOpen] = useState(false); // State để quản lý trạng thái modal
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
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Order {food.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill out the form below to place your order.
          </DialogContentText>
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Your Name"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="email"
              label="Your Email"
              type="email"
              fullWidth
              variant="outlined"
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="quantity"
              label="Quantity"
              type="number"
              fullWidth
              variant="outlined"
              value={formData.quantity}
              onChange={handleChange}
            />
            <DialogActions>
              <Button type="submit" color="primary">
                Submit Order
              </Button>
              <Button onClick={handleClose} color="secondary">
                Cancel
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MenusItem;
