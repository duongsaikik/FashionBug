import React, { useState,useEffect } from "react";
import styled from "styled-components";
import SideBar from "../../../components/SideBar";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFax, faPhone } from "@fortawesome/free-solid-svg-icons";
import ModalPhanCongGH from "../../../components/ModalPhanCongGH";
import ModalHuyDon from "../../../components/ModalHuyDon";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

/* export const getStaticPaths = async () => {
  const res = await fetch("https://shopbug.herokuapp.com/bills");
  const data = await res.json();

  const paths = data.map((item) => {
    return {
      params: {
        id: item._id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const res = await fetch("https://shopbug.herokuapp.com/bills/" + id);
  const data = await res.json();

  return {
    props: {
      item: data,
    },
  };
};
 */
const ContentContainer = styled.div`
  padding-left: 250px;
`;
const Content = styled.div`
  margin: 20px;
  background-color: white;
  height: auto;
  width: auto;
  padding: 12px;
  border-radius: 12px;
  justify-content: center;
`;
const Button = styled.button`
  border-radius: 8px;
  background-color: lightskyblue;
  color: black;
  padding: 12px;
  font-size: 16px;
  outline: none;
  cursor: pointer;
  border: none;
  margin: 4px;
  transition: transform 0.2s ease;
  &:hover {
    background-color: #e38b06;
    transform: translateY(-0.5rem) scale(1.02);
    color: #000;
  }
`;

const Home = () => {
  const router = useRouter();

  const [item,setItem] = useState(null)
  console.log(item)
  const [showPhanCongModal, setShowPhanCongModal] = useState(false);
  const [showModalHuyDon, setShowModalHuyDon] = useState(false);
  const [relativeTable, setRelativeTable] = useState([]);

    useEffect(() =>{
        const fetchBill = async () =>{
           const res = await fetch("https://shopbug.herokuapp.com/bills/" + router.query.id);
          const data = await res.json(); 
              setItem(data);
        }
        fetchBill();
    },[router])
  const getRelativeData = () => {
    axios
      .get("https://shopbug.herokuapp.com/coursesAll")
      .then(function (response) {
        let getAll = response.data;
        console.log(item.Products);
        let res = [];
        for (let j = 0; j < item.Products.length; j++) {
          for (let i = 0; i < getAll.length; i++) {
            if (item.Products[j].product.id === getAll[i]._id) {
              res.push(getAll[i]);
              break;
            }
          }
        }
        setRelativeTable(res);
        console.log(res);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  return (
    <div>
      <ModalPhanCongGH
        onClose={() => setShowPhanCongModal(false)}
        show={showPhanCongModal}
        item={item}
      >
        Phan Cong Modal
      </ModalPhanCongGH>
      <ModalHuyDon
        onClose={() => setShowModalHuyDon(false)}
        show={showModalHuyDon}
        item={item}
      >
        Phan Cong Modal
      </ModalHuyDon>
      <SideBar></SideBar>
      <ContentContainer>
        <Content>
          <div>
            <h4>Chi ti???t h??a ????n</h4>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>M?? h??ng</th>
                    <th>S??? l?????ng</th>
                    <th>Gi?? ????n v???</th>
                    <th>Gi?? tr???</th>
                  </tr>
                </thead>
                <tbody>
                  {item ? item.Products.map((it,index) => (
                    <tr key={index}>
                      <td>{it.product.id}</td>
                      <td>{it.quantity}</td>
                      <td>{it.product.price}</td>
                      <td>{it.product.price * it.quantity}</td>
                    </tr>
                  )):''}
                </tbody>
              </table>
            </div>
            <h4>C??c s???n ph???m c???n ki???m tra</h4>
            <Button onClick={getRelativeData}>Nh???ng s???n ph???m li??n quan</Button>
            <div className="table-responsive" style={{ textAlign: "center" }}>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>T??n</th>
                    <th>S??? l?????ng nh???p</th>
                    <th>S??? l?????ng b??n</th>
                  </tr>
                </thead>
                <tbody>
                  {relativeTable.map((item,index) => (
                    <tr key={index}>
                      <td>{item.Name}</td>
                      <td>{item.enteringQuantity}</td>
                      <td>{item.soldQuantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Button
              onClick={() => {
                setShowPhanCongModal(true);
              }}
            >
              Ph??n c??ng giao h??ng
            </Button>
            <Button
              onClick={() => {
                setShowModalHuyDon(true);
              }}
            >
              H???y ????n h??ng
            </Button>
            <div className="row">
              <div className="col">
                <h5>S???n ph???m ph??t tri???n b???i BUG</h5>
              </div>
              <div className="col">
                <h5>M???i th???c m???c xin li??n h???</h5>
                <FontAwesomeIcon
                  icon={faPhone}
                  style={{ marginRight: "12px" }}
                />
                <FontAwesomeIcon icon={faFax} style={{ marginRight: "12px" }} />
              </div>
            </div>
          </div>
        </Content>
      </ContentContainer>
    </div>
  );
};
export default Home;
