'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'next/image';
import { TextField } from '@mui/material';
import Link from 'next/link';
import {
  selectCartItems,
  selectCartTotalPrice,
  selectCartTotalQuantity,
  selectIsCartEmpty,
} from '@/store/cartSelectors';
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  updateCart,
} from '@/store/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const totalPrice = useSelector(selectCartTotalPrice);
  const totalQuantity = useSelector(selectCartTotalQuantity);
  const isEmpty = useSelector(selectIsCartEmpty);
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      dispatch(updateCart(parsedCart));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem(
      'cart',
      JSON.stringify({ items, totalQuantity, totalPrice })
    );
  }, [items, totalQuantity, totalPrice]);
  if (isEmpty) {
    return (
      <section id="cart" className="menu">
        <div className="container" data-aos="fade-up">
          <div className="section-title">
            <h2>Your cart</h2>
            <p>Check Your Meal</p>
          </div>
          <div className="text-center py-5">
            <h3 className="mb-4">Giỏ hàng của bạn đang trống</h3>
            <p className="mb-4">Hãy thêm món ăn vào giỏ hàng để đặt đơn</p>
            <Link href="/menu" className="book-a-table-btn">
              Xem Menu
            </Link>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section id="cart" className="menu">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>Your cart</h2>
          <p>Check Your Meal</p>
        </div>
        <div className="row">
          <div className="col-lg-8">
            <div className="card mb-4">
              <div
                className="card-header text-white"
                style={{ background: '#1a285a' }}
              >
                Sản phẩm
              </div>
              <div className="card-body">
                {items.map((item) => (
                  <div key={item._id} className="row mb-3 align-items-center">
                    <div className="col-md-2">
                      <Image
                        width={70}
                        height={70}
                        src={`http://localhost:3002/images/${item.image}`}
                        className="menu-img"
                        alt={item.name}
                        layout="fixed"
                      />
                    </div>
                    <div className="col-md-4">
                      <h5>{item.name}</h5>
                    </div>
                    <div
                      className="col-md-3"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        border: '1px solid #1a285a',
                        maxWidth: 'fit-content',
                        borderRadius: '50px',
                      }}
                    >
                      <div
                        className="btn-custom-plusminus"
                        onClick={() =>
                          dispatch(decrementQuantity({ id: item._id }))
                        }
                      >
                        <i className="fa fa-minus"></i>
                      </div>

                      <TextField
                        margin="dense"
                        name="quantity"
                        type="number"
                        value={item.quantity}
                        InputProps={{
                          inputProps: {
                            style: { textAlign: 'center' },
                            readOnly: true,
                          },
                          sx: { height: '30px' },
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
                          dispatch(incrementQuantity({ id: item._id }))
                        }
                      >
                        <i className="fa fa-plus"></i>
                      </div>
                    </div>
                    <div className="col-md-2 text-end">
                      <p className="mb-0">{item.price} VNĐ</p>
                    </div>
                    <div className="col-md-1 text-end">
                      <button
                        className="btn btn-danger"
                        onClick={() =>
                          dispatch(removeFromCart({ id: item._id }))
                        }
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                ))}
                <hr />
                <div className="row">
                  <div className="col-md-6"></div>
                  <div className="col-md-6 text-end">
                    <div className="book-a-table-btn">Cập nhật giỏ hàng</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card">
              <div
                className="card-header text-white"
                style={{ background: '#1a285a' }}
              >
                Tổng hóa đơn
              </div>
              <div className="card-body">
                <ul className="list-group mb-3">
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Tổng tiền sản phẩm</span>
                    <span>{(totalPrice || 0).toLocaleString()} VNĐ</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Phí vận chuyển</span>
                    <span>50.000 VNĐ</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Thành tiền</span>
                    <strong>
                      {((totalPrice || 0) + 50000).toLocaleString()} VNĐ
                    </strong>
                  </li>
                </ul>
                <a href="#" className="btn btn-success w-100">
                  Thanh toán
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
