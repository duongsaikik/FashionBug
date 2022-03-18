import React, { useEffect, useState } from "react";
import axios from "axios";
import NumberFormat from 'react-number-format';
import { useRouter } from "next/dist/client/router";
const DetailBill = ({address, billDate, product, province, status, totalPrice,idShipper, userEmail,userId, userName,id}) => {
    const router = useRouter();
 
    const [date, setDate] = useState('')
    const [show, setShow] = useState(false)
   
   
    const hanldeColor = (e) => {
        var status = null;
        if (e === 'Đã hủy đơn')
            status = "black"
        else if (e === 'Đã đặt hàng')
            status = "purple"
        else if (e === 'Đã giao hàng')
            status = "green"
        else if (e === 'Đang giao hàng')
            status = "blue"
        else
            status = "red"
        return {
            color: status
        }
            ;
    }
    const deleteItem = (id) => {

        axios.put("http://localhost:5035/bills/" + id, {
            Status: "Đã hủy đơn",
        }).then((res) => {
            swal("Thông Báo!", "Huỷ đơn hàng thành công", "success");
            router.push(router.asPath)

        }).catch((err) => {
            swal("Thông Báo!", "Huỷ đơn hàng thất bại", "error");
        });

    };
    useEffect(() => {
        const date = new Date(billDate)
        setDate(date.toLocaleDateString())
    }, [billDate])
    const hide = () => {
        setShow(false)
    }
    return (
        <>



            <tr className="table_content_bill">
                <td className="bill_co1">
                    <span>{id}</span>
                </td>
                <td className="bill_co2">
                    <span>{date}</span>
                </td>
                <td className="bill_img_body bill_co3">
                    {
                     product ?  product.map((item, index) => {
                            return <div key={index} className="img-name">
                                <div className="img-product">
                                    <img src={item.product.image} alt={item.product.image} />

                                </div>
                            </div>
                        })
                    :''}

                </td>
                <td className="bill_co4">

                    <span id="price"><NumberFormat value={totalPrice} displayType={'text'} thousandSeparator={true} suffix={'đ'} /></span>
                </td>
                <td>
                    <div className="bill_status add_status_co">

                        <span className="alert_color" style={hanldeColor(status)}>{status}</span>
                    </div>
                </td>
                <td className="bill_co5">
                    <button className="btn_detail_bill" onClick={() => setShow(true)}>Chi tiết</button>
                    {
                        show ?
                            <div className="total" id="total">
                                <div
                                    className="mask_modal_login"
                                    onClick={() => {
                                        hide();
                                    }}
                                ></div>

                                <div className="container_modal">
                                    <div className=" header_modal">
                                        <div className="header_name">
                                            <img src="" className="header__img" />
                                            <span className="header_name_modal">Chi Tiết</span>
                                        </div>
                                        <div>
                                            <div className="header_info_function_add">
                                                <i
                                                    className="bx bx-x modal_icon_exit"
                                                    id="close"
                                                    onClick={() => {
                                                        hide();
                                                    }}
                                                ></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal_content add_body_modal">
                                        <div className="modal_content_body add_codit">
                                            {
                                             product ?   product.map((item, index) => {
                                                    return <div key={index} className="product1-detail" id="product1-detail">
                                                        <div className="product1-detail-head">

                                                            <div className="img-name">
                                                                <div className="img-product">
                                                                    <img src={item.product.image} alt={item.product.image} />

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="importer-detail">
                                                            <div className="produt-name">
                                                                <span className="name_">{item.product.name}</span>
                                                                <div>Màu: {item.product.color}</div>
                                                                <div>Size: {item.product.size}</div>
                                                                <div className="product-id">
                                                                    <span>Mã sản phẩm : </span>
                                                                    <span>{item.product.id}</span>
                                                                </div>
                                                            </div>
                                                            <div className="amount-price">
                                                                <div className="edit-amount-cart">

                                                                    <div className="amount">

                                                                        <span>{item.quantity}</span>
                                                                    </div>

                                                                </div>
                                                                <div className="cart-product-price">
                                                                    <span id="price"><NumberFormat value={item.product.price} displayType={'text'} thousandSeparator={true} suffix={'đ'} /></span>
                                                                </div>
                                                            </div>

                                                        </div>

                                                    </div>

                                                })
                                                :''
                                            }

                                        </div>
                                    </div>
                                </div>
                            </div> : ''
                    }

                </td>

                <td className="bill_co6">
                    <div className="delete-product">
                        {
                            status === 'Đã đặt hàng' ?
                                <button className="btn-delete" onClick={() => deleteItem(id)}>Huỷ</button>
                                : ''
                        }

                    </div>
                </td>

            </tr>


        </>
    )
}
export default DetailBill;