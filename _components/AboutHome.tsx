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
              Tinh hoa ẩm thực – nơi lưu giữ trọn vẹn hương vị.
            </h3>
            <p className="fst-italic">
              Hãy để những món ăn tại nhà hàng chúng tôi trở thành hành trình khám phá ẩm thực đáng nhớ trong cuộc sống của bạn.
            </p>
            <ul>
              <li>
                <i className="bi bi-check-circle" /> Trải nghiệm vị ngon độc đáo, ghi dấu trong lòng thực khách.
              </li>
              <li>
                <i className="bi bi-check-circle" /> Hương vị lan tỏa – kết nối yêu thương.
              </li>
              <li>
                <i className="bi bi-check-circle" /> Nhà hàng không chỉ là nơi thưởng thức ẩm thực, mà còn là không gian để sẻ chia những khoảnh khắc quý giá bên gia đình và bạn bè.
              </li>
            </ul>
            <p>
              Chất lượng, sáng tạo và tận tâm là giá trị cốt lõi mà nhà hàng chúng tôi luôn đặt lên hàng đầu.
              Thưởng thức một bữa ăn tại đây không chỉ là cảm nhận về hương vị mà còn là một hành trình cảm xúc đầy ý nghĩa.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHome;
