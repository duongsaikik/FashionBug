import React, { useState, useEffect } from "react";

import { useRouter } from "next/router";
import  Register  from "./Register";

const VerifyCode = ({ show, setShow, code, setSussessState,setvalidatemessage, name, email, password, role}) => {
  const router = useRouter();

  const hide = () => {
    setPassnoity("");
    setShow(false);
  };
  const [ShowRegister, setShowRegister] = useState(false);
  const [vcode, setvcode] = useState("");
  
  const [Passnoity, setPassnoity] = useState("");
  useEffect(() => {
    if (show) document.getElementById("thu").focus();
  }, [show]);

  const handleSubmit = async () => {
    if (33333 == vcode) {
      const response = await fetch('https://shopbug.herokuapp.com/users/register', {
        method: 'POST',
        body: JSON.stringify({
          name, email, password, role
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      if (data.exist === 1){
        console.log(1)
        setvalidatemessage("Email đã tồn tại");
        hide();
      }     
      else if (data.exist === 2) {
        setvalidatemessage("Tên đã tồn tại"); 
        console.log(2);
        hide();
      }else{
        setSussessState(true);
        swal("Thông báo","Đăng ký thành công","success");
        hide();
      } 
    } else {
      setPassnoity("Mã xác nhận không chính xác");
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
                  <span className="header_name_modal">Nhập mã xác nhận</span>
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
                        <span className="tittle">Mã xác nhận</span>
                        <input
                          type="text"
                          className="name_input"
                          placeholder="..."
                          id="thu id_code"
                          onChange={(e) => setvcode(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="btn_login">
                      {/*   <Link href="/" onClick={handleSubmit}><a>Đăng nhập</a></Link> */}
                      <button onClick={handleSubmit}>Xác nhận</button>
                    </div>
                    <div className="bottom_modal"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
      <Register show={ShowRegister} reshow={reshow} setShow={setShowRegister} />
      
    </>
  );
};
export default VerifyCode;