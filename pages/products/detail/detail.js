import { route } from "next/dist/server/router";
import { useRouter } from "next/dist/client/router";
import React, { useState, useEffect } from "react";
import NumberFormat from 'react-number-format';
import Slider from 'react-slick';
import Description from './description';
import Extend from "./extendtion";
const Detail = (props) => {
    const { detail } = props;
    const router = useRouter()
    const [datas, setData] = useState(null);

    const [nav1, setNav1] = useState();
    const [nav2, setNav2] = useState();
    const settings = {
        className: 'img_center',
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,

    };
    const settingss = {

        slidesToShow: 3,
        slidesToScroll: 1,
        dots: false,
        centerMode: true,
        focusOnSelect: true
    };
    const [amount, setAmount] = useState(1);
    const ShowColor = (color) => {
        return {

            backgroundColor: color,
            height: 30,
            width: 30,
            borderRadius: 15,
            margin: 0,
            padding: 5,
            cursor: 'pointer',
            display: 'inline-block'

        }
    }
    const Active = () => {
        /*  change.classList.toggle('Active'); */
        var changeCo = document.getElementById('Color')

        changeCo.classList.toggle('Activee');
    }
    const Calcula = (event) => {
        if (event.target.value === '+') {
            if (amount < 100000)
                setAmount((pre) => {
                    return pre + 1;
                })
        } else {
            if (amount > 1)
                setAmount((pre) => {
                    return pre - 1;
                })
        }
    }
    const addcart = () => {
        props.actAddDetailToCart(detail, amount);
    }
    const Purchase = (e) => {
        e.preventDefault();
        props.actAddDetailToCart(detail, amount);
        router.push('/container/cartCon')
    }
    const handlecm = () => {
        document.getElementById('arrows').classList.toggle('activeArrow');
        document.getElementById('cm_stack').classList.toggle('activecm');
    }
    return (
        <>
            <div className="body-detail">
                <div className="body-main-detail">
                    <div className="content-detail">
                        <div className="img-product-dt">
                            {/*  <img src={detail.image} alt={detail.image} /> */}
                            <Slider asNavFor={nav2} ref={c => setNav1(c)} {...settings}>
                                <div>
                                    <img src={detail.image} alt={detail.image} />
                                </div>
                                <div>
                                    <img src={detail.image} alt={detail.image} />
                                </div>
                                <div>
                                    <img src={detail.image} alt={detail.image} />
                                </div>
                                <div>
                                    <img src={detail.image} alt={detail.image} />
                                </div>
                                <div>
                                    <img src={detail.image} alt={detail.image} />
                                </div>
                                <div>
                                    <img src={detail.image} alt={detail.image} />
                                </div>
                            </Slider>
                            <Slider asNavFor={nav1} ref={c => setNav2(c)} {...settingss}>
                                <div>
                                    <img src={detail.image} alt={detail.image} />
                                </div>
                                <div>
                                    <img src={detail.image} alt={detail.image} />
                                </div>
                                <div>
                                    <img src={detail.image} alt={detail.image} />
                                </div>
                                <div>
                                    <img src={detail.image} alt={detail.image} />
                                </div>
                                <div>
                                    <img src={detail.image} alt={detail.image} />
                                </div>
                                <div>
                                    <img src={detail.image} alt={detail.image} />
                                </div>
                            </Slider>
                        </div>
                    </div>
                    <div className="product-dt-info">
                        <h4>{detail.name}</h4>
                        <div className="product-dt-id">
                            <span className="product-dt-tittle-name">Mã sản phẩm : {detail.id}</span>
                        </div>
                        <div className="product-dt-price">
                            <span className="main_price"> <NumberFormat value={detail.price} displayType={'text'} thousandSeparator={true} suffix={'đ'} /></span>
                            <span className="discount_detail"> <NumberFormat value={detail.discount !==null ? detail.discount : ''} displayType={'text'} thousandSeparator={true} suffix={'đ'} /></span>
                        </div>
                        <div className="product-dt-color">
                            <span className="product-dt-tittle-name">Màu sắc :</span>
                            <div>
                                <span style={ShowColor(detail.color)}
                                    className="showColor"
                                    id="Color"
                                ></span>
                            </div>
                        </div>
                        <div className="product-dt-size">
                            <span className="product-dt-tittle-name">Kích thước :</span>
                            <div>
                                <label
                                    className="ShowSize">
                                    {detail.size}
                                </label>
                            </div>
                        </div>
                        <div className="product-condition">
                            <span className="product-dt-tittle-name">Tình trạng : Còn hàng</span>
                        </div>
                        <div className="amount-n-body">
                            <div className="amount-n">
                                <label className="product-dt-tittle-name">Số lượng</label>
                                <div className="edit-amount">
                                    <div className="minus">
                                        <input type="button" id="minuss" value="-" className="minus" onClick={Calcula} />
                                    </div>
                                    <div className="amount">
                                        <input type="text" name="amount" id="amounts" value={amount} onChange={(event) => { setAmount(Number(event.target.value)) }} />
                                    </div>
                                    <div className="minus">
                                        <input type="button" id="pluss" value="+" className="plus" onClick={Calcula} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="btn-action">
                            <button type="submit" className="btn-action-purchase" onClick={Purchase}>MUA NGAY</button>
                            <button type="submit" className="btn-action-addcart" onClick={addcart}>
                                <i className="fas fa-cart-plus icon-cart"></i>
                                THÊM VÀO GIỎ HÀNG</button>
                        </div>
                        <div className="product_cm_detail" >
                            <div className="cm-tittle" onClick={handlecm}>
                                <h3>Chi Tiết Sản Phẩm</h3>
                                <span id="arrows">^</span>
                            </div>
                            <div className="cm_stack" id="cm_stack">
                               <p>{detail.description}</p>
                                
                            </div>

                        </div>
                        <div className="contact">
                            <p>Share : </p>
                            <div>
                                <i className="fab fa-facebook-f face"></i>
                                <i className="fab fa-twitter twitter"></i>
                                <i className="fab fa-instagram instagram"></i>
                            </div>

                        </div>
                    </div>
                </div>
                <Description description={detail.description} />
                <Extend />
            </div>

        </>
    )
}
export default Detail;