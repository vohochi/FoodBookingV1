import Image from 'next/image';
import Link from 'next/link';
import { FaStar } from 'react-icons/fa6';
const categories = [
    { id: 1, name: 'Tất cả', productCount: 80, imageUrl: 'http://localhost:3002/images/anh4.png' },
    { id: 2, name: 'Món Khai Vị', productCount: 12, imageUrl: 'http://localhost:3002/images/anh1.png' },
    { id: 3, name: 'Món Chính', productCount: 8, imageUrl: 'http://localhost:3002/images/anh2.png' },
    { id: 4, name: 'Món Tráng Miệng', productCount: 5, imageUrl: 'http://localhost:3002/images/anh3.png' },
];

const features = [
    { id: 1, name: 'Cơm nè', price: "1000 - 2000", imageUrl: 'http://localhost:3002/images/anh4.png' },
    { id: 2, name: 'Mì nè', price: "1000 - 2000", imageUrl: 'http://localhost:3002/images/anh1.png' },
    { id: 3, name: 'Cá chiên', price: "1000 - 2000", imageUrl: 'http://localhost:3002/images/anh2.png' },
];

const MenuLeftSidebar = () => {
    return (
        <div className="row flex menu-container product-box mx-1 ">
            <div className="card mb-3 p-3 shadow">
                <div className="">
                    <h4 className='mb-3'>Danh mục</h4>
                    <ul className="list-unstyled">
                        {categories.map((category, index) => (
                            <li key={index}>
                                <div className="d-flex justify-content-between mb-3">
                                    <Link href="#">
                                        {category.name}
                                    </Link>
                                    <span>({category.productCount})</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className=" card mb-3 p-3 shadow">
                <div className="">
                    <h4 className='mb-3'>Giá</h4>
                    <ul className="list-unstyled">
                        {features.map((category, index) => (
                            <li key={index}>
                                <div className="d-flex justify-content-between mb-3">
                                    <Link href="#">
                                        {category.price}
                                    </Link>
                                    <span>VNĐ</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className=" card mb-3 p-3 shadow">
                <h4 className="mb-3">Sản phẩm nổi bật</h4>
                {features.map((food) => (
                    <div className="d-flex align-items-center justify-content-start mb-3" key={food.id}>
                        <div className="rounded me-4" style={{ width: '100px', height: '100px' }}>
                            <Image src={food.imageUrl} width={100} height={100} className="img-fluid rounded" alt="Featured product" />
                        </div>
                        <div>
                            <h6 className="mb-2">{food.name}</h6>
                            <div className="d-flex mb-2">
                                {[...Array(5)].map((_, index) => (
                                    <FaStar
                                        key={index}
                                        style={{ color: '#248F55', fontSize: '14px' }}
                                    />
                                ))}
                            </div>
                            <div className="d-flex mb-2">
                                <h5 className="fw-bold me-2">2.99 $</h5>
                                <h5 className="text-danger text-decoration-line-through">4.11 $</h5>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="d-flex justify-content-center my-4">
                    <Link href={'#'} className="book-a-table-btn border border-secondary px-4 py-3 rounded-pill w-100">Xem thêm</Link>
                </div>
            </div>
        </div>
    );
};

export default MenuLeftSidebar;
