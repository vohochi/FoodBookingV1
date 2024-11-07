'use client';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'next/image';
import { TextField } from '@mui/material';
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
  updateCart,
} from '@/store/slice/cartSlice';
import { formatPrice } from '@/utils/priceVN';
import Cookies from 'js-cookie';

const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const totalPrice = useSelector(selectCartTotalPrice);
  const totalQuantity = useSelector(selectCartTotalQuantity);
  const isEmpty = useSelector(selectIsCartEmpty);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    const savedCart = Cookies.get('cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      dispatch(updateCart(parsedCart));
    }
  }, [dispatch]);

  useEffect(() => {
    Cookies.set('cart', JSON.stringify({ items, totalQuantity, totalPrice }), {
      expires: 7,
    }); // Set expiration to 7 days
  }, [items, totalQuantity, totalPrice]);

  const handleUpdateCart = () => {
    setIsUpdating(true);
    // Add cart update logic here
    setTimeout(() => {
      setIsUpdating(false);
    }, 1000);
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Add checkout logic here
    setTimeout(() => {
      setIsCheckingOut(false);
    }, 1000);
  };

  if (isEmpty) {
    return (
      <section id="cart" className="menu">
        <div className="container" data-aos="fade-up">
          <div className="section-title">
            <h2>Your cart</h2>
            <p>Check Your Meal</p>
          </div>
          <div className={styles.emptyCart}>
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
            <div className={`card mb-4 ${styles.card}`}>
              <div className={styles.cardHeader}>Sản phẩm</div>
              <div className="card-body">
                {items.map((item) => (
                  <div key={item._id} className={`row ${styles.cartItem}`}>
                    <div className="col-md-2">
                      <div className={styles.productImage}>
                        <Image
                          width={70}
                          height={70}
                          src={`${item.image}`}
                          className="menu-img"
                          alt={item.name}
                          layout="fixed"
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <h5 className={styles.productName}>{item.name}</h5>
                    </div>
                    <div className="col-md-3">
                      <div className={styles.quantityControl}>
                        <div
                          className={styles.btnCustomPlusminus}
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
                          className={styles.btnCustomPlusminus}
                          onClick={() =>
                            dispatch(incrementQuantity({ id: item._id }))
                          }
                        >
                          <i className="fa fa-plus"></i>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-2 text-end">
                      <p className={`mb-0 ${styles.productPrice}`}>
                        {formatPrice(item.price)} VNĐ
                      </p>
                    </div>
                    <div className="col-md-1 text-end">
                      <button
                        className={`btn btn-danger ${styles.deleteBtn}`}
                        onClick={() =>
                          dispatch(removeFromCart({ id: item._id }))
                        }
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </div>
                  </div>
                ))}
                <hr />
                <div className="row">
                  <div className="col-md-6"></div>
                  <div className="col-md-6 text-end">
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
                  className={`btn btn-success w-100 ${styles.checkoutBtn}`}
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
