'use client';
import { TextField } from '@mui/material';
import Cookies from 'js-cookie'; // Import js-cookie

import Image from 'next/image';
import { useEffect, useState } from 'react';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';
import { IoFastFood } from 'react-icons/io5';
import RelatedFood from './RelatedFood';
import GoToCartButton from './GoToCartButton';

import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/store/cartSlice';
import Aos from 'aos';
import { Menu } from '@/types/Menu';
import { RootState } from '@/store';
import { CartItem } from '@/store/cartMiddleware';

const foodQuotes = [
  {
    topic: 2,
    quote:
      'Cơm không chỉ đơn thuần là một món ăn; nó là biểu tượng của gia đình, sự gắn kết và truyền thống. Trong từng hạt gạo là tình yêu thương của người nấu, và mỗi bữa cơm là dịp để các thành viên trong gia đình quây quần bên nhau, chia sẻ những câu chuyện và trải nghiệm trong cuộc sống.',
  },
  {
    topic: 1,
    quote:
      'Salad không chỉ là một món ăn nhẹ nhàng, mà còn là một cuộc hành trình khám phá hương vị và màu sắc. Với sự kết hợp của rau xanh tươi mát, các loại gia vị và nước sốt phong phú, salad mang lại không chỉ sự hài lòng cho vị giác mà còn là nguồn dinh dưỡng tuyệt vời cho cơ thể, giúp chúng ta duy trì sức khỏe và sự tươi trẻ.',
  },
  {
    topic: 3,
    quote:
      'Mì là một trong những món ăn phổ biến nhất trên thế giới, không chỉ vì hương vị thơm ngon mà còn vì sự đa dạng trong cách chế biến. Từ mì Ý với sốt cà chua đến mì ramen Nhật Bản, mỗi loại mì đều kể một câu chuyện về nền văn hóa và phong cách sống của đất nước mình. Mì không chỉ đơn thuần là thức ăn, mà còn là cầu nối giữa các nền văn hóa khác nhau.',
  },
  {
    topic: 4,
    quote:
      'Thịt là một phần không thể thiếu trong bữa ăn của nhiều người, không chỉ vì hương vị đậm đà mà còn vì giá trị dinh dưỡng mà nó mang lại. Mỗi miếng thịt đều chứa đựng công sức của những người nông dân, người chăn nuôi và nghệ nhân chế biến. Thịt không chỉ nuôi dưỡng cơ thể mà còn mang lại trải nghiệm ẩm thực đầy phong phú, khuyến khích chúng ta khám phá và thưởng thức từng món ăn.',
  },
  {
    topic: 5,
    quote:
      'Nước uống không chỉ là nguồn sống cho cơ thể, mà còn là nguồn cảm hứng cho cuộc sống. Từ những ngụm nước tinh khiết giữa thiên nhiên cho đến những ly cocktail sáng tạo trong bữa tiệc, nước uống không chỉ làm dịu cơn khát mà còn mang lại những khoảnh khắc vui vẻ và kết nối giữa mọi người. Một ly nước ngon là một khởi đầu hoàn hảo cho bất kỳ cuộc trò chuyện nào.',
  },
];

