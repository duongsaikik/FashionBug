import React,{useState,useEffect} from "react";
import NumberFormat from 'react-number-format';
const Total = (props) => {
    const {cart} = props;
    const [total, setTotal] = useState(0);
   
   useEffect(() =>{
         setTotal(cart)
   });
    return (
        <>
            <div className="cart-right-content">
            <div className="billing_address">
                    <div className="billing_address_body">
                        <h3>Thông tin thanh toán</h3>
                        <div className="receiver_infor">
                            <div className="detail_infor">
                                    <label>
                                        Họ và tên :
                                    </label>
                                    <input type="text" placeholder="Họ và tên ..."/>
                            </div>
                            <div className="detail_infor">
                                    <label>
                                        Số điện thoại :
                                    </label>
                                    <input type="text" placeholder="Số điện thoại ..."/>
                            </div>
                            <div className="detail_infor">
                                    <label>
                                        Email :
                                    </label>
                                    <input type="text" placeholder="Email ..."/>
                            </div>
                            <div className="detail_infor">
                                    <label>
                                        Địa chỉ :
                                    </label>
                                    <input type="text" placeholder=" Số nhà ..."/>
                            </div>
                           
                            <div className="detail_infor">
                                    <label>
                                        Tỉnh :
                                    </label>
                                    <select>
                                         <option>--</option>
                                        <option>Bình Dương</option>
                                    </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="cart-purchase">
                    <div className="receiver-address-title">
                        <h3>Thanh toán</h3>
                    </div>
                    <div className="cart-purchase-detail">
                        <div className="cart-purchase-detail-body">
                            <span>
                                Thành tiền
                            </span>
                            <span className="price-total" id="price-total" ><NumberFormat value={total} displayType={'text'} thousandSeparator={true} suffix={'đ'} /></span>                          
                        </div>
                    </div>
                    <div className="btn-cart-purchase">
                        <input type="button" value="THANH TOÁN" />
                    </div>
                </div>
               
            </div>
        </>
    )
}
export default Total;