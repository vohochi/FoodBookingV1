'use client';

import Image from 'next/image';
import { useState, useCallback, ChangeEvent, FormEvent } from 'react';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  Grid,
  Box,
} from '@mui/material';
import { Menu } from '@/types/Menu';
import Link from 'next/link';
import { FaFire, FaStar } from 'react-icons/fa6';
interface MenusItemProps {
  food: Menu;
}

const MenusItem = ({ food }: MenusItemProps) => {
  const [open, setOpen] = useState(false); // State để quản lý trạng thái modal
  const [isFavorite, setIsFavorite] = useState(false);
  const [formData, setFormData] = useState({
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
    <div className="col-lg-3 col-md-4 col-sm-6 col-6 menu-item filter-starters">
      <div
        className="card product-box shadow p-3"
        style={{ position: 'relative' }}
      >
        <Link href={`/user/menus/${food._id}`}>
          <div
            className="mx-auto overflow-hidden"
            style={{ width: 'full', height: 'full', position: 'relative' }}
          >
            <Image
              src={`http://localhost:3002/images/${food.image}`}
              alt={food.name}
              className="mx-auto bg-transparent "
              width={400}
              height={400}
              objectFit="cover"
              style={{
                borderRadius: '8px',
                width: '100%',
                height: 'auto',
              }}
            />
          </div>
          {true && (
            <span
              className="badge bg-warning text-light p-2 text-center"
              style={{
                position: 'absolute',
                top: '-5px',
                right: '10px',
                fontSize: '20px',
              }}
            >
              <FaFire />
            </span>
          )}
        </Link>
        <div className="card-body row mt-2 p-0">
          <h5
            className="card-title col-12"
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              color: '#1a285a',
              fontWeight: 'bold',
              textAlign: 'center',
              paddingBottom: '20px',
            }}
          >
            {food.name}
          </h5>
          <div className="col-6  text-start">
            <p
              className=""
              style={{
                color: '#248F55',
                fontSize: '18px',
                marginBottom: '0px',
              }}
            >
              ${food.price}
            </p>
            <div className="">
              {/* Render stars */}
              {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  style={{ color: '#248F55', fontSize: '14px' }}
                />
              ))}
            </div>
          </div>
          <div className="col-6  text-end">
            <Button className="btn btn-success" onClick={handleClickOpen}>
              Chi tiết
            </Button>
          </div>
        </div>
      </div>

      {/* Modal từ MUI */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogContent
          className="hidden-scroll"
          style={{
            padding: '20px',
            border: '1px solid gray',
            color: '#1a285a',
          }}
        >
          <Grid
            container
            spacing={2}
            className="container"
            data-aos="fade-up"
            style={{ marginBottom: '20px' }}
          >
            <Grid item xs={12} sm={5}>
              <div data-aos="zoom-in" data-aos-delay={50} className="mx-auto">
                <div className="img-hover-zoom">
                  <Image
                    src={`http://localhost:3002/images/${food.image}`}
                    alt={food.name}
                    className="mx-auto bg-transparent "
                    width={400}
                    height={400}
                    objectFit="cover"
                    style={{
                      borderRadius: '8px',
                      width: '100%',
                      height: 'auto',
                    }}
                  />
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={1}></Grid>

            <Grid item xs={12} sm={6}>
              <DialogContentText style={{ color: '#1a285a' }}>
                <h2>{food.name}</h2>
              </DialogContentText>
              {/* Sử dụng Box để tạo flex column layout */}
              <Box display="flex" flexDirection="column" height="100%">
                <DialogContentText>
                  <h3
                    style={{
                      color: '#cde45a',
                      fontSize: '30px',
                      marginBottom: '20px',
                    }}
                  >
                    {food.price}{' '}
                  </h3>
                </DialogContentText>
                <DialogContentText>
                  <p style={{ color: '#101010' }}>Một chút mô tả</p>
                </DialogContentText>
                <DialogContentText style={{ marginBottom: '20px' }}>
                  {food.description}
                </DialogContentText>

                {/* Form nhập thông tin */}
                <form onSubmit={handleSubmit} style={{ flexGrow: 1 }}>
                  <DialogContentText>
                    <p style={{ color: '#101010' }}>
                      Nhập số lượng bạn muốn order
                    </p>
                  </DialogContentText>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginTop: '20px',
                      border: '1px solid #1a285a',
                      maxWidth: 'fit-content',
                      borderRadius: '50px',
                    }}
                  >
                    <div
                      className="btn-custom-plusminus"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          quantity: Math.max(1, formData.quantity - 1),
                        })
                      }
                    >
                      <i className="fa fa-minus"></i>
                    </div>

                    <TextField
                      margin="dense"
                      name="quantity"
                      type="number"
                      value={formData.quantity}
                      onChange={handleChange}
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
                        borderLeft: '1px solid rgba(26, 40, 90, 0.3)',
                        borderRight: '1px solid rgba(26, 40, 90, 0.3)',
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
                      onClick={() =>
                        setFormData({
                          ...formData,
                          quantity: formData.quantity + 1,
                        })
                      }
                    >
                      <i className="fa fa-plus"></i>
                    </div>
                  </div>
                  <div style={{ flexGrow: 1 }}></div>
                  <DialogActions
                    style={{
                      justifyContent: 'start',
                      marginTop: '20px',
                      padding: '0',
                    }}
                  >
                    <button type="submit" className="btn btn-success">
                      Thêm vào giỏ hàng
                    </button>
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
                        className={`fa fa-heart ${
                          isFavorite ? 'favorite' : ''
                        }`}
                        style={{
                          fontSize: '24px',
                          color: isFavorite ? 'red' : 'gray',
                        }}
                        onClick={toggleFavorite}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.transform = 'scale(1.2)')
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.transform = 'scale(1)')
                        }
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
