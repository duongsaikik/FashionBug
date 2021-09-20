import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import Link from "next/link";
import { actUpdateAmountCart,actDeleteInCart } from "./actions";
import ModalCartHeader from "./cart/modal";
import NumberFormat from 'react-number-format';
const Headerr = (props) => {
  const { cart } = props;
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const Amount = cart.length >= 1 ? "(" + cart.length + ")" : '';
    setAmount(Amount)
  })


  const Total = () => {
    var result = 0;
    for (let i = 0; i < cart.length; i++) {
      result += (cart[i].product.price * cart[i].quantity);
    }
    return result;
  }

  const { actUpdateAmountCart } = props;
  const { actDeleteInCart } = props;
  var ShowModal = cart.map((item, index) => {
    return <ModalCartHeader key={index} cart={item} actUpdateAmountCart={actUpdateAmountCart} actDeleteInCart={actDeleteInCart}/>
  }
  )
  const showmodalcart = () => {
    document.getElementById('modal-cr').classList.toggle('ActiveModalCart');
  }
  useEffect(() => {
    window.onclick = function (eve) {
        if(eve.target === document.getElementById('outside_Modal')){
          document.getElementById('modal-cr').classList.remove('ActiveModalCart');
        }
    }
  }, [])

  return (
    <>
      <header>
        <div className="header_body">
          <div></div>
          <div className="cart_detail">
            <i className="fas fa-shopping-cart" id={'shopping-cart'} onClick={showmodalcart}>{amount}</i>
            <div className="modal-cr" id="modal-cr">
              <div className="modal-cr-body">
                <ul>
                  {ShowModal}
                </ul>
                <div className="total_cart_modal">
                  <p>Tổng tiền : </p>
                  <span id="price"><NumberFormat value={Total()} displayType={'text'} thousandSeparator={true} suffix={'đ'} /></span>
                </div>
               
                <div className="btn-checkout">
                  <Link href="/container/cartCon"><a>THANH TOÁN</a></Link>
                </div>
                <div className="outside_Modal" id="outside_Modal">

                </div>
              </div>

            </div>
          </div>

        </div>
      </header>
      <div className="product-tittle-img">
        <h4 className="pd-tittle-name">
          <span>f</span>
          ashion
          <span> b</span>
          ug
        </h4>
      </div>
      <div className="breadcrumb">
        <div>
          <span>Home</span>/
          <span>Haha</span>
        </div>
      </div>
    </>
  )
}
const mapStateToProps = state => {
  return {
    cart: state.cart
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {

    actUpdateAmountCart: (id, quantity) => {

      dispatch(actUpdateAmountCart(id, quantity));
    }, actDeleteInCart:(id) =>{        
      dispatch(actDeleteInCart(id));     
  }

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Headerr);