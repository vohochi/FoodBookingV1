'use client';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'next/image';
import { TextField, Select, MenuItem, Button } from '@mui/material';
import Link from 'next/link';
import styles from '@/app/_styles/Cart.module.css';
import {
  selectCartItems,
  selectCartTotalPrice,
  selectCartTotalQuantity,
  selectIsCartEmpty,
} from '@/store/selector/cartSelectors';
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  updateSize,
} from '@/store/slice/cartSlice';
import { formatPrice } from '@/utils/priceVN';
import Cookies from 'js-cookie';

const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const totalPrice = useSelector(selectCartTotalPrice);
  const totalQuantity = useSelector(selectCartTotalQuantity);
  const isEmpty = useSelector(selectIsCartEmpty);

  const [isMounted, setIsMounted] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      Cookies.set('cart', JSON.stringify({ items, totalQuantity, totalPrice }), {
        expires: 7,
      });
    }
  }, [items, totalQuantity, totalPrice, isMounted]);

  if (!isMounted) {
    return null;
  }
  const handleUpdateCart = () => {
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
    }, 1000);
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
    }, 1000);
  };

  if (isEmpty) {
    return (
      <section id="cart" className="menu">
        <div className="container mt-4">
          <div className={styles.emptyCart}>
            <h3 className="mb-4 text-black">Giỏ hàng của bạn đang trống</h3>
            <p className="mb-4 text-black">Hãy thêm món ăn vào giỏ hàng để đặt đơn</p>
            <Link href="/user/menus" className="book-a-table-btn">
              Xem Menu
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="cart" className="menu">
      <div className="container">
        <div className="section-title">
          <h2>Your cart</h2>
          <p>Check Your Meal</p>
        </div>
        <div className="row">
          <div className="col-lg-8">
            <div className={`card mb-4 ${styles.card}`}>
              <div className={styles.cardHeader}>Sản phẩm</div>
              <div className="card-body">
                {items.map((item) => (
                  <div key={item._id} className={`row ${styles.cartItem} p-4`}>
                    <div className="col-md-2">
                      <div className={styles.productImage}>
                        <Image
                          width={70}
                          height={70}
                          src={`http://localhost:3002/images/${item.img}`}
                          className="menu-img"
                          alt={item.name}
                          layout="fixed"
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <h5 className={styles.productName}>{item.name}</h5>

                      {item.variant && item.variant.length > 0 && (
                        <div className="d-flex align-items-start" style={{ margin: '0', padding: '0' }}>
                          <p style={{ color: '#888', margin: 0 }}>Chọn size:</p>
                          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                            <Select
                              value={item.selectedSize || ""}
                              onChange={(e) => dispatch(updateSize({ id: item._id, size: e.target.value }))}
                              displayEmpty
                              renderValue={(selected) => selected || <span style={{ color: '#888' }}>Chọn size</span>}
                              sx={{
                                '.MuiOutlinedInput-notchedOutline': { border: 'none' },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 'none' },
                                padding: '0',
                                '& .MuiSelect-select': { padding: '0' },
                                minWidth: 80,
                                margin: 0,
                              }}
                            >
                              {item.variant.map((variant) => (
                                <MenuItem key={variant.size} value={variant.size}>
                                  {variant.size}
                                </MenuItem>
                              ))}
                            </Select>
                          </div>
                        </div>
                      )}

                    </div>
                    <div className="col-md-3">
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          margin: '20px 0px',
                          border: '1px solid #1a285a',
                          maxWidth: 'fit-content',
                          borderRadius: '50px',
                        }}
                      >
                        <div
                          className="btn-custom-plusminus"
                          onClick={() => dispatch(decrementQuantity({ id: item._id }))}
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
                              style: {
                                textAlign: 'center',
                                color: '#1a285a',
                                fontWeight: '500',
                              },
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
                          }}
                        />
                        <div
                          className="text-center btn-custom-plusminus"
                          onClick={() => dispatch(incrementQuantity({ id: item._id }))}
                        >
                          <i className="fa fa-plus"></i>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-2 text-end">
                      <p className={`mb-0 ${styles.productPrice}`}>
                        {formatPrice(item.price * item.quantity)} VNĐ
                      </p>
                    </div>
                    <div className="col-md-1 text-end">
                      <Button
                        className={`btn btn-product2 ${styles.deleteBtn}`}
                        onClick={() => dispatch(removeFromCart({ id: item._id }))}
                      >
                        <i className="fa fa-trash"></i>
                      </Button>
                    </div>
                  </div>
                ))}
                <div className="row pt-3">
                  <div className="col-md-6"></div>
                  <div className="col-md-6 text-end ">
                    <div
                      className={`book-a-table-btn ${styles.updateCartBtn}`}
                      onClick={handleUpdateCart}
                      style={{ opacity: isUpdating ? 0.7 : 1 }}
                    >
                      {isUpdating ? 'Đang cập nhật...' : 'Cập nhật giỏ hàng'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className={`card ${styles.card}`}>
              <div className={styles.cardHeader}>Tổng hóa đơn</div>
              <div className="card-body">
                <ul className="list-group mb-3">
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Tổng tiền sản phẩm</span>
                    <span className={styles.totalPrice}>
                      {formatPrice(totalPrice || 0)} VNĐ
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Phí vận chuyển</span>
                    <span>50.000 VNĐ</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Thành tiền</span>
                    <strong className={styles.totalPrice}>
                      {formatPrice((totalPrice || 0) + 50000)} VNĐ
                    </strong>
                  </li>
                </ul>
                <button
                  className={`btn btn-product w-100 ${styles.checkoutBtn}`}
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  style={{ opacity: isCheckingOut ? 0.7 : 1 }}
                >
                  {isCheckingOut ? 'Đang xử lý...' : 'Thanh toán'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
