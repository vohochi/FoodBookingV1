import Image from 'next/image';
import product from '@/public/img/about-bg.jpg';

const AboutHome = () => {
  return (
    <section id="about" className="about">
      <div className="container" data-aos="fade-up">
        <div className="row">
          <div
            className="col-lg-6 order-1 order-lg-2"
            data-aos="zoom-in"
            data-aos-delay={100}
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
            Chúng tôi cung cấp dịch vụ hoàn hảo và chất lượng vượt trội.
            </h3>
            <p className="fst-italic">
            Chúng tôi cam kết mang đến cho bạn trải nghiệm tuyệt vời, đáp ứng mọi nhu cầu và mong đợi của bạn. 
            Dù bạn tìm kiếm sự tiện nghi, thoải mái hay đột phá trong phong cách, chúng tôi luôn sẵn sàng phục vụ.
            </p>
            <ul>
              <li>
                <i className="bi bi-check-circle" /> Chất lượng hàng đầu: Chúng tôi đảm bảo mọi sản phẩm đều được kiểm tra kỹ lưỡng, mang lại sự an tâm tuyệt đối.
              </li>
              <li>
                <i className="bi bi-check-circle" /> Dịch vụ tận tình: Đội ngũ của chúng tôi luôn lắng nghe và hỗ trợ bạn, giúp bạn có được trải nghiệm tốt nhất.
              </li>
              <li>
                <i className="bi bi-check-circle" /> Sáng tạo không ngừng: Chúng tôi không ngừng cải tiến và đổi mới để mang lại những sản phẩm độc đáo, dẫn đầu xu hướng.
              </li>
            </ul>
            <p>
            Chúng tôi hiểu rằng sự hài lòng của bạn là thành công của chúng tôi. 
            Đó là lý do vì sao mỗi chi tiết nhỏ đều được chú trọng để tạo nên trải nghiệm vượt trội, 
            từ sản phẩm chất lượng đến dịch vụ tận tâm. Hãy tin tưởng và lựa chọn chúng tôi
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHome;
