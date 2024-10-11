import React from 'react';
import Image from 'next/image';
export const metadata = {
  title: 'Account/profile',
};

const page = () => {
  return (
    <main id="main">
      {/* ======= Profile Section ======= */}
      <section id="" className="specials">
        <div className="container" data-aos="fade-up">
          <div className="section-title">
            <h2>Check your</h2>
            <p>Information</p>
          </div>
          <div className="row" data-aos="fade-up" data-aos-delay={100}>
            <div className="col-lg-3 ">
              <ul className="nav nav-tabs flex-column">
                <li className="nav-item">
                  <a
                    className="nav-link active show"
                    data-bs-toggle="tab"
                    href="#tab-1"
                  >
                    Thông tin cá nhân
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-bs-toggle="tab" href="#tab-2">
                    Đơn hàng
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-bs-toggle="tab" href="#tab-3">
                    Lịch sử mua hàng
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-9 mt-4 mt-lg-0">
              <div className="tab-content">
                <div className="tab-pane active show" id="tab-1">
                  <div className="row">
                    <div className="card section-bg">
                      <div className="card-body">
                        <div className="row mb-3">
                          <div className="col-md-4 text-center">
                            <div className="mb-3">
                              <Image
                                src="/img/chefs/chefs-1.jpg"
                                className="img-fluid rounded-circle"
                                alt="Avatar"
                                width={250}
                                height={250}
                              />
                            </div>
                            <div>
                              <div className="btn btn-success">Thay đổi</div>
                            </div>
                          </div>
                          <div className="col-md-8">
                            <form action="#" method="POST">
                              <div className="form-group">
                                <label htmlFor="name">Họ và tên:</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="name"
                                  name="name"
                                  defaultValue="Nguyễn Văn A"
                                />
                              </div>
                              <div className="form-group mt-3">
                                <label htmlFor="email">Email:</label>
                                <input
                                  type="email"
                                  className="form-control"
                                  id="email"
                                  name="email"
                                  defaultValue="nguyenvana@example.com"
                                />
                              </div>
                              <div className="form-group mt-3">
                                <label htmlFor="phone">Số điện thoại:</label>
                                <input
                                  type="tel"
                                  className="form-control"
                                  id="phone"
                                  name="phone"
                                  // defaultValue={0123456789}
                                />
                              </div>
                              <div className="form-group mt-3">
                                <label htmlFor="address">Địa chỉ:</label>
                                <input
                                  type="textarea"
                                  className="form-control"
                                  id="address"
                                  name="address"
                                  defaultValue="tp HCM"
                                />
                              </div>
                              <button
                                type="submit"
                                className="btn btn-success mt-4"
                              >
                                Lưu thay đổi
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tab-pane" id="tab-2">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="order-card section-bg p-3 mb-3">
                        <div className="d-flex justify-content-between align-items-center">
                          <strong>#DH177013</strong>
                          <span>01/10/2024</span>
                          <span>4 sản phẩm</span>
                          <span className="badge bg-warning">Đang xử lý</span>
                          <span>
                            <i
                              className="fa-solid fa-bars"
                              data-bs-toggle="modal"
                              data-bs-target="#productModal"
                            />
                          </span>
                        </div>
                      </div>
                      <div className="order-card section-bg p-3 mb-3">
                        <div className="d-flex justify-content-between align-items-center">
                          <strong>#DH177013</strong>
                          <span>01/10/2024</span>
                          <span>4 sản phẩm</span>
                          <span className="badge bg-success">Đã giao</span>
                          <span>
                            <i
                              className="fa-solid fa-bars"
                              data-bs-toggle="modal"
                              data-bs-target="#productModal"
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tab-pane" id="tab-3">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="order-card section-bg p-3 mb-3">
                        <div className="d-flex justify-content-between align-items-center">
                          <strong>#DH177013</strong>
                          <span>01/10/2024</span>
                          <span>4 sản phẩm</span>
                          <strong className="credits">
                            <a href="#">1.000.000 VNĐ</a>
                          </strong>
                          <span>
                            <i
                              className="fa-solid fa-bars"
                              data-bs-toggle="modal"
                              data-bs-target="#productModal"
                            />
                          </span>
                        </div>
                      </div>
                      <div className="order-card section-bg p-3 mb-3">
                        <div className="d-flex justify-content-between align-items-center">
                          <strong>#DH177013</strong>
                          <span>01/10/2024</span>
                          <span>4 sản phẩm</span>
                          <strong className="credits">
                            <a href="#">1.000.000 VNĐ</a>
                          </strong>
                          <span>
                            <i
                              className="fa-solid fa-bars"
                              data-bs-toggle="modal"
                              data-bs-target="#productModal"
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Modal for bill detail */}
        <div
          className="modal fade"
          id="productModal"
          tabIndex={-1}
          aria-labelledby="productModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content section-bg">
              <div className="modal-header">
                <strong>#DH177013</strong>
                <button
                  type="button"
                  className="btn-close bg-warning"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body text-center">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="product-info d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
                      <div className="col-md-2">
                        <Image
                          id="modalProductImage"
                          src="/img/menu/bread-barrel.jpg"
                          className="img-fluid"
                          width={50}
                          height={50}
                          alt="hình"
                        />
                      </div>
                      <div className="col-md-3">
                        <span className="fw-bold">Bánh</span>
                      </div>
                      <div className="col-md-3">
                        <span className="fw-bold">1.000.000 VND</span>
                      </div>
                      <div className="col-md-1">
                        <span className="text-muted">1</span>
                      </div>
                      <div className="col-md-3">
                        <strong>
                          <span id="modalTotalAmount">1.000.000 VND</span>
                        </strong>
                      </div>
                    </div>
                    <div className="product-info d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
                      <div className="col-md-2">
                        <Image
                          id="modalProductImage"
                          src="/img/menu/bread-barrel.jpg"
                          className="img-fluid"
                          width={50}
                          height={50}
                          alt="hình"
                        />
                      </div>
                      <div className="col-md-3">
                        <span className="fw-bold">Tên sản phẩm</span>
                      </div>
                      <div className="col-md-3">
                        <span className=" fw-bold">1.000.000 VND</span>
                      </div>
                      <div className="col-md-1">
                        <span className="text-muted">1</span>
                      </div>
                      <div className="col-md-3">
                        <strong>
                          <span id="modalTotalAmount">1.000.000 VND</span>
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <div className="text-start">
                  <strong>Tổng cộng:</strong>{' '}
                  <span className="credits">
                    <a href="">2.000.000 VND</a>
                  </span>
                </div>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
        {/*end modal*/}
      </section>
      {/* End Specials Section */}
    </main>
  );
};

export default page;
