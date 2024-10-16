'use client'
import { Button, TextField } from '@mui/material';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';
import { IoFastFood } from "react-icons/io5";
import Menus from './Menus';
import RelatedFood from './RelatedFood';
const foodQuotes = [
  {
    topic: 1,
    quote: "Cơm không chỉ đơn thuần là một món ăn; nó là biểu tượng của gia đình, sự gắn kết và truyền thống. Trong từng hạt gạo là tình yêu thương của người nấu, và mỗi bữa cơm là dịp để các thành viên trong gia đình quây quần bên nhau, chia sẻ những câu chuyện và trải nghiệm trong cuộc sống."
  },
  {
    topic: 2,
    quote: "Salad không chỉ là một món ăn nhẹ nhàng, mà còn là một cuộc hành trình khám phá hương vị và màu sắc. Với sự kết hợp của rau xanh tươi mát, các loại gia vị và nước sốt phong phú, salad mang lại không chỉ sự hài lòng cho vị giác mà còn là nguồn dinh dưỡng tuyệt vời cho cơ thể, giúp chúng ta duy trì sức khỏe và sự tươi trẻ."
  },
  {
    topic: 3,
    quote: "Mì là một trong những món ăn phổ biến nhất trên thế giới, không chỉ vì hương vị thơm ngon mà còn vì sự đa dạng trong cách chế biến. Từ mì Ý với sốt cà chua đến mì ramen Nhật Bản, mỗi loại mì đều kể một câu chuyện về nền văn hóa và phong cách sống của đất nước mình. Mì không chỉ đơn thuần là thức ăn, mà còn là cầu nối giữa các nền văn hóa khác nhau."
  },
  {
    topic: 4,
    quote: "Thịt là một phần không thể thiếu trong bữa ăn của nhiều người, không chỉ vì hương vị đậm đà mà còn vì giá trị dinh dưỡng mà nó mang lại. Mỗi miếng thịt đều chứa đựng công sức của những người nông dân, người chăn nuôi và nghệ nhân chế biến. Thịt không chỉ nuôi dưỡng cơ thể mà còn mang lại trải nghiệm ẩm thực đầy phong phú, khuyến khích chúng ta khám phá và thưởng thức từng món ăn."
  },
  {
    topic: 5,
    quote: "Nước uống không chỉ là nguồn sống cho cơ thể, mà còn là nguồn cảm hứng cho cuộc sống. Từ những ngụm nước tinh khiết giữa thiên nhiên cho đến những ly cocktail sáng tạo trong bữa tiệc, nước uống không chỉ làm dịu cơn khát mà còn mang lại những khoảnh khắc vui vẻ và kết nối giữa mọi người. Một ly nước ngon là một khởi đầu hoàn hảo cho bất kỳ cuộc trò chuyện nào."
  }
];

export default function FoodDetailPage({ food }) {

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
  useEffect(() => {
    new Swiper('.testimonials-slider', {
      speed: 600,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      slidesPerView: 'auto',
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 20,
        },

        1200: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
      },
    });

  }, []);
  return (
    <>
      <section className="about">
        <div className="container" data-aos="fade-up">
          <div className="section-title">
            <h2>Chi tiết</h2>
            <p>{food.name}</p>
          </div>
          <div className='row'>
            <div className='col-4'>
              <div className='about-img' data-aos="zoom-in"
                data-aos-delay={100}>
                <Image
                  src={`http://localhost:3002/images/${food.image}`}
                  alt={food.name}
                  layout="responsive"
                  className='mx-auto bg-transparent'
                  width={400}
                  height={400}
                  objectFit="cover"
                  style={{
                    borderRadius: '8px',
                    width: '100%',
                    height: 'auto',
                  }}
                />
              </div>
            </div>
            <div className='col-6 px-8'>
              <h3>
                {food.description}
              </h3>
              <p className="fst-italic">
                {foodQuotes.map((foodQuote) => (
                  food.menu_id === foodQuote.topic ? (
                    <span key={foodQuote.topic}>{foodQuote.quote}</span>
                  ) : null
                ))}
              </p>
              <ul>
                <li>
                  <i className="bi bi-check-circle" />
                  Được chế biến từ những nguyên liệu tươi ngon
                </li>
                <li>
                  <i className="bi bi-check-circle" />
                  Không chất phụ gia, không chất tạo màu
                </li>
                <li>
                  <i className="bi bi-check-circle" />
                  Giao hàng miễn phí trong phạm vi 5 km
                </li>
              </ul>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '20px 0' }}>
                <Button
                  className="btn btn-success"
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, quantity: Math.max(1, formData.quantity - 1) })
                  }
                >
                  <i className="fa fa-minus"></i>
                </Button>

                <TextField
                  margin="dense"
                  name="quantity"
                  label="Số lượng"
                  type="number"
                  value={formData.quantity}
                  onChange={handleChange}
                  InputProps={{
                    inputProps: {
                      style: { textAlign: 'center' },
                      readOnly: true,
                    },
                    sx: {
                      height: '40px',
                    }
                  }}
                  style={{
                    width: '100px',
                    textAlign: 'center'
                  }}
                  sx={{

                    '& input[type=number]': {
                      MozAppearance: 'textfield',
                      color: 'white'
                    },
                    '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                      WebkitAppearance: 'none',
                      margin: 0,
                    },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'gray',
                      },
                      '&:hover fieldset': {
                        borderColor: '#cda45e',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#cda45e',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'gray',
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#cda45e',
                    },
                  }}
                />


                <Button
                  className="btn btn-success"
                  type="button"
                  onClick={() => setFormData({ ...formData, quantity: formData.quantity + 1 })}
                >
                  <i className="fa fa-plus"></i>
                </Button>
              </div>
              <div type="submit" className="btn btn-success col-12" variant="contained">
                Thêm vào giỏ hàng
              </div>
            </div>
            <div className='col-2 p-0'>
              <div className="px-3">
                <h4 style={{ color: '#cda45e' }}>Danh mục món ăn</h4>
                <ul className="list-unstyled">
                  <li>
                    <div className="d-flex justify-content-between ">
                      <a href="#">
                        <IoFastFood className="me-2" />Apples
                      </a>
                      <span>(3)</span>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex justify-content-between">
                      <a href="#">
                        <IoFastFood className="me-2" />Oranges
                      </a>
                      <span>(5)</span>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex justify-content-between">
                      <a href="#">
                        <IoFastFood className="me-2" />Strawberries
                      </a>
                      <span>(2)</span>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex justify-content-between">
                      <a href="#">
                        <IoFastFood className="me-2" />Bananas
                      </a>
                      <span>(8)</span>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex justify-content-between">
                      <a href="#">
                        <IoFastFood className="me-2" />Pumpkins
                      </a>
                      <span>(5)</span>
                    </div>
                  </li>
                </ul>

              </div>

            </div>
          </div>
        </div>
      </section>
      <section className="testimonials section-bg">
        <div className="container" data-aos="fade-up">
          <div className="section-title mt-4">
            <p></p>
            <h2>Đánh giá từ khách hàng</h2>
          </div>
          <div
            className="testimonials-slider swiper-container"
            data-aos="fade-up"
            data-aos-delay={100}
          >
            <div className="swiper-wrapper">
              <div className="swiper-slide">
                <div className="testimonial-item">
                  <p>
                    <i className="bx bxs-quote-alt-left quote-icon-left" />
                    Proin iaculis purus consequat sem cure digni ssim donec
                    porttitora entum suscipit rhoncus. Accusantium quam,
                    ultricies eget id, aliquam eget nibh et. Maecen aliquam,
                    risus at semper.
                    <i className="bx bxs-quote-alt-right quote-icon-right" />
                  </p>
                  <Image
                    width={90} // Adjusted width to match CSS
                    height={90} // Adjusted height to match CSS
                    src="/img/testimonials/testimonials-1.jpg"
                    className="testimonial-img"
                    alt="Saul Goodman"
                  />
                  <h3>Saul Goodman</h3>
                  <h4>Ceo &amp; Founder</h4>
                </div>
              </div>
              {/* End testimonial item */}
              <div className="swiper-slide">
                <div className="testimonial-item">
                  <p>
                    <i className="bx bxs-quote-alt-left quote-icon-left" />
                    Export tempor illum tamen malis malis eram quae irure esse
                    labore quem cillum quid cillum eram malis quorum velit
                    fore eram velit sunt aliqua noster fugiat irure amet legam
                    anim culpa.
                    <i className="bx bxs-quote-alt-right quote-icon-right" />
                  </p>
                  <Image
                    width={90} // Adjusted width to match CSS
                    height={90} // Adjusted height to match CSS
                    src="/img/testimonials/testimonials-2.jpg"
                    className="testimonial-img"
                    alt="Sara Wilsson"
                  />
                  <h3>Sara Wilsson</h3>
                  <h4>Designer</h4>
                </div>
              </div>
              {/* End testimonial item */}
              <div className="swiper-slide">
                <div className="testimonial-item">
                  <p>
                    <i className="bx bxs-quote-alt-left quote-icon-left" />
                    Enim nisi quem export duis labore cillum quae magna enim
                    sint quorum nulla quem veniam duis minim tempor labore
                    quem eram duis noster aute amet eram fore quis sint minim.
                    <i className="bx bxs-quote-alt-right quote-icon-right" />
                  </p>
                  <Image
                    width={90} // Adjusted width to match CSS
                    height={90} // Adjusted height to match CSS
                    src="/img/testimonials/testimonials-3.jpg"
                    className="testimonial-img"
                    alt="Jena Karlis"
                  />
                  <h3>Jena Karlis</h3>
                  <h4>Store Owner</h4>
                </div>
              </div>
              {/* End testimonial item */}
              <div className="swiper-slide">
                <div className="testimonial-item">
                  <p>
                    <i className="bx bxs-quote-alt-left quote-icon-left" />
                    Fugiat enim eram quae cillum dolore dolor amet nulla culpa
                    multos export minim fugiat minim velit minim dolor enim
                    duis veniam ipsum anim magna sunt elit fore quem dolore
                    labore illum veniam.
                    <i className="bx bxs-quote-alt-right quote-icon-right" />
                  </p>
                  <Image
                    width={90} // Adjusted width to match CSS
                    height={90} // Adjusted height to match CSS
                    src="/img/testimonials/testimonials-4.jpg"
                    className="testimonial-img"
                    alt="Matt Brandon"
                  />
                  <h3>Matt Brandon</h3>
                  <h4>Freelancer</h4>
                </div>
              </div>
              {/* End testimonial item */}
              <div className="swiper-slide">
                <div className="testimonial-item">
                  <p>
                    <i className="bx bxs-quote-alt-left quote-icon-left" />
                    Quis quorum aliqua sint quem legam fore sunt eram irure
                    aliqua veniam tempor noster veniam enim culpa labore duis
                    sunt culpa nulla illum cillum fugiat legam esse veniam
                    culpa fore nisi cillum quid.
                    <i className="bx bxs-quote-alt-right quote-icon-right" />
                  </p>
                  <Image
                    width={90} // Adjusted width to match CSS
                    height={90} // Adjusted height to match CSS
                    src="/img/testimonials/testimonials-5.jpg"
                    className="testimonial-img"
                    alt="John Larson"
                  />
                  <h3>John Larson</h3>
                  <h4>Entrepreneur</h4>
                </div>
              </div>
              {/* End testimonial item */}
            </div>
            <div className="swiper-pagination" />
          </div>
        </div>
      </section>
      <RelatedFood/>
    </>
  );
}
