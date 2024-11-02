import Image from "next/image";
import { FaMinus } from "react-icons/fa";
import { useState } from "react";

const InfoUser = () => {
    const [addresses, setAddresses] = useState(["tp HCM"]);

    const addAddressField = () => {
        if (addresses.length < 3) {
            setAddresses([...addresses, ""]);
        }
    };

    const removeAddressField = (index) => {
        const updatedAddresses = addresses.filter((_, i) => i !== index);
        setAddresses(updatedAddresses);
    };

    const handleAddressChange = (index, value) => {
        const updatedAddresses = [...addresses];
        updatedAddresses[index] = value;
        setAddresses(updatedAddresses);
    };

    return (
        <>
            <div className="row">
                <div className="card section-bg">
                    <div className="card-body">
                        <div className="row mb-3">
                            <div className="col-md-4 text-center">
                                <div className="mb-3">
                                    <Image
                                        src="/img/chefs/chefs-1.jpg"
                                        className="img-fluid rounded-circle"
                                        alt="Avatar"
                                        width={250}
                                        height={250}
                                    />
                                </div>
                                <div>
                                    <div className="btn btn-product">Thay đổi</div>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <form action="#" method="POST" style={{ color: '#1a285a' }}>
                                    <div className="form-group">
                                        <label htmlFor="name">Họ và tên:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            name="name"
                                            defaultValue="Nguyễn Văn A"
                                        />
                                    </div>
                                    <div className="form-group mt-3">
                                        <label htmlFor="email">Email:</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            defaultValue="nguyenvana@example.com"
                                        />
                                    </div>
                                    <div className="form-group mt-3">
                                        <label htmlFor="phone">Số điện thoại:</label>
                                        <input
                                            type="tel"
                                            className="form-control"
                                            id="phone"
                                            name="phone"
                                        />
                                    </div>
                                    {addresses.map((address, index) => (
                                        <div key={index} className="form-group mt-3 position-relative">
                                            <label htmlFor={`address-${index}`}>Địa chỉ {index + 1}:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id={`address-${index}`}
                                                name={`address-${index}`}
                                                value={address}
                                                onChange={(e) => handleAddressChange(index, e.target.value)}
                                            />
                                            {index > 0 && (
                                                <FaMinus
                                                    className="position-absolute"
                                                    style={{ top: "70%", right: "5px", transform: "translateY(-50%)", cursor: "pointer" }}
                                                    onClick={() => removeAddressField(index)}
                                                />
                                            )}
                                        </div>
                                    ))}
                                    {addresses.length < 3 && (
                                        <div className="d-flex justify-content-end mt-3">
                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                                onClick={addAddressField}
                                            >
                                                Thêm địa chỉ
                                            </button>
                                        </div>
                                    )}
                                    <button
                                        type="submit"
                                        className="btn btn-product mt-4"
                                    >
                                        Lưu thay đổi
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default InfoUser;
