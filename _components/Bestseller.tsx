import { useState } from 'react';
import Image from 'next/image';

const Bestseller = () => {
  // Dummy data cho sản phẩm
  const products = [
    {
      id: 1,
      title: 'Product 1',
      description:
        'Pizza Margherita với lớp phô mai mozzarella, sốt cà chua tươi và lá basil, mang đến hương vị thơm ngon và tươi mát.',
      image: '/img/specials-1.png',
    },
    {
      id: 2,
      title: 'Product 2',
      description:
        'Bánh mì kẹp thịt bò nướng với sốt BBQ, rau xanh và dưa chuột, tạo nên một món ăn đầy hương vị và hấp dẫn.',
      image: '/img/specials-2.png',
    },
    {
      id: 3,
      title: 'Product 3',
      description:
        'Mì Ý spaghetti sốt thịt bò bằm, được chế biến từ nguyên liệu tươi ngon và gia vị đặc trưng.',
      image: '/img/specials-3.png',
    },
    {
      id: 4,
      title: 'Product 4',
      description:
        'Sushi cá hồi tươi ngon, cuộn trong lá rong biển và cơm, là món ăn hoàn hảo cho những tín đồ của ẩm thực Nhật Bản.',
      image: '/img/specials-4.png',
    },
    {
      id: 5,
      title: 'Product 5',
      description:
        'Salad Caesar với thịt gà nướng, phô mai parmesan, bánh mì nướng và sốt Caesar, là món ăn nhẹ nhàng và bổ dưỡng.',
      image: '/img/specials-5.png',
    },
  ];

  // State để theo dõi tab hiện tại
  const [activeTab, setActiveTab] = useState(1);

  // Hàm để đổi tab
  const handleTabChange = (tabId: number) => {
    setActiveTab(tabId);
  };

  return (
    <section id="specials" className="specials">
      <div className="container">
        <div className="section-title">
          <h2>Bestsellers</h2>
          <p>Sản phẩm bán chạy nhất của chúng tôi</p>
        </div>
        <div className="row">
          {/* Sidebar tabs */}
          <div className="col-lg-3 col-md-4">
            <ul className="nav nav-tabs flex-column">
              {products.map((product) => (
                <li className="nav-item" key={product.id}>
                  <a
                    className={`nav-link ${
                      activeTab === product.id ? 'active show' : ''
                    }`}
                    onClick={() => handleTabChange(product.id)}
                  >
                    {product.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tab content */}
          <div className="col-lg-9 mt-4 mt-lg-0">
            <div className="tab-content">
              {products.map((product) => (
                <div
                  key={product.id}
                  className={`tab-pane ${
                    activeTab === product.id ? 'active show' : ''
                  }`}
                >
                  <div className="row">
                    <div className="col-lg-8 details order-2 order-lg-1">
                      <h3>{product.title}</h3>
                      <p className="fst-italic">{product.description}</p>
                    </div>
                    <div className="col-lg-4 text-center order-1 order-lg-2">
                      <Image
                        width={400}
                        height={400}
                        src={product.image}
                        alt={product.title}
                        className="img-fluid"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bestseller;
