import React, { useState } from "react";

const Description = (props) => {


    const showAction = (event) => {
        if (event.target.id === '1') {
            setIsDisplay(true);
        }
        else {
            setIsDisplay(false);
        }
        var parent = document.querySelectorAll('.showfun');

        parent.forEach(l => l.classList.remove('bg-color'));
        parent[event.target.id].classList.toggle('bg-color');
    }
    return (
        <>
            <div className="product-detail">
                <div>
                    <div className="product-detail-content">
                       
                        <div className="describe-para">
                            <div className="describe-para-body">
                                <div className="comment det" id="1">
                                    <div className="comment-detail">
                                        <h3>Bình luận</h3>
                                        <div className="wr-comment">

                                            <textarea placeholder="Thêm bình luận ..." className="wr-comment-field"></textarea>
                                            <input type="submit" value="Gửi bình luận" className="wr-comment-btn" />
                                        </div>
                                        <div className="line_prevent">
                                                <p></p>
                                        </div>
                                        <div className="comment-detail-title">

                                            <ul>
                                                <li>
                                                    <h4>Nam</h4>
                                                    <h5>sds</h5>
                                                    <span>dfdfdf</span>
                                                </li>
                                                <li>
                                                    <h4>Nam</h4>
                                                    <h5>sds</h5>
                                                    <span>dfdfdf</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="comment-content">
                                        <div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Description;