import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import OrderModal from "./modal"; // Đường dẫn đến component modal

const HistoryOrder = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    // Dữ liệu mẫu cho sản phẩm
    const productData = {
        orderNumber: "#DH177013",
        products: [
            {
                name: "Bánh",
                price: "1.000.000",
                quantity: 1,
                total: "1.000.000",
                image: "/img/menu/bread-barrel.jpg",
            },
            {
                name: "Tên sản phẩddddddddddddddd ddddddddddddddddddđm",
                price: "1.000.000",
                quantity: 1,
                total: "1.000.000",
                image: "/img/menu/bread-barrel.jpg",
            },
            {
                name: "Tên sản phẩm",
                price: "1.000.000",
                quantity: 1,
                total: "1.000.000",
                image: "/img/menu/bread-barrel.jpg",
            },
            {
                name: "Tên sản phẩm",
                price: "1.000.000",
                quantity: 1,
                total: "1.000.000",
                image: "/img/menu/bread-barrel.jpg",
            },
            {
                name: "Tên sản phẩm",
                price: "1.000.000",
                quantity: 1,
                total: "1.000.000",
                image: "/img/menu/bread-barrel.jpg",
            },
        ],
        total: "2.000.000",
    };
    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <div className="order-card section-bg p-3 mb-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <strong>#DH177013</strong>
                            <span>01/10/2024</span>
                            <span>4 sản phẩm</span>
                            <strong className="credits">
                                <a href="#">1.000.000 VNĐ</a>
                            </strong>
                            <span>
                                <GiHamburgerMenu onClick={handleOpenModal} />
                            </span>
                        </div>
                    </div>
                    <div className="order-card section-bg p-3 mb-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <strong>#DH177013</strong>
                            <span>01/10/2024</span>
                            <span>4 sản phẩm</span>
                            <strong className="credits">
                                <a href="#">1.000.000 VNĐ</a>
                            </strong>
                            <span>
                                <GiHamburgerMenu onClick={handleOpenModal} />
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <OrderModal isOpen={isModalOpen} onClose={handleCloseModal} productData={productData} />
        </>
    );
}

export default HistoryOrder;