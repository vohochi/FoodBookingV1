import Image from 'next/image';
import { getCategories } from '@/_lib/categories';
import { useEffect, useMemo, useState } from 'react';
import { Category } from '@/types/Category';
import { setCategory } from '@/store/slice/filterSlice';
import { useDispatch } from 'react-redux';

const Categories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
    const dispatch = useDispatch();

    const handleCategoryChange = (selectedCategoryId: string) => {
        setSelectedCategoryId(selectedCategoryId);
        dispatch(setCategory(selectedCategoryId));
    };

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await getCategories();
            setCategories(response);
        };
        fetchCategories();
    }, []);

    const memoizedCategories = useMemo(() => categories, [categories]);
    return (
        <div className="col-lg-12 d-flex justify-content-center mb-4">
            <ul className="d-flex flex-wrap justify-content-center mb-4">
                <li
                    className={`card shadow category-item ${selectedCategoryId === "" ? "selected" : ""}`}
                    onClick={() => handleCategoryChange("")}
                >
                    <div className="category-content space-x-2">
                        <Image
                            width={50}
                            height={50}
                            src={'http://localhost:3002/images/img-1730695152693-640200305.png'}
                            className="object-fit-cover rounded"
                            alt={"all"}
                            style={{ border: 'none', background: 'transparent' }}
                        />
                        <div className="category-info">
                            <p className="category-name">Tất cả</p>
                        </div>
                    </div>
                </li>
                {memoizedCategories.map((category) => (
                    <li
                        key={category._id}
                        className={`card shadow category-item ${selectedCategoryId === category._id ? "selected" : ""}`}
                        onClick={() => handleCategoryChange(category._id)}
                    >
                        <div className="category-content space-x-2">
                            <Image
                                width={50}
                                height={50}
                                src={category.img}
                                className="object-fit-cover rounded"
                                alt={category.name}
                                style={{ border: 'none', background: 'transparent' }}
                            />
                            <div className="category-info">
                                <p className="category-name">{category.name}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;
