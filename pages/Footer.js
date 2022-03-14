import React from "react"

const Footer=()=>(
    <div className="footer_body">
    <div className="footer_left_area_item">
        <div className="footer_big_font">LIÊN HỆ</div>
        <div className="footer_inline_contact">
            <span>Điện thoại: 0356374034</span>
        </div>
        <div className="footer_inline_contact">
            <span>Địa chỉ:  Số 06, Trần Văn Ơn, Phú Hòa, Thủ Dầu Một, Bình Dương</span>
        </div>
        <div className="footer_inline_contact">
            <span>Email: godoflordofbugs@gmail.com</span>
        </div>
    </div>
    <div className="footer_left_area_item">
        <div className="footer_big_font">THEO DÕI CHÚNG TÔI TẠI</div>
        <div className="footer_inline">
            <a href="https://www.facebook.com/profile.php?id=100026517738703">Facebook</a>
            <a href="#">|</a>
            <a href="https://www.facebook.com/profile.php?id=100026517738703">Instagram</a>
            <a href="#">|</a>
            <a href="https://www.facebook.com/profile.php?id=100026517738703">Twitter</a>
        </div>

    </div>
    <div className="footer_right_area">
        <div className="footer_logo" onClick={() => { router.push("/") }}>
            <span className="name_logo">fn</span>
            <span className="name_logo_color">bg</span>
        </div>
        <p className="footer_vote">
            <span>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero facere reprehenderit tempore consequuntur officia nam nobis hic voluptates facilis voluptatibus?</span>
        </p>
    </div>
</div>
)
export default Footer