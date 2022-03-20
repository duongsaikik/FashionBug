import React, { useEffect, useRef } from "react";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";

import { storage } from "../../components/firebase"
const Form = () => {
  const router = useRouter();
  const editorRef = useRef();
  const [formStatus, setFormStatus] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sex, setSex] = useState("");
  const [age, setAge] = useState("");
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [enteringQuantity, setEnteringQuantity] = useState(0);
  const [colors, setColors] = useState([
    "yellow",
    "blue",
    "red",
    "pink",
    "purple",
    "green",
    "gray",
    "black",
    "orange",
    "white"
  ]);
  const [selectedColors, setSelectedColors] = useState("");
  const [sizes, setSizes] = useState(["XS", "S", "M", "L", "XL", "XXL"]);
  const [selectedSizes, setSelectedSizes] = useState("");
  const [selectType, setSelectType] = useState("");
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
  const [shoes, setShoes] = useState([
    "Giày"
  ]);
  const [clothes, setClothes] = useState([
    "Quần áo",
    "Phụ kiện",
    "Quần thể thao",
    "Đầm",
    "Giày"
  ]);
  const [selectedMaterials, setSelectedMaterials] = useState();

  const [isSucceed, setIsSucceed] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imgFire, setImgFire] = useState(null)
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [tag, setTag] = useState("");
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  const [data, setData] = useState("");
  const [announce,setAnnounce] = useState('')

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, //Added .CKEditor
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
    setEditorLoaded(true);
    
  }, []);

  const handleChange = (e) => {

    const name = e.target.name;
    const value = e.target.value;

    if (name == "name") {
      setName(value);
    } else if (name == "imageUrl") {
      setImageUrl(value);
    } else if (name == "tag") {
      setTag(value);
    } else if (name == "sex") {
      setSex(value);
    } else if (name == "price") {
      let tmp = parseInt(value);
      // if(discount){
      //   tmp = tmp * Number(discount / 100);

      // }
      setPrice(tmp);
    } else if (name == "discount") {
      let tmp = Number(value);
       setDiscount(tmp)
     
     
    }else if (name == "enteringQuantity") {
      let tmp = parseInt(value);
      setEnteringQuantity(tmp);
    } else if (name == "age") {
      if (value === "Người lớn")
        setAge("Adult");
      else
        setAge("Kid");
    }
  };
  const handleChangeImg = (e) => {
    setImgFire(e.target.files[0]);
    console.log(e.target.files[0])
  }
  const handleSave = () => {
  
    const uploadTask =  storage.ref(`images/${imgFire.name}`).put(imgFire);
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
            setImageUrl(url);

            axios
              .post(
                "https://shopbug.herokuapp.com/courses",
                {
                  name,
                  description,
                  sex,
                  price: discount > 0 ? price - (price * (discount /100)) :  price,
                  discount: discount > 0 ? price : null,
                  enteringQuantity,
                  age,
                  colors: selectedColors,
                  size: selectedSizes,
                  materials: selectedMaterials,
                  image: `${url}`,
                  tag,
                  type: selectType
                },
                {
                  headers: { "Content-Type": "application/json" },
                }
              )
              .then(function (response) {
                console.log(response);
                router.push("/course")
              })
              .catch(function (error) {
                console.log(error);
              });
          })
      }
    )
  }
  
  const handleSubmit = () => {
    
    if (name === "" || sex === "" || price === "" || age === "" || selectedColors === "" || selectedSizes === "" || selectedMaterials === "" || selectType === "" || !imgFire) {
      swal("Thông báo", "Thông tin cung cấp cho sản phẩm còn thiếu", "error")
    } else if(Number(price) < 0){
      swal("Thông báo", "Giá tiền phải lớn hơn 0", "error")
    }else{
      handleSave();
    }
  }
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
      <h2>Thêm sản phẩm</h2>

      <div className="form-group mb-2">
        <label htmlFor="name">Tên sản phẩm</label>
        <input
          type="text"
          className="form-control"
          id="name"
          placeholder="Nhập tên sản phẩm"
          required
          name="name"

          onChange={handleChange}
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
        <label htmlFor="price">Giá</label>
        <input
          type="number"
          className="form-control"
          id="price"
          placeholder="Giá sản phẩm"
          required
          name="price"
          value={price}
          onChange={handleChange}
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
          onChange={handleChange}
        />
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
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="sex">Giới tính</label>
        <select
          className="form-control"
          id="sex"
          required
          name="sex"

          onChange={handleChange}
        >
          <option></option>
          <option>Nam</option>
          <option>Nữ</option>
        </select>
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
        <label htmlFor="age">Độ tuổi</label>
        <select
          className="form-control"
          id="age"
          required
          name="age"

          onChange={handleChange}
        >
          <option></option>
          <option>Người lớn</option>
          <option>Trẻ em</option>
        </select>
      </div>
      <div className="form-group mb-2">
        <label htmlFor="imageUrl">Hình ảnh</label>
        <div>
        <input
          type="file"
          onChange={handleChangeImg}
        />
        </div>
        

      </div>
      <hr />
      <button type="button" onClick={handleSubmit} className="btn btn-primary">
        Tạo sản phẩm
      </button>
      </div>
    </div>
  );
}
export default Form;
