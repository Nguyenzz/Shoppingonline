import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [newprods, setNewProds] = useState([]);
  const [hotprods, setHotProds] = useState([]);
  const [showHideAdd, setShowHideAdd] = useState(false);
  const [addImg, setAddImg] = useState(
    "https://tse3.explicit.bing.net/th?id=OIP.gJ4nekw_TvvBY4qfIUHjUwHaEK&pid=Api&P=0&h=180"
  );
  const [addTitle, setAddTitle] = useState("");
  const [addPrice, setAddPrice] = useState("");

  useEffect(() => {
    apiGetNewProducts();
    apiGetHotProducts();
  }, []);

  const apiGetNewProducts = () => {
    axios.get("/api/customer/products/new").then((res) => {
      const result = res.data;
      setNewProds(result);
    });
  };

  const apiGetHotProducts = () => {
    axios.get("/api/customer/products/hot").then((res) => {
      const result = res.data;
      setHotProds(result);
    });
  };

  const createProduct = (src, title, price) => {
    const productList = document.querySelector(".product");

    const productItems = document.createElement("div");
    productItems.classList.add("product-items");

    const productImg = document.createElement("img");
    productImg.classList.add("product-items-img");
    productImg.src = src;
    productImg.alt = "";
    const productDes = document.createElement("div");
    productDes.classList.add("product-items-des");

    const productDesTitle = document.createElement("p");
    productDesTitle.innerHTML = title;
    const productDesPrice = document.createElement("p");
    productDesPrice.innerHTML = `Price ${price}`;

    productList.appendChild(productItems);
    productItems.appendChild(productImg);
    productItems.appendChild(productDes);
    productDes.appendChild(productDesTitle);
    productDes.appendChild(productDesPrice);
  };

  const newprodsRender = newprods.map((item) => {
    return (
      <div key={item._id} className="product-items">
        <Link to={"/product/" + item._id}>
          <img
            className="product-items-img"
            src={"data:image/jpg;base64," + item.image}
            alt=""
          />
        </Link>
        <div className="product-items-des">
          <p>{item.name}</p>
          <p>Price: {item.price}</p>
        </div>
      </div>
    );
  });

  const hotprodsRender = hotprods.map((item) => {
    return (
      <div key={item._id} className="product-items">
        <Link to={"/product/" + item._id}>
          <img
            className="product-items-img"
            src={"data:image/jpg;base64," + item.image}
            alt=""
          />
        </Link>
        <div className="product-items-des">
          <p>{item.name}</p>
          <p>Price: {item.price}</p>
        </div>
      </div>
    );
  });

  return (
    <div className="home-ctn">
      <div className="product-form">
        <h2 className="page-title">NEW PRODUCTS</h2>
        <button className="home-add" onClick={() => setShowHideAdd(true)}>
          Add
        </button>
        <div className="product">{newprodsRender}</div>
      </div>
      <div className="product-form">
        <h2 className="page-title">HOT PRODUCTS</h2>
        <div className="product">{hotprodsRender}</div>
      </div>
      {showHideAdd && (
        <div className="add-popup">
          <div className="add-cont">
            <div className="add-header">
              <div className="add-close" onClick={() => setShowHideAdd(false)}>
                X
              </div>
              <p className="add-title">Add Product</p>
            </div>
            <div className="add-content">
              <div className="add-content-img">
                <img className="add-img" src={addImg} alt="img"></img>
              </div>
              <div className="add-content-fielf">
                <div className="add-fielf">
                  <label className="add-label">Src: </label>
                  <input
                    className="add-input"
                    type="text"
                    onChange={(e) => {
                      setAddImg(e.target.value);
                    }}
                  ></input>
                </div>
                <div className="add-fielf">
                  <label className="add-label">Title: </label>
                  <input
                    className="add-input"
                    type="text"
                    onChange={(e) => {
                      setAddTitle(e.target.value);
                    }}
                  ></input>
                </div>
                <div className="add-fielf">
                  <label className="add-label">Price: </label>
                  <input
                    className="add-input"
                    type="text"
                    onChange={(e) => {
                      setAddPrice(e.target.value);
                    }}
                  ></input>
                </div>
              </div>
            </div>
            <div className="add-footer">
              <button
                className="submit-add"
                onClick={() => {
                  createProduct(addImg, addTitle, addPrice);
                  setAddImg(
                    "https://tse3.explicit.bing.net/th?id=OIP.gJ4nekw_TvvBY4qfIUHjUwHaEK&pid=Api&P=0&h=180"
                  );
                  setShowHideAdd(false);
                }}
              >
                ADD
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
