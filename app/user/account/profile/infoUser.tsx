import Image from "next/image";

const InfoUser = () => {
    return (
        <>
            <div className="row">
                <div className="card section-bg" >
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
                                    <div className="btn btn-success">Thay đổi</div>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <form action="#" method="POST" style={{color:'#1a285a'}}>
                                    <div className="form-group" >
                                        <label htmlFor="name" >Họ và tên:</label>
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
                                        // defaultValue={0123456789}
                                        />
                                    </div>
                                    <div className="form-group mt-3">
                                        <label htmlFor="address">Địa chỉ:</label>
                                        <input
                                            type="textarea"
                                            className="form-control"
                                            id="address"
                                            name="address"
                                            defaultValue="tp HCM"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-success mt-4"
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
}

export default InfoUser;