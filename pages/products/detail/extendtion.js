import React from "react";
import Slider from "react-slick";

import { useRouter } from "next/router";
import Link from "next/link";
import NumberFormat from "react-number-format";

const Extend = ({
  id,
  image,
  name,
  color,
  discount,
  price,
 
}) => {
  const router = useRouter();


  const path = `/container/${router.query.catogrory}`;

  const ShowColor = (color) => {
    return {
      backgroundColor: color,
      height: 20,
      width: 20,
      borderRadius: 15,
      margin: 0,
      padding: 5,
      cursor: "pointer",
      display: "inline-block",
    };
  };


  return (



    <div className="product-content-body" >
      <div className="product-content">
        <div className="product-img-content">
          {/*   <img src={props.product.Image} alt={props.product.Image}/>  */}
          <img
            src={image}
            alt="http://thoitrangskinny.com/upload/9499587555_314953945_-27-11-2019-12-12-54.jpg"
          />
          <div className="product-detail-link">
            <div className="product-detail-link-hover">
              <Link
                /* as={`/product/${props.product._id}`} */
                href={`${path}/details?id=${id}`}
              >
                <a>VIEW</a>
              </Link>
            </div>
          </div>
        </div>
        <div className="product-name_price-content">
          <Link href={`${path}/details?id=${id}`}>
            <a>
              <h5>{name}</h5>
            </a>
          </Link>
          <div className="product_price">
            <p className="text-dark">
              <NumberFormat
                value={price}
                displayType={"text"}
                thousandSeparator={true}
                suffix={"đ"}
              />
            </p>
            <p className="text-discount">
              <NumberFormat
                value={discount !== 0 ? discount : ""}
                displayType={"text"}
                thousandSeparator={true}
                suffix={"đ"}
              />
            </p>
          </div>
        </div>
        <div className="section_item_color">
          <label className="showColor_body color_item hove">
            <span
              style={ShowColor(color)}
              className="showColor"
              id="Color"
              onClick={() => {
                router.push({
                  pathname: `${path}/details`,
                  query: {
                    id: id,
                    color: color
                  },
                })
              }}
            ></span>
          </label>
        </div>
      </div>
    </div>

  );
};
export default Extend;