export default function FoodDetailPage({ food }: { food: Menu }) {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.items || []);
  const [formData, setFormData] = useState({ quantity: 1 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'quantity') {
      const quantity = parseInt(value, 10);
      if (quantity > 0) {
        setFormData({ ...formData, [name]: quantity });
      }
    }
  };

  const updateCookiesCart = (updatedCart: CartItem[]) => {
    Cookies.set('cart', JSON.stringify(updatedCart), { expires: 7 }); // Set cookie with 7 days expiration
  };

  const handleAddToCart = (food: Menu) => {
    const item = {
      ...food,
      quantity: formData.quantity,
    };

    dispatch(addToCart(item));
    const updatedCart = [...cart, item];
    updateCookiesCart(updatedCart); // Update cart in cookies
    alert(`${food.name} đã được thêm vào giỏ hàng!`);
  };

  useEffect(() => {
    new Swiper('.testimonials-slider', {
      // ... (your swiper initialization code remains unchanged)
    });

    // Initialize AOS
    Aos.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
    });
  }, []);

  useEffect(() => {
    // Retrieve cart from cookies on component mount
    const savedCart = Cookies.get('cart')
      ? JSON.parse(Cookies.get('cart')!)
      : [];
    console.log('Giỏ hàng hiện tại:', savedCart);
  }, []);

  if (!food) {
    return <p>Loading...</p>; // Hoặc một trang lỗi nếu không có food
  }

  return (
    <>
      <GoToCartButton />
      <section className="about">
        <div className="container" data-aos="fade-up">
          <div className="section-title">
            <h2>Chi tiết</h2>
            <p style={{ color: '#cda45e' }}>{food.name}</p>
          </div>
          <div className="row">
            <div className="col-4">
              <div
                className="about-img"
                data-aos="zoom-in"
                data-aos-delay={100}
              >
                <Image
                  src={`http://localhost:3002/images/${food.image}`}
                  alt={food.name}
                  layout="responsive"
                  className="mx-auto bg-transparent"
                  width={400}
                  height={400}
                  objectFit="cover"
                  style={{ borderRadius: '8px', width: '100%', height: 'auto' }}
                />
              </div>
            </div>
            <div className="col-6 px-8">
              <h3>{food.description}</h3>
              <p className="fst-italic">
                {foodQuotes.map((foodQuote) =>
                  food.menu_id === foodQuote.topic ? (
                    <span key={foodQuote.topic}>{foodQuote.quote}</span>
                  ) : null
                )}
              </p>
              <ul>
                <li>
                  <i className="bi bi-check-circle" /> Được chế biến từ những
                  nguyên liệu tươi ngon
                </li>
                <li>
                  <i className="bi bi-check-circle" /> Không chất phụ gia, không
                  chất tạo màu
                </li>
                <li>
                  <i className="bi bi-check-circle" /> Giao hàng miễn phí trong
                  phạm vi 5 km
                </li>
              </ul>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  margin: '20px 0px',
                  border: '1px solid #e7e7e7',
                  maxWidth: 'fit-content',
                  borderRadius: '50px',
                }}
              >
                <div
                  className="btn-custom-plusminus"
                  onClick={() => {
                    const newQuantity = Math.max(1, formData.quantity - 1); // Giảm số lượng tối thiểu là 1
                    setFormData({ ...formData, quantity: newQuantity });
                  }}
                >
                  <i className="fa fa-minus"></i>
                </div>
                <TextField
                  margin="dense"
                  name="quantity"
                  type="number"
                  onChange={handleChange}
                  value={formData.quantity}
                  InputProps={{
                    inputProps: {
                      style: { textAlign: 'center' },
                      readOnly: true,
                    },
                    sx: {
                      height: '30px',
                    },
                  }}
                  style={{
                    width: '80px',
                    textAlign: 'center',
                    borderLeft: '1px solid #e7e7e7',
                    borderRight: '1px solid  #e7e7e7',
                  }}
                  sx={{
                    '& input[type=number]': {
                      MozAppearance: 'textfield',
                      color: '#e7e7e7',
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
                    '& .MuiInputLabel-root': {
                      color: '#1a285a',
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#1a285a',
                    },
                  }}
                />
                <div
                  className="btn-custom-plusminus"
                  onClick={() => {
                    const newQuantity = formData.quantity + 1; // Tăng số lượng
                    setFormData({ ...formData, quantity: newQuantity });
                  }}
                >
                  <i className="fa fa-plus"></i>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-custom col-12"
                onClick={() => handleAddToCart(food)}
              >
                Thêm vào giỏ hàng
              </button>
            </div>
            <div className="col-2 p-0">
              <div className="px-3">
                <h4 style={{ color: '#cda45e' }}>Danh mục món ăn</h4>
                <ul className="list-unstyled">
                  {/* Danh sách có thể được tạo động từ một mảng nếu cần */}
                  {[...Array(5)].map((_, index) => (
                    <li key={index}>
                      <div className="d-flex justify-content-between ">
                        <a href="#">
                          <IoFastFood className="me-2" />
                          Food Item {index + 1}
                        </a>
                        <span>10</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <RelatedFood />
    </>
  );
}
