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
/* export const getStaticPaths = async () => {
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
}; */

function Form({ item }) {
  const router = useRouter();
  const editorRef = useRef();

  const [product, setProduct] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [sex, setSex] = useState('');
  const [dateIn, setDateIn] = useState();
  const [age, setAge] = useState('');
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [enteringQuantity, setEnteringQuantity] = useState(
    0
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
    "white"
  ]);
  const [shoes, setShoes] = useState([
    "Gi??y"
  ]);
  const [selectedColors, setSelectedColors] = useState('');
  const [sizes, setSizes] = useState(["XS", "S", "M", "L", "XL", "XXL"]);
  const [selectedSizes, setSelectedSizes] = useState('');
  const [materials, setMaterials] = useState(["Cotton", "Thun", "Nilon"]);
  const [shirtTypes, setShirtTypes] = useState([
    "??o s?? mi",
    "??o thun",
    "??o kho??c",
    "??o len",
    "Suit",
  ]);
  const [shortsTypes, setShortsTypes] = useState([
    "Qu???n jean",
    "Qu???n kaki",
    "Qu???n th??? thao",
    "?????m",
  ]);
  const [clothes, setClothes] = useState([
    "Qu???n ??o",
    "Ph??? ki???n",
    "Qu???n th??? thao",
    "?????m",
  ]);
  const [selectedMaterials, setSelectedMaterials] = useState('');
  const [selectType, setSelectType] = useState('');
  const [soldQuantity, setSoldQuantity] = useState(0);
  const [selectedImage, setSelectedImage] = useState('');
  const [isSucceed, setIsSucceed] = useState("");
  const [imgFire, setImgFire] = useState(null)
  const [imageUrl, setImageUrl] = useState('');
  const [tag, setTag] = useState('');
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  const [data, setData] = useState('');

  const [announce, setAnnounce] = useState('')

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, //Added .CKEditor
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
    setEditorLoaded(true);
   
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("https://shopbug.herokuapp.com/courses/" + router.query.id);
      const data = await res.json();
      console.log(data)
      setProduct(data)
      setName(data.Name)
      setDescription(data.Description)
      setSex(data.Sex)
      setAge(data.age)
      setPrice(data.Discount ? data.Discount : data.Price)   
      setDiscount(100 / (data.Discount / (data.Discount - data.Price)))
      setEnteringQuantity(data.enteringQuantity)
      setSelectedColors(data.colors);
      setSelectedSizes(data.size)
      setSelectedMaterials(data.materials);
      setSelectType(data.type);
      setSoldQuantity(data.soldQuantity);
      setSelectedImage(data.Image);
      setImageUrl(data.Image);
      setTag(data.tag);
     
    }
    fetchUser();
  }, [router])

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
      if (value === "") {
        setAnnounce("t??n c???a s???n ph???m")
      } else
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
      if (value === "Ng?????i l???n")
        setAge("Adult");
      else
        setAge("Kid");
    }
  };

  const handleSubmit = async () => {
    if (name === "" || sex === "" || price === "" || age === "" || selectedColors === "" || selectedSizes === "" || selectType === "" || selectedMaterials === "") {
      swal("Th??ng b??o", "Th??ng tin cung c???p cho " + announce + " c??n thi???u", "error")
    } else if (Number(price) < 0) {
      swal("Th??ng b??o", "Gi?? ti???n ph???i l???n h??n 0", "error")
    } else if (imgFire === null) {
      axios
        .put(
          "https://shopbug.herokuapp.com/courses/" + router.query.id,
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
    if (color.target.value === "Ch???n") {
      setSelectedColors("");
      setAnnounce("m??u c???a s???n ph???m")
    } else {
      setSelectedColors(color.target.value);
    }

  };
  const handleSelectMaterial = () => (material) => {
    if (material.target.value === "Ch???n") {
      setSelectedMaterials("");
      setAnnounce("ch???t li???u c???a s???n ph???m")
    } else
      setSelectedMaterials(material.target.value);
  };
  const handleSelectSize = () => (size) => {
    if (size.target.value === "Ch???n") {
      setSelectedSizes("");
      setAnnounce("size c???a s???n ph???m")
    } else
      setSelectedSizes(size.target.value);
  };
  const handleSelectType = () => (type) => {
    if (type.target.value === "Ch???n") {
      setSelectType("");
      setAnnounce("lo???i c???a s???n ph???m")
    } else
      setSelectType(type.target.value);

  };

  const handlerType = (e) => {
    const btn = document.querySelectorAll('.collapse')
    btn.forEach(function (ele, index) {
      if (ele !== e.target) {
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
        <h2>Chi ti???t s???n ph???m</h2>

        <p style={{ margin: "8px 0", fontSize: "16px" }}>???nh s???n ph???m *</p>
        <img src={imageUrl} alt={imageUrl} width="200px" height="200px" />
        <div className="form-group mb-2">


          <input
            type="file"

            onChange={handleChangeImg}
          />

        </div>

        <div className="form-group mb-2">
          <label htmlFor="name">T??n s???n ph???m *</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Nh???p t??n s???n ph???m"
            required
            name="name"
            value={name}
            onChange={handleChange()}
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="description">M?? t???</label>
          {editorLoaded ? (
            <CKEditor
              className="form-control"
              editor={ClassicEditor}
              config={{
                placeholder: "H??y vi???t g?? ???? ...",
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
              data={description}
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
          <label htmlFor="price">Gi?? *</label>
          <input
            type="number"
            className="form-control"
            id="price"
            placeholder="Gi?? s???n ph???m"
            required
            name="price"
            value={price}
            onChange={handleChange()}
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="price">Gi???m gi?? (%)</label>
          <input
            type="number"
            className="form-control"
            id="discount"
            placeholder="Gi???m gi??"
            required
            name="discount"
            value={discount}
            onChange={handleChange()}
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="Curentcolors">M??u hi???n t???i *</label>
          <input
            type="text"
            className="form-control"
            id="Curentcolors"
            placeholder="Nh???p m?? t??? s???n ph???m"
            required
            name="Curentcolors"
            value={selectedColors}
            disabled
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="CurrentSizes">K??ch c??? hi???n t???i *</label>
          <input
            type="text"
            className="form-control"
            id="CurrentSizes"
            placeholder="Nh???p m?? t??? s???n ph???m"
            required
            name="CurrentSizes"
            value={selectedSizes}
            disabled
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="CurrentMaterials">Ch???t li???u hi???n t???i *</label>
          <input
            type="text"
            className="form-control"
            id="CurrentMaterials"
            placeholder="Nh???p m?? t??? s???n ph???m"
            required
            name="CurrentMaterials"
            value={selectedMaterials}
            disabled
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="CurrentMaterials">Lo???i hi???n t???i *</label>
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
            <label htmlFor="sex">M??u *</label>
            <select className="form-select" aria-label="Default select example" onChange={handleSelectColor()}>
              <option selected>Ch???n</option>
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
            <label htmlFor="size">K??ch c??? *</label>
            <select className="form-select" aria-label="Default select example" onChange={handleSelectSize()}>
              <option selected>Ch???n</option>
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
            <label htmlFor="material">Ch???t li???u *</label>
            <select className="form-select" aria-label="Default select example" onChange={handleSelectMaterial()}>
              <option selected>Ch???n</option>
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
                ??o *
              </button>
            </p>
            <div className="collapse" id="collapseExample1">
              <div className="card card-body">
                <label htmlFor="material">??o</label>
                <select className="form-select" aria-label="Default select example" onChange={handleSelectType()}>
                  <option selected>Ch???n</option>
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
                Qu???n *
              </button>
            </p>
            <div className="collapse" id="collapseExample2">
              <div className="card card-body">
                <label htmlFor="material">Qu???n</label>
                <select className="form-select" aria-label="Default select example" onChange={handleSelectType()}>
                  <option selected>Ch???n</option>
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
                Tr??? con *
              </button>
            </p>
            <div className="collapse" id="collapseExample3">
              <div className="card card-body">
                <label htmlFor="material">Tr??? con</label>
                <select className="form-select" aria-label="Default select example" onChange={handleSelectType()}>
                  <option selected>Ch???n</option>
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
                Ph??? ki???n *
              </button>
            </p>
            <div className="collapse" id="collapseExample4">
              <div className="card card-body">
                <label htmlFor="material">Ph??? ki???n</label>
                <select className="form-select" aria-label="Default select example" onChange={handleSelectType()}>
                  <option selected>Ch???n</option>
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
          <label htmlFor="age">????? tu???i *</label>
          <select
            className="form-control"
            id="age"
            required
            name="age"

            onChange={handleChange()}
          >
            <option selected={age === "Adult" ? true : false}>Ng?????i l???n</option>
            <option selected={age === "Kid" ? true : false}>Tr??? em</option>
          </select>
        </div>
        <div className="form-group mb-2">
          <label htmlFor="enteringQuantity">S??? l?????ng nh???p kho</label>
          <input
            type="number"
            className="form-control"
            id="enteringQuantity"
            placeholder="S??? l?????ng nh???p kho"
            required
            name="enteringQuantity"
            value={enteringQuantity}
            onChange={handleChange()}
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="soldQuantity">S??? l?????ng ???? b??n</label>
          <input
            type="number"
            className="form-control"
            id="soldQuantity"
            placeholder="S??? l?????ng nh???p kho"
            required
            name="soldQuantity"
            value={soldQuantity}
            onChange={handleChange()}
            disabled
          />
        </div>
        <hr />
        <button type="button" onClick={handleSubmit} className="btn btn-primary">
          C???p nh???t s???n ph???m
        </button>
      </div>
    </div>
    
    
    
  );
}
export default Form;
