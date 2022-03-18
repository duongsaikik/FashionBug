import React, { useEffect, useState } from "react";

import NumberFormat from 'react-number-format';
const CartItem = ({id,image,name, color, size, price, quantity,actUpdateAmountCart,actDeleteInCart}) => {
  
    const [amount, setAmount] = useState(quantity);
 
 
 
    useEffect(() => {
        if (amount !== '') {
             actUpdateAmountCart({
              product:{
                id,image,name, color, size, price
              },
              quantity
             }, Number(amount)); 
        }
    },[amount]);
    //props contain cart and cart contain product, quantity, and 1 action to delete cart of each other 
    //get item from props and include product and quantity
    var onDeleteCart = (id,color,size) => {
         actDeleteInCart(id,color,size); //push id to store reducer to get dispatch and delete cart
    }
    const ChangeAmount = (event) => {
       setAmount(quantity);
         actUpdateAmountCart(id); 
    }
  
    return (
        <>
            <div className="product1-detail" id="product1-detail">
                <div className="product1-detail-head">
                   {/*  <div className="cart-checkbox">
                        <input type="checkbox" className="cb1" />
                    </div> */}
                    <div className="img-name">
                        <div className="img-product">
                             <img src={image} alt={image} /> 
                            
                        </div>
                    </div>
                </div>
                <div className="importer-detail">
                    <div className="produt-name">
                        <p>{name} (Màu: {color}, Size: {size})
                        </p>
                       
                        <div className="product-id">
                            <span>Mã sản phẩm : </span>
                            <span>{id}</span>
                        </div>
                    </div>
                    <div className="amount-price">
                        <div className="edit-amount-cart">
                            <div className="minus">
                                <input type="button" id="minus" value="-" className="minus" onClick={() => {
                                    if (amount > 1) {
                                        setAmount(amount - 1)
                                    }
                                }} />
                            </div>
                            <div className="amount">
                                <input type="text" name="amount" id="amount" value={quantity} onChange={ChangeAmount} />
                            </div>
                            <div className="minus">
                                <input type="button" id="plus" value="+" className="plus" onClick={() => {
                                    if (amount < 10) {
                                        setAmount(amount + 1)
                                    }
                                    else {
                                        alert("Số lượng đã đạt giới hạn không thể tăng thêm")
                                    }
                                }} />
                            </div>
                        </div>
                        <div className="cart-product-price">
                            <span id="price"><NumberFormat value={price} displayType={'text'} thousandSeparator={true} suffix={'đ'} /></span>
                        </div>
                    </div>
                    <div className="delete-product">
                        <button className="btn-delete" onClick={() => { onDeleteCart(id,color,size) }}><i className="fas fa-trash-alt"></i></button>
                    </div>
                </div>

            </div>
        </>
    )
}
export default CartItem;