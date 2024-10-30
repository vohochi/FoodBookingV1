import Image from 'next/image';
import product from '@/public/img/about-bg.jpg';

const AboutHome = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="row">
          <div
            className="col-lg-6 order-1 order-lg-2"
          >
            <div className="about-img">
              <Image
                src={product}
                layout="responsive" // Dùng layout "responsive" để tự động điều chỉnh kích thước
                width={500} // Đặt chiều rộng tùy ý, điều chỉnh cho phù hợp
                height={400} // Đặt chiều cao tùy ý, điều chỉnh cho phù hợp
                alt="Mô tả hình ảnh"
              />
            </div>
          </div>
          <div className="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content">
            <h3>
              Voluptatem dignissimos provident quasi corporis voluptates sit
              assumenda.
            </h3>
            <p className="fst-italic">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <ul>
              <li>
                <i className="bi bi-check-circle" /> Ullamco laboris nisi ut
                aliquip ex ea commodo consequat.
              </li>
              <li>
                <i className="bi bi-check-circle" /> Duis aute irure dolor in
                reprehenderit in voluptate velit.
              </li>
              <li>
                <i className="bi bi-check-circle" /> Ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate trideta storacalaperda mastiro dolore
                eu fugiat nulla pariatur.
              </li>
            </ul>
            <p>
              Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
              irure dolor in reprehenderit in voluptate velit esse cillum dolore
              eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
              proident, sunt in culpa qui officia deserunt mollit anim id est
              laborum.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHome;
