import React, { useState, useEffect, Fragment } from "react";
import NumberFormat from 'react-number-format';
const ModalCartHeader = (props) => {
    const { cart } = props;
    const { quantity } = props.cart;

    const [amountcart, setAmountcart] = useState(quantity)

    useEffect(() => {
        props.actUpdateAmountCart(cart.product.id, Number(amountcart));
    }, [amountcart])
    const ChangeAmount = (event) => {

        setAmountcart(event.target.value)

    }
    var onDeleteCart = (id) => {
        props.actDeleteInCart(id); //push id to store reducer to get dispatch and delete cart
    }
    return (
        <>
            <li>
                <div className="img-cart"> <img src={cart.product.image} alt={cart.product.image} /></div>
                <div className="cart-modal-pr_amount_name">
                    <div className="name_cart_modal"> <span>{cart.product.name}</span></div>
                    <div className="size_color_modal"> <span>{cart.product.size} / {cart.product.color}</span></div>
                    <div className="cart-modal-pr_amount">
                        <div className="amount"> <input type="text" name="amount" className="quantity-cart" value={quantity} onChange={ChangeAmount} /></div>
                        <span id="price"><NumberFormat value={cart.product.price} displayType={'text'} thousandSeparator={true} suffix={'đ'} /></span>
                    </div>
                </div>
                <button className="btn-delete" onClick={() => { onDeleteCart(cart.product.id) }}><i className="fas fa-trash-alt"></i></button>
            </li>
        </>
    )
}
export default ModalCartHeader;