const Contact = () => {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-title">
          <h2>Liên hệ</h2>
          <p>Liên hệ đến chúng tôi</p>
        </div>
      </div>
      <div >
        <iframe
          title="map"
          style={{ border: 0, width: '100%', height: 350 }}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d979.6110331420365!2d106.62487126886845!3d10.853785163716562!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752b6c59ba4c97%3A0x535e784068f1558b!2zVHLGsOG7nW5nIENhbyDEkeG6s25nIEZQVCBQb2x5dGVjaG5pYw!5e0!3m2!1svi!2s!4v1732628646947!5m2!1svi!2s"
          frameBorder={0}
        />

      </div>
      <div className="container">
        <div className="row mt-5">
          <div className="col-lg-4">
            <div className="info">
              <div className="address">
                <i className="bi bi-geo-alt" />
                <h4>Địa chỉ:</h4>
                <p>Tòa QTSC 9, Quận 12, tp Hồ Chí Minh</p>
              </div>
              <div className="open-hours">
                <i className="bi bi-clock" />
                <h4>Giờ mở cửa:</h4>
                <p>
                  Cả tuần:
                  <br />
                  8:00 AM - 2300 PM
                </p>
              </div>
              <div className="email">
                <i className="bi bi-envelope" />
                <h4>Email:</h4>
                <p>nam232004@gmail.com</p>
              </div>
              <div className="phone">
                <i className="bi bi-phone" />
                <h4>Liên hệ:</h4>
                <p>0932953477</p>
              </div>
            </div>
          </div>
          <div className="col-lg-8 mt-5 mt-lg-0">
            <form
              action="forms/contact.php"
              method="post"
              role="form"
              className="php-email-form"
            >
              <div className="row">
                <div className="col-md-6 form-group">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    placeholder="Tên"
                  />
                </div>
                <div className="col-md-6 form-group mt-3 mt-md-0">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="form-group mt-3">
                <input
                  type="text"
                  className="form-control"
                  name="subject"
                  id="subject"
                  placeholder="Tiêu đề"
                />
              </div>
              <div className="form-group mt-3">
                <textarea
                  className="form-control"
                  name="message"
                  rows={8}
                  placeholder="Lời nhắn"
                  defaultValue={''}
                />
              </div>
              <div className="my-3">
                <div className="loading">Loading</div>
                <div className="error-message" />
                <div className="sent-message">
                  Your message has been sent. Thank you!
                </div>
              </div>
              <div className="text-center">
                <button className="mx-auto book-a-table-btn btn">
                  Gửi lời nhắn
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
