
import Image from 'next/image';

const categories = [
  { id: 1, name: 'Tất cả', productCount: 80, imageUrl: 'http://localhost:3002/images/anh4.png' },
  { id: 2, name: 'Món Khai Vị', productCount: 12, imageUrl: 'http://localhost:3002/images/anh1.png' },
  { id: 3, name: 'Món Chính', productCount: 8, imageUrl: 'http://localhost:3002/images/anh2.png' },
  { id: 4, name: 'Món Tráng Miệng', productCount: 5, imageUrl: 'http://localhost:3002/images/anh3.png' },
];
const Categories = () => {
    return (
        <>
            <div className="col-lg-12 d-flex justify-content-center mb-4">
                <ul id="menu-flters" className="d-flex flex-wrap justify-content-center mb-4">
                    {categories.slice(0, 5).map(category => (
                        <li key={category.id} className="category-item">
                            <div className='category-content space-x-2'>
                                <Image
                                    width={50}
                                    height={50}
                                    src={category.imageUrl}
                                    className="object-fit-cover"
                                    alt={category.name}
                                    style={{ border: 'none', background: 'transparent' }}
                                />
                                <div className='category-info '>
                                    <p className="category-name">{category.name}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default Categories;