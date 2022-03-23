import React, { useState, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import NumberFormat from "react-number-format";
import Slider from "react-slick";
import Description from "./description";
import Extend from "./extendtion";

const Detail = ({
  id,
  image,
  name,
  color,
  discount,
  size,
  price,
  description,
  enteringQuantity,
  soldQuantity,
  comments,
  actAddDetailToCart,
  chooseColor,
  relate }) => {
  const router = useRouter();

 
  const [sizee, setSize] = useState(null);
  const [colors, setColor] = useState(chooseColor);
  const [images, setImage] = useState([
    image,
    image,

  ]);
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  const [amount, setAmount] = useState(1);
  const [product, setPorduct] = useState({
    id: "",
    name: "",
    price: 0,
    color: colors,
    size: sizee,
    image: "",
  });
  useEffect(() => {
    setColor(color);
    setSize(size);
    setImage([image,
      image,
      image,
      image,])
  }, [id]);
  useEffect(() => {
    setColor(chooseColor);
  }, [chooseColor]);

  useEffect(() => {
    setPorduct({
      id: id,
      name: name,
      price: price,
      color: colors,
      size: sizee,
      image: image,
    });
  }, [colors, sizee]);

  const settings = {
    className: "img_center",
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
    focusOnSelect: true,
  };
  const settingsExtra = {
    lazyLoad: "ondemand",
    slidesToShow:relate ? relate.length >= 3 ? 3 : relate.length : '',
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: true,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: true,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 2,
        },
      },
    ],
  };

  const ShowColor = (color) => {
    return {
      backgroundColor: color,

      borderRadius: 15,
      margin: 0,
      padding: 5,
      cursor: "pointer",
      display: "inline-block",
    };
  };

  const Calcula = (event) => {
    if (event.target.value === "+") {
      if (amount < 6 && (enteringQuantity - soldQuantity) > amount) {
        setAmount((pre) => {
          return pre + 1;
        });
      } else {
        swal("Thông báo", "Số lượng tồn kho không thể đáp ứng hơn", "error")
      }
    } else {
      if (amount > 1)
        setAmount((pre) => {
          return pre - 1;
        });
    }
  };

  const addcart = (e) => {
    e.preventDefault();
    swal("Thông Báo!", "Thêm thành công", "success");
    actAddDetailToCart(product, amount);
  };
  const Purchase = (e) => {
    e.preventDefault();
    actAddDetailToCart(product, amount);
    router.push("/container/cartCon");
  };
  const handlecm = () => {
    document.getElementById("arrows").classList.toggle("activeArrow");
    document.getElementById("cm_stack").classList.toggle("activecm");
  };



  var ShowImage = images.map((item, index) => {

    return (
      <div key={index}>
        <img src={item} alt={item} />
      </div>
    );
  });
 /*  var related = relate ? relate.map((item, index) => {
    return <Extend
      key={index}
      id={item._id}
      image={item.Image}
      name={item.Name}
      color={item.colors}
      discount={item.Discount}
      price={item.Price}
    
    />
  }) : (
    ""
  ); */
  var related = relate ? (
    <>
      <Extend relate={relate} length={relate.length}/>
    </>
  ) : (
    ""
  );
  return (
    <>
      <div className="body-detail">
        <div className="body-main-detail">
          <div className="content-detail">
            <div className="img-product-dt">
              {/*  <img src={detail.image} alt={detail.image} /> */}
              <Slider asNavFor={nav2} ref={(c) => setNav1(c)} {...settings}>
                {ShowImage}
              </Slider>
              <Slider asNavFor={nav1} ref={(c) => setNav2(c)} {...settingss}>
                {ShowImage}
              </Slider>
            </div>
          </div>
          <div className="product-dt-info">
            <h4>{name}</h4>
            <div className="product-dt-id">
              <span className="product-dt-tittle-name">
                Mã sản phẩm : {id}
              </span>
            </div>
            <div className="product-dt-price">
              <span className="main_price">
                {" "}
                <NumberFormat
                  value={price}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={"đ"}
                />
              </span>
              <span className="discount_detail">
                {" "}
                <NumberFormat
                  value={discount !== 0 ? discount : ""}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={"đ"}
                />
              </span>
            </div>
            <div className="product-dt-color">
              <span className="product-dt-tittle-name">Màu sắc :</span>
              <div>
                <label
                  className={
                    chooseColor === colors
                      ? "showColor_body color_item activeColor"
                      : "showColor_body color_item activeColor"
                  }
                >
                  <span
                    style={ShowColor(colors)}
                    className="showColor"
                    id="Color"
                  ></span>
                </label>
              </div>
            </div>
            <div className="product-dt-size">
              <span className="product-dt-tittle-name">Kích thước :</span>
              <div>
                <label className="ShowSize active">{size}</label>
              </div>
            </div>
            <div className="product-condition">
              <span className="product-dt-tittle-name">
                Tình trạng : {(enteringQuantity - soldQuantity) > 0 ? 'Còn hàng' : 'Hết hàng'}
              </span>
            </div>
            <div className="amount-n-body">
              <div className="amount-n">
                <label className="product-dt-tittle-name">Số lượng</label>
                <div className="edit-amount">
                  <div className="minus">
                    <input
                      type="button"
                      id="minuss"
                      value="-"
                      className="minus"
                      onClick={Calcula}
                    />
                  </div>
                  <div className="amount">
                    <input
                      type="text"
                      name="amount"
                      id="amounts"
                      value={amount}
                      onChange={(event) => {
                        setAmount(Number(event.target.value));
                      }}
                    />
                  </div>
                  <div className="minus">
                    <input
                      type="button"
                      id="pluss"
                      value="+"
                      className="plus"
                      onClick={Calcula}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={(enteringQuantity - soldQuantity) > 0 ? 'btn-action' : 'btn-action active_hide_btn'} >
              <button
                type="submit"
                className="btn-action-purchase"
                onClick={Purchase}
              >
                MUA NGAY
              </button>
              <button
                type="submit"
                className="btn-action-addcart"
                onClick={addcart}
              >
                <i className="fas fa-cart-plus icon-cart"></i>
                THÊM VÀO GIỎ HÀNG
              </button>
            </div>


            <div className="product_cm_detail">
              <div className="cm-tittle" onClick={handlecm}>
                <h3>Chi Tiết Sản Phẩm</h3>
                <span id="arrows">^</span>
              </div>
              <div className="cm_stack" id="cm_stack">
                <p dangerouslySetInnerHTML={{ __html: description }}></p>
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
        <Description comments={comments} id={id} />
      
             
                {related}
           
          

      </div>
    </>
  );
};
export default Detail;
