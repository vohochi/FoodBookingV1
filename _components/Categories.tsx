
import Image from 'next/image';
import { getCategories } from '@/_lib/categories';
import { useEffect, useMemo, useState } from 'react';
import { Category } from '@/types/Category';

const Categories = () => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await getCategories();
            setCategories(response);
        };
        fetchCategories();
    }, []);

    const memoizedCategories = useMemo(() => categories, [categories]);
    return (
        <>
            <div className="col-lg-12 d-flex justify-content-center mb-4">
                <ul id="menu-flters" className="d-flex flex-wrap justify-content-center mb-4">
                    {memoizedCategories.map(category => (
                        <li key={category._id} className="category-item">
                            <div className='category-content space-x-2'>
                                <Image
                                    width={50}
                                    height={50}
                                    src={category.img}
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