import React, { useState, useEffect } from "react";
import { Slider } from '@material-ui/core';
import NumberFormat from 'react-number-format';
const Option = () => {

  const [pricerange, setPriceRange] = useState([500000, 1200000]);
  const [size, setSize] = useState([
    'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'
  ])
  const [color, setColor] = useState([
    'Black', 'Blue', 'Purple', 'Green', 'Yellow', 'Orange', 'Red', 'White'
  ])

 
  const updateRange = (eve, value) => {
    setPriceRange(value);
  }

  var EleSize = size.map((size, index) => {
    return <li key={index}>
      <label> <input type="checkbox" name="size" />{size}</label>
    </li>
  });
  var EleColor = color.map((color, index) => {
    return <li key={index}>
      <label><input type="checkbox" name="size" />{color}</label>
    </li>
  });

  return (
    <>
      
      <div className="left-content-body-range">
        <h3 className="content-tittle">Price Range</h3>
        <span className="price-min"><NumberFormat value={pricerange[0]} displayType={'text'} thousandSeparator={true} suffix={'đ'} /></span>
        -
        <span className="price-max"><NumberFormat value={pricerange[1]} displayType={'text'} thousandSeparator={true} suffix={'đ'} /></span>
        <div>
      <Slider 
        className="MenuItem"
        value={pricerange}
        max={2000000}
        min={50000}
        onChange={updateRange}
      >

      </Slider>
        </div>

      </div>
      <div className="left-content-body-size">
        <h3 className="content-tittle">Sizes</h3>
        <ul className="size-body">
          {EleSize}
        </ul>
      </div>
      <div className="left-content-body-colors">
        <h3 className="content-tittle">Color</h3>
        <ul className="color-body">
          {EleColor}

        </ul>
      </div>
    </>
  );
}
export default Option;