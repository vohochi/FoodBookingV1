import Image from 'next/image';
const Cart = () => {
  return (
    <section id="cart" className="menu section-bg">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>Your cart</h2>
          <p>Check Your Meal</p>
        </div>
        <div className="row">
          {/* Product list */}
          <div className="col-lg-8">
            <div className="card section-bg mb-4">
              <div className="card-header">Sản phẩm</div>
              <div className="card-body">
                {/* product */}
                <div className="row mb-3 align-items-center">
                  <div className="col-md-2">
                    <Image
                      width={70} // Giữ kích thước theo CSS
                      height={70} // Giữ kích thước theo CSS
                      src="/img/menu/lobster-bisque.jpg"
                      className="menu-img"
                      alt="Lobster Bisque"
                      layout="fixed" // Sử dụng layout fixed để giữ kích thước
                    />
                  </div>
                  <div className="col-md-4">
                    <h5>Sản phẩm 1</h5>
                  </div>
                  <div className="col-md-3 d-flex justify-content-center align-items-center">
                    <button
                      className="btn btn-outline-secondary btn-sm px-3"
                      id="decreaseQty"
                    >
                      <i className="fa fa-minus" />
                    </button>
                    <input
                      type="text"
                      className="quantity-cart form-control mx-2 text-center"
                      defaultValue={1}
                      min={1}
                      style={{ width: 60 }}
                    />
                    <button
                      className="btn btn-outline-secondary btn-sm px-3"
                      id="increaseQty"
                    >
                      <i className="fa fa-plus" />
                    </button>
                  </div>
                  <div className="col-md-2 text-end">
                    <p className="mb-0">200.000 VNĐ</p>
                  </div>
                  <div className="col-md-1 text-end">
                    <button className="btn btn-danger">Xóa</button>
                  </div>
                </div>
                <hr />
                <div className="row mb-3 align-items-center">
                  <div className="col-md-2">
                    <Image
                      width={70} // Giữ kích thước theo CSS
                      height={70} // Giữ kích thước theo CSS
                      src="/img/menu/lobster-bisque.jpg"
                      className="menu-img"
                      alt="Lobster Bisque"
                      layout="fixed" // Sử dụng layout fixed để giữ kích thước
                    />
                  </div>
                  <div className="col-md-4">
                    <h5>Sản phẩm 1</h5>
                  </div>
                  <div className="col-md-3 d-flex justify-content-center align-items-center">
                    <button
                      className="btn btn-outline-secondary btn-sm px-3"
                      id="decreaseQty"
                    >
                      <i className="fa fa-minus" />
                    </button>
                    <input
                      type="text"
                      className="quantity-cart form-control mx-2 text-center"
                      defaultValue={1}
                      min={1}
                      style={{ width: 60 }}
                    />
                    <button
                      className="btn btn-outline-secondary btn-sm px-3"
                      id="increaseQty"
                    >
                      <i className="fa fa-plus" />
                    </button>
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
            <div className="card section-bg">
              <div className="card-header">Tổng hóa đơn</div>
              <div className="card-body">
                <ul className="list-group mb-3">
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Tổng tiền sản phẩm</span>
                    <strong>$60.00</strong>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Phí vận chuyển</span>
                    <strong>$5.00</strong>
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
