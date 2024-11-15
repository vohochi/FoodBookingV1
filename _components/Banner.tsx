import Image from 'next/image';

const Banner = () => {
    return (
        <>
            <section className="menu section-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <Image
                                src="/img/BannerNew/1.png"
                                width="100"
                                height="100"
                                alt="Image Description"
                                layout="responsive"
                                objectFit="cover"
                                className="img-fluid"
                            />
                        </div>
                        <div className="col-6">
                        <Image
                                src="/img/BannerNew/2.png"
                                width="100"
                                height="100"
                                alt="Image Description"
                                layout="responsive"
                                objectFit="cover"
                                className="img-fluid"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>

    );
}
const BannerMenu = () => {
    return (
        <>
            <section className="menu section-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <Image
                                src="/img/BannerNew/3.png"
                                width="100"
                                height="100"
                                alt="Image Description"
                                layout="responsive"
                                objectFit="cover"
                                className="img-fluid"
                            />
                        </div>
                        
                    </div>
                </div>
            </section>
        </>

    );
}

export {Banner, BannerMenu};