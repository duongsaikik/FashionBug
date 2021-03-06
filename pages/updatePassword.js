import React, { useState, useEffect } from "react";

import { useRouter } from "next/router";
const UpdatePassword = ({ show, setShow, getName, id }) => {
  const router = useRouter();

  const hide = () => {
    setPassword("");
    setPassnoity("");
    setShow(false);
  };
  const [fpassword, setfPassword] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Customer");
  const [Passnoity, setPassnoity] = useState("");
  useEffect(() => {
    if (show) document.getElementById("thu").focus();
  }, [show]);

  const handleSubmit = async () => {
    if (fpassword.length < 6) {
      setPassnoity("Mật khẩu quá ngắn");
    } else if (fpassword != password) {
      setPassnoity("Mật khẩu không trùng khớp");
    } else {
      const response = await fetch("https://shopbug.herokuapp.com/users/" + id, {
        method: "PUT",
        body: JSON.stringify({
          password: fpassword,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      swal("Thông Báo!", "Thay đổi thành công", "success");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      hide();
    }
  };
  const Regis = () => {
    hide();
    setShowRegister(true);
  };
  const reshow = (e) => {
    setShow(e);
  };
  return (
    <>
      {show ? (
        <>
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
                  <span className="header_name_modal">Đăng Nhập</span>
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
              <div className="modal_content">
                <div className="modal_content_body">
                  <div>
                    <img src="https://p.w3layouts.com/demos_new/template_demo/09-08-2018/fashion_hub-demo_Free/1005640873/web/images/p3.png" />
                  </div>
                  <div className="first_modal_content">
                    {Passnoity !== "" ? (
                      <span className="catch_erro">{Passnoity}</span>
                    ) : (
                      ""
                    )}
                    <div className="first_name">
                      <i className="bx bx-user-circle first_icon_content"></i>
                      <div className="first_content_name_detail">
                        <span className="tittle">Mật khẩu mới</span>
                        <input
                          type="password"
                          className="name_input"
                          placeholder=" ..."
                          id="thu"
                          onChange={(e) => setfPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="first_name">
                      <i className="bx bx-lock-alt first_icon_content"></i>
                      <div className="first_content_name_detail">
                        <span className="tittle">Xác nhận </span>
                        <input
                          type="password"
                          className="name_input"
                          placeholder=" ..."
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="btn_login">
                      {/*   <Link href="/" onClick={handleSubmit}><a>Đăng nhập</a></Link> */}
                      <button onClick={handleSubmit}>Đăng nhập</button>
                    </div>
                    <div className="bottom_modal">
                      <span
                        onClick={() => {
                          setShowSetPassword(true);
                          hide();
                        }}
                      >
                        <a>Quên mật khẩu</a>
                      </span>
                      <span
                        onClick={() => {
                          setShowRegister(true);
                          hide();
                        }}
                      >
                        Đăng ký
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default UpdatePassword;