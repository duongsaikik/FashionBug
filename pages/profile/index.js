import React from "react";
import DetailBill from "./detailbill";
import NumberFormat from 'react-number-format';
const HistoryBill = (props) => {
    const { bill } = props;
    const { detail } = props;
  
    return (
        <>
            <div className="detail_bill_body">
                <div className="bill_title">
                    <p>Lịch sử mua hàng</p>

                </div>
                <div >
                    <div className="content_b_body">
                        <span className="id_bill ww">Mã đơn hàng</span>
                        <span className="date_b ww">Ngày đặt</span>
                        <span className="sp_bill ww">Sản phẩm</span>
                        <span className="total_bill ww">Tổng tiền</span>
                        <span className="status_col ww">Trạng thái</span>
                        <span className="ww dd"></span>
                        <span className="ww dd"></span>
                    </div>
                    <div className="hisBill_detail_content">
                    <table >
                        {
                          bill ? bill.map((item, index) => {
                                return <DetailBill 
                                key={index} 
                                id={item._id}
                                address={item.Address}
                                billDate={item.BillDate}
                                product={item.Products}
                                province={item.Province}
                                status={item.Status}
                                totalPrice={item.TotalPrice}
                                idShipper={item.idShipper}
                                userEmail={item.userEmail}
                                userId={item.userId}
                                userName={item.userName}
                                 />
                               
                            })
                            : ''
                           
                        }
                    </table>
                    </div>
                </div>

            </div>
        </>

    )
}
export default HistoryBill;