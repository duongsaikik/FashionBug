import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { faHome, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import styled from "styled-components";
import { storage } from "../../../components/firebase"

const Button = styled.button`
  border-radius: 12px;
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
export const getStaticPaths = async () => {
  const res = await fetch("https://shopbug.herokuapp.com/coursesAll");
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
  const res = await fetch("https://shopbug.herokuapp.com/courses/" + id);
  const data = await res.json();
  return {
    props: {
      item: data,
    },
  };
};

function Form({ item }) {
  const router = useRouter();
  const editorRef = useRef();
  const [formStatus, setFormStatus] = useState(false);
  const [name, setName] = useState(item.Name);
  const [description, setDescription] = useState(item.Description);
  const [sex, setSex] = useState(item.Sex);
  const [dateIn, setDateIn] = useState(item.DateIn);
  const [age, setAge] = useState(item.age);
  const [price, setPrice] = useState(item.Discount ? item.Discount : item.Price);
  const [discount, setDiscount] = useState(100 / (item.Discount / (item.Discount - item.Price)));
  const [enteringQuantity, setEnteringQuantity] = useState(
    item.enteringQuantity
  );
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [colors, setColors] = useState([
    "yello",
    "blue",
    "red",
    "pink",
    "purple",
    "green",
    "gray",
  ]);
  const [shoes, setShoes] = useState([
    "Giày"
  ]);
  const [selectedColors, setSelectedColors] = useState(item.colors);
  const [sizes, setSizes] = useState(["XS", "S", "M", "L", "XL", "XXL"]);
  const [selectedSizes, setSelectedSizes] = useState(item.size);
  const [materials, setMaterials] = useState(["Cotton", "Thun", "Nilon"]);
  const [shirtTypes, setShirtTypes] = useState([
    "Áo sơ mi",
    "Áo thun",
    "Áo khoác",
    "Áo len",
    "Suit",
  ]);
  const [shortsTypes, setShortsTypes] = useState([
    "Quần jean",
    "Quần kaki",
    "Quần thể thao",
    "Đầm",
  ]);
  const [clothes, setClothes] = useState([
    "Quần áo",
    "Phụ kiện",
    "Quần thể thao",
    "Đầm",
  ]);
  const [selectedMaterials, setSelectedMaterials] = useState(item.materials);
  const [selectType, setSelectType] = useState(item.type);
  const [soldQuantity, setSoldQuantity] = useState(item.soldQuantity);
  const [selectedImage, setSelectedImage] = useState(item.Image);
  const [isSucceed, setIsSucceed] = useState("");
  const [imgFire, setImgFire] = useState(null)
  const [imageUrl, setImageUrl] = useState(item.Image);
  const [tag, setTag] = useState(item.tag);
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  const [data, setData] = useState(item.Description);

  const [announce,setAnnounce] = useState('')

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, //Added .CKEditor
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
    setEditorLoaded(true);
    setImageUrl(item.Image)
  }, []);

  const handleChangeImg = (e) => {
    setImgFire(e.target.files[0]);
    console.log(e.target.files[0])
  }

  const handleSave = () => {
    const uploadTask = storage.ref(`images/${imgFire.name}`).put(imgFire);
    uploadTask.on(
      "state_changed",
      snapshot => { },
      error => {
        console.log(error)
      },
      () => {
        storage
          .ref("images")
          .child(imgFire.name)
          .getDownloadURL()
          .then(url => {
            setImageUrl(url)
            console.log(url)
            axios
              .put(
                "https://shopbug.herokuapp.com/courses/" + item._id,
                {
                  Name: name,
                  Description: description,
                  Price: discount > 0 ? price - (price * (discount / 100)) : price,
                  Discount: discount > 0 ? price : null,
                  enteringQuantity,
                  Sex: sex,
                  enteringQuantity,
                  age: age,
                  colors: selectedColors,
                  size: selectedSizes,
                  materials: selectedMaterials,
                  tag,
                  Image: `${url}`,
                  type: selectType
                },
                {
                  headers: { "Content-Type": "application/json" },
                }
              )
              .then(function (response) {
                console.log(response);
                router.push("/course");
              })
              .catch(function (error) {
                console.log(error);
              });
          })
      }
    )
  }

  const handleChange = () => (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name == "name") {
      if(value === ""){
        setAnnounce("tên của sản phẩm")
      }else
      setName(value);
    } else if (name == "description") {
      setDescription(value);
    } else if (name == "imageUrl") {
      setImageUrl(value);
    } else if (name == "tag") {
      setTag(value);
    } else if (name == "sex") {
      setSex(value);
    } else if (name == "price") {
      let tmp = parseInt(value);
      setPrice(tmp);
    } else if (name == "discount") {
      let tmp = Number(value);
      setDiscount(tmp)
    } else if (name == "enteringQuantity") {
      let tmp = parseInt(value);
      setEnteringQuantity(tmp);
    } else if (name == "age") {
      if (value === "Người lớn")
        setAge("Adult");
      else
        setAge("Kid");
    }
  };
  
  const handleSubmit = async () => {
    if (name === "" || sex === "" || price === "" || age === "" || selectedColors === "" || selectedSizes === "" || selectType === "" || selectedMaterials === "") {
      swal("Thông báo", "Thông tin cung cấp cho " + announce +" còn thiếu", "error")
    } else if (Number(price) < 0) {
      swal("Thông báo", "Giá tiền phải lớn hơn 0", "error")
    } else if (imgFire === null) {
      axios
        .put(
          "https://shopbug.herokuapp.com/courses/" + item._id,
          {
            Name: name,
            Description: description,
            Price: discount > 0 ? price - (price * (discount / 100)) : price,
            Discount: discount > 0 ? price : null,
            enteringQuantity,
            Sex: sex,
            enteringQuantity,
            age: age,
            colors: selectedColors,
            size: selectedSizes,
            materials: selectedMaterials,
            tag,
            Image: imageUrl,
            type: selectType
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then(function (response) {
          console.log(response);
          
          router.push(router.asPath);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else
      handleSave();
  };
  const handleSelectColor = () => (color) => {  
    if(color.target.value === "Chọn"){
      setSelectedColors(""); 
      setAnnounce("màu của sản phẩm") 
    }else{
      setSelectedColors(color.target.value);  
    }

  };
  const handleSelectMaterial = () => (material) => {
    if(material.target.value === "Chọn"){
      setSelectedMaterials("");  
      setAnnounce("chất liệu của sản phẩm") 
    }else
    setSelectedMaterials(material.target.value);
  };
  const handleSelectSize = () => (size) => {
    if(size.target.value === "Chọn"){
      setSelectedSizes("");  
      setAnnounce("size của sản phẩm") 
    }else
    setSelectedSizes(size.target.value);
  };
  const handleSelectType = () => (type) => {
    if(type.target.value === "Chọn"){
      setSelectType("");  
      setAnnounce("loại của sản phẩm") 
    }else
    setSelectType(type.target.value);
    
  };
 
  const handlerType = (e) =>{
    const btn = document.querySelectorAll('.collapse')
     btn.forEach(function(ele,index) {
      if(ele !== e.target){
        ele.classList.remove('show');
      }
    }) 
  }

  return (
    <div className="container_add">
      <div className="add_body">
        <Link href={"/course"}>
          <Button>
            {" "}
            <FontAwesomeIcon icon={faHome} />{" "}
          </Button>
        </Link>
        <h2>Chi tiết sản phẩm</h2>

        <p style={{ margin: "8px 0", fontSize: "16px" }}>Ảnh sản phẩm *</p>
        <img src={imageUrl} alt={imageUrl} width="200px" height="200px" />
        <div className="form-group mb-2">


          <input
            type="file"

            onChange={handleChangeImg}
          />

        </div>
      
        <div className="form-group mb-2">
          <label htmlFor="name">Tên sản phẩm *</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Nhập tên sản phẩm"
            required
            name="name"
            value={name}
            onChange={handleChange()}
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="description">Mô tả</label>
          {editorLoaded ? (
            <CKEditor
              className="form-control"
              editor={ClassicEditor}
              config={{
                placeholder: "Hãy viết gì đó ...",
                language: "vi",
                toolbar: [
                  "heading",
                  "|",
                  "bold",
                  "italic",
                  "link",
                  "undo",
                  "redo",
                ],
              }}
              data={data}
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setDescription(data);
              }}
            />
          ) : (
            <p>Carregando...</p>
          )}
        </div>
        <div className="form-group mb-2">
          <label htmlFor="price">Giá *</label>
          <input
            type="number"
            className="form-control"
            id="price"
            placeholder="Giá sản phẩm"
            required
            name="price"
            value={price}
            onChange={handleChange()}
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="price">Giảm giá (%)</label>
          <input
            type="number"
            className="form-control"
            id="discount"
            placeholder="Giảm giá"
            required
            name="discount"
            value={discount}
            onChange={handleChange()}
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="Curentcolors">Màu hiện tại *</label>
          <input
            type="text"
            className="form-control"
            id="Curentcolors"
            placeholder="Nhập mô tả sản phẩm"
            required
            name="Curentcolors"
            value={selectedColors}
            disabled
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="CurrentSizes">Kích cỡ hiện tại *</label>
          <input
            type="text"
            className="form-control"
            id="CurrentSizes"
            placeholder="Nhập mô tả sản phẩm"
            required
            name="CurrentSizes"
            value={selectedSizes}
            disabled
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="CurrentMaterials">Chất liệu hiện tại *</label>
          <input
            type="text"
            className="form-control"
            id="CurrentMaterials"
            placeholder="Nhập mô tả sản phẩm"
            required
            name="CurrentMaterials"
            value={selectedMaterials}
            disabled
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="CurrentMaterials">Loại hiện tại *</label>
          <input
            type="text"
            className="form-control"
            id="CurrentMaterials"

            required
            name="CurrentMaterials"
            value={selectType}
            disabled
          />
        </div>
        <div>
          <div className="form-group" style={{ marginTop: "12px" }}>
            <label htmlFor="sex">Màu *</label>
            <select className="form-select" aria-label="Default select example" onChange={handleSelectColor()}>
              <option selected>Chọn</option>
              {colors.map((color, index) =>
              (
                <option key={index} selected={color === selectedColors ? true : false} value={color} >{color}</option>
              )
              )}
            </select>

          </div>
          <div
            className="form-group"

          >
            <label htmlFor="size">Kích cỡ *</label>
            <select className="form-select" aria-label="Default select example" onChange={handleSelectSize()}>
              <option selected>Chọn</option>
              {sizes.map((size, index) =>
              (
                <option key={index} selected={size === selectedSizes ? true : false} value={size} >{size}</option>
              )
              )}
            </select>
          </div>
          <div
            className="form-group"

          >
            <label htmlFor="material">Chất liệu *</label>
            <select className="form-select" aria-label="Default select example" onChange={handleSelectMaterial()}>
              <option selected>Chọn</option>
              {materials.map((material, index) =>
              (
                <option key={index} selected={material === selectedMaterials ? true : false} value={material} >{material}</option>
              )
              )}
            </select>

          </div>
          <div
            className="form-group"

          >
            <p>
              <button className="btn btn-primary type" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample1" aria-expanded="false" aria-controls="collapseExample1" onClick={handlerType}>
                Áo *
              </button>
            </p>
            <div className="collapse" id="collapseExample1">
              <div className="card card-body">
              <label htmlFor="material">Áo</label>
                <select className="form-select" aria-label="Default select example" onChange={handleSelectType()}>
                  <option selected>Chọn</option>
                  {shirtTypes.map((shirt, index) =>
                  (
                    <option key={index} selected={shirt === selectType ? true : false} value={shirt} >{shirt}</option>
                  )
                  )}
                </select>
              </div>
            </div>
            
           
          </div>

          <div
            className="form-group"
          
          >
             <p>
              <button className="btn btn-primary type" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample2" aria-expanded="false" aria-controls="collapseExample2" onClick={handlerType}>
                Quần *
              </button>
            </p>
            <div className="collapse" id="collapseExample2">
              <div className="card card-body">
              <label htmlFor="material">Quần</label>
                <select className="form-select" aria-label="Default select example" onChange={handleSelectType()}>
                  <option selected>Chọn</option>
                  {shortsTypes.map((short, index) =>
                  (
                    <option key={index} selected={short === selectType ? true : false} value={short} >{short}</option>
                  )
                  )}
                </select>
              </div>
            </div>
            
           
          </div>
          <div
            className="form-group"          
          >
             <p>
              <button className="btn btn-primary type" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample3" aria-expanded="false" aria-controls="collapseExample3" onClick={handlerType}>
                Trẻ con *
              </button>
            </p>
            <div className="collapse" id="collapseExample3">
              <div className="card card-body">
              <label htmlFor="material">Trẻ con</label>
                <select className="form-select" aria-label="Default select example" onChange={handleSelectType()}>
                  <option selected>Chọn</option>
                  {clothes.map((short, index) =>
                  (
                    <option key={index} selected={short === selectType ? true : false} value={short} >{short}</option>
                  )
                  )}
                </select>
              </div>
            </div>
           
            
          </div>
          <div
            className="form-group"
           
          >
              <p>
              <button className="btn btn-primary type" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample4" aria-expanded="false" aria-controls="collapseExample4" onClick={handlerType}>
                Phụ kiện *
              </button>
            </p>
            <div className="collapse" id="collapseExample4">
              <div className="card card-body">
              <label htmlFor="material">Phụ kiện</label>
                <select className="form-select" aria-label="Default select example" onChange={handleSelectType()}>
                  <option selected>Chọn</option>
                  {shoes.map((short, index) =>
                  (
                    <option key={index} selected={short === selectType ? true : false} value={short} >{short}</option>
                  )
                  )}
                </select>
              </div>
            </div>
           
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="age">Độ tuổi *</label>
          <select
            className="form-control"
            id="age"
            required
            name="age"

            onChange={handleChange()}
          >
            <option selected={age === "Adult" ? true : false}>Người lớn</option>
            <option selected={age === "Kid" ? true : false}>Trẻ em</option>
          </select>
        </div>
        <div className="form-group mb-2">
          <label htmlFor="enteringQuantity">Số lượng nhập kho</label>
          <input
            type="number"
            className="form-control"
            id="enteringQuantity"
            placeholder="Số lượng nhập kho"
            required
            name="enteringQuantity"
            value={enteringQuantity}
            onChange={handleChange()}
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="soldQuantity">Số lượng đã bán</label>
          <input
            type="number"
            className="form-control"
            id="soldQuantity"
            placeholder="Số lượng nhập kho"
            required
            name="soldQuantity"
            value={soldQuantity}
            onChange={handleChange()}
            disabled
          />
        </div>
        <hr />
        <button type="button" onClick={handleSubmit} className="btn btn-primary">
          Cập nhật sản phẩm
        </button>
      </div>
    </div>
  );
}
export default Form;
