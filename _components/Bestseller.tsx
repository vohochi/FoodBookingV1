import { useState } from "react";
import Image from "next/image";

const Bestseller = () => {
    // Dummy data cho sản phẩm
    const products = [
        {
            id: 1,
            title: "Product 1",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam semper diam at erat pulvinar.",
            image: "/img/specials-1.png",
        },
        {
            id: 2,
            title: "Product 2",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus luctus urna sed urna ultricies ac tempor dui sagittis.",
            image: "/img/specials-2.png",
        },
        {
            id: 3,
            title: "Product 3",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.",
            image: "/img/specials-3.png",
        },
        {
            id: 4,
            title: "Product 4",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent libero sed cursus ante dapibus diam.",
            image: "/img/specials-4.png",
        },
        {
            id: 5,
            title: "Product 5",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nisi nulla quis sem at nibh elementum imperdiet.",
            image: "/img/specials-5.png",
        },
    ];

    // State để theo dõi tab hiện tại
    const [activeTab, setActiveTab] = useState(1);

    // Hàm để đổi tab
    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
    };

    return (
        <section id="specials" className="specials">
            <div className="container" data-aos="fade-up">
                <div className="section-title">
                    <h2>Bestsellers</h2>
                    <p>Check Our Bestselling Products</p>
                </div>
                <div className="row" data-aos="fade-up" data-aos-delay={100}>
                    {/* Sidebar tabs */}
                    <div className="col-lg-3 col-md-4">
                        <ul className="nav nav-tabs flex-column">
                            {products.map((product) => (
                                <li className="nav-item" key={product.id}>
                                    <a
                                        className={`nav-link ${activeTab === product.id ? "active show" : ""}`}
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
                                    className={`tab-pane ${activeTab === product.id ? "active show" : ""}`}
                                >
                                    <div className="row">
                                        <div className="col-lg-8 details order-2 order-lg-1">
                                            <h3>{product.title}</h3>
                                            <p className="fst-italic">
                                                {product.description}
                                            </p>
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
