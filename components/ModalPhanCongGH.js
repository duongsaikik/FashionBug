import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import axios from "axios";
import { useRouter } from "next/router";

const Modal = ({ show, onClose, children, title, item }) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const [shippers, setShippers] = useState([]);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };

  const getShippers = () => {
    axios
      .get("https://shopbug.herokuapp.com/users/shippers", {
        params: { area: item.Province },
      })
      .then((res) => {
        setShippers(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  function cut(sstring){
    var re="";
    for(let i=0;i<sstring.length;i++){
      if(sstring[i]>='A'&&sstring[i]<='Z'){
        break;
      }
      re+=sstring[i];
    }
    return re;
  }
  const router = useRouter();
  const setBillForShipper = async (shipper) => {
   await axios
      .get("https://shopbug.herokuapp.com/coursesAll")
      .then((res) => {
        let getAll = res.data;
        console.log(item.Products);
        for (let j = 0; j < item.Products.length; j++) {
          for (let i = 0; i < getAll.length; i++) {
            if (item.Products[j].product.id === getAll[i]._id) {
              getAll[i].soldQuantity += item.Products[j].quantity;
              axios
                .put("https://shopbug.herokuapp.com/courses/" + getAll[i]._id, {
                  soldQuantity: getAll[i].soldQuantity,
                })
                .then((res) => {
                  console.log("ok");
                })
                .catch((e) => {
                  console.log(e);
                });
            }
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
   await axios
      .put("https://shopbug.herokuapp.com/users/" + shipper._id, {
        currentBillQuantity: shipper.currentBillQuantity + 1,
      })
      .then((res) => {
        console.log("ok");
      })
      .catch((e) => {
        console.log(e);
      });
   await axios
      .put("https://shopbug.herokuapp.com/bills/" + item._id, {
        idShipper: shipper._id,
        shipperName: shipper.name,
        Status: "??ang giao h??ng",
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

       await axios
          .post("https://shopbug.herokuapp.com/users/" , {
            email: item.userEmail,
            subject: "Th??ng b??o ????n h??ng ??ang ???????c giao",
            htmlContent: `
              ????n h??ng ng??y:${cut(item.BillDate)} c???a b???n ??ang ???????c giao
              Tr??n Tr???ng!
              `
          })
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      
    router.push("/bill");
  };

  const modalContent = show ? (
    <StyledModalOverlay>
      <StyledModal>
        <StyledModalHeader>
          <a href="#" onClick={handleCloseClick}>
            x
          </a>
        </StyledModalHeader>
        {title }
        <StyledModalBody>
          <h2>
            Ph??n c??ng h??a ????n id = {item._id} t???i khu v???c: {item.Province}
          </h2>
          <button onClick={getShippers}>Ph??n c??ng</button>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>T??n</th>
                  <th>Khu v???c ????ng k??</th>
                  <th>S??? l?????ng ????n ??ang giao</th>
                  <th>Thao t??c</th>
                </tr>
              </thead>
              <tbody>
                {shippers.map((shipper,index) => (
                  <tr key={index}>
                    <td>{shipper.name}</td>
                    <td>{shipper.shipperArea}</td>
                    <td>{shipper.currentBillQuantity}</td>
                    <td>
                      <button onClick={() => setBillForShipper(shipper)}>
                        Ph??n c??ng
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </StyledModalBody>
      </StyledModal>
    </StyledModalOverlay>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
};

const StyledModalBody = styled.div`
  padding-top: 10px;
`;

const StyledModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 25px;
`;

const StyledModal = styled.div`
  background: white;
  width: 500px;
  height: 600px;
  border-radius: 15px;
  padding: 15px;
`;
const StyledModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export default Modal;
