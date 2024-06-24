import React, { useState } from "react";
import "./Product.css";
import {
  addProducts,
  deleteProduct,
  updateProduct,
} from "../../redux-files/productSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
const Product = () => {
  const products = useSelector((state) => state.products.ourProducts);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [id, setId] = useState("");
  const dispatch = useDispatch();
  const [flag, setFlag] = useState(true);
  const handleAddProduct = () => {
    if (name === "" || description === "" || price === "") {
      setFlag(false);
    } else {
      dispatch(
        addProducts({
          id: products.length,
          Name: name,
          Desc: description,
          Price: price,
        })
      );
      setName("");
      setDescription("");
      setPrice("");
      setTimeout(() => {
        setFlag(true);
      }, 1000);
    }
  };

  return (
    <div className="container">
      <h2>Product dashboard</h2>
      <form>
        <div>
          <p>Name</p>
          <input
            type="text"
            placeholder="Product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <p>Description</p>
          <input
            type="text"
            placeholder="Product description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <p>Price</p>
          <input
            type="text"
            placeholder="Product price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        {flag === false && (
          <div className="Error-msg">Can't be empty values</div>
        )}
        <input
          type="button"
          value="Add New Product"
          className="btn"
          onClick={handleAddProduct}
        />
      </form>

      {products.length ? (
        products.map((product) => {
          return (
            <div className="content" key={product.id}>
              <div>
                <p>Name:</p>
                <span>{product.Name}</span>
              </div>
              <div>
                <p>Description:</p>
                <span>{product.Desc}</span>
              </div>
              <div>
                <p>Price:</p>
                <span>{product.Price}$</span>
              </div>
              <div className="content-buttons">
                <input
                  type="button"
                  value="Update"
                  className="btn"
                  onClick={() => {
                    setIsUpdated(true);
                    setId(product.id);
                  }}
                />
                <input
                  type="button"
                  value="Delete"
                  className="btn"
                  onClick={() => {
                    dispatch(deleteProduct(product.id));
                  }}
                />
              </div>
              {id === product.id && isUpdated === true ? (
                <div className="update-info">
                  <div>
                    <p>Name:</p>
                    <input
                      type="text"
                      placeholder="Enter new name"
                      onChange={(e) => {
                        setNewName(e.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <p>Description:</p>
                    <input
                      type="text"
                      placeholder="Enter new Description"
                      onChange={(e) => {
                        setNewDescription(e.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <p>Price:</p>
                    <input
                      type="text"
                      placeholder="Enter new price"
                      onChange={(e) => {
                        setNewPrice(e.target.value);
                      }}
                    />
                  </div>
                  <button
                    onClick={() => {
                      dispatch(
                        updateProduct({
                          id: product.id,
                          name: newName,
                          description: newDescription,
                          price: newPrice,
                        })
                      );
                      setIsUpdated(false);
                    }}
                  >
                    Update
                  </button>
                </div>
              ) : (
                <></>
              )}
            </div>
          );
        })
      ) : (
        <h2 className="no-product">No products yet</h2>
      )}
    </div>
  );
};

export default Product;
