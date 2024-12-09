import Image from 'next/image';
import { useEffect, useState } from 'react';

const Banner = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 992);
        };
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <section className="menu section-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-6">
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
                        {!isMobile && (
                            <div className="col-12 col-lg-6">
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
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

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

export { Banner, BannerMenu };