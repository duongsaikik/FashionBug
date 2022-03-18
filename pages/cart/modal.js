import React, { useState, useEffect, Fragment } from "react";
import NumberFormat from 'react-number-format';
const ModalCartHeader = ({id,image,name, color, size, price, quantity,actUpdateAmountCart, actDeleteInCart}) => {
  
    
    const [amountcart, setAmountcart] = useState(quantity)
    useEffect(() => {
        actUpdateAmountCart({
            product:{
                id,image,name, color, size, price
              },
              quantity
        }, Number(amountcart));
    }, [amountcart])
    useEffect(() =>{
        setAmountcart(quantity)
    },[quantity])
    const ChangeAmount = (event) => {
         
        setAmountcart(event.target.value)

    }
    var onDeleteCart = (id,color,size) => {
        actDeleteInCart(id,color,size); //push id to store reducer to get dispatch and delete cart
    }
    return (
        <>
            <li>
                <div className="img-cart"> <img src={image} alt={image} /></div>
                <div className="cart-modal-pr_amount_name">
                    <div className="name_cart_modal"> <span>{name}</span></div>
                    <div className="size_color_modal"> <span>{size} / {color}</span></div>
                    <div className="cart-modal-pr_amount">
                        <div className="amount"> <input type="text" name="amount" className="quantity-cart" value={amountcart} onChange={ChangeAmount} /></div>
                        <span id="price"><NumberFormat value={price} displayType={'text'} thousandSeparator={true} suffix={'đ'} /></span>
                    </div>
                </div>
                <button className="btn-delete" onClick={() => { onDeleteCart(id,color,size) }}><i className="fas fa-trash-alt"></i></button>
            </li>
        </>
    )
}
export default ModalCartHeader;