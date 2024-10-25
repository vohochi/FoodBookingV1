'use client'
import { TextField } from '@mui/material';
import Image from 'next/image';
import { useState, ChangeEvent } from 'react';
const Cart = () => {
  const [formData, setFormData] = useState({
    quantity: 1,
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Validate quantity để tránh số âm hoặc zero
    if (name === 'quantity' && +value <= 0) {
      return;
    }
    setFormData({ ...formData, [name]: value });
  };
  return (
    <section id="cart" className="menu">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>Your cart</h2>
          <p>Check Your Meal</p>
        </div>
        <div className="row">
          {/* Product list */}
          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-header text-white" style={{background:'#1a285a'}}>Sản phẩm</div>
              <div className="card-body">
                {/* product */}
                <div className="row mb-3 align-items-center">
                  <div className="col-md-2">
                    <Image
                      width={70} 
                      height={70} 
                      src="/img/menu/lobster-bisque.jpg"
                      className="menu-img"
                      alt="Lobster Bisque"
                      layout="fixed" // Sử dụng layout fixed để giữ kích thước
                    />
                  </div>
                  <div className="col-md-4">
                    <h5>Sản phẩm 1</h5>
                  </div>
                  <div className='col-md-3' style={{ display: 'flex', alignItems: 'center', border: '1px solid #1a285a', maxWidth: 'fit-content', borderRadius: '50px' }}>
                    <div
                      className="btn-custom-plusminus"
                      onClick={() =>
                        setFormData({ ...formData, quantity: Math.max(1, formData.quantity - 1) })
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
                          height: '30px'
                        }
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
                          color: '#1a285a'
                        },
                        '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                          WebkitAppearance: 'none',
                          margin: 0,
                        },
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            border: 'none'
                          },
                          '&:hover fieldset': {
                            border: 'none'

                          },
                          '&.Mui-focused fieldset': {
                            border: 'none'

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
                      onClick={() => setFormData({ ...formData, quantity: formData.quantity + 1 })}
                    >
                      <i className="fa fa-plus"></i>
                    </div>
                  </div>
                  <div className="col-md-2 text-end">
                    <p className="mb-0">200.000 VNĐ</p>
                  </div>
                  <div className="col-md-1 text-end">
                    <button className="btn btn-danger">Xóa</button>
                  </div>
                </div>
                <hr />
                <div className="row ">
                  <div className="col-md-6"></div>
                  <div className="col-md-6 text-end">
                    <div className="book-a-table-btn">Cập nhật giỏ hàng</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Order summary */}
          <div className="col-lg-4">
            <div className="card">
              <div className="card-header text-white" style={{background:'#1a285a'}}>Tổng hóa đơn</div>
              <div className="card-body">
                <ul className="list-group mb-3">
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Tổng tiền sản phẩm</span>
                    <span>$60.00</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Phí vận chuyển</span>
                    <span>$5.00</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Thành tiền</span>
                    <strong>$65.00</strong>
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
