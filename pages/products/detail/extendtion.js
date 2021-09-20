import React from "react";
import Slider from "react-slick";
const Extend = () => {
    const settings = {
        lazyLoad: 'ondemand',
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
              breakpoint: 768,
              settings: {
                arrows: true,
                centerMode: true,
                centerPadding: '40px',
                slidesToShow: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                arrows: true,
                centerMode: true,
                centerPadding: '40px',
                slidesToShow: 2
              }
            }
          ]
    };
    return (
        <>
            <div className="extension-product">

                <div className="extension-product-body">
                    <div>
                        <h4>SẢN PHẨM LIÊN QUAN</h4>
                    </div>
                    <div className="" >
                        <Slider {...settings}>
                            <div className="product-content-body">
                                <div className="product-content">
                                    <div className="product-img-content">
                                        <img src="https://p.w3layouts.com/demos_new/template_demo/09-08-2018/fashion_hub-demo_Free/1005640873/web/images/pm1.jpg" />
                                        <div className="product-detail-link">
                                            <div className="product-detail-link-hover">
                                                <a href="#">QUICK VIEW</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product-name_price-content">
                                        <h5>Solid Formal black shirt</h5>
                                        <div className="product_price">
                                            <p className="text-dark">
                                                2.000.000đ
                                            </p>
                                            <p className="text-discount">
                                                2.000.000đ
                                            </p>
                                        </div>
                                    </div>
                                    <div className="product-action-content">
                                        <button type="submit" data-toggle="tooltip" data-placement="bottom" title="Add Cart"><i className="fas fa-cart-plus icon-cart"></i></button>
                                    </div>
                                </div>
                            </div>
                            <div className="product-content-body">
                                <div className="product-content">
                                    <div className="product-img-content">
                                        <img src="https://p.w3layouts.com/demos_new/template_demo/09-08-2018/fashion_hub-demo_Free/1005640873/web/images/pm1.jpg" />
                                        <div className="product-detail-link">
                                            <div className="product-detail-link-hover">
                                                <a href="#">QUICK VIEW</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product-name_price-content">
                                        <h5>Solid Formal black shirt</h5>
                                        <div className="product_price">
                                            <p className="text-dark">
                                                2.000.000đ
                                            </p>
                                            <p className="text-discount">
                                                2.000.000đ
                                            </p>
                                        </div>
                                    </div>
                                    <div className="product-action-content">
                                        <button type="submit" data-toggle="tooltip" data-placement="bottom" title="Add Cart"><i className="fas fa-cart-plus icon-cart"></i></button>
                                    </div>
                                </div>
                            </div>
                            <div className="product-content-body">
                                <div className="product-content">
                                    <div className="product-img-content">
                                        <img src="https://p.w3layouts.com/demos_new/template_demo/09-08-2018/fashion_hub-demo_Free/1005640873/web/images/pm1.jpg" />
                                        <div className="product-detail-link">
                                            <div className="product-detail-link-hover">
                                                <a href="#">QUICK VIEW</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product-name_price-content">
                                        <h5>Solid Formal black shirt</h5>
                                        <div className="product_price">
                                            <p className="text-dark">
                                                2.000.000đ
                                            </p>
                                            <p className="text-discount">
                                                2.000.000đ
                                            </p>
                                        </div>
                                    </div>
                                    <div className="product-action-content">
                                        <button type="submit" data-toggle="tooltip" data-placement="bottom" title="Add Cart"><i className="fas fa-cart-plus icon-cart"></i></button>
                                    </div>
                                </div>
                            </div>
                            <div className="product-content-body">
                                <div className="product-content">
                                    <div className="product-img-content">
                                        <img src="https://p.w3layouts.com/demos_new/template_demo/09-08-2018/fashion_hub-demo_Free/1005640873/web/images/pm1.jpg" />
                                        <div className="product-detail-link">
                                            <div className="product-detail-link-hover">
                                                <a href="#">QUICK VIEW</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product-name_price-content">
                                        <h5>Solid Formal black shirt</h5>
                                        <div className="product_price">
                                            <p className="text-dark">
                                                2.000.000đ
                                            </p>
                                            <p className="text-discount">
                                                2.000.000đ
                                            </p>
                                        </div>
                                    </div>
                                    <div className="product-action-content">
                                        <button type="submit" data-toggle="tooltip" data-placement="bottom" title="Add Cart"><i className="fas fa-cart-plus icon-cart"></i></button>
                                    </div>
                                </div>
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Extend;